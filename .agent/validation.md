# Validation — ZombieOrchard

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Scope

Documentation-only audit of canvas render-surface authority. Runtime source, dependencies, package scripts, rendering behavior, gameplay behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record the source-backed canvas sizing and projection gaps plus the executable proof required before responsive or high-DPI correctness is claimed.

- [x] Read the full-window page and CSS surface.
- [x] Read browser boot and recursive frame ownership.
- [x] Read world-canvas sizing, clearing and projection.
- [x] Read gameplay world/player bounds and entity positions.
- [x] Read HTML projection and public host exposure.
- [x] Read the current Node smoke and build scripts.
- [x] Confirm canvas dimensions are assigned every rendered frame.
- [x] Confirm DPR and pixel-budget policy are absent.
- [x] Confirm fixed world coordinates are not fitted to small viewports.
- [x] Confirm snapshots contain no render-surface provenance.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run render-surface fixtures.

## Source-backed findings

```txt
index.html
  -> owns one #world canvas and one #ui-root surface

src/styles.css
  -> fixes #world to 100vw x 100vh
  -> fixes #ui-root to the same viewport
  -> declares no internal resolution or safe-frame policy

src/start.js
  -> calls world.render(snapshot) every frame
  -> performs no explicit resize transaction
  -> exposes gameplay snapshots without surface state

src/renderer/world-canvas.js
  -> reads clientWidth/clientHeight each frame
  -> falls back to window dimensions when a sampled dimension is zero
  -> assigns canvas.width and canvas.height each frame
  -> ignores window.devicePixelRatio
  -> has no pixel budget or capability admission
  -> centers raw world coordinates without scale or camera policy
  -> returns no typed render or surface result

src/kits/game-domains.js
  -> clamps player to x -360..360 and y -280..280
  -> reports world bounds approximately 720 x 560
  -> permits valid positions outside narrow/tall canvas visibility

src/renderer/html-interface-renderer.js
  -> projects HUD and route UI independently
  -> carries no canvas surface or frame revision

tests/smoke.mjs
  -> creates no canvas
  -> checks only Entry, Play and apple presence
```

## Deterministic calculations

### DPR parity example

```txt
CSS viewport:        1920 x 1080
DPR:                 2
current buffer:      1920 x 1080
physical candidate:  3840 x 2160
current pixels:      2,073,600
candidate pixels:    8,294,400
```

### Pixel-budget risk example

```txt
CSS viewport:        3840 x 2160
DPR:                 2
naive candidate:     7680 x 4320
candidate pixels:    33,177,600
```

### Small-viewport visibility example

```txt
canvas width:        320
visible centered x:  approximately -160..160
valid player x:      -360..360
potential hidden span: 200 pixels per side
```

### Unchanged-frame reset rate

```txt
60 callbacks/second
3,600 canvas dimension resets/minute
216,000 canvas dimension resets/hour
```

This rate is derived from the current per-frame assignments. Actual browser allocation behavior is implementation-specific, but the drawing buffer and context state are reset by the assignments.

## Required fixtures

```txt
viewport-normalization
zero-size-rejection
DPR-plan-parity
pixel-budget-fallback
canvas-capability-admission
unchanged-frame-no-dimension-write
surface-revision-change-only
stale-resize-generation-rejection
allocation-readback-result
failed-preparation-predecessor-preservation
world-fit-and-membership
portrait-landscape-transition
canvas-HTML-frame-correlation
built-artifact-browser-matrix
Pages-canvas-surface-matrix
```

## Required browser matrix

```txt
320 x 480 / DPR 1
390 x 844 / DPR 3
768 x 1024 / DPR 2
1366 x 768 / DPR 1
1920 x 1080 / DPR 2
3840 x 2160 / DPR 2
```

## Existing proof boundary

Current `npm test` verifies only the Entry route, Play transition and apple presence. It does not instantiate a 2D canvas, observe CSS dimensions or DPR, inspect actual drawing-buffer dimensions, test repeated unchanged frames, exercise resize/orientation, classify world visibility or produce a surface/frame receipt.

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
gameplay behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
canvas fixture: unavailable / not run
DPR/pixel-budget fixture: unavailable / not run
world-fit fixture: unavailable / not run
browser viewport matrix: unavailable / not run
Pages viewport matrix: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No high-DPI clarity, bounded canvas allocation, redundant-resize elimination, viewport-safe gameplay, resize-generation correctness or surface-to-visible-frame claim is made.
