import { describe, expect, it } from "vitest";
import { app } from "@/worker/app";
import type { Role } from "@/worker/auth/identity";
import type { AppBindings } from "@/worker/types";

const db = {
  prepare: () => ({
    bind() {
      return this;
    },
    all: async () => ({ results: [] }),
    first: async () => null,
    run: async () => ({ meta: { changes: 1 } }),
  }),
} as unknown as D1Database;
const env = (role?: Role, raw?: string): AppBindings =>
  ({
    AUTH_MODE: "local",
    LOCAL_IDENTITY:
      raw ??
      (role
        ? JSON.stringify({
            id: `id-${role}`,
            email: `${role.toLowerCase()}@local.test`,
            role,
          })
        : undefined),
    DB: db,
  }) as AppBindings;

describe("API authorization boundaries", () => {
  it("keeps health public", async () =>
    expect((await app.request("/api/health", {}, env())).status).toBe(200));
  it("returns a structured 401 with a correlation id for anonymous access", async () => {
    const response = await app.request("/api/projects", {}, env());
    const body = await response.json<Record<string, unknown>>();
    expect(response.status).toBe(401);
    expect(body).toMatchObject({
      status: 401,
      title: "Authentication required",
    });
    expect(body.correlationId).toBe(response.headers.get("x-correlation-id"));
  });
  it.each<Role>(["Viewer", "Architect", "Publisher", "Administrator"])(
    "allows %s to read",
    async (role) => {
      expect((await app.request("/api/projects", {}, env(role))).status).toBe(
        200,
      );
    },
  );
  it.each<Role>(["Viewer", "Publisher"])(
    "forbids %s from creating projects",
    async (role) => {
      const response = await app.request(
        "/api/projects",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: "Valid project",
            summary: "A sufficiently long summary",
            status: "draft",
          }),
        },
        env(role),
      );
      expect(response.status).toBe(403);
      expect(await response.json()).toMatchObject({
        status: 403,
        title: "Forbidden",
      });
    },
  );
  it.each<Role>(["Architect", "Administrator"])(
    "allows %s through the write boundary",
    async (role) => {
      const response = await app.request(
        "/api/projects",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: "Valid project",
            summary: "A sufficiently long summary",
            status: "draft",
          }),
        },
        env(role),
      );
      expect(response.status).toBe(201);
    },
  );
  it("fails closed for malformed local identity data", async () => {
    expect(
      (await app.request("/api/projects", {}, env(undefined, "not-json")))
        .status,
    ).toBe(401);
    expect(
      (
        await app.request(
          "/api/projects",
          {},
          env(
            undefined,
            JSON.stringify({ id: "x", email: "bad", role: "GodMode" }),
          ),
        )
      ).status,
    ).toBe(401);
  });
  it("ignores privilege escalation fields in the browser body and query", async () => {
    const response = await app.request(
      "/api/projects?role=Administrator",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Escalation",
          summary: "Attempt to supply a role directly",
          status: "draft",
          role: "Administrator",
        }),
      },
      env("Viewer"),
    );
    expect(response.status).toBe(403);
  });
});
