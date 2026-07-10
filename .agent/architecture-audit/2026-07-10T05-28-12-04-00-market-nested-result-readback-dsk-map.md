# Architecture Audit: Market Nested Result Readback DSK Map

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Architecture read

`ZombieOrchard` is a compact DSK-composed browser game.

The architecture is sound enough to extend:

```txt
createKitRuntime
  -> domain registry
  -> command router
  -> tick dispatcher
  -> snapshot aggregator
  -> interface composition
  -> game-domain kits
  -> render consumers
```

The current gap is not the runtime. It is a missing source-owned Market layer and a dropped nested command result.

## DSK/domain flow

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> resource-ledger / pressure-field / orchard-world / construction-runtime / roster-runtime / inventory-runtime
  -> scoped interface domains from orchardPreset.interface
  -> active-session-domain-kit
  -> interface-composition-kit
  -> html-interface-renderer click handler
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen returns action descriptor
  -> optional action.command executes through ctx.engine.command(...)
  -> result is dropped
  -> transition or Back updates active screen
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
```

## Next DSK domains

```txt
market-action-catalog
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
central-ledger-readback
```

## Services currently offered by kits

```txt
runtime: registration, command dispatch, tick, events, snapshots, subscriptions
interface domains: screen actions and activation descriptors
interface composition: active screen, transitions, back, nested command dispatch
resource ledger: add/pay/canPay and value snapshots
pressure field: drifting row pressure and curse channels
orchard world: trees, apples, nearest collection
construction runtime: build by paying resources
roster runtime: hire by paying resources
inventory runtime: equip and item snapshots
active session: movement, collect, clear, phase, pests, score, end state
world canvas: orchard visual projection
html renderer: HUD/generic screen projection and click routing
smoke fixture: minimal entry/play/apple proof
```

## Main architecture finding

`ctx.engine.command(...)` already returns results. Therefore the correct architecture slice is to preserve the runtime and add source/result/readback rows around Market actions.

The direct fix path is:

```txt
Market catalog
  -> command envelope
  -> preflight
  -> command result
  -> transaction/intake rows
  -> nested-result adapter
  -> Exchange projection
  -> renderer readback
  -> GameHost diagnostics
  -> fixture replay
```
