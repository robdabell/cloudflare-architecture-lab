# Cloudflare Deployment Preparation

Do not deploy the checked-in configuration as-is. Later, an operator should:

1. Create environment-specific D1, KV, R2, and Queue resources named with the `cloudflare-architecture-lab-*` prefix.
2. Replace only the explicit configuration markers with those real resource identifiers; never copy identifiers from another project.
3. Create a Cloudflare Access application protecting the Worker hostname and record its application audience.
4. Set `AUTH_MODE=access`, `ACCESS_TEAM_DOMAIN`, and `ACCESS_AUD` as Worker configuration/secrets.
5. Set `ACCESS_ROLE_MAP` server-side to map authenticated Access email claims to the four application roles. Do not expose it to browser code.
6. Configure Access policies determining who may reach the application. The Worker still validates the Access JWT and enforces application roles.
7. Apply D1 migrations remotely only after verifying the target database belongs to this project and environment.
8. Run the full validation suite and a Wrangler dry run, review the binding list, then obtain explicit deployment authorization.

No Access application, policy, identity, resource, or deployment was created during restoration.
