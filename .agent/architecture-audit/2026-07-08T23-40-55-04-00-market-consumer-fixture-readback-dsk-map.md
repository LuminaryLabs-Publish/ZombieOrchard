# ZombieOrchard Market Consumer Fixture Readback DSK Map

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Scope

This audit maps the current DSK/domain shape and the next Market authority slice.

Runtime source was not changed.

## Current source-backed architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> resource-ledger-kit
  -> pressure-field-kit
  -> orchard-world-kit
  -> construction-runtime-kit
  -> roster-runtime-kit
  -> inventory-runtime-kit
  -> generated interface domain kits
  -> active-session-domain-kit
  -> interface-composition-kit
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> window.GameHost
```

## Current domains

```txt
static-browser-host:
  index.html static host.

boot-module:
  src/boot.js imports src/start.js.

runtime-entrypoint:
  src/start.js creates engine, renderers, frame loop, and GameHost.

kit-runtime:
  createKitRuntime installs domains, routes commands, ticks domains, emits events, aggregates snapshots, and notifies subscribers.

interface-domain-family:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome.

interface-composition:
  owns active screen, previous screen, transition, back, activate, nested command dispatch, and activeSnapshot projection.

resource-ledger:
  owns resource values, canPay, pay, add, and simple mutation label.

pressure-field:
  owns rowPressure and curse channels.

orchard-world:
  owns tree rows, random apple seeding, collectNear, and bounds.

construction-runtime:
  owns catalog, built list, construction payment, and build messages.

roster-runtime:
  owns actors, roles, hire payment, and roster messages.

inventory-runtime:
  owns items and equipped item.

active-session:
  owns player movement, collect, clear, phase changes, pest movement, condition, score, message, run ending, and active-session action rows.

world-canvas-render:
  consumes snapshots and draws the orchard field.

html-interface-render:
  consumes snapshots and renders active HUD or generic screen panel.

GameHost:
  exposes engine, getState, and tick for external readback.
```

## Current service map

```txt
createKitRuntime:
  addKit
  command
  tick
  snapshot
  subscribe
  ctx.emit

createScopedInterfaceDomainKit:
  select
  set-field
  activate
  snapshot action rows

createInterfaceCompositionKit:
  transition
  back
  activate current action
  dispatch nested command
  auto outcome route
  snapshot active screen

createResourceLedgerKit:
  canPay
  pay
  add
  command add/pay
  snapshot values

createPressureFieldKit:
  adjust
  tick pressure
  snapshot channels

createOrchardWorldKit:
  seed apples
  collectNear
  snapshot world

createConstructionRuntimeKit:
  build catalog item
  pay resource cost
  append built item

createRosterRuntimeKit:
  hire actor
  pay money cost
  append actor

createInventoryRuntimeKit:
  equip item
  snapshot items/equipped

createActiveSessionDomainKit:
  activate action
  move
  collect
  clear
  next-phase
  tick pests and run failure
  snapshot session

createHtmlInterfaceRenderer:
  route data-action to interface-composition
  route data-command to active-session
  render HUD
  render generic screens

createWorldCanvas:
  render orchard snapshot to canvas
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

## Next-cut kits

```txt
market-action-id-catalog-kit:
  owns sell/buy/back action ids and command ids.

market-command-source-manifest-kit:
  owns action rows, command rows, reason rows, price rows, and capacity rows.

market-command-envelope-kit:
  normalizes action/command payloads into fixture-readable command envelopes.

market-source-snapshot-kit:
  captures before/after resources, inventory, price rows, capacity rows, and active action ids.

market-price-source-kit:
  owns deterministic sell/buy prices.

market-capacity-policy-kit:
  owns inventory capacity and available slot calculation.

market-preflight-kit:
  returns accepted/rejected preflight with stable reasons and expected mutation summary.

market-command-result-kit:
  returns accepted/rejected MarketCommandResult records.

market-rejection-reason-catalog-kit:
  owns stable reason strings.

market-command-journal-kit:
  appends command rows.

market-result-journal-kit:
  appends result rows.

resource-transaction-history-kit:
  records resource deltas for accepted Market commands.

inventory-purchase-intake-kit:
  owns accepted purchase insertion and capacity rejection.

interface-nested-result-adapter-kit:
  carries nested command results through interface-composition and snapshot.lastResult.

market-result-projection-kit:
  produces exchange renderer rows.

market-render-readback-kit:
  proves the renderer consumed projection rows without owning prices/capacity/mutation.

market-gamehost-diagnostics-kit:
  projects source manifest, last result, journals, projection, and readback additively.

market-fixture-replay-kit:
  runs DOM-free accepted/rejected/replay rows.
```

## Architecture rule

`interface-composition`, `html-interface-renderer`, and `GameHost` must become Market consumers only.

They should not compute Market prices, capacity, mutation summaries, or transaction records.

## Next ledge

```txt
ZombieOrchard Market Consumer Fixture Readback + Central Ledger Sync Gate
```
