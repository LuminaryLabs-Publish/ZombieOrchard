# ZombieOrchard Architecture Audit: Market Result Readback Catch-up

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Architecture summary

`ZombieOrchard` is a kit-composed browser game shell with a compact runtime, generated scoped interface domains, game-domain kits, canvas rendering, HTML interface rendering, and a minimal smoke test.

The runtime has the right base shape. The Exchange/Market layer is the weak boundary.

## Current route

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> window.GameHost
```

## Current DSK map

```txt
static-browser-host
  service: load canvas and UI root
  source: index.html

boot-module
  service: load runtime entrypoint
  source: src/boot.js

runtime-entrypoint
  service: create game, renderer, UI, frame loop, GameHost
  source: src/start.js

game-factory
  service: install all kits into createKitRuntime
  source: src/game.js

kit-runtime
  service: register domains, route commands, return results, tick, snapshot, subscribe
  source: src/kits/runtime.js

scoped-interface-domain-kit
  service: convert preset screens into domains with actions and snapshots
  source: src/kits/scoped-interface-domains.js

interface-composition-kit
  service: active screen routing, transition/back, nested command dispatch
  gap: nested command result is discarded
  source: src/kits/composition.js

resource-ledger-kit
  service: resources, add/pay, affordability
  source: src/kits/game-domains.js

pressure-field-kit
  service: pressure and curse drift
  source: src/kits/game-domains.js

orchard-world-kit
  service: orchard/apples world state
  source: src/kits/game-domains.js

construction-runtime-kit
  service: build catalog items through resource payment
  source: src/kits/game-domains.js

roster-runtime-kit / inventory-runtime-kit
  service: actors/items/equipped snapshots
  source: src/kits/game-domains.js

active-session-domain-kit
  service: orchard gameplay session actions and tick
  source: src/kits/game-domains.js

world-canvas-render-kit
  service: canvas render from snapshots
  source: src/renderer/world-canvas.js

html-interface-render-kit
  service: active-session HUD and generic screen rendering
  gap: no Exchange-specific Market projection/readback branch
  source: src/renderer/html-interface-renderer.js
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
world-canvas-renderer
html-interface-renderer
market-action-catalog-next
market-command-source-manifest-next
market-command-envelope-next
market-source-snapshot-next
market-preflight-next
market-command-result-next
market-command-journal-next
market-result-journal-next
resource-transaction-history-next
inventory-purchase-intake-next
interface-nested-result-adapter-next
market-result-projection-next
market-render-readback-next
market-gamehost-diagnostics-next
market-fixture-replay-next
central-ledger-readback
```

## Services the kits offer

```txt
createKitRuntime:
  installs kits, routes commands, returns command results, ticks domains, emits events, aggregates snapshots.

scoped interface domains:
  provide title/description/actions, activation lookup, and screen snapshots.

interface composition:
  preserves active/previous screen state, moves between domains, dispatches nested action commands.

resource ledger:
  owns money/apples/wood/scrap values and payment helpers.

orchard game domains:
  own pressure, world apples, construction, roster, inventory, active-session gameplay.

render kits:
  project snapshots into canvas and HTML.
```

## Kits

Implemented:

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

Next-cut:

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

## Main architecture risk

The command runtime can return results, but Market-specific facts are not source-owned or retained through the UI route. This makes rejected/no-mutation rows, transactions, inventory intake, projection, and GameHost diagnostics unprovable.

## Required next proof

```txt
Market action catalog
  -> command envelope
  -> before source snapshot
  -> preflight
  -> accepted/rejected result
  -> mutation or no-mutation proof
  -> transaction/intake rows
  -> nested result retention
  -> Exchange render projection/readback
  -> GameHost market diagnostics
  -> DOM-free fixture
```
