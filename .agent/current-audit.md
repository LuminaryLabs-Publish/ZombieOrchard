# ZombieOrchard Current Audit

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Summary

`ZombieOrchard` is a standalone static browser orchard survival/economy shell with a compact kit runtime, generated interface domains, game-domain kits, a canvas renderer, an HTML renderer, and a minimal smoke harness.

The repo is not missing a route, game factory, static build command, command router, or first playable loop. The current blocker is still narrower: Market/Exchange needs a source-owned result path, nested command-result retention, exchange-specific render projection, renderer readback, GameHost diagnostics, and a DOM-free fixture.

This pass keeps runtime code unchanged and updates repo-local docs plus central tracking around the next implementation ledge.

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
-> runtime ticks pressure-field and active-session
-> engine.snapshot()
-> world-canvas renders orchard snapshot
-> html-interface-renderer renders active HUD or active screen panel
-> data-action clicks route through interface-composition.activate
-> data-command clicks route directly to active-session
-> nested action.command can call ctx.engine.command(...)
-> nested result is discarded
-> exchange screen renders as a generic scoped-interface screen
-> window.GameHost exposes engine/getState/tick
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

## Services in use

```txt
install kits
register domains
route commands
return command results
tick domains
emit events
aggregate snapshots
render world canvas
render active-session HUD
render generic screen panels
transition interface screens
activate selected interface action
dispatch nested interface commands
add/pay/check resources
adjust pressure
create orchard trees and apples
collect apples near player
build catalog items
hire roster actors
equip inventory
move player
collect apples
clear rows
advance day/night phase
expose GameHost engine/getState/tick
run minimal smoke from createOrchardGame
```

## Kits in use

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

## Current blocker

`engine.command()` returns command results, but `interface-composition.activate` does not preserve nested `ctx.engine.command(...)` results.

That means a Market action that dispatches a nested command cannot yet be replayed, surfaced as `snapshot["interface-composition"].lastResult`, consumed by the Exchange renderer, or exposed through GameHost diagnostics.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Consumer + Exchange Projection Fixture Gate
```

## Do not start with

```txt
runtime replacement
canvas renderer rewrite
CSS redesign
new orchard art
new enemy types
new worker AI
save/load system
larger economy expansion
phase authority rewrite
```

Start with source-owned Market command/result records and a DOM-free fixture that proves nested result retention without browser APIs.
