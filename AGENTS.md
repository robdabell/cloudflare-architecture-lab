# Cloudflare Architecture Lab — Agent Instructions

- Use one full-stack Worker with React static assets.
- Keep relational data in D1, objects in R2, disposable configuration/cache in KV, and asynchronous work in Queues/Workflows.
- Do not expose bindings or credentials to browser code.
- Separate resources by environment and use the `cloudflare-architecture-lab-*` namespace.
- Never deploy or create external resources without explicit user authorization.
- Validate inputs, enforce authorization server-side, use correlation IDs, migrations, tests, and structured errors.
- Run formatting, linting, type checks, tests, migrations where relevant, and production build before completion.
