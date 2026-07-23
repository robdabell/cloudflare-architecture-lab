# Delivery Plan

## Phase 1 — Useful foundation

Status: implemented.

- React, TypeScript, Vite, Worker API, and Workers Static Assets
- Architecture Lab design-system layer
- D1 project catalogue and read-only architecture explorer
- PWA shell, tests, CI, and deployment documentation
- Cloudflare Access-ready identity and authorization boundary

## Phase 2 — Architecture content

Status: partially implemented; project editing and sample recommendation slices are available.

- Editable nodes and relationships
- ADRs, technology catalogue, and risks
- R2 artifact playground (document upload remains future work)

## Phase 3 — Durable processing

Status: Queue playground implemented; remaining items are planned.

- Queue-based document ingestion
- Recoverable Workflows
- Browser-rendered screenshots and PDF reports
- Scheduled checks and usage telemetry

## Phase 4 — Intelligence

- Workers AI and AI Gateway
- Vectorize semantic search
- Source-backed architecture assistant
- Persistent, approval-aware agent sessions

## Phase 5 — Collaboration and hardening

- Durable Object collaboration rooms, WebSockets, and presence
- Cloudflare Access application setup and operational hardening
- WAF, Turnstile, rate limiting, observability, backup, and recovery validation

Each phase should be delivered as bounded, reviewable tasks. Foundational tasks that touch the same files remain sequential until the architecture stabilizes.
