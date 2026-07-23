import type {
  Problem,
  Project,
  ProjectDetail,
  ProjectInput,
  SavedCar,
  SportsCar,
  TechnologyLabState,
} from "@/shared/contracts";
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const problem = (await response.json()) as Problem;
    throw new Error(problem.detail);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
export const api = {
  listProjects: () => request<Project[]>("/projects"),
  getProject: (id: string) => request<ProjectDetail>(`/projects/${id}`),
  createProject: (input: ProjectInput) =>
    request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  updateProject: (id: string, input: ProjectInput) =>
    request<Project>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    }),
  listCars: () => request<SportsCar[]>("/cars"),
  listSavedCars: () => request<SavedCar[]>("/cars/saved"),
  saveCar: (carId: string) =>
    request<SavedCar>("/cars/saved", {
      method: "POST",
      body: JSON.stringify({ carId }),
    }),
  removeSavedCar: (carId: string) =>
    request<void>(`/cars/saved/${encodeURIComponent(carId)}`, {
      method: "DELETE",
    }),
  getTechnologyState: () => request<TechnologyLabState>("/technology/state"),
  incrementKvCounter: () =>
    request<Record<string, unknown>>("/technology/kv/increment", {
      method: "POST",
    }),
  createR2Object: (label: string) =>
    request<Record<string, unknown>>("/technology/r2/object", {
      method: "POST",
      body: JSON.stringify({ label }),
    }),
  sendQueueMessage: (label: string) =>
    request<Record<string, unknown>>("/technology/queue", {
      method: "POST",
      body: JSON.stringify({ label }),
    }),
};
