# Recovery Note — 2026-07-23

The prior, uncommitted repository worktree disappeared. The earlier conclusion that no source was recoverable was incorrect.

## What was recovered exactly

Chrome's HTTP cache retained Vite development responses with inline source maps. Their `sourcesContent` fields yielded the original React application and shared API contracts. Exact normalized extracts are preserved at `recovery/browser-cache-normalized/src/` and copied into the active `src/client/` and `src/shared/` trees.

## What was reconstructed

No Worker source map or usable Wrangler bundle was found in the inspected local caches. The Worker routes, identity abstraction, migrations, tests, configuration, and documentation were reconstructed from the task's recorded implementation history and checked against the recovered client contracts. These files should not be represented as byte-for-byte originals.

The first raw cache extraction, including imperfect filenames, remains under `recovery/browser-cache/` as evidence. Nothing in either evidence directory is used by the build.

## Safety

Recovery and validation operated only in this repository and local Wrangler state. No Cloudflare deployment or remote resource mutation was performed.
