# Current audit — ZombieOrchard

Last aligned: `2026-07-10T07-08-10-04-00`

## Current safe ledge

```txt
ZombieOrchard Market Exchange Result Ledger Refresh + GameHost Fixture Gate
```

## Product shape

`ZombieOrchard` is a static browser orchard survival/economy shell assembled from runtime kits. The active shell wires a game engine, world canvas renderer, HTML interface renderer, fixed-dt frame loop, and a legacy `GameHost` object.

## Interaction loop

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
  -> command result returns from engine.command
  -> nested command result is dropped by the interface adapter
  -> Exchange/Market remains generic Back-only screen
  -> window.GameHost exposes engine/getState/tick and raw snapshot only
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
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
exchange-market-placeholder
central-ledger-readback
```

## Services offered by the kits

```txt
kit-runtime: kit registration, command routing, tick routing, snapshot aggregation, event dispatch.
entry/session/run kits: menu/session/run setup and active-play transition services.
interface kits: screen state, action activation, nested command dispatch, and HTML projection.
resource/inventory/roster/construction kits: domain state and command affordances.
pressure/orchard kits: simulation pressure and world state snapshots.
render kits: canvas world rendering and HTML screen rendering.
game-host diagnostics kit: raw engine/getState/tick compatibility readback.
smoke fixture kit: entry -> play -> apple-presence proof.
central ledger kit: repo/central docs tracking.
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

## Target next-cut kits

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
market-exchange-result-ledger-kit
resource-transaction-history-kit
inventory-purchase-intake-kit
interface-nested-result-adapter-kit
market-result-projection-kit
market-render-readback-kit
market-gamehost-diagnostics-kit
market-fixture-replay-kit
central-ledger-readback-kit
```

## Main finding

The next durable seam is Market/Exchange result authority, not a runtime rewrite.

The existing engine command path already returns command results. The missing layer is that Market actions are not source-owned, nested interface command results are not retained, Exchange has no Market projection, and `GameHost` cannot report Market command/result facts.

## Known blockers

```txt
No Market source manifest.
No stable Market action IDs.
No Market preflight reason catalog.
No ordered Market command/result journal.
No resource transaction history.
No inventory purchase intake rows.
No nested-result retention adapter.
No Exchange Market projection/readback.
No GameHost.market diagnostics.
No DOM-free Market fixture.
```

## Validation state

Docs-only. Runtime source unchanged. No npm, build, browser, or DOM-free fixture validation was run.
