# ZombieOrchard Current Audit

**Timestamp:** `2026-07-09T16-38-14-04-00`

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

This pass keeps runtime code unchanged and refreshes repo-local docs from `2026-07-09T16-34-14-04-00` to `2026-07-09T16-38-14-04-00`.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> [data-action] routes through interface-composition.activate
  -> scoped interface domain returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> next action.to or transition table moves active screen
  -> [data-command] routes directly to active-session
  -> Exchange/Market remains a generic screen with Back only
  -> window.GameHost exposes engine, getState, and tick
```

## Input routing

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

## Kit services in the current runtime

```txt
- createKitRuntime registers domains, routes commands, returns results, ticks domains, emits events, aggregates snapshots, and notifies subscribers.
- scoped interface domains expose screen descriptors, actions, activation descriptors, and snapshots.
- interface-composition routes transitions/back, activates the active screen, dispatches nested commands, auto-routes outcome, and exposes activeSnapshot.
- resource-ledger stores resources, affordability helpers, add/pay commands, and snapshots.
- pressure-field tracks rowPressure/curse and pressure drift.
- orchard-world generates trees/apples, supports apple collection, and exposes world bounds/state.
- construction-runtime builds catalog items by paying resources.
- roster-runtime tracks/hire actors.
- inventory-runtime tracks equipped item and item list.
- active-session handles movement, collection, clearing, phase advance, pests, session end, and HUD actions.
- world-canvas renders orchard state from snapshots.
- html-interface-renderer renders active-session HUD and generic screen panels, and routes data-action/data-command clicks.
- tests/smoke.mjs covers entry -> play -> active-session plus apple existence.
```

## Services needed next

```txt
- stable Market action IDs and source-owned catalog rows
- Market command source manifest, envelope, before/after source snapshots, price and capacity policies
- Market preflight with stable rejection reasons
- accepted/rejected MarketCommandResult records with rejected no-mutation proof
- resource transaction history and inventory intake rows for accepted Market commands
- Market command/result journals
- interface nested-result retention without breaking activate/back/transition compatibility
- Exchange-specific projection and render readback in html-interface-renderer
- GameHost market diagnostics compatible with current engine/getState/tick
- DOM-free fixture for accepted sell, accepted buy, rejected insufficient resource, and rejected capacity rows
- central ledger parity update after fixture proof
```

## Main finding

`engine.command()` already returns command results, so the runtime should not be replaced. The missing consumer boundary is inside the Market/Exchange path: `interface-composition` discards nested command results, `exchange` has no source-owned Market action catalog beyond Back, `html-interface-renderer` has no Exchange projection/readback branch, and `GameHost` has no Market diagnostics.

## Recommended next ledge

```txt
ZombieOrchard Market Readback Ledger Catch-Up + Exchange Fixture Gate
```

Start with pure source/result/readback modules and fixture rows. Do not rewrite the engine, canvas renderer, HTML shell, or orchard economy before Market accepted/rejected rows are fixture-proven.
