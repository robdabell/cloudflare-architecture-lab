# Task 001: Bootstrap the First Deployable Vertical Slice

Status: Completed and retained as historical delivery context. Its constraints describe the repository at the time of the task; later explicitly authorized tasks added authentication, KV, R2, Queues, recommendation samples, and isolated development resources.

Read `AGENTS.md`, `README.md`, and all documents under `docs/` before making changes.

## Outcome

Implement a production-quality but deliberately limited vertical slice using React, TypeScript, Vite, the Cloudflare Vite plugin, Workers Static Assets, one Worker API, Hono, D1, Drizzle ORM, Zod, Vitest, Tailwind CSS v4, shadcn/ui, Lucide React, React Flow, Motion, and Recharts.

## User capabilities

1. View a mobile-first dashboard.
2. List architecture projects.
3. Create a project.
4. Open a project.
5. Edit its name, summary, and status.
6. View a read-only architecture explorer populated from stored project nodes.
7. View a Cloudflare capabilities page explaining only the bindings currently configured.

## Design-system deliverables

Configure shadcn/ui for Vite and create:

- `src/client/components/ui/` for locally owned primitives
- `src/client/components/architecture-lab/` for product patterns

The initial product layer must include `ApplicationShell`, `MobileNavigation`, `DesktopSidebar`, `PageHeader`, `MetricCard`, `StatusBadge`, `EmptyState`, `CapabilityCard`, `ProjectCard`, `ServiceNode`, and `ArchitectureCanvas`.

Add the semantic tokens required by `AGENTS.md`. Use React Flow custom `ServiceNode` nodes for the read-only explorer. Use Recharts only for a project-status chart backed by project data. Use Motion only for restrained page, drawer, and dialog transitions. Respect reduced-motion preferences.

## Engineering deliverables

- Complete project scaffold and coherent `src` structure
- Worker routes and typed API client
- D1 schema, migrations, and Drizzle configuration
- Seed data with two projects and example architecture nodes
- Input validation and structured API errors
- Responsive phone bottom navigation and wider-screen sidebar
- Loading, empty, and error states
- PWA manifest and application shell
- `wrangler.jsonc` with explicit replacement values where IDs are required
- `.dev.vars.example`, `.gitignore`, and local/deployment instructions
- GitHub Actions validation for formatting, linting, type checking, tests, and build
- Unit tests for project validation and business logic
- API integration tests where supported by Cloudflare test tooling
- Basic component tests for the Architecture Lab layer

## Constraints

- Use one full-stack Worker.
- Do not introduce R2, KV, Durable Objects, Queues, Workflows, Workers AI, Vectorize, AI Gateway, or Browser Rendering yet; document clean extension boundaries.
- Do not fabricate Cloudflare resource identifiers.
- Do not deploy, create external resources, or change GitHub/Cloudflare settings.
- Do not leave undocumented placeholder production behavior.

## Verification

Install dependencies, then run formatting, linting, TypeScript checks, all tests, and a production build. Correct failures before completing.

## Completion report

Provide:

1. Implementation summary and material assumptions
2. Files and major components created
3. Commands run
4. Test and build results
5. Cloudflare setup commands that would be required later (do not execute them)
6. Known limitations
7. Recommended next bounded task
