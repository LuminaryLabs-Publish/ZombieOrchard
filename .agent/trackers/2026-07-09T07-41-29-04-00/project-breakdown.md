# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Goal

Break down `LuminaryLabs-Publish/ZombieOrchard`, refresh repo-local `.agent` docs, and sync central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repo list.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared against central repo ledger in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Sampled root `.agent/START_HERE.md` state.
- [x] Selected one repo only: `ZombieOrchard`.
- [x] Read repo source and existing `.agent` docs.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified current and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture, render, gameplay, market-authority, deploy, tracker, and turn-ledger entries.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed directly to `main`.

## Selection result

```txt
LuminaryLabs-Publish/ZombieOrchard
```

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`ZombieOrchard` was selected as the oldest eligible central-ledger fallback and catch-up target. Central tracking still pointed to `2026-07-09T05-11-22-04-00`, while repo-local docs already pointed to `2026-07-09T07-30-48-04-00`.

## Publish organization comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central latest 2026-07-09T05-11-22-04-00 / repo-local latest 2026-07-09T07-30-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> data-action routes through interface-composition.activate
  -> data-command routes directly to active-session
  -> scoped interface domains return selected action descriptors
  -> nested action.command can dispatch through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> exchange screen has no Market-specific projection/readback branch
  -> window.GameHost exposes engine/getState/tick
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
html-interface-renderer
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas
smoke-harness
market-authority-next
market-result-ledger-next
market-render-readback-next
market-fixture-next
central-ledger-sync
```

## Services that kits offer

```txt
kit-runtime:
  install kits
  register domains
  route commands
  return command results
  tick domains
  emit events
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit:
  create interface domain state
  normalize actions
  select action index
  set field value
  activate selected action
  emit selected/field/action events
  snapshot screen state and actions

interface-composition-kit:
  move between interface domains
  route activate to active screen
  dispatch nested commands
  snapshot active/previous/current active screen

resource-ledger-kit:
  canPay
  pay
  add
  snapshot resource values

pressure-field-kit:
  adjust pressure channels
  tick row pressure / curse
  snapshot channels

orchard-world-kit:
  seed trees
  seed apples
  collect apple near player
  snapshot world bounds / trees / apples

construction-runtime-kit:
  build catalog item
  pay resource cost
  snapshot built structures

roster-runtime-kit:
  hire actor
  pay resource cost
  snapshot roster actors

inventory-runtime-kit:
  equip item
  snapshot items/equipped

active-session-domain-kit:
  activate session action
  move player
  collect apple
  clear pest
  advance phase
  tick pests/player condition
  snapshot session/actions

render kits:
  render world canvas from snapshots
  render active-session HUD
  render generic interface screens
```

## Kits identified

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

## Next-cut kits

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

The runtime should not be replaced. `engine.command()` already returns a result channel, and most game-domain commands already report accepted/rejected outcomes.

The missing boundary is Market result readback. `interface-composition.activate` drops nested command results, `exchange` has no source-owned Market catalog beyond Back, `html-interface-renderer` has no Exchange-specific projection/readback branch, and `GameHost` has no Market diagnostics.

## Files updated

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T07-41-29-04-00-market-result-central-ledger-sync-dsk-map.md
.agent/render-audit/2026-07-09T07-41-29-04-00-exchange-render-result-readback.md
.agent/gameplay-audit/2026-07-09T07-41-29-04-00-market-transaction-nested-result-loop.md
.agent/market-authority-audit/2026-07-09T07-41-29-04-00-market-result-ledger-central-sync-contract.md
.agent/deploy-audit/2026-07-09T07-41-29-04-00-market-result-fixture-build-gate.md
.agent/trackers/2026-07-09T07-41-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T07-41-29-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
pushed to main: yes
```

## Next safe ledge

```txt
ZombieOrchard Market Result Ledger Central Sync + Exchange Transaction Fixture Gate
```

Stop that ledge when accepted, rejected, unchanged, transaction, nested-result, projection, readback, and GameHost rows are proven without DOM, canvas, browser state, renderer rewrite, or wider economy expansion.
