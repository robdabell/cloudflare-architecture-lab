# ADR-001: Platform and UI Foundation

- Status: Accepted
- Date: 2026-07-23

## Context

The product needs a coherent, mobile-first full-stack foundation that demonstrates Cloudflare without unnecessary deployment complexity. It also needs a free, accessible, customizable UI system that Codex can maintain directly in the repository.

## Decision

Use one Cloudflare Worker with Workers Static Assets as the initial application boundary. Use React, TypeScript, Vite, the Cloudflare Vite plugin, Hono, D1, Drizzle, Zod, and Vitest.

Use shadcn/ui and Tailwind CSS v4 as locally owned UI foundations, with Lucide React, React Flow, Motion, Recharts, and Mermaid for their focused roles. Build a product-specific Architecture Lab component layer above the primitives.

## Consequences

- Front end and API deploy as one coherent unit initially.
- The UI foundation is free and fully customizable, but imported components become maintained source code.
- Product-specific components provide consistency and reduce coupling between feature pages and raw primitives.
- React Flow, Recharts, and Motion are used only where interactive diagrams, meaningful quantitative displays, or functional transitions require them.
- Later Cloudflare capabilities are introduced through documented extension boundaries, not premature bindings.

## Alternatives considered

- Cloudflare Pages as the central application boundary: not selected for this new full-stack design.
- Untitled UI: capable, but a paid system is unnecessary for the initial product.
- A packaged component suite: faster in places, but less aligned with the repository-owned and deeply customizable design approach.

