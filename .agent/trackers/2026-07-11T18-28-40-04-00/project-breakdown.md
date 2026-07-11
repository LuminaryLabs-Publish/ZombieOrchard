# ZombieOrchard project breakdown

## Run timestamp

```txt
2026-07-11T18-28-40-04-00
```

## Summary

`ZombieOrchard` constructs one mutable engine graph at module boot and reuses it for Entry, New Game, Play, Pause, Outcome and Title routes. Route transitions do not create or reset a run. After failure, Title returns only the interface route to Entry; Play or New Game then points back at the same ended session, and the next tick automatically routes to Outcome again.

## Plan ledger

**Goal:** define one authoritative runtime and run instance boundary so Start, New Game, Outcome, Title, reset and disposal transfer ownership atomically and every first visible run frame proves fresh state.

- [x] Compare the full ten-repository `LuminaryLabs-Publish` inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` through the oldest eligible rule.
- [x] Read module boot, engine creation, route composition, gameplay domains, renderers and smoke proof.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Trace Play, New Game, Start, failure, Outcome, Title and re-entry behavior.
- [x] Define runtime instance, run instance, lifecycle, reset transaction and first-frame contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh required root `.agent` files.
- [x] Push documentation directly to `main` without a branch or pull request.
- [ ] Implement runtime-session authority and executable fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

ZombieOrchard      2026-07-11T17-01-11-04-00 selected
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
IntoTheMeadow      2026-07-11T17-30-56-04-00
PrehistoricRush    2026-07-11T17-39-47-04-00
MyCozyIsland       2026-07-11T17-50-37-04-00
TheOpenAbove       2026-07-11T18-01-38-04-00
HorrorCorridor     2026-07-11T18-11-21-04-00
PhantomCommand     2026-07-11T18-21-09-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is changed in the Publish organization.

## Interaction loop

```txt
module boot
  -> createOrchardGame()
  -> allocate one resource, pressure, orchard, construction,
     roster, inventory, active-session and composition graph
  -> seed 26 apples
  -> install one delegated UI listener
  -> start recursive RAF

Entry / New Game / Play
  -> interface-composition changes active route only
  -> no new graph, run or state factory

RAF
  -> engine.tick(1 / 60) regardless active route
  -> every tickable domain mutates
  -> composition observes active-session.ended
  -> world canvas renders the same graph
  -> HTML projects the current route

failure
  -> active-session.ended = true
  -> composition routes to Outcome

Outcome -> Title
  -> route becomes Entry
  -> gameplay graph remains ended and mutated

Entry -> Play or New Game -> Start
  -> route points to the same active-session
  -> next tick sees ended = true
  -> composition routes back to Outcome
```

## Domains in use

```txt
static browser boot and ESM module graph
runtime and run lifecycle: missing authority
kit registration and mutable domain graph
command, tick, event, snapshot, subscription and publication routing
fixed-step clock and callback ownership: missing authority
public capability and command transaction: missing authority
seeded random and replay: missing authority
versioned persistence: missing authority
12 interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard trees, apples, collection and refill
construction, roster and inventory state
active movement, phases, pests, damage, score and failure
canvas world rendering
HTML HUD and screen projection
GameHost diagnostics
smoke, static build and Pages deployment
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Kit services

| Kit group | Services |
|---|---|
| runtime | kit registration, domain construction, command dispatch, ticking, events, snapshots, subscriptions and publication |
| interface | screen state, action selection, fields, activation, route transitions, nested command dispatch and Outcome routing |
| game | resource affordability/payment/gain, pressure growth, orchard population, collection/refill, construction, hiring, equipment, movement, phase changes, pest pursuit, damage, score and failure |
| render | canvas world projection, HUD, screen HTML, delegated actions and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine exposure, snapshot readback, manual ticking, Entry-to-Play smoke, static copy and Pages deployment |

## Source-backed finding

### One graph is allocated before Play

`src/start.js` calls `createOrchardGame()` once at module boot. `src/game.js` constructs all mutable domains once and returns that graph.

### Routes are not lifecycle commands

`interface-composition-kit` stores only `active` and `previous`. `move(to)` changes those fields but does not create, reset, replace or dispose any gameplay domain.

### Ended state is latched inside the reused graph

`active-session-domain-kit` sets `ended = true` when player condition reaches zero. Its command handler does not expose a reset or new-run service.

### Outcome and Title do not retire the run

The Outcome `title` action routes to Entry. Entry `play`, Run Setup `start` and New Game routes all reuse the same graph.

### Automatic Outcome routing makes restart visibly fail

On every engine tick, composition reads `active-session.snapshot()`. If `ended` remains true and the route is not Outcome, it moves to Outcome. A post-failure Play therefore returns to Outcome on the next callback.

### Mutable state survives route changes

Resources, pressures, apples, pests, construction, roster, inventory, day, score and player condition remain in the same closures. The world canvas continues to render that state on every RAF regardless active route.

## Required parent domain

```txt
zombie-orchard-runtime-session-authority-domain
```

Candidate coordinating kits:

```txt
runtime-instance-id-kit
run-instance-id-kit
session-epoch-kit
lifecycle-state-machine-kit
fresh-run-state-factory-kit
run-start-command-kit
run-start-admission-kit
run-reset-plan-kit
run-reset-transaction-kit
run-state-commit-kit
route-session-binding-kit
run-end-latch-kit
title-exit-transaction-kit
stale-run-command-rejection-kit
run-snapshot-provenance-kit
first-run-frame-ack-kit
runtime-session-journal-kit
fresh-run-fixture-kit
restart-disposal-fixture-kit
```

## Required lifecycle

```txt
idle
  -> starting
  -> active
  -> paused
  -> ended
  -> resetting or exiting
  -> idle
  -> disposed
```

A new run must stage fresh domain state, advance `runId` and `sessionEpoch`, atomically replace the committed graph, invalidate predecessor commands/callbacks, bind the route to the new run and acknowledge the first frame before reporting success.

## Required proof

```txt
first Play starts a fresh run
New Game always creates fresh resources, world, session and secondary-domain state
Outcome -> Title retires the ended run
Title -> Play does not reuse ended state
Title -> New Game -> Start commits a distinct runId and epoch
predecessor callbacks and commands are rejected after reset
a failed reset leaves the prior committed run intact
canvas, HTML and GameHost cite the same runtimeId, runId, epoch and frame
repeated start/reset cycles do not accumulate RAF chains or listeners
disposal is ordered and idempotent
```

## Documentation output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-11T18-28-40-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T18-28-40-04-00.md
.agent/architecture-audit/2026-07-11T18-28-40-04-00-runtime-session-instance-authority-dsk-map.md
.agent/render-audit/2026-07-11T18-28-40-04-00-stale-run-first-frame-projection-gap.md
.agent/gameplay-audit/2026-07-11T18-28-40-04-00-outcome-title-play-reuse-loop.md
.agent/interaction-audit/2026-07-11T18-28-40-04-00-start-new-game-title-lifecycle-map.md
.agent/session-lifecycle-audit/2026-07-11T18-28-40-04-00-run-instance-reset-transaction-contract.md
.agent/deploy-audit/2026-07-11T18-28-40-04-00-fresh-run-lifecycle-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime source, dependencies, package scripts, rendering and deployment configuration are unchanged. Existing smoke proof covers only initial Entry to Play and apple presence; it does not prove fresh-run state, reset, route/run binding, stale callback rejection, first-frame parity or disposal.