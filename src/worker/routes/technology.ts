import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { technologyLabelSchema } from "../../shared/contracts";
import type { AppBindings, AppVariables, TechnologyLabMessage } from "../types";

export const technologyRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();
technologyRoutes.get("/state", async (c) => {
  const [counter, objects, keyList] = await Promise.all([
    c.env.LAB_KV.get<{ counter: number; updatedAt: string }>(
      "technology:counter",
      "json",
    ),
    c.env.LAB_R2.list({ prefix: "technology/", limit: 20 }),
    c.env.LAB_KV.list({ prefix: "technology:queue:", limit: 10 }),
  ]);
  const recent = (
    await Promise.all(
      keyList.keys.map((key) =>
        c.env.LAB_KV.get<{
          id: string;
          label: string;
          status: string;
          timestamp: string;
        }>(key.name, "json"),
      ),
    )
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return c.json({
    kv: {
      counter: counter?.counter ?? 0,
      updatedAt: counter?.updatedAt ?? null,
    },
    r2: {
      objects: objects.objects.map((o) => ({
        key: o.key,
        size: o.size,
        uploaded: o.uploaded.toISOString(),
      })),
    },
    queue: { recent },
  });
});
technologyRoutes.post("/kv/increment", async (c) => {
  const before = await c.env.LAB_KV.get<{ counter: number }>(
    "technology:counter",
    "json",
  );
  const value = {
    counter: (before?.counter ?? 0) + 1,
    updatedAt: new Date().toISOString(),
  };
  await c.env.LAB_KV.put("technology:counter", JSON.stringify(value));
  return c.json({
    binding: "LAB_KV",
    operation: "get → put",
    before: before?.counter ?? 0,
    after: value.counter,
    correlationId: c.get("correlationId"),
  });
});
technologyRoutes.post(
  "/r2/object",
  zValidator("json", technologyLabelSchema),
  async (c) => {
    const key = `technology/${crypto.randomUUID()}.json`;
    const artifact = {
      label: c.req.valid("json").label,
      createdAt: new Date().toISOString(),
      correlationId: c.get("correlationId"),
    };
    await c.env.LAB_R2.put(key, JSON.stringify(artifact, null, 2), {
      httpMetadata: { contentType: "application/json" },
    });
    return c.json({ binding: "LAB_R2", operation: "put", key, artifact }, 201);
  },
);
technologyRoutes.post(
  "/queue",
  zValidator("json", technologyLabelSchema),
  async (c) => {
    const message: TechnologyLabMessage = {
      id: crypto.randomUUID(),
      label: c.req.valid("json").label,
      correlationId: c.get("correlationId"),
      queuedAt: new Date().toISOString(),
    };
    await c.env.LAB_KV.put(
      `technology:queue:${message.id}`,
      JSON.stringify({
        ...message,
        status: "queued",
        timestamp: message.queuedAt,
      }),
    );
    await c.env.LAB_QUEUE.send(message);
    return c.json({ binding: "LAB_QUEUE", operation: "send", message }, 202);
  },
);
export async function consumeTechnologyMessages(
  batch: MessageBatch<TechnologyLabMessage>,
  env: AppBindings,
) {
  for (const message of batch.messages) {
    const completedAt = new Date().toISOString();
    await env.LAB_R2.put(
      `technology/queue-receipts/${message.body.id}.json`,
      JSON.stringify(
        { ...message.body, status: "completed", completedAt },
        null,
        2,
      ),
    );
    await env.LAB_KV.put(
      `technology:queue:${message.body.id}`,
      JSON.stringify({
        id: message.body.id,
        label: message.body.label,
        status: "completed",
        timestamp: completedAt,
      }),
    );
    message.ack();
  }
}
