# Next steps - ZombieOrchard

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

Make the Storage Shed a real, attributable world object. The next implementation should validate the item and placement, reserve rather than immediately spend resources, adopt all mandatory consumers together, return the nested result to the interface command, and prove the first matching world frame.

## Plan ledger

**Goal:** make construction settle exactly once and become visible, physical, and meaningful or leave the predecessor untouched.

- [ ] Define `ConstructionCommandId`, `RunGeneration`, `CatalogRevision`, `WorldRevision`, and `ResourceRevision`.
- [ ] Reject unknown construction item IDs; remove the `catalog[0]` fallback.
- [ ] Add an explicit placement intent or authored default placement policy.
- [ ] Validate orchard bounds, tree/apple/player overlap, and structure overlap.
- [ ] Quote and reserve resources before durable mutation.
- [ ] Define construction geometry, collision, capacity, and gameplay-effect descriptors.
- [ ] Prepare detached construction, render, collision, and effect candidates.
- [ ] Commit resource debit and all mandatory consumers atomically.
- [ ] Propagate `ConstructionSettlementResult` through `interface-composition`.
- [ ] Render accepted structures in `world-canvas-renderer`.
- [ ] Keep HTML and Canvas2D on one `ConstructionRevision`.
- [ ] Roll back resources and partial consumers after failure.
- [ ] Add idempotency and stale-command rejection.
- [ ] Publish `FirstVisibleConstructionFrameAck`.
- [ ] Add source, dist, and Pages construction fixtures.

## Immediate safe ledge

1. Make catalog lookup exact and return `unknown-item`.
2. Return the nested command result from `interface-composition`.
3. Add a pure placement validator over orchard bounds and built occupancy.
4. Add a descriptor for the Storage Shed's world rectangle and storage effect.
5. Render `construction-runtime.built` in the Canvas2D world.
6. Add a headless fixture for success, insufficient resources, unknown IDs, overlap, and duplicate commands.
7. Add a browser fixture proving the structure appears in the matching frame.
8. Preserve the predecessor state when any mandatory participant fails.

## Target files

```txt
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/construction/construction-authority.js
src/construction/placement-policy.js
tests/construction-settlement.fixture.mjs
scripts/smoke-construction-browser.mjs
package.json
```

## Required fixtures

```txt
known item settles exact quoted cost
unknown item performs zero mutation
insufficient resources performs zero mutation
duplicate command settles once
stale command is rejected
out-of-bounds placement is rejected
tree/apple/player overlap is rejected
structure overlap is rejected
failed render/collision/effect participant rolls back
accepted structure appears in HTML and Canvas2D on one revision
storage effect activates only after commit
source/dist/Pages results match
first visible construction frame is acknowledged
```

## Do not claim

Do not claim transactional construction, valid placement, visible world adoption, collision, storage effect, rollback, or production readiness until the fixture matrix passes on `main`.
