# ZombieOrchard Architecture Audit — Market Projection Result Ledger

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Architecture read

`ZombieOrchard` is a static browser app composed from small runtime kits.

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> createKitRuntime({ kits })
```

`start.js` owns the browser shell wiring. `game.js` owns kit composition. The runtime owns domain registration, command dispatch, tick, snapshot, and subscriptions.

## DSK / domain map

```txt
static-browser-host
  -> index.html
  -> #world canvas
  -> #ui-root HTML renderer

runtime-entrypoint
  -> boot.js
  -> start.js
  -> createOrchardGame()
  -> createWorldCanvas()
  -> createHtmlInterfaceRenderer()
  -> GameHost

kit-runtime
  -> createKitRuntime
  -> domains registry
  -> engine.command
  -> engine.tick
  -> engine.snapshot
  -> event emission

interface-domain-kits
  -> entry
  -> session-select
  -> run-setup
  -> active-session
  -> interrupt
  -> construction
  -> exchange
  -> roster
  -> inventory
  -> knowledge
  -> preferences
  -> outcome

interface-composition-kit
  -> active screen
  -> previous screen
  -> activate action
  -> transition/back
  -> nested action.command dispatch

simulation/game kits
  -> resource-ledger
  -> pressure-field
  -> orchard-world
  -> construction-runtime
  -> roster-runtime
  -> inventory-runtime
  -> active-session

render kits
  -> world-canvas-renderer
  -> html-interface-renderer
```

## Current services

```txt
kit registration
command routing
tick routing
snapshot aggregation
event dispatch
entry/session/run setup
screen activation
nested command dispatch
resource pay/add/canPay
pressure tick
apple collection
construction build
roster hire
inventory equip
active-session collect/clear/next-phase/move
canvas world drawing
HTML interface drawing
legacy GameHost state/tick
smoke reachability
```

## Architecture gap

The runtime command path is already result-capable:

```txt
engine.command(domainId, type, payload) -> result
```

But `interface-composition` does not keep the nested result from `action.command`.

```txt
if (action.command) ctx.engine.command(...)
return next ? move(next) : { accepted: true }
```

That means Market/Exchange actions cannot be audited by the UI, GameHost, or fixtures.

## Next architectural services

```txt
market-source-manifest
market-command-envelope
market-preflight
market-command-result
market-result-journal
resource-transaction-history
inventory-intake-ledger
nested-result-retention-adapter
exchange-market-projection
market-render-readback
GameHost.market diagnostics
DOM-free Market fixture
```

## Next safe ledge

```txt
ZombieOrchard Market Projection Result Ledger Refresh + GameHost Fixture Gate
```
