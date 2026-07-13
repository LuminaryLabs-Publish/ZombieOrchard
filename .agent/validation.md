# Validation - ZombieOrchard

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Scope

Documentation-only audit of runtime snapshot capture, subscriber publication, canvas projection, HTML projection, public diagnostics, RAF scheduling, and central tracking. Runtime source, dependencies, gameplay, rendering, and deployment configuration are unchanged.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before canvas/HTML frame-coherence claims are made.

- [x] Read `src/kits/runtime.js`.
- [x] Confirm `notify()` captures a publication snapshot.
- [x] Confirm `engine.tick()` captures a second return snapshot after publication.
- [x] Read `src/start.js` and confirm canvas then HTML sequencing.
- [x] Read `src/renderer/world-canvas.js`.
- [x] Confirm the canvas resets its drawing buffer and paints every frame.
- [x] Confirm world projection does not consult the active interface route.
- [x] Read `src/renderer/html-interface-renderer.js`.
- [x] Confirm the HTML subtree is replaced every frame.
- [x] Confirm neither renderer returns a typed result.
- [x] Confirm `GameHost.getState()` captures a fresh snapshot rather than visible-frame state.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped audits and root routing.
- [x] Update the central repo ledger and internal change log.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run dual-surface frame fixtures.

## Source-backed findings

```txt
src/kits/runtime.js
  -> snapshot contains domain snapshots only
  -> ctx.frame and ctx.elapsed are omitted
  -> notify captures snapshot T1
  -> tick returns separately captured snapshot T2
  -> no publication or frame-envelope identity

src/start.js
  -> tick precedes both renderers
  -> world.render(T2) runs before ui.render(T2)
  -> successor RAF is requested only after both return
  -> no stage result or partial-frame classification

src/renderer/world-canvas.js
  -> drawing-buffer dimensions are assigned every render
  -> world and active-session are always projected
  -> no route, surface, projection, or frame revision

src/renderer/html-interface-renderer.js
  -> interface route selects HUD or full-screen panel
  -> #ui-root is replaced through innerHTML every render
  -> no projection result, focus receipt, or frame revision

src/start.js diagnostics
  -> GameHost.getState() returns a fresh engine.snapshot()
  -> no visible-frame readback exists
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
runtime snapshots per normal tick path: at least 2
visible surfaces: 2
surface projection result types: 0
shared frame envelope IDs: 0
shared frame fingerprints: 0
dual-surface commit results: 0
visible-frame acknowledgements: 0
browser parity fixtures: 0
```

## Required fixtures

```txt
single envelope per tick
subscriber/render envelope identity
reentrant subscriber does not split observer and visible state
canvas and HTML cite identical state revision
canvas failure result
HTML failure result
partial-frame recovery and successor RAF
route-to-world visibility policy
GameHost visible-frame readback
first dual-surface frame acknowledgement
source/dist/Pages parity
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
dual-surface fixtures: unavailable / not run
browser frame-coherence smoke: unavailable / not run
Pages frame-coherence smoke: unavailable / not run
```

No snapshot identity, dual-surface atomicity, route/world visibility, partial-frame recovery, visible diagnostics parity, or first-visible-frame claim is made.
