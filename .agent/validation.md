# Validation - ZombieOrchard

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Scope

Documentation-only audit of Publish selection, Canvas2D CSS sizing, backing-store assignment, DPR policy, context lifecycle, world projection, browser proof, static build, Pages, and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before Canvas2D sizing, sharpness, stability, or performance claims are made.

- [x] Read the complete Publish organization inventory.
- [x] Compare all ten eligible repositories with central tracking.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead repository has priority.
- [x] Select ZombieOrchard as the oldest synchronized eligible entry.
- [x] Read `index.html`, `src/start.js`, `src/game.js`, `src/renderer/world-canvas.js`, `src/renderer/html-interface-renderer.js`, `src/styles.css`, `tests/smoke.mjs`, `package.json`, and prior `.agent` state.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped canvas audits and root routing.
- [x] Keep writes on `main` with no branch or pull request.
- [ ] Implement and run Canvas2D browser fixtures.

## Source-backed findings

```txt
src/renderer/world-canvas.js
  -> reads clientWidth/clientHeight for every render
  -> assigns canvas.width and canvas.height for every render
  -> does not compare with accepted dimensions
  -> does not consume devicePixelRatio
  -> clears and redraws trees apples pests and player

src/styles.css
  -> canvas occupies 100vw by 100vh in CSS pixels

src/start.js
  -> invokes world.render(snapshot) once per RAF callback

tests/smoke.mjs
  -> constructs no canvas, DOM, viewport, DPR, or browser frame

package.json
  -> test is Node-only smoke
  -> build copies index.html and src into dist
```

## Deterministic observations

```txt
accessible Publish repositories: 11
eligible repositories: 10
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
canvas width assignments per render: 1
canvas height assignments per render: 1
conditional resize guards: 0
explicit DPR consumers: 0
ResizeObserver owners: 0
render-surface revisions: 0
context generations: 0
browser canvas fixtures: 0
```

## Required fixture matrix

```txt
DPR 1 and DPR 2 physical-size checks
60 unchanged frames produce one initial dimension adoption
viewport resize produces one successor generation
DPR transition produces one successor generation
world coordinates remain stable in logical units
invalid size preserves predecessor
stale resize command is rejected
retirement rejects late callbacks
CanvasFrameResult cites state and surface revisions
source server and dist results match
Pages result matches source and dist
screenshots meet declared pixel-density and visual-tolerance policy
```

## Validation result

```txt
documentation changed: yes
runtime source changed: no
Canvas2D behavior changed: no
gameplay changed: no
public API changed: no
dependencies or scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser canvas fixtures: unavailable / not run
dimension-write trace: unavailable / not run
DPR screenshot fixture: unavailable / not run
dist smoke: unavailable / not run
Pages smoke: unavailable / not run
```

No backing-store reuse, DPR correctness, resize safety, context-lifecycle correctness, visual sharpness, allocation reduction, frame-time improvement, visible-frame convergence, artifact parity, deployed parity, or production-readiness claim is made.
