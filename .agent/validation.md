# Validation — ZombieOrchard

## Scope

This was a documentation-only fixed-step clock authority audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record source-backed timing findings and the proof required before cadence-independent simulation, authoritative pause, bounded stall recovery, manual stepping or tick/render-correlation claims are made.

- [x] Read the current runtime-session audit and dependency order.
- [x] Read `src/start.js`, `src/game.js`, `src/kits/runtime.js` and `src/kits/game-domains.js`.
- [x] Confirm one hard-coded `1 / 60` tick is executed per RAF callback.
- [x] Confirm the RAF timestamp is ignored.
- [x] Confirm runtime delta is applied once per tick call without an accumulator.
- [x] Confirm pressure, pest spawn, pursuit and damage consume caller delta.
- [x] Confirm Pause and Title do not stop runtime ticking.
- [x] Confirm `GameHost.tick(dt)` provides unrestricted competing mutation authority.
- [x] Confirm snapshots lack runtime/session/tick/render provenance.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push directly to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement the runtime-session prerequisite.
- [ ] Implement and run fixed-step clock fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates engine and renderers immediately
  -> draw() calls engine.tick(1 / 60)
  -> ignores RAF timestamp
  -> renders canvas and HTML after every tick call
  -> exposes raw GameHost.tick(dt)

src/kits/runtime.js
  -> clamps one caller delta to 0..0.1
  -> elapsed += delta
  -> frame += 1
  -> ticks every domain exactly once
  -> has no accumulator, catch-up loop or overrun result

src/kits/game-domains.js
  -> pressure and curse grow by delta
  -> pest-spawn probability is sampled once per tick using delta
  -> pest pursuit and damage advance by delta
  -> failure can commit from those tick effects
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

This does not prove wall-time sampling, cadence parity, pause freeze, visibility resume, catch-up budgets, overrun reporting, automatic/manual exclusion or tick/render correlation.

## Required DOM-free fixtures

```txt
30/60/120 Hz equal-wall-time schedule
  -> equal committed tick counts
  -> equal simulated elapsed time
  -> equal pressure and deterministic non-random state

zero-tick callback
  -> no simulation mutation
  -> render acknowledges prior committed tick

multi-tick callback
  -> ordered catch-up ticks
  -> one render from latest committed tick

stall overflow
  -> maxCatchupSteps respected
  -> deferred or dropped time explicitly returned

pause and resume
  -> zero pressure/pest/damage mutation while paused
  -> resumed baseline contributes no hidden elapsed time

manual step
  -> rejected while automatic owner is active
  -> exact step count under exclusive debug lease
```

## Required browser fixtures

```txt
one retained automatic clock lease
stale-session callback rejection
visibility hide/show baseline reset
canvas and HTML consume the same committed tick
GameHost observation cites the rendered tick
render frame ID remains independent from simulation tick ID
render-after-dispose rejection
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
runtime-session fixture: unavailable / not run
30/60/120 Hz parity fixture: unavailable / not run
pause/visibility fixture: unavailable / not run
catch-up/overrun fixture: unavailable / not run
automatic/manual exclusion fixture: unavailable / not run
tick/render correlation fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No cadence-independent simulation or authoritative clock claim is made.