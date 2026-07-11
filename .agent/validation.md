# Validation — ZombieOrchard

## Scope

Documentation-only runtime-session instance and fresh-run authority audit. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the exact source-backed restart defect and proof required before fresh New Game, restart, pause, lifecycle or disposal claims are made.

- [x] Read module boot and graph construction.
- [x] Confirm one mutable graph is created before Play.
- [x] Confirm route transitions do not instantiate or reset domains.
- [x] Confirm terminal `ended` survives Outcome -> Title.
- [x] Confirm Play/Start reuse the ended active-session.
- [x] Confirm composition routes the reused session back to Outcome.
- [x] Confirm all state-owning domains survive route changes.
- [x] Confirm canvas continues rendering the same graph on every route.
- [x] Confirm runtime/run/session identity, reset, rollback, first-frame and disposal contracts are absent.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run runtime-session fixtures.

## Source-backed findings

```txt
src/start.js
  -> createOrchardGame() once at module boot
  -> recursive RAF always ticks the engine
  -> raw GameHost exposes engine, snapshot and manual tick

src/game.js
  -> constructs all mutable domains once

src/kits/composition.js
  -> route move mutates only active and previous
  -> ended active-session auto-routes to Outcome every tick

src/kits/game-domains.js
  -> active-session sets ended at zero condition
  -> no reset/new-run service
  -> resource, pressure, orchard, construction,
     roster and inventory state live in retained closures

src/presets/orchard-preset.js
  -> Entry Play, Run Setup Start and Outcome Title are route actions

src/renderer/world-canvas.js
  -> world renders orchard/session regardless active route

src/renderer/html-interface-renderer.js
  -> action results are not surfaced
```

## Current proof surface

```txt
npm test
  -> tests/smoke.mjs
  -> verifies initial Entry to Play
  -> verifies apples exist

npm run build
  -> copies static application into dist
```

This does not prove failure, Outcome, Title, fresh New Game, reset, stale work rejection, first-frame parity, listener/RAF retirement or disposal.

## Required DOM-free fixtures

```txt
initial Play
  -> canonical fresh state and run A identity

Outcome -> Title -> Play
  -> run B identity
  -> canonical fresh state across every domain

Outcome -> Title -> New Game -> Start
  -> distinct run and epoch
  -> no predecessor state

candidate validation failure
  -> no partial graph or route commit
  -> prior committed run preserved

stale predecessor command/tick
  -> typed rejection
  -> no run-B mutation

repeated restart and dispose
  -> deterministic identity progression
  -> idempotent retirement
```

## Required browser fixtures

```txt
canvas, HTML and GameHost first-run identity parity
Outcome frame identity
Entry-after-exit identity
first fresh restart frame acknowledgement
no run-A frame after run-B epoch commit
one RAF chain after repeated restarts
one delegated listener after repeated restarts
page disposal blocks late callbacks
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
runtime-session fixture: unavailable / not run
fresh-run full-state fixture: unavailable / not run
candidate rollback fixture: unavailable / not run
stale work fixture: unavailable / not run
first-frame fixture: unavailable / not run
RAF/listener leak fixture: unavailable / not run
disposal fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No fresh New Game, restart, pause, lifecycle safety, first-frame coherence or resource-retirement claim is made.