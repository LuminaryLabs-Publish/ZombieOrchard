# Next steps - ZombieOrchard

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

Replace raw `window.GameHost` publication with immutable readback and allowlisted product commands. External ticking should be unavailable in production by default and available only through an explicit diagnostic lease that binds one runtime result to one HTML and Canvas2D acknowledgement.

## Plan ledger

**Goal:** make public runtime access least-authority, revisioned, idempotent, route-aware, pause-aware and visibly provable.

- [ ] Define `HostGeneration`, `RunGeneration`, `CapabilityPolicyRevision` and `CapabilitySetId`.
- [ ] Publish immutable detached readback rather than the raw engine.
- [ ] Remove `ctx`, `domains`, `addKit`, direct APIs and arbitrary tick from the production global.
- [ ] Define an allowlist of product-level public commands.
- [ ] Add `CallerId`, `PublicCommandId` and expected state revision.
- [ ] Reject duplicate, stale, retired, wrong-generation, route-ineligible and pause-ineligible commands.
- [ ] Publish typed `PublicMutationResult` values.
- [ ] Disable external ticking in production by default.
- [ ] Add scoped debug/test tick leases with expiry and operation limits.
- [ ] Classify every external step as headless or visible.
- [ ] Bind visible steps to exact runtime, HTML and Canvas2D frame revisions.
- [ ] Publish `FirstVisiblePublicMutationFrameAck`.
- [ ] Revoke capability sets and leases on host retirement.
- [ ] Add source, dist and Pages fixtures.
- [ ] Retain clean-run generation, observer isolation and frame-coherence work.

## Immediate safe ledge

1. Replace `window.GameHost.engine` with a frozen product facade.
2. Keep `getState()` but add state, host and run revisions.
3. Replace `tick()` with no production equivalent.
4. Add a test-only lease factory behind an explicit build/runtime policy.
5. Route public commands through one admission coordinator.
6. Return typed results with stable command IDs.
7. Render accepted visible results before acknowledging them.
8. Revoke the facade during page or host retirement.

## Target files

```txt
src/start.js
src/game.js
src/kits/runtime.js
src/host/public-capability-authority.js
src/host/public-command-admission.js
src/host/external-tick-lease.js
src/host/public-capability-retirement.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/public-capability.fixture.mjs
scripts/smoke-public-capability-browser.mjs
package.json
```

## Required fixtures

```txt
production global has no raw engine or mutable internals
readback is immutable and revisioned
allowlisted command settles once
unknown, duplicate and stale commands are rejected
wrong host/run generation is rejected
route and pause policy are enforced
external tick is disabled in production
diagnostic tick requires a valid lease
expired and retired leases are rejected
headless and visible steps are distinct
visible mutation produces matching HTML and Canvas2D receipts
retirement rejects late callers
source, dist and Pages behavior match
```

## Do not claim

Do not claim least-authority publication, safe diagnostics, external-tick correctness, public-command idempotency, visible-frame convergence, capability retirement, artifact parity or production readiness until the fixture matrix passes on `main`.