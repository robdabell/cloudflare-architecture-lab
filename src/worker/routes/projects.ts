import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { projectInputSchema } from "../../shared/contracts";
import { requireProjectWrite } from "../middleware/authorization";
import {
  createProject,
  getProject,
  listProjects,
  updateProject,
} from "../services/projects";
import type { AppBindings, AppVariables } from "../types";

export const projectRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();
projectRoutes.get("/", async (c) => c.json(await listProjects(c.env.DB)));
projectRoutes.get("/:id", async (c) =>
  c.json(await getProject(c.env.DB, c.req.param("id"))),
);
projectRoutes.post(
  "/",
  requireProjectWrite,
  zValidator("json", projectInputSchema),
  async (c) => c.json(await createProject(c.env.DB, c.req.valid("json")), 201),
);
projectRoutes.put(
  "/:id",
  requireProjectWrite,
  zValidator("json", projectInputSchema),
  async (c) =>
    c.json(
      await updateProject(c.env.DB, c.req.param("id"), c.req.valid("json")),
    ),
);
