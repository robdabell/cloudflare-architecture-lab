# Cloudflare Deployment Preparation

The development environment bindings were provisioned on 2026-07-23 with the
`cloudflare-architecture-lab-dev*` namespace and are recorded in
`wrangler.jsonc`. No Worker has been deployed.

Before activating a deployment, an operator must:

1. Create a Cloudflare Access application protecting the exact development Worker hostname and record its real audience. Do not invent it.
2. Add `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD`, and `ACCESS_ROLE_MAP` as Worker runtime secrets or variables in the Cloudflare dashboard. `AUTH_MODE=access` is already checked in and fails closed while these values are absent.
3. Configure an Access Allow policy for intended users. Do not use a Bypass policy for protected application paths.
4. Connect `robdabell/cloudflare-architecture-lab` to the `cloudflare-architecture-lab-dev` Worker in Workers Builds, selecting the intended Git branch.
5. Use `npm run build` as the build command. Initially use `npx wrangler versions upload` as the deploy command so the build creates a preview version without promoting it.
6. Run the full validation suite and `npm run deploy:dry-run`, then review the binding list.
7. Verify authentication, every role, D1 reads/writes, KV, R2, and Queue consumption on the preview URL.
8. Only after review, change the production deploy command to `npx wrangler deploy` or explicitly promote the verified version.

For production, provision a separate `cloudflare-architecture-lab-production*`
resource set and Access application. Never point production at these development
bindings.

The Access application, policy, identity configuration, GitHub build connection,
and Worker deployment are deliberately not created by repository configuration.
