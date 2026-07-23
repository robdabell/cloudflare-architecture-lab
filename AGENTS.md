# Cloudflare Architecture Lab — Agent Instructions

## Objective

Build a mobile-first, production-quality Cloudflare Architecture Lab: a useful architecture workspace and a practical demonstration of the Cloudflare developer platform.

## Read before changing code

1. Read this file and `README.md`.
2. Read the relevant documents under `docs/`.
3. Inspect existing code and tests.
4. State material assumptions in the task summary.

## Primary stack

- TypeScript, React, Vite, and the Cloudflare Vite plugin
- Cloudflare Workers with Workers Static Assets
- Hono for API routing unless native routing is clearly simpler
- D1 with Drizzle ORM; Zod for validation
- Vitest and Cloudflare Workers test tooling
- Tailwind CSS v4 and shadcn/ui
- Lucide React, React Flow, Motion, Recharts, and Mermaid
- Strict TypeScript, ESLint, and Prettier

## Architecture principles

1. Start with one full-stack Worker as the application boundary.
2. Serve the React application with Workers Static Assets.
3. Keep relational data in D1 and large files or generated artifacts in R2.
4. Use KV only for cached or eventually consistent configuration.
5. Use Durable Objects only for coordination or strongly consistent state.
6. Use Queues for asynchronous work and Workflows for recoverable multi-step operations.
7. Use deterministic code instead of AI where deterministic code is appropriate.
8. Never expose service credentials or Worker bindings to browser code.
9. Separate Cloudflare resources by environment; previews must never use production data resources.
10. Do not add a Cloudflare service merely to demonstrate it; every binding must have a defensible product purpose.

## Design system

Use shadcn/ui as the accessible foundation and keep its locally owned components in `src/client/components/ui/`.

Build reusable product patterns in `src/client/components/architecture-lab/`. Feature pages should prefer this product layer when a suitable pattern exists rather than repeatedly composing raw primitives.

Use:

- Tailwind CSS v4 for styling and semantic tokens
- Lucide React for general interface icons
- React Flow for interactive architecture diagrams
- Mermaid for diagrams embedded in Markdown
- Motion for restrained transitions and interaction feedback
- Recharts only for charts backed by meaningful data

Required semantic tokens include `background`, `foreground`, `surface`, `surface-elevated`, `muted`, `muted-foreground`, `border`, `primary`, `primary-foreground`, `accent`, `success`, `warning`, `destructive`, `architecture-node`, and `architecture-edge`.

Use a warm-white background, near-black text, restrained orange accents, deep blue-grey architecture surfaces, accessible contrast, large mobile tap targets, and visible keyboard focus states. Respect `prefers-reduced-motion`.

## Product experience

The product will contain a dashboard, projects, architecture explorer, technology catalogue, ADRs, documents, Cloudflare capability demonstrations, architecture assistant, and settings/administration.

On phones use bottom navigation: Home, Projects, Explore, Assistant, More. On wider screens use a sidebar. All administration flows must remain effective on a phone.

## Engineering rules

- Keep secrets out of source control. Commit `.dev.vars.example`, never `.dev.vars`.
- Validate every API input and enforce authorization server-side.
- Use database migrations and structured problem responses for API errors.
- Add correlation IDs and useful logs without secrets or full document contents.
- Test business logic and access control.
- Document incomplete production behavior explicitly.
- Do not fabricate Cloudflare resource identifiers.
- Do not deploy, create external resources, or mutate Cloudflare/GitHub configuration unless the user explicitly authorizes it.
- Do not silently change material architecture decisions; add or update an ADR.

## Working method

For each implementation:

1. Make the smallest coherent change.
2. Add or update tests.
3. Run formatting, linting, type checking, tests, and a production build.
4. Update documentation when behavior or architecture changes.
5. Summarize files changed, validation performed, assumptions, and remaining limitations.

