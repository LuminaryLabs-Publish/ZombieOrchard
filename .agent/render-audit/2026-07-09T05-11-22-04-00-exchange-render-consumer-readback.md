# Render Audit: Exchange Render Consumer Readback

**Timestamp:** `2026-07-09T05-11-22-04-00`

## Visual surface

`ZombieOrchard` has two render surfaces:

```txt
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
```

The world canvas consumes snapshots for orchard state.

The HTML renderer consumes snapshots for active-session HUD and generic interface screens.

## Current render loop

```txt
src/start.js draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

## Current Exchange behavior

The `exchange` screen exists as a generated interface domain, but `html-interface-renderer` currently treats it as a generic screen.

```txt
interface-composition.active === "exchange"
  -> current = ui.activeSnapshot
  -> generic screen panel
  -> current.actions mapped as buttons
```

There is no exchange-specific projection branch.

There is no Market renderer readback record.

There is no proof that a Market action result was consumed by the renderer.

## Current render consumers

```txt
world-canvas:
  orchard-world.trees
  orchard-world.apples
  active-session.pests
  active-session.player
  construction-runtime.built

html-interface-renderer:
  interface-composition.active
  interface-composition.activeSnapshot
  active-session
  resource-ledger.values
  pressure-field.channels
  construction-runtime
  roster-runtime
  inventory-runtime
```

## Missing render consumers

```txt
interface-composition.lastResult
market-result-projection
market-command-journal latest row
market-result-journal latest row
resource-transaction-history latest row
inventory-purchase-intake latest row
market-render-readback latest row
GameHost.market latest diagnostics
```

## Required readback rows

```txt
MarketRenderReadback {
  frame,
  activeScreen,
  projectedActionIds,
  lastResultId,
  lastResultStatus,
  lastResultReason,
  resourceValuesRendered,
  inventoryValuesRendered,
  transactionRowsRendered,
  sourceProfileVersion
}
```

## Recommended renderer splice

Add a narrow Exchange branch to `html-interface-renderer` after `active-session` handling and before the generic screen fallback.

The branch should consume a Market projection, not raw runtime internals.

```txt
snapshot
  -> makeMarketResultProjection(snapshot)
  -> renderExchangeProjection(projection)
  -> createMarketRenderReadback(projection, snapshot)
```

## Decision

Do not rewrite the canvas renderer or the broader interface renderer.

Only add enough Exchange projection/readback to prove Market actions are visible and renderer-consumed.
