# Cloudflare Architecture Lab

A responsive, mobile-first React application served by one full-stack Cloudflare Worker. It includes an architecture project workspace, a transparent pet matcher, a D1-backed sports-car recommender, and an observable KV/R2/Queues technology playground.

## Implemented vertical slice

- Dashboard, project catalogue, editing, and architecture explorer
- Viewer, Architect, Publisher, and Administrator authorization boundaries
- Pet and sports-car recommendation experiences
- D1 relational storage and saved cars
- Purposeful KV, R2, and Queue demonstrations
- Correlation IDs, structured errors, migrations, and automated tests

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

The example identity is an `Architect`. Change only the `role` in the ignored `.dev.vars` file to exercise another role. Local identity is server configuration; browser bodies and query parameters never establish a role.

Local development uses Wrangler's local D1, KV, R2, and Queue emulation. It does not mutate remote resources.

## Validation

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run db:migrate:local
npm run build
npm run deploy:dry-run
```

## Documentation

- [`AGENTS.md`](AGENTS.md): durable contributor instructions
- [`docs/product-requirements.md`](docs/product-requirements.md): product scope and acceptance principles
- [`docs/architecture.md`](docs/architecture.md): target technical architecture
- [`docs/delivery-plan.md`](docs/delivery-plan.md): phased delivery sequence
- [`docs/deployment.md`](docs/deployment.md): safe Cloudflare deployment preparation
- [`docs/RESTORE-NOTE.md`](docs/RESTORE-NOTE.md): recovery provenance
- [`docs/decisions/ADR-001-platform-and-ui-foundation.md`](docs/decisions/ADR-001-platform-and-ui-foundation.md): platform foundation
- [`docs/adr-0001-server-derived-roles.md`](docs/adr-0001-server-derived-roles.md): server-derived authorization roles

## Deployment

The isolated development bindings are configured, but deployment remains fail-closed until a real Cloudflare Access application and its runtime identity settings are supplied. Follow the deployment guide and begin with a preview version rather than an active deployment.

## Recovery provenance

The original React source was recovered from Vite inline source maps retained in the local Chrome cache. The normalized evidence is preserved under `recovery/browser-cache-normalized/`. Worker code, migrations, tests, and documentation were reconstructed from the recorded task history and recovered shared contracts.
