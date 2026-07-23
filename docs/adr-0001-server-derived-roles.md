# ADR 0001: Derive application roles on the server

Status: Accepted

Cloudflare Access proves identity with a signed JWT, but the browser is not an authority for application privileges. In Access mode, the Worker verifies issuer, audience, signature, algorithm, token timing, application token type, subject, and email. It then maps the verified email to a role using server-only `ACCESS_ROLE_MAP` configuration.

Local mode uses an explicit server-only `LOCAL_IDENTITY` value. This keeps local emulation usable without weakening production boundaries. Request body, header (other than the verified Access assertion), cookie, and query role values do not participate in authorization.

This small configuration map is suitable for a lab. A production system with lifecycle, group, or audit requirements should replace it with a managed server-side entitlement source while retaining the same `IdentityProvider` abstraction.
