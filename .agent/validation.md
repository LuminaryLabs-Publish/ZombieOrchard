# Validation — ZombieOrchard

## Scope

This was a documentation-only fixed-step clock audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record source-backed timing findings and the exact proof required before cadence, pause or tick/frame claims are made.

- [x] Read `src/start.js`, `src/kits/runtime.js`, `src/kits/game-domains.js` and `src/kits/composition.js`.
- [x] Confirm one hard-coded `1/60` step is submitted per RAF.
- [x] Confirm the runtime ticks every domain once per call.
- [x] Confirm pressure, pest admission, pursuit and damage consume that delta.
- [x] Confirm `GameHost.tick(dt)` advances the same graph outside RAF.
- [x] Confirm no accumulator, catch-up limit, dropped-time result or render-frame receipt exists.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement and run clock fixtures.

## Source-backed findings

```txt
src/start.js
  -> draw() calls engine.tick(1 / 60)
  -> RAF timestamp is ignored
  -> one simulation update occurs per display frame
  -> GameHost exposes direct tick(dt)

src/kits/runtime.js
  -> delta clamps to [0, 0.1]
  -> elapsed and frame advance once per tick call
  -> every domain ticks once
  -> no wall-time accumulator or multi-step loop
  -> no catch-up budget or dropped-time result

src/kits/game-domains.js
  -> pressure grows by dt on every runtime tick
  -> night pest admission probability is dt-scaled per tick
  -> pest movement and player damage are dt-scaled per tick

src/kits/composition.js
  -> terminal state is checked on every tick
  -> route can be forced to Outcome after Title while ended remains true
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

This does not prove wall-time parity, pause freeze, catch-up policy, automatic/manual exclusion, terminal stability or tick-to-frame correlation.

## Required DOM-free clock fixtures

```txt
cadence parity
  -> simulate equal wall duration at 30, 60 and 120 Hz
  -> equal committed tick count
  -> equal pressure and deterministic state

pause freeze
  -> pause for a wall-time interval
  -> zero gameplay ticks
  -> no catch-up burst on resume

stall policy
  -> inject large frame delta
  -> clamp input
  -> run at most maxCatchupSteps
  -> return explicit deferred/dropped time

manual exclusion
  -> automatic clock owns session
  -> manual step rejects without mutation
  -> valid debug/manual mode commits exactly one tick

terminal stability
  -> failure commits once
  -> Outcome route remains stable
  -> no post-terminal gameplay ticks

frame correlation
  -> every render receipt cites session, epoch, clock revision and latest committed tick
```

## Required browser fixture

```txt
fresh run
  -> observe clock/session descriptors
  -> run at forced 30, 60 and 120 Hz schedules
  -> compare committed tick count and state
  -> pause and verify pressure/pests/player stop
  -> resume without burst
  -> simulate visibility stall and verify bounded catch-up result
  -> confirm default GameHost cannot manually advance automatic time
  -> confirm canvas and HTML frame receipts cite the same committed tick
```

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
cadence fixture: unavailable / not run
pause fixture: unavailable / not run
stall fixture: unavailable / not run
manual exclusion fixture: unavailable / not run
render correlation fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: pending
central internal change log: pending
```
