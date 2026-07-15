# Current audit: ZombieOrchard

**Timestamp:** `2026-07-15T08-09-51-04-00`  
**Status:** `canvas-backing-store-dpr-resize-authority-audited`  
**Branch:** `main`

## Summary

`src/renderer/world-canvas.js` reads CSS dimensions and unconditionally assigns `canvas.width` and `canvas.height` on every rendered frame. The world backing store has no stable generation, no DPR policy, no conditional resize admission, and no first matching resize-frame acknowledgement.

## Plan ledger

**Goal:** derive one versioned logical/physical Canvas2D surface descriptor, resize only when it changes, preserve one context generation across unchanged frames, and prove source/build/Pages parity.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible repositories are tracked, root-documented, and synchronized.
- [x] Select ZombieOrchard as the oldest synchronized entry.
- [x] Read the host, Canvas2D renderer, CSS, HTML renderer, tests, package, and prior audit state.
- [x] Preserve all 27 implemented kits and services.
- [x] Add and route the timestamped canvas audit family.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Implement and execute render-surface fixtures.

## Complete interaction loop

```txt
page load
  -> create runtime, Canvas2D renderer, and HTML renderer
  -> publish GameHost
  -> start recursive RAF

host frame
  -> engine tick and snapshot
  -> Canvas2D render
       -> sample clientWidth/clientHeight
       -> assign width and height every frame
       -> clear and redraw world
  -> HTML render
  -> request next frame
```

## Domains in use

```txt
browser RAF viewport CSS sizing and device pixel ratio
Canvas2D backing-store context lifecycle and world projection
HTML projection and delegated interface commands
runtime registration commands ticks snapshots and subscriptions
12 interface domains plus composition
resource pressure orchard construction roster inventory and active gameplay
public diagnostics smoke build Pages and central tracking
```

## Implemented inventory

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned canvas authority surfaces: 18
```

The complete kit-by-kit service list is preserved in the current tracker and `.agent/kit-registry.json`.

## Source-backed findings

- Every `world.render(snapshot)` call writes both canvas dimensions.
- The assignments are not guarded by size equality.
- Backing-store dimensions equal logical CSS dimensions.
- The renderer does not read `devicePixelRatio`.
- No `ResizeObserver`, DPR observer, physical-size descriptor, context generation, resize result, stale-work rejection, or first matching frame acknowledgement exists.
- The Node smoke test does not construct a browser canvas.

## Required parent domain

`zombie-orchard-canvas-backing-store-dpr-resize-authority-domain`

## Current file family

```txt
.agent/trackers/2026-07-15T08-09-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T08-09-51-04-00.md
.agent/architecture-audit/2026-07-15T08-09-51-04-00-canvas-backing-store-dpr-dsk-map.md
.agent/render-audit/2026-07-15T08-09-51-04-00-per-frame-backing-store-reset-gap.md
.agent/gameplay-audit/2026-07-15T08-09-51-04-00-simulation-to-canvas-frame-loop.md
.agent/interaction-audit/2026-07-15T08-09-51-04-00-canvas-render-surface-command-result-map.md
.agent/canvas-system-audit/2026-07-15T08-09-51-04-00-backing-store-resize-contract.md
.agent/deploy-audit/2026-07-15T08-09-51-04-00-canvas-dpr-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T08-09-51-04-00-oldest-selection-canvas-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source and behavior are unchanged. No DPR correctness, resize safety, backing-store reuse, allocation reduction, visual equivalence, artifact parity, deployed parity, or production-readiness claim is made.
