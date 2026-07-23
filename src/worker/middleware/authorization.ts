import type { MiddlewareHandler } from "hono";
import { AuthorizationError, canWriteProjects } from "../auth/identity";
import type { AppBindings, AppVariables } from "../types";

export const requireProjectWrite: MiddlewareHandler<{
  Bindings: AppBindings;
  Variables: AppVariables;
}> = async (c, next) => {
  if (!canWriteProjects(c.get("identity"))) {
    throw new AuthorizationError(
      "Architect or Administrator role is required.",
    );
  }
  await next();
};
