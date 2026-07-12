# ZombieOrchard Canvas Render-Surface Fixture Gate

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

The existing Node smoke never creates a browser canvas. Render-surface readiness requires source fixtures, a built-artifact browser matrix and deployed Pages proof covering DPR, resize, world fit, stale generations and redundant buffer resets.

## Plan ledger

**Goal:** define the executable gate before responsive, high-DPI or viewport-safe rendering is claimed.

- [x] Read the current package scripts and Node smoke.
- [x] Identify missing pure surface fixtures.
- [x] Identify missing browser and Pages matrix coverage.
- [x] Define required diagnostics and artifacts.
- [ ] Add fixture modules and scripts.
- [ ] Execute all gates on `main`.

## Required pure fixtures

```txt
normalize-positive-viewport
reject-zero-or-nonfinite-viewport
bounded-dpr-plan
pixel-budget-fallback
unchanged-candidate-no-buffer-write
surface-revision-increments-on-change-only
stale-resize-generation-rejected
failed-preparation-preserves-predecessor
world-contain-projection
world-membership-at-four-corners
```

## Required browser matrix

```txt
320 x 480 at DPR 1
390 x 844 at DPR 3
768 x 1024 at DPR 2
1366 x 768 at DPR 1
1920 x 1080 at DPR 2
3840 x 2160 at DPR 2
```

For every case record:

```txt
CSS canvas rectangle
requested DPR
applied DPR
requested buffer dimensions
actual canvas.width and canvas.height
pixel count and budget
surface revision
world scale and offset
player viewport membership
first visible frame receipt
```

## Required behavioral smoke

```txt
load Entry
record initial surface
run 600 unchanged frames
verify zero redundant surface commits
activate Play
place player at all four world corners through admitted fixture capability
verify visibility under declared projection policy
resize repeatedly across portrait and landscape
verify generations are monotonic and stale results are rejected
change DPR/zoom where supported
verify bounded resolution and declared fallback
verify HTML and canvas frame correlation
```

## Build and deployment gates

```txt
npm test
npm run build
built artifact viewport matrix
built artifact resize/orientation smoke
GitHub Pages viewport matrix
GitHub Pages DPR/fallback smoke
GitHub Pages world-visibility smoke
```

## Required artifacts

```txt
surface observation JSON for each matrix case
before/after screenshots for each viewport class
surface revision journal
allocation/fallback results
world membership results
visible frame receipts
build commit SHA and deployed Pages SHA
```

## Current result

```txt
runtime source changed: no
fixture code added: no
package scripts changed: no
Node canvas fixture: unavailable
browser matrix: unavailable
built-artifact matrix: unavailable
Pages matrix: unavailable
branch created: no
pull request created: no
```

## Gate

Do not claim canvas resolution correctness, responsive world visibility, resize stability or deployed Pages parity until all matrix cases pass and their surface/frame receipts are retained.
