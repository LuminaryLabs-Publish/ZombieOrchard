# Next steps - ZombieOrchard

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

Replace ambient per-frame canvas sizing with a versioned render-surface owner. Derive logical and physical dimensions once per accepted viewport/DPR change, preserve the context between unchanged frames, and bind visible output to the accepted state and surface revisions.

## Plan ledger

**Goal:** implement the smallest reliable Canvas2D sizing contract without moving gameplay ownership or changing logical world coordinates.

- [ ] Define `RenderSurfaceId`, `RenderSurfaceRevision`, and `ContextGeneration`.
- [ ] Sample CSS viewport dimensions through one owner.
- [ ] Define a capped device-pixel-ratio policy.
- [ ] Derive immutable logical and physical sizes.
- [ ] Add equality-based resize admission.
- [ ] Add `ResizeObserver` or an equivalent viewport revision source.
- [ ] Observe relevant DPR changes.
- [ ] Write canvas width and height only for accepted changes.
- [ ] Reapply a logical-coordinate transform after resize.
- [ ] Preserve the predecessor on invalid or stale resize work.
- [ ] Publish `CanvasRenderSurfaceResult` and retirement receipts.
- [ ] Bind `CanvasFrameResult` to state and surface revisions.
- [ ] Publish `FirstCanvasResizeFrameAck`.
- [ ] Reject late callbacks after surface retirement.
- [ ] Add source, `dist`, and Pages browser fixtures.
- [ ] Retain RAF-clock, frame-coherence, clean-run, and public-capability work.

## Immediate implementation ledger

1. Move dimension ownership out of unconditional `render(snapshot)` work.
2. Create a render-surface descriptor from CSS size and accepted DPR.
3. Compare that descriptor with the accepted predecessor.
4. Resize and rescale the context only when changed.
5. Draw all world coordinates in logical CSS units.
6. Expose immutable diagnostics for logical size, physical size, DPR, surface revision, and context generation.
7. Add a 60-frame unchanged-size fixture that proves exactly one initial dimension assignment.
8. Add viewport and DPR transition fixtures.
9. Repeat the checks against source, `dist`, and Pages.

## Target files

```txt
src/start.js
src/renderer/world-canvas.js
src/renderer/canvas-render-surface.js
src/renderer/canvas-dpr-policy.js
tests/canvas-render-surface.fixture.mjs
scripts/smoke-canvas-browser.mjs
package.json
```

## Required fixtures

```txt
DPR 1 and 2 derive expected physical dimensions
unchanged 60-frame viewport does not rewrite dimensions
viewport resize creates one successor generation
DPR transition creates one successor generation
logical tree, apple, pest, and player coordinates remain stable
invalid dimensions preserve the accepted predecessor
stale resize command is rejected
retirement rejects late callbacks
source, dist, and Pages descriptors match
first matching frame cites accepted state and render-surface revisions
```

## Do not claim

Do not claim DPR correctness, allocation reduction, resize safety, sharpness improvement, frame-time improvement, visible-frame convergence, artifact parity, deployed parity, or production readiness until the complete browser fixture matrix passes on `main`.
