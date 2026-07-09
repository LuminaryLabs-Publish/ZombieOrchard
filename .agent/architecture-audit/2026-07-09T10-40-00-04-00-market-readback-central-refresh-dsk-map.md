# ZombieOrchard Architecture Audit — Market Readback Central Refresh

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Scope

Documentation-only architecture breakdown for `LuminaryLabs-Publish/ZombieOrchard`.

Runtime source remains unchanged.

## Product shape

`ZombieOrchard` is a static browser orchard survival/economy shell built from small local domain kits.

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> canvas renderer + HTML interface renderer
```

## Interaction loop

```txt
open route
  -> boot imports start
  -> start creates engine, canvas renderer, HTML renderer, and frame loop
  -> game factory installs runtime, interface, game, and composition kits
  -> requestAnimationFrame calls engine.tick(1 / 60)
  -> engine ticks tickable domains
  -> engine.snapshot aggregates domain snapshots
  -> world-canvas consumes world/session snapshots
  -> html-interface-renderer consumes interface/session/resource snapshots
  -> data-action dispatches interface-composition.activate
  -> active screen domain returns an action descriptor
  -> optional nested action.command executes through engine.command
  -> nested result is discarded
  -> optional transition changes active screen
  -> data-command dispatches active-session commands directly
  -> GameHost exposes engine/getState/tick
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
```

## Services that current kits offer

```txt
kit-runtime:
  addKit
  command(domainId, type, payload)
  tick(delta)
  snapshot()
  subscribe(listener)

interface domain kits:
  screen snapshot
  activate(actionId)
  action descriptor return

interface-composition-kit:
  transition
  back
  activate active screen action
  dispatch nested command
  expose active/previous/activeSnapshot

resource-ledger-kit:
  resource values
  add/pay helpers
  affordability checks

pressure-field-kit:
  pressure channel tick/update

orchard-world-kit:
  orchard state
  player movement
  apple/pest interaction

construction-runtime-kit:
  build catalog
  built object state
  resource payment

roster-runtime-kit:
  roster actors
  hire action

inventory-runtime-kit:
  inventory items
  equip/own state

active-session-domain-kit:
  collect
  clear
  next-phase
  player/day/phase/message/score state

world-canvas-render-kit:
  snapshot-to-canvas orchard draw

html-interface-render-kit:
  active-session HUD
  generic screen panel
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

## Next-cut proof kits

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

## Finding

The architecture already has the correct place for a result-first Market proof cut. `createKitRuntime().command()` returns command results, but `interface-composition.activate` drops the nested command result and the renderer has no Exchange-specific readback branch.

## Recommended next ledge

```txt
ZombieOrchard Market Readback Central Refresh + Exchange Result Fixture Gate
```

Stop when Market fixture rows prove accepted, rejected, no-mutation, transaction, nested-result retention, render readback, and GameHost diagnostic behavior without DOM or canvas.
