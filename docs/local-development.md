# Local Development and Identity

Copy `.dev.vars.example` to the ignored `.dev.vars` file. `AUTH_MODE="local"` selects the explicit server-side local identity provider. `LOCAL_IDENTITY` must be valid JSON containing an `id`, email address, and one supported role.

All project, car, and technology APIs require a valid identity. Reads are available to every authenticated role. Project creation and editing require `Architect` or `Administrator`. `Publisher` is currently read-only because publishing workflow is not part of this bounded slice.

Malformed or missing identity data fails closed with a structured 401 response. Insufficient privilege produces a structured 403. Both include the response's `x-correlation-id` value. Role-like fields sent in request JSON or query parameters are ignored for authorization.

Run `npm run db:migrate:local` before `npm run dev`. Wrangler stores local emulation state under this repository's ignored `.wrangler/` directory.
