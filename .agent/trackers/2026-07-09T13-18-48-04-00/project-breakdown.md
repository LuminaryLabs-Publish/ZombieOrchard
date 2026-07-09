# Project Breakdown: ZombieOrchard

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repository list against central tracking, select one eligible repo, update root `.agent` documentation, identify loop/domains/services/kits, and sync the central LuminaryLabs ledger.

**Checklist**

```txt
[x] Read accessible LuminaryLabs-Publish repo list.
[x] Excluded TheCavalryOfRome.
[x] Compared checked repos against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Sampled repo-local .agent state.
[x] Selected one repo only: ZombieOrchard.
[x] Read package scripts.
[x] Read start/game/runtime/composition/interface/game-domain/render files.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented and target kits.
[x] Updated root .agent docs.
[x] Added architecture, render, gameplay, interaction, market-authority, and deploy audits.
[x] Added timestamped tracker and turn ledger.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Did not edit runtime source.
[ ] Did not run local/browser validation.
```

## Repo selected

```txt
LuminaryLabs-Publish/ZombieOrchard
```

## Selection note

No checked non-Cavalry Publish repo was fully new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`ZombieOrchard` was selected because its repo-local Market result/readback docs had advanced beyond the central ledger. The central ledger still pointed at `2026-07-09T10-40-00-04-00` before this catch-up pass.

## Publish repos observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        selected / central-ledger catch-up target
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
```

## Interaction loop

```txt
open index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame, createWorldCanvas, and createHtmlInterfaceRenderer
  -> src/game.js installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition kits
  -> requestAnimationFrame calls engine.tick(1 / 60)
  -> tickable domains update pressure and active-session state
  -> engine.snapshot aggregates every domain snapshot
  -> world-canvas renders orchard state from snapshots
  -> html-interface-renderer renders active-session HUD or a generic interface screen
  -> click[data-action] routes to interface-composition.activate
  -> click[data-command] routes directly to active-session commands
  -> scoped interface domains return action descriptors for selected screen actions
  -> nested action.command can run through ctx.engine.command
  -> nested command result is currently discarded
  -> interface-composition snapshot does not expose lastResult
  -> exchange screen currently falls through to generic screen rendering and only exposes Back
  -> window.GameHost exposes engine, getState, and tick
```

## Domains in use

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
event-emitter
tick-dispatcher
snapshot-aggregator
subscription-bus
browser-animation-loop
GameHost
entry
session-select
run-setup
active-session
interrupt
construction
exchange
roster
inventory
knowledge
preferences
outcome
interface-composition
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas
html-interface-renderer
smoke-harness
repo-local-agent-ledger
central-ledger-readback
```

## Kit services

```txt
kit-runtime:
  install kits, register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, and notify subscribers.

scoped-interface-domain-kit:
  expose screen state, actions, field mutation, action activation, and snapshots.

interface-composition-kit:
  manage active/previous screens, transitions, back, current-screen activation, nested command dispatch, outcome auto-route, and active screen snapshot.

resource-ledger-kit:
  store resources, canPay, pay, add, add/pay commands, and snapshots.

pressure-field-kit:
  store/tick pressure channels and expose adjust command.

orchard-world-kit:
  generate trees/apples, collect nearby apples, reseed apples, and expose world snapshot.

construction-runtime-kit:
  pay construction costs, append built structures, and expose construction snapshot.

roster-runtime-kit:
  pay hire costs, append actors, and expose roster snapshot.

inventory-runtime-kit:
  equip items and expose inventory snapshot.

active-session-domain-kit:
  move, collect, clear, advance phase, spawn/chase pests, end session, and expose session snapshot.

world-canvas-render-kit:
  render trees, apples, pests, and player.

html-interface-render-kit:
  render HUD/screens and route DOM actions/commands.
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
```

## Target next kits

```txt
market-action-catalog-kit
market-action-id-catalog-kit
market-command-source-manifest-kit
market-command-envelope-kit
market-source-snapshot-kit
market-price-source-kit
market-capacity-policy-kit
market-preflight-kit
market-command-result-kit
market-rejection-reason-catalog-kit
market-command-journal-kit
market-result-journal-kit
resource-transaction-history-kit
inventory-purchase-intake-kit
interface-nested-result-adapter-kit
market-result-projection-kit
market-render-readback-kit
market-gamehost-diagnostics-kit
market-fixture-replay-kit
central-ledger-readback-kit
```

## Main finding

`ZombieOrchard` should not get broad economy expansion, save/load, worker automation, or visual polish next. The source architecture is adequate for the current playable shell, but the Exchange/Market seam lacks stable source actions, accepted/rejected result records, nested-result retention, renderer readback, GameHost diagnostics, and fixture rows.

## Next safe ledge

```txt
ZombieOrchard Market Result Central Ledger Sync + Exchange Fixture Gate
```

## Files updated this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T13-18-48-04-00-market-result-central-ledger-sync-dsk-map.md
.agent/render-audit/2026-07-09T13-18-48-04-00-exchange-result-render-readback-map.md
.agent/gameplay-audit/2026-07-09T13-18-48-04-00-market-command-result-loop.md
.agent/interaction-audit/2026-07-09T13-18-48-04-00-data-action-nested-result-map.md
.agent/market-authority-audit/2026-07-09T13-18-48-04-00-nested-result-fixture-ledger-contract.md
.agent/deploy-audit/2026-07-09T13-18-48-04-00-market-fixture-check-build-map.md
.agent/trackers/2026-07-09T13-18-48-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T13-18-48-04-00.md
```

## Validation

```txt
runtime source changed: no
local npm test: not run
local npm run build: not run
browser smoke: not run
branch created: no
pull request created: no
```
