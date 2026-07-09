# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T02-05-52-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Change type:** documentation-only internal audit

**Runtime source changed:** no

## Goal

Compare the current `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, refresh repo-local `.agent/` docs, and log the central ledger update.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared sampled Publish repos against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read repo-local `.agent/START_HERE.md`.
- [x] Read central `repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md`.
- [x] Read `src/start.js`.
- [x] Read `src/game.js`.
- [x] Read `src/kits/runtime.js`.
- [x] Read `src/kits/composition.js`.
- [x] Read `src/kits/scoped-interface-domains.js`.
- [x] Read `src/kits/game-domains.js`.
- [x] Read `src/renderer/html-interface-renderer.js`.
- [x] Identified the current interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Created timestamped architecture audit.
- [x] Created timestamped render audit.
- [x] Created timestamped gameplay audit.
- [x] Created timestamped market-authority audit.
- [x] Created timestamped deploy audit.
- [x] Created timestamped turn-ledger entry.
- [x] Refreshed required root `.agent` docs.
- [x] Refreshed `.agent/kit-registry.json`.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed only to `main`.

## Selection result

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent/START_HERE.md`, or otherwise undocumented.

`ZombieOrchard` was selected by fallback because the central ledger showed it as the oldest eligible checked repo after the latest catch-up pass.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       selected / oldest eligible central latest 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest 2026-07-09T01-40-49-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-20-59-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T00-09-22-04-00
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
  -> kit runtime ticks pressure-field and active-session
  -> engine.snapshot() aggregates every domain snapshot
  -> world-canvas renders orchard-world / active-session / construction / roster snapshots
  -> html-interface-renderer renders active-session HUD or generic active screen
  -> click[data-action] calls engine.command("interface-composition", "activate", { actionId })
  -> click[data-command] calls engine.command("active-session", command)
  -> interface-composition activate can call ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})
  -> nested command result is discarded
  -> interface-composition snapshot only returns active, previous, and activeSnapshot
  -> window.GameHost exposes engine/getState/tick
```

## Domains in use

### Runtime / shell domains

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
smoke-harness
```

### Interface domains

```txt
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
```

### Game domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
world-canvas
```

### Market authority domains needed next

```txt
market-action-id-catalog
market-command-source-manifest
market-command-envelope
market-source-snapshot
market-price-source
market-capacity-policy
market-preflight
market-command-result
market-rejection-reason-catalog
market-command-journal
market-result-journal
resource-transaction-history
inventory-purchase-intake
interface-nested-result-adapter
market-result-projection
market-render-readback
market-gamehost-diagnostics
market-fixture-replay
```

## Services the kits offer

### Current services

```txt
install kits
register domains
route commands
return command results
tick domains
emit events
aggregate snapshots
publish subscriptions
render orchard canvas from snapshots
render active-session HUD and generic active screens from snapshots
transition interface screens
activate selected interface actions
dispatch nested screen commands
store resource values
check affordability
add resources
pay resources
track pressure channels
generate trees and random apples
collect nearby apples
build catalog items with resource payment
hire roster actors with resource payment
equip inventory items
move player
collect apples
clear pests
advance day/night phase
expose engine/getState/tick through GameHost
run minimal DOM-free smoke
```

### Needed next services

```txt
define stable Market action ids
normalize Market actions into envelopes
snapshot resource/inventory/price/capacity state before command
preflight accepted and rejected Market commands
return stable MarketCommandResult rows
prove rejected commands do not mutate resources or inventory
append command journal rows
append result journal rows
append transaction records
retain nested command results through interface-composition
project last nested result into interface-composition snapshot
project Market state and result rows for the HTML renderer
record renderer readback rows
expose fixture-readable Market diagnostics through GameHost
prove DOM-free Market fixture replay
```

## Kits

### Implemented / source-backed kits

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

### Next-cut kits

```txt
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
```

## Main finding

The runtime does not need replacement. `createKitRuntime().command()` already returns domain command results, and the browser loop already exposes a stable `GameHost` shape. The blocker is that `interface-composition` discards nested command results and snapshots do not expose any `lastResult`, so Market commands cannot be verified by DOM-free fixtures or consumed by the exchange renderer yet.

## Next safe ledge

```txt
ZombieOrchard Market Result Readback Fixture + Exchange Projection Consumer Gate
```

Stop this ledge when accepted/rejected Market rows prove command envelopes, before/after source snapshots, no-mutation rejection, resource transaction history, nested result retention, exchange renderer projection/readback, and GameHost market diagnostics without DOM, canvas, browser state, or wider economy changes.

## Validation status

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
