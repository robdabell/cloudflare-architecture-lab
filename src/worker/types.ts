import type { Identity } from "./auth/identity";
export type TechnologyLabMessage = {
  id: string;
  label: string;
  correlationId: string;
  queuedAt: string;
};
export type AppBindings = {
  ASSETS: Fetcher;
  DB: D1Database;
  LAB_KV: KVNamespace;
  LAB_R2: R2Bucket;
  LAB_QUEUE: Queue<TechnologyLabMessage>;
  AUTH_MODE?: "local" | "access";
  LOCAL_IDENTITY?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  ACCESS_ROLE_MAP?: string;
};
export type AppVariables = { correlationId: string; identity: Identity };
