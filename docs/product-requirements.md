# Product Requirements

## Purpose

Cloudflare Architecture Lab is both a useful architecture workspace and a live demonstration of Cloudflare capabilities. Cloudflare features must support real user outcomes rather than appear as disconnected samples.

## Users and roles

- Viewer: reads projects and reports
- Architect: creates and edits architecture content
- Publisher: approves and publishes content
- Administrator: manages users and configuration

## Core capabilities

Users can create projects; model components and relationships; maintain technology catalogues, ADRs, risks, and documents; search project content; consult a source-backed architecture assistant; publish selected projects; generate reports; and inspect safe explanations of the Cloudflare services in use.

## Experience requirements

- Mobile-first responsive PWA
- Bottom navigation on phones and sidebar navigation on larger screens
- Structured list editing as a phone-friendly alternative to diagram manipulation
- Accessible forms, keyboard navigation, focus states, and contrast
- Loading, empty, error, offline, and reduced-motion states
- Public examples are read-only by default; private administration is protected

## Design foundation

The free, repository-owned UI stack is:

- shadcn/ui
- Tailwind CSS v4
- Lucide React
- React Flow
- Motion
- Recharts
- Mermaid

Project-specific patterns live in an Architecture Lab component layer so the product does not look or behave like an unmodified UI kit.

## Implemented vertical slice

The application lets an authenticated user view a dashboard; list and open projects; inspect a read-only architecture explorer; use pet and sports-car recommenders; and exercise observable KV, R2, and Queue operations. Architect and Administrator can create and edit projects.

The slice uses Workers Static Assets, one Worker API, D1, R2, KV, Queues, and a Cloudflare Access-ready authorization abstraction. Durable Objects, Workflows, Workers AI, Vectorize, AI Gateway, and Browser Rendering remain documented extension points.

## Remaining non-goals

- Production deployment and production resource creation
- Automated Cloudflare Access application setup
- File uploads or background ingestion
- AI chat or semantic search
- Real-time collaboration
- Editable diagram canvas
- Decorative charts or ornamental animation

## Quality bar

Every slice must be typed, validated, tested, documented, mobile-usable, accessible, and build successfully. No secret or production identifier may be committed.
