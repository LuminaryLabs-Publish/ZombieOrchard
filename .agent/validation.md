# Validation — ZombieOrchard

## Scope

This was a documentation-only runtime-session instance audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record source-backed lifecycle findings and the exact proof required before fresh-run, restart, cleanup or session/frame claims are made.

- [x] Read `src/start.js`, `src/game.js`, `src/kits/runtime.js`, `src/kits/scoped-interface-domains.js`, `src/kits/composition.js`, `src/kits/game-domains.js`, both renderers and the orchard preset.
- [x] Confirm one graph is created at module evaluation.
- [x] Confirm Play, New Game and Start route the same graph.
- [x] Confirm Pause, Title and Outcome do not retire the graph.
- [x] Confirm RAF, delegated listener, renderer and `GameHost` leases are missing.
- [x] Confirm no startup rollback, authority transfer or ordered disposal exists.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement and run runtime-session fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates engine and renderers immediately
  -> starts recursive RAF without retaining request ID
  -> exposes raw engine and tick through window.GameHost

src/presets/orchard-preset.js
  -> Play routes Entry to active-session
  -> New Game routes Entry to run-setup
  -> Start routes run-setup to active-session
  -> Title routes Pause/Outcome to Entry
  -> no action requests a fresh graph or retirement

src/kits/runtime.js
  -> returns one mutable engine/context/domain graph
  -> no reset, clone, lifecycle or dispose service
  -> subscriptions are not owned by a runtime-session lease

src/kits/game-domains.js
  -> mutable resource, pressure, orchard, construction, roster, inventory and active-session closures
  -> active-session has no reset/dispose command
  -> ended state is latched in the page-lifetime graph

src/kits/composition.js
  -> route transitions mutate only composition state
  -> ended active-session can route back to Outcome on a later tick

src/renderer/html-interface-renderer.js
  -> attaches anonymous delegated click listener
  -> exposes render only

src/renderer/world-canvas.js
  -> retains canvas context
  -> exposes render only
```

## Current proof surface

```txt
npm test
  -> create one engine
  -> verify Entry
  -> activate Play
  -> tick once
  -> verify Active Session
  -> verify at least one apple
```

This does not prove session identity, fresh state, startup rollback, authority handoff, single-RAF ownership, listener cleanup, host revocation, renderer disposal or session/frame correlation.

## Required DOM-free session fixtures

```txt
startup identity
  -> one runtimeId
  -> one initial session descriptor
  -> monotonic lifecycle revision

fresh New Game
  -> new sessionId and incremented epoch
  -> default resources and pressure
  -> no prior buildings, roster changes, equipment changes, pests, damage, score or ended latch

Title policy
  -> explicit retain or retire result
  -> retired terminal session cannot route back to Outcome

authority handoff
  -> new graph validates before publication
  -> old graph rejects commands and ticks after commit

startup rollback
  -> inject failure at each acquisition stage
  -> complete reverse cleanup rows
  -> no partially published current session

ordered disposal
  -> one committed dispose result
  -> second dispose returns no-op
  -> zero post-disposal mutation
```

## Required browser fixtures

```txt
single RAF ownership
  -> one retained request ID and generation
  -> double start cannot create a second loop
  -> stale callback cannot reschedule

listener lease
  -> delegated click works while live
  -> removed on replacement/dispose
  -> stale clicks cannot mutate old graph

public host lease
  -> clone-safe observation only
  -> admitted lifecycle/debug commands only
  -> revoked on replacement/dispose

renderer lifecycle
  -> old resource generation rejects new frames
  -> render-after-dispose rejects
  -> world and HTML receipts cite the same runtime/session/epoch
```

## Follow-on clock fixtures

After Gate 1 passes, run equal-wall-time 30/60/120 Hz, pause, stall, manual-step and tick/frame-correlation fixtures using the session identity established here.

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
session identity fixture: unavailable / not run
fresh-run fixture: unavailable / not run
startup rollback fixture: unavailable / not run
RAF/listener lease fixture: unavailable / not run
host revocation fixture: unavailable / not run
ordered disposal fixture: unavailable / not run
session/frame correlation fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: pending until central commit
central internal change log: pending until central commit
```