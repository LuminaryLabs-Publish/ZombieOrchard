# ZombieOrchard Render Audit: Exchange Consumer Readback Parity

**Timestamp:** `2026-07-09T13-03-43-04-00`

## Render surface

`ZombieOrchard` has two render surfaces:

```txt
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
```

The current audit target is the HTML interface renderer because the Exchange/Market gap is a consumer projection/readback gap, not a canvas-world drawing gap.

## Current render loop

```txt
engine.tick(1 / 60)
  -> snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> if active === active-session render HUD
  -> else render generic screen panel
  -> if active === exchange, generic screen panel is still used
```

## Current renderer services

```txt
world-canvas-render-kit:
  - clear/draw the orchard canvas
  - render trees
  - render apples
  - render pests
  - render built objects
  - render player

html-interface-render-kit:
  - install data-action and data-command click routing
  - render active-session HUD
  - render generic screen cards
  - render screen actions
```

## Exchange render gap

```txt
- exchange has no dedicated Market projection object.
- exchange currently inherits generic screen rendering.
- exchange only exposes Back from current descriptor state.
- renderer does not know visible Market action count.
- renderer does not expose last accepted/rejected Market result.
- renderer does not expose rejection reason.
- renderer does not expose transaction count.
- renderer does not expose whether a Market row was consumed by UI.
```

## Required Exchange projection/readback

```txt
MarketResultProjection:
  activeScreen
  actionRows[]
  priceRows[]
  resourceRows[]
  inventoryRows[]
  lastResult
  rejectionReason
  transactionCount

MarketRenderReadback:
  activeScreen
  renderedActionCount
  renderedPriceCount
  visibleLastResult
  visibleRejectionReason
  visibleTransactionCount
  unsupportedRows[]
  fallbackUsed
```

## Readback parity rule

A Market fixture row is not complete until the source projection and renderer readback agree on:

```txt
action id
visible label
command eligibility
accepted/rejected status
rejection reason when rejected
resource delta when accepted
inventory delta when accepted
transaction journal row count
last result visibility
```

## Do not change next

```txt
- Do not rewrite world-canvas for this ledge.
- Do not add visual polish before Market projection/readback exists.
- Do not add new screens before Exchange readback is proven.
- Do not remove generic screen fallback.
```
