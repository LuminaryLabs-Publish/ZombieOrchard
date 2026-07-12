# Next steps — ZombieOrchard

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

Preserve the existing runtime, clock, route, capability, transaction and frame-fault boundaries, then extract canvas sizing and world projection from `world.render()`. The next implementation should mutate the drawing buffer only after a bounded resize plan is admitted and should prove the first frame that uses the committed surface revision.

## Plan ledger

**Goal:** implement a bounded canvas surface without coupling gameplay state to ambient browser dimensions or introducing unbounded high-DPI allocation.

- [ ] Preserve runtime session and callback generation fencing.
- [ ] Preserve fixed-step writer and route-step admission.
- [ ] Preserve public capability, transaction and frame-cycle boundaries.
- [ ] Add stable canvas surface identity and revision.
- [ ] Add normalized viewport observations and resize generations.
- [ ] Add DPR normalization, capability limits and a product pixel budget.
- [ ] Add a deterministic render-surface plan and typed commit result.
- [ ] Skip drawing-buffer mutation when dimensions are unchanged.
- [ ] Read back actual canvas dimensions after preparation.
- [ ] Add a declared world projection policy for the nominal `720 x 560` orchard.
- [ ] Add world membership results for player, pests and collectables.
- [ ] Add rollback/preservation behavior for failed preparation.
- [ ] Publish bounded surface observations and a visible-frame receipt.
- [ ] Add source, built-artifact, browser and Pages surface fixtures.

## Immediate safe ledge

1. Extract dimension calculation from `world-canvas.js` into a pure `planRenderSurface()` function.
2. Introduce `CanvasRenderSurface` state with `surfaceId`, `surfaceRevision`, CSS dimensions, applied DPR and actual drawing-buffer dimensions.
3. Define a product pixel budget before applying DPR.
4. Add equality checks so unchanged frames perform no dimension writes.
5. Select and encode a world-fit policy for the `720 x 560` simulation space.
6. Make `world.render()` consume a committed surface descriptor rather than ambient browser dimensions.
7. Add pure fixtures before wiring browser observation.
8. Add browser and Pages proof before claiming visual correctness.

## Required runtime flow

```txt
browser viewport adapter
  -> ViewportObservation
  -> resizeGeneration
  -> RenderSurfacePlan
       normalized CSS dimensions
       requested/applied DPR
       bounded physical dimensions
       pixel budget and fallback tier
       world scale and offset
  -> preparation
       skip when unchanged
       write candidate dimensions
       read actual dimensions
  -> RenderSurfaceCommitResult
       committed new revision
       preserved predecessor
       or rejected stale/invalid plan
  -> world render against committed revision
  -> visible surface/frame receipt
```

## Full implementation sequence

1. Add `src/render/canvas-surface-state.js` for IDs, revisions and immutable descriptors.
2. Add `src/render/viewport-observation.js` for CSS rectangle, DPR, orientation and visibility normalization.
3. Add `src/render/render-surface-policy.js` for DPR cap, pixel budget and fallback tiers.
4. Add `src/render/world-projection.js` for nominal bounds, scale, offset and membership.
5. Update `createWorldCanvas()` to retain one committed surface and expose typed resize/render operations.
6. Remove unconditional `canvas.width` and `canvas.height` writes from each frame.
7. Add ResizeObserver/window adapters that submit ordered resize commands.
8. Coalesce observations and reject stale generations.
9. Read back actual canvas dimensions before committing a revision.
10. Add surface observation to a restricted GameHost read model.
11. Correlate world render result with frame-cycle and state revision.
12. Add pure viewport/DPR/world-fit fixtures.
13. Add a browser viewport matrix and resize/orientation smoke.
14. Run the same matrix against `dist` and GitHub Pages.

## Target files

```txt
src/renderer/world-canvas.js
src/start.js
src/styles.css
src/render/canvas-surface-state.js
src/render/viewport-observation.js
src/render/render-surface-policy.js
src/render/world-projection.js
tests/render-surface.fixture.mjs
tests/world-projection.fixture.mjs
scripts/smoke-canvas-resize.mjs
package.json
```

## Policy decisions

```txt
What is the supported minimum CSS viewport?
What is the maximum physical pixel count?
What is the maximum product DPR?
Is the full orchard contained, camera-followed or handled through a hybrid policy?
Are world and HTML surfaces both required for a visible-frame receipt?
How are zero-size or hidden canvas observations handled?
Which fallback tiers are acceptable?
Does orientation change preserve the same runtime session and simulation state?
How many surface journal records are retained?
```

## Required fixtures

```txt
positive CSS dimensions normalize deterministically
zero/non-finite dimensions reject without mutation
DPR 1/2/3 plans respect the same pixel budget
4K CSS at DPR 2 selects a bounded fallback
600 unchanged frames perform zero resize commits
resize revision increments once per accepted change
stale generation cannot replace a newer surface
allocation/readback mismatch preserves predecessor
world corners follow the declared projection policy
player and required interaction targets have explicit viewport membership
portrait/landscape transition preserves simulation coordinates
visible frame cites state and surface revisions
source/built/browser/Pages behavior is equivalent
```

## Dependency order

```txt
runtime session
  -> fixed-step clock
  -> route and input admission
  -> public capability gateway
  -> composite command transaction
  -> frame-publication fault containment
  -> canvas render-surface authority
  -> replay and persistence
```

## Do not claim

Do not claim high-DPI clarity, bounded resolution, stable resize behavior, viewport-safe gameplay, canvas/HTML parity or surface-to-visible-frame correlation until the corresponding fixtures pass on `main`.
