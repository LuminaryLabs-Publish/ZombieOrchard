# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T10-00-37-04-00`.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> engine.snapshot()
  -> world canvas renders orchard state
  -> HTML renderer renders active-session HUD or generic interface screen
  -> data-action routes through interface-composition.activate
  -> optional nested action.command dispatches through engine.command(...)
  -> engine.command returns command result
  -> nested result is dropped by interface-composition
  -> Exchange/Market remains generic Back-only screen
  -> GameHost exposes raw engine/getState/tick only
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
gamehost-diagnostics
interface-screen-state
interface-composition
data-action-routing
data-command-routing
entry-domain
session-select-domain
run-setup-domain
active-session-domain
interrupt-domain
construction-domain
exchange-domain
roster-domain
inventory-domain
knowledge-domain
preferences-domain
outcome-domain
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
exchange-market-placeholder
market-action-catalog-next
market-command-envelope-next
market-preflight-next
market-result-ledger-next
market-projection-next
market-gamehost-diagnostics-next
central-ledger-readback
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
static-build-copy-kit
```

## Services offered by kits

- `kit-runtime`: kit registration, command routing, tick routing, snapshot aggregation, event dispatch.
- Domain kits: entry, session select, run setup, active session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome state and command surfaces.
- `interface-composition-kit`: screen state, transition/back/activate, nested command dispatch.
- Runtime kits: resources, pressure, orchard world, construction, roster, inventory state updates.
- Render kits: world canvas and HTML interface rendering.
- `game-host-diagnostics-kit`: raw `engine/getState/tick` diagnostics.

## Current finding

The runtime command boundary is ahead of the interface boundary. `engine.command()` returns useful command results, but `interface-composition` drops nested `action.command` results. Market cannot have durable projection/readback until that seam is fixed.

## What not to do next

Do not start with runtime rewrite, renderer rewrite, economy expansion, new Market art, generic visual polish, or new content.
