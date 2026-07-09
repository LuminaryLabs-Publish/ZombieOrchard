# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Selection result

`LuminaryLabs-Publish/ZombieOrchard` was selected for this pass.

The full accessible `LuminaryLabs-Publish` installation repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger files. No checked non-Cavalry repo was new, absent from the ledger, missing sampled root `.agent` state, or otherwise undocumented. `LuminaryLabs-Publish/TheCavalryOfRome` remained excluded. `ZombieOrchard` was the oldest eligible documented fallback by central ledger recency among the checked repos.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T16-20-45-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central-ledger fallback / central latest observed 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T13-38-15-04-00
```

## Product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The current product is already a playable kit-composed shell: title/start routing, active orchard session, apple collection, pest clearing, day/night phase advance, construction, roster, inventory, codex/settings/outcome descriptor screens, canvas world rendering, HTML UI rendering, `window.GameHost`, static build, and a minimal smoke test.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> install resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime
  -> generate scoped interface domains from orchardPreset.interface
  -> install active-session-domain-kit
  -> install interface-composition-kit with initial entry screen
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> draw() requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> tick pressure-field and active-session
  -> engine.snapshot() aggregates all domain snapshots
  -> world-canvas renders trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> [data-action] click routes to interface-composition.activate
  -> scoped interface domain returns action descriptor
  -> interface-composition optionally dispatches nested action.command
  -> nested command result is currently discarded
  -> optional screen transition is applied
  -> [data-command] click routes directly to active-session
  -> window.GameHost exposes engine, getState(), and tick(dt)
```

## Domains in use

```txt
runtime/static-host
runtime/boot-module
runtime/start-entrypoint
runtime/game-factory
runtime/kit-runtime
runtime/domain-registry
runtime/command-router
runtime/event-emitter
runtime/tick-dispatcher
runtime/snapshot-aggregator
runtime/browser-animation-loop
runtime/GameHost
interface/entry
interface/session-select
interface/run-setup
interface/active-session
interface/interrupt
interface/construction
interface/exchange
interface/roster
interface/inventory
interface/knowledge
interface/preferences
interface/outcome
interface/interface-composition
game/resource-ledger
game/pressure-field
game/orchard-world
game/construction-runtime
game/roster-runtime
game/inventory-runtime
render/world-canvas
render/html-interface
validation/smoke-harness
agent/repo-local-ledger
agent/central-ledger-sync
```

## Services that the kits offer

```txt
kit-runtime:
  add kits, register domains, route commands, normalize missing-domain command results, tick domains, emit frame events, aggregate snapshots, notify subscribers.

scoped-interface-domain-kit:
  expose screen descriptors, selected index, fields, meta, actions, activate/select/set-field commands, and interface snapshots.

interface-composition-kit:
  move screens, go back, activate the current screen, dispatch nested action.command, auto-route outcome, and expose active screen snapshot.

resource-ledger-kit:
  store resources, test affordability, pay costs, add gains, route add/pay commands, and expose resource snapshot.

pressure-field-kit:
  store pressure channels, adjust channel values, tick row pressure/curse, and expose pressure snapshot.

orchard-world-kit:
  generate orchard tree rows, generate apples, collect nearest apple, reseed apples, and expose trees/apples/bounds snapshot.

construction-runtime-kit:
  consume resources for build commands, append built item rows, write build messages, and expose construction snapshot.

roster-runtime-kit:
  consume money for hire commands, append worker rows, write roster messages, and expose roster snapshot.

inventory-runtime-kit:
  equip items and expose inventory snapshot.

active-session-domain-kit:
  expose active-session actions, move player, collect apples, clear pests, advance day/night phase, spawn/chase pests, apply player damage, end the run, and expose session snapshot.

world-canvas-render-kit:
  draw background, trees, apples, pests, and player from snapshots.

html-interface-render-kit:
  route DOM clicks into engine commands, render active-session HUD, render generic screen panels, and render roster/inventory/build/outcome cards.
```

## Kits identified

### Implemented kits

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
game-host-diagnostics surface
smoke-fixture surface
```

### Next-cut kits

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

The engine and core shell are not the blocker. `createKitRuntime.command()` already returns command results, but the Exchange/Market path still lacks a source-owned action catalog, stable command envelopes, accepted/rejected result rows, no-mutation proof for rejected commands, transaction history, nested result retention in `interface-composition`, Exchange renderer projection/readback, and fixture-readable GameHost diagnostics.

## Recommended next ledge

```txt
ZombieOrchard Market Result Readback Ledger Refresh + Exchange Fixture Gate
```

Start by adding pure Market source/result/readback modules and fixture rows. Do not rewrite the runtime, canvas renderer, HTML shell, or broader economy before Market accepted/rejected command rows are proven.
