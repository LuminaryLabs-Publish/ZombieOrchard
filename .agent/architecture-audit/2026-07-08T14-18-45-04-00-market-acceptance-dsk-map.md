# ZombieOrchard Market Acceptance DSK Map

**Timestamp:** `2026-07-08T14-18-45-04-00`

## Goal

Map the current DSK/domain layout and the next Market authority split so implementation can proceed without rewriting the static orchard route.

## Current route and host domains

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> window.GameHost.engine/getState/tick
```

## Current domains in use

```txt
runtime:
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

interface:
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

game:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas
```

## Current implemented kits

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

## Services currently offered

```txt
kit-runtime:
  install kit, register domain, route command, tick domain, emit event, aggregate snapshot, notify subscriber

interface domains:
  expose active screen state, actions, fields, metadata, activation results

interface-composition:
  transition, back, activate active screen action, dispatch nested action.command, expose active/previous/activeSnapshot

resource-ledger:
  values, canPay, pay, add

pressure-field:
  rowPressure/curse channels, adjust api, pressure tick

orchard-world:
  tree grid, apple seeding, nearest apple collection, reseed, bounds

construction-runtime:
  build catalog item by paying cost, append built item, message

roster-runtime:
  hire actor by paying money, append actor, message

inventory-runtime:
  equip item and expose items/equipped

active-session:
  move, collect, clear, next-phase, tick pests, track score/condition/end state

renderers:
  draw world canvas from snapshot and HTML UI from snapshot
```

## Target Market authority split

```txt
market-action-id-catalog-kit:
  owns sell/buy/back action IDs and command type ids

market-source-snapshot-kit:
  reads resource, inventory, price, capacity, and active-screen state into serializable MarketSourceSnapshot

market-price-source-kit:
  owns deterministic price rows

market-capacity-policy-kit:
  owns capacity rows and capacity rejection rules

market-command-envelope-kit:
  normalizes action id, quantity, source id, timestamp/frame, active screen, and actor id

market-preflight-kit:
  returns stable accepted/rejected preflight with reason catalog

market-command-result-kit:
  returns accepted/rejected MarketCommandResult with before/after/mutation summary

market-command-journal-kit:
  appends every command attempt

market-result-journal-kit:
  appends every accepted/rejected result

resource-transaction-history-kit:
  records provenance for money/apples/tool/resource changes

inventory-purchase-intake-kit:
  appends purchased items while preserving items/equipped compatibility

nested-command-result-propagation-kit:
  makes interface-composition return and snapshot nested command result

market-result-projection-kit:
  converts source/result/journal state into renderer rows

market-render-readback-kit:
  proves renderer consumed MarketResultProjection and did not own authority

market-fixture-replay-kit:
  runs DOM-free accepted/rejected/no-mutation/projection/readback cases
```

## Boundary rule

Market authority should live beside the current game-domain kits, not inside the HTML renderer and not inside generic interface screen state.

The renderer may consume `MarketResultProjection`, but it must not own price rows, capacity rows, rejection reasons, resource mutation, inventory intake, or transaction history.

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Ledger + Exchange Renderer Readback Fixture Gate
```
