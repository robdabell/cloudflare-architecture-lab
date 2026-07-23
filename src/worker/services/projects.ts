import type {
  Project,
  ProjectDetail,
  ProjectInput,
} from "../../shared/contracts";

export class ProjectNotFoundError extends Error {}
type ProjectRow = {
  id: string;
  name: string;
  summary: string;
  status: Project["status"];
  updated_at: string;
};
const project = (row: ProjectRow): Project => ({
  id: row.id,
  name: row.name,
  summary: row.summary,
  status: row.status,
  updatedAt: row.updated_at,
});

export async function listProjects(db: D1Database): Promise<Project[]> {
  const { results } = await db
    .prepare("SELECT * FROM projects ORDER BY updated_at DESC")
    .all<ProjectRow>();
  return results.map(project);
}
export async function getProject(
  db: D1Database,
  id: string,
): Promise<ProjectDetail> {
  const row = await db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .bind(id)
    .first<ProjectRow>();
  if (!row) throw new ProjectNotFoundError("Project not found.");
  const { results } = await db
    .prepare(
      "SELECT id, project_id AS projectId, label, kind, description, position_x AS positionX, position_y AS positionY FROM architecture_nodes WHERE project_id = ?",
    )
    .bind(id)
    .all<ProjectDetail["nodes"][number]>();
  return { ...project(row), nodes: results };
}
export async function createProject(
  db: D1Database,
  input: ProjectInput,
): Promise<Project> {
  const value = {
    id: crypto.randomUUID(),
    ...input,
    updatedAt: new Date().toISOString(),
  };
  await db
    .prepare(
      "INSERT INTO projects (id,name,summary,status,updated_at) VALUES (?,?,?,?,?)",
    )
    .bind(value.id, value.name, value.summary, value.status, value.updatedAt)
    .run();
  return value;
}
export async function updateProject(
  db: D1Database,
  id: string,
  input: ProjectInput,
): Promise<Project> {
  const updatedAt = new Date().toISOString();
  const result = await db
    .prepare(
      "UPDATE projects SET name=?, summary=?, status=?, updated_at=? WHERE id=?",
    )
    .bind(input.name, input.summary, input.status, updatedAt, id)
    .run();
  if (!result.meta.changes)
    throw new ProjectNotFoundError("Project not found.");
  return { id, ...input, updatedAt };
}
