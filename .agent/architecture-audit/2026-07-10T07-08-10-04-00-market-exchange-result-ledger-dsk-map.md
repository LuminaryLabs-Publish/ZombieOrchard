# Architecture audit — Market Exchange Result Ledger DSK map

Timestamp: `2026-07-10T07-08-10-04-00`

## DSK read

`ZombieOrchard` is a static browser game with a modular kit runtime. The live shell wires `src/start.js` to a game engine, a canvas world renderer, an HTML interface renderer, RAF tick/render cadence, and a legacy `window.GameHost` surface.

## Current domain flow

```txt
browser host
  -> boot module
  -> start module
  -> orchard game factory
  -> kit runtime
  -> domain kits register commands/ticks/snapshots/events
  -> engine.tick
  -> engine.snapshot
  -> world canvas render
  -> HTML interface render
  -> interface data-action activation
  -> optional nested command dispatch
  -> raw GameHost snapshot
```

## Domains

```txt
static-browser-host: hosts the page and local modules.
boot-module: imports start.js.
runtime-entrypoint: creates engine/renderers and frame loop.
game-factory: assembles the orchard engine.
kit-runtime: registers and runs domain kit behaviors.
engine-context: stores commands, ticks, snapshots, and events.
domain-registry: provides kit registrations.
command-router: applies commands and returns results.
event-emitter: publishes domain events.
tick-dispatcher: advances time-based domains.
snapshot-aggregator: builds engine snapshots.
browser-animation-loop: drives fixed dt tick and render.
gamehost-diagnostics: exposes raw engine/getState/tick.
interface-screen-state: tracks active UI screen.
interface-composition: maps data-action to screen actions and nested commands.
resource-ledger: stores resource counts.
pressure-field: updates orchard pressure.
orchard-world: stores world/canvas state.
construction-runtime: handles build affordances.
roster-runtime: handles roster affordances.
inventory-runtime: handles inventory affordances.
world-canvas-renderer: draws orchard state.
html-interface-renderer: draws active interface state.
exchange-market-placeholder: currently generic Back-only Exchange screen.
central-ledger-readback: tracks repo/central audit state.
```

## Service map

```txt
Kit runtime service -> register kits, commands, ticks, snapshots, event listeners.
Command service -> accept commands and return command results.
Snapshot service -> project domain state for renderers and GameHost.
Interface service -> render screens and activate data-action handlers.
Nested command service -> dispatch action.command through engine.command.
Resource service -> read and mutate resource counts.
World render service -> draw orchard canvas from snapshots.
HTML render service -> draw HUD and screens from snapshots.
GameHost service -> expose raw engine/getState/tick for external checks.
Smoke service -> verify page entry and apple availability.
Central ledger service -> store docs and latest safe ledge.
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

## Gap map

```txt
Market source authority: missing.
Market action catalog: missing.
Market stable IDs: missing.
Market command envelope: missing.
Market preflight/rejection reasons: missing.
Market result journal: missing.
Exchange projection/readback: missing.
Nested result retention: missing.
GameHost Market diagnostics: missing.
DOM-free Market fixture: missing.
```

## Next DSK boundary

```txt
Market source -> Market command envelope -> Market result -> nested result adapter -> Exchange projection -> GameHost Market readback -> DOM-free fixture rows
```

This boundary should be added without replacing the current engine, renderers, or interface kit system.
