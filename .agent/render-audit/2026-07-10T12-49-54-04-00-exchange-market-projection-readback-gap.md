# Render audit — Exchange Market Projection Readback Gap

## Timestamp

`2026-07-10T12-49-54-04-00`

## Current render surface

`ZombieOrchard` has two browser renderers:

```txt
src/renderer/world-canvas.js
  -> draws trees, apples, pests, and player to #world

src/renderer/html-interface-renderer.js
  -> draws active-session HUD
  -> draws generic interface screens for non-active domains
```

## Current render behavior

The HTML renderer has special branches for:

```txt
active-session
session-select
construction
roster
inventory
outcome
```

It does not have a Market/Exchange branch beyond rendering generic screen title, description, and actions.

## Market readback gap

The `exchange` screen currently has only a Back action in `orchard-preset.js`.

That means the renderer cannot show or prove:

```txt
available Market actions
prices
capacity
affordability
accepted command result
rejected command result
resource delta
inventory intake
last Market message
projection row id
render consumption row id
```

## Projection contract needed next

Add a source-owned projection before renderer polish:

```txt
marketProjection = {
  screen: "exchange",
  actions: [...stableMarketActions],
  lastResult,
  resourcePreview,
  inventoryPreview,
  rejectedReason,
  rows: [...]
}
```

Then `html-interface-renderer` can consume `marketProjection` and emit a readback row:

```txt
{
  renderer: "html-interface-renderer",
  screen: "exchange",
  consumedMarketRows: n,
  lastResultId,
  renderedActions,
  fallback: false
}
```

## Main finding

No renderer rewrite is needed next.

The blocker is that there is no Market projection row for the renderer to consume, and no readback proving what it consumed.
