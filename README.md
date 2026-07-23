# Cloudflare Architecture Lab

A responsive React application served by one full-stack Cloudflare Worker. It includes an architecture project workspace, a transparent pet matcher, a D1-backed sports-car recommender, and an observable local KV/R2/Queues technology playground.

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

The example identity is an `Architect`. Change only the `role` in the ignored `.dev.vars` file to exercise `Viewer`, `Architect`, `Publisher`, or `Administrator`. Local identity is server configuration; browser bodies and query parameters never establish a role.

Local development uses Wrangler's local D1, KV, R2, and Queue emulation. It does not create or mutate remote resources.

## Validation

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run db:migrate:local
npm run build
```

## Deployment

Deployment is intentionally not ready-to-run: `wrangler.jsonc` contains an explicit D1 identifier marker and local-style resource names. Follow [the deployment guide](docs/deployment.md) and replace markers only with resources created for this project and environment.

## Recovery provenance

The original React source was recovered from Vite inline source maps retained in the local Chrome cache. The normalized evidence is preserved under `recovery/browser-cache-normalized/`. Worker code, migrations, tests, and documentation were reconstructed from the recorded task history and the recovered shared contracts. See [the recovery note](docs/RESTORE-NOTE.md).
