# ZombieOrchard Current Audit

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Summary

`ZombieOrchard` remains a standalone static browser orchard survival/economy shell with a compact kit runtime, scoped interface domains, game-domain kits, a canvas renderer, an HTML renderer, `window.GameHost`, static build scripts, and a minimal smoke harness.

The repo is not missing a route, game factory, static build command, command router, first playable loop, world renderer, UI renderer, or smoke script.

The durable blocker is still the Exchange/Market path:

```txt
source-owned Market actions
command/result ledgers
nested command-result retention
Exchange projection/readback
GameHost Market diagnostics
DOM-free fixture proof
central ledger parity
```

## Current interaction loop

```txt
index.html -> src/boot.js -> src/start.js -> createOrchardGame() -> createWorldCanvas + createHtmlInterfaceRenderer -> requestAnimationFrame(draw) -> engine.tick(1 / 60) -> engine.snapshot() -> world-canvas render -> html-interface-renderer render -> data-action/data-command routing -> GameHost
```

Expanded loop:

```txt
[data-action] click
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen domain returns action descriptor
  -> optional nested action.command runs through ctx.engine.command(...)
  -> nested result is discarded
  -> optional transition moves active screen

[data-command] click
  -> engine.command("active-session", command)
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

## Current kit services

```txt
- createKitRuntime registers domains, routes commands, returns results, ticks domains, emits events, aggregates snapshots, and notifies subscribers.
- scoped interface domains expose screen descriptors, actions, activation descriptors, and snapshots.
- interface-composition routes transitions/back, activates active screens, dispatches nested commands, auto-routes outcome, and exposes activeSnapshot.
- resource-ledger stores resources, affordability helpers, add/pay commands, and snapshots.
- pressure-field tracks rowPressure/curse drift.
- orchard-world generates orchard state.
- construction-runtime builds catalog items by paying resources.
- roster-runtime and inventory-runtime expose actors/items/equipped state.
- active-session handles movement, collection, clearing, phase advance, pests, session end, and HUD actions.
- world-canvas renders orchard state from snapshots.
- html-interface-renderer renders active-session HUD and generic screens, and routes data-action/data-command clicks.
```

## Main finding

`engine.command()` already returns command results, so the runtime should not be replaced. The missing consumer boundary is inside Market/Exchange: `interface-composition` discards nested command results, `exchange` has no source-owned Market action catalog beyond Back, `html-interface-renderer` has no Exchange projection/readback branch, and `GameHost` has no Market diagnostics.

## Recommended next ledge

```txt
ZombieOrchard Market Nested Result Readback Refresh + Exchange Fixture Gate
```
