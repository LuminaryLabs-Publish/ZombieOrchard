# Validation - ZombieOrchard

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Scope

Documentation-only reconciliation of repository selection, runtime publication, browser host sequencing, canvas projection, HTML projection, diagnostics, package proof, deployment gates, and central tracking. Runtime source, dependencies, gameplay, rendering, tests, and deployment configuration are unchanged.

## Plan ledger

**Goal:** record exact source evidence and the proof required before canvas/HTML frame-coherence claims are made.

- [x] Read the current Publish organization inventory.
- [x] Compare all nine eligible repositories with central tracking.
- [x] Select ZombieOrchard as the oldest eligible central entry.
- [x] Read `src/start.js`.
- [x] Read `src/kits/runtime.js`.
- [x] Read `src/game.js`.
- [x] Read `src/kits/game-domains.js`.
- [x] Read `src/kits/composition.js`.
- [x] Read `package.json`.
- [x] Confirm publication and returned browser snapshots are separately captured.
- [x] Confirm canvas then HTML sequencing.
- [x] Confirm neither renderer returns a typed stage result.
- [x] Confirm public diagnostics expose fresh state rather than visible state.
- [x] Preserve all 27 kit surfaces and offered services.
- [x] Add timestamped audits and root routing.
- [x] Keep documentation writes on `main` with no branch or pull request.
- [ ] Implement and run dual-surface fixtures.

## Source-backed findings

```txt
src/kits/runtime.js
  -> ctx tracks frame, elapsed, delta, events, and domains
  -> engine.snapshot() returns only domain snapshots
  -> notify captures publication snapshot T1
  -> tick returns separately captured snapshot T2
  -> no publication, state, or frame-envelope identity

src/start.js
  -> recursive RAF calls engine.tick(1 / 60)
  -> world.render(T2) runs before ui.render(T2)
  -> successor RAF is requested after both calls
  -> GameHost exposes raw engine, fresh getState(), and manual tick

src/kits/game-domains.js
  -> pressure, pest admission, pursuit, damage, score, and failure mutate during ticks
  -> no committed state revision is published

src/kits/composition.js
  -> active route is independent state
  -> Outcome routing runs during ticks
  -> no shared route/frame revision exists

package.json
  -> npm test runs one Node smoke
  -> npm run build performs a static copy
  -> no browser frame-coherence fixture is declared
```

## Deterministic observations

```txt
accessible Publish repositories: 10
eligible repositories: 9
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
runtime snapshot captures in normal tick path: at least 2
visible surfaces: 2
surface projection result types: 0
shared frame envelope IDs: 0
dual-surface commit results: 0
visible-frame acknowledgements: 0
browser frame-coherence fixtures: 0
```

## Required fixture matrix

```txt
single envelope per transition
subscriber/render envelope identity
reentrant subscriber isolation
canvas and HTML cite identical state revision
canvas failure result
HTML failure result
partial-frame recovery and continued scheduler
route-specific world visibility
GameHost visible-frame readback
first complete visible-frame acknowledgement
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

No snapshot identity, dual-surface atomicity, route/world visibility, partial-frame recovery, visible diagnostics parity, first-visible-frame, or production-readiness claim is made.