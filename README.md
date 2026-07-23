# Cloudflare Architecture Lab

A mobile-first architecture workspace and live, purposeful demonstration of Cloudflare's application platform.

## Status

This repository currently contains the approved architecture, product guardrails, design-system standard, delivery plan, and the first bounded implementation task. Application code has not yet been bootstrapped.

## Source of truth

- [`AGENTS.md`](AGENTS.md): durable instructions for Codex and contributors
- [`docs/product-requirements.md`](docs/product-requirements.md): product scope and acceptance principles
- [`docs/architecture.md`](docs/architecture.md): target technical architecture
- [`docs/delivery-plan.md`](docs/delivery-plan.md): phased sequence
- [`docs/decisions/ADR-001-platform-and-ui-foundation.md`](docs/decisions/ADR-001-platform-and-ui-foundation.md): agreed foundation
- [`tasks/001-bootstrap-vertical-slice.md`](tasks/001-bootstrap-vertical-slice.md): first Codex implementation task

## Intended repository shape

```text
src/client/              React application
src/worker/              Worker API and services
src/durable-objects/     Real-time coordination (later phase)
src/workflows/           Durable processing (later phase)
migrations/              D1 migrations
public/                  Static and PWA assets
tests/                   Unit, integration, and browser tests
docs/                    Architecture and decisions
tasks/                   Bounded implementation briefs
```

## Next action

Run the task in `tasks/001-bootstrap-vertical-slice.md` with Codex. It deliberately stops short of deployment or external resource creation.

