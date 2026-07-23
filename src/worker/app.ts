import { Hono, type Context, type MiddlewareHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { HTTPException } from "hono/http-exception";
import { AuthenticationError, AuthorizationError } from "./auth/identity";
import {
  AccessIdentityProvider,
  LocalIdentityProvider,
} from "./auth/providers";
import { carRoutes } from "./routes/cars";
import { projectRoutes } from "./routes/projects";
import { technologyRoutes } from "./routes/technology";
import { ProjectNotFoundError } from "./services/projects";
import type { AppBindings, AppVariables } from "./types";

export const app = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();
const problem = (
  c: Context<{ Bindings: AppBindings; Variables: AppVariables }>,
  status: number,
  title: string,
  detail: string,
) =>
  c.json(
    {
      type: `https://cloudflare-architecture-lab.dev/problems/${status}`,
      title,
      status,
      detail,
      correlationId: c.get("correlationId"),
    },
    { status: status as ContentfulStatusCode },
  );
app.use("*", async (c, next) => {
  const correlationId = c.req.header("cf-ray") ?? crypto.randomUUID();
  c.set("correlationId", correlationId);
  c.header("x-correlation-id", correlationId);
  c.header("x-content-type-options", "nosniff");
  c.header("referrer-policy", "no-referrer");
  await next();
});
const authenticate: MiddlewareHandler<{
  Bindings: AppBindings;
  Variables: AppVariables;
}> = async (c, next) => {
  const provider =
    c.env.AUTH_MODE === "access"
      ? new AccessIdentityProvider(
          c.env.ACCESS_TEAM_DOMAIN ?? "",
          c.env.ACCESS_AUD ?? "",
          c.env.ACCESS_ROLE_MAP,
        )
      : new LocalIdentityProvider(c.env.LOCAL_IDENTITY);
  c.set("identity", await provider.authenticate(c.req.raw));
  await next();
};
app.get("/api/health", (c) => c.json({ status: "ok" }));
app.use("/api/projects/*", authenticate);
app.use("/api/cars/*", authenticate);
app.use("/api/technology/*", authenticate);
app.route("/api/projects", projectRoutes);
app.route("/api/cars", carRoutes);
app.route("/api/technology", technologyRoutes);
app.notFound((c) =>
  c.req.path.startsWith("/api/")
    ? problem(c, 404, "Not found", "The requested API resource was not found.")
    : c.env.ASSETS.fetch(c.req.raw),
);
app.onError((error, c) => {
  if (error instanceof AuthenticationError)
    return problem(c, 401, "Authentication required", error.message);
  if (error instanceof AuthorizationError)
    return problem(c, 403, "Forbidden", error.message);
  if (error instanceof ProjectNotFoundError)
    return problem(c, 404, "Not found", error.message);
  if (error instanceof HTTPException)
    return problem(c, error.status, "Request failed", error.message);
  console.error(
    JSON.stringify({
      correlationId: c.get("correlationId"),
      error: error instanceof Error ? error.message : String(error),
    }),
  );
  return problem(
    c,
    500,
    "Internal server error",
    "An unexpected error occurred.",
  );
});
