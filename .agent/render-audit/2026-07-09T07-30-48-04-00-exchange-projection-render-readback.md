# ZombieOrchard Render Audit: Exchange Projection Render Readback

**Timestamp:** `2026-07-09T07-30-48-04-00`

## Render surface

`ZombieOrchard` has two render consumers:

```txt
world-canvas:
  canvas 2D orchard render

html-interface-renderer:
  DOM HUD and screen render
```

## Current world-canvas behavior

```txt
createWorldCanvas(canvas)
  -> canvas.getContext("2d")
  -> clear frame
  -> draw orchard-world trees as rectangles
  -> draw orchard-world apples as red/gold rectangles
  -> draw active-session pests as rectangles
  -> draw active-session player as rectangle
```

This renderer is adequate for the current proof and should not be rewritten for the Market slice.

## Current HTML interface behavior

```txt
root click:
  [data-action] -> engine.command("interface-composition", "activate", { actionId })
  [data-command] -> engine.command("active-session", command)

render(snapshot):
  interface-composition.active
  interface-composition.activeSnapshot
  active-session snapshot
  resource-ledger snapshot
  pressure-field snapshot
  construction-runtime snapshot
  roster-runtime snapshot
  inventory-runtime snapshot
```

## Market render gap

The active `exchange` screen currently falls through to the generic screen branch.

That means the renderer can show title, description, and action buttons, but it cannot yet prove that it consumed:

```txt
MarketResultProjection
MarketSourceSnapshot
MarketCommandResult
MarketRenderReadback
```

## Next render contract

Add an exchange-specific projection path:

```txt
snapshot["interface-composition"].active === "exchange"
  -> build MarketResultProjection from source-owned Market state
  -> render sell/buy rows
  -> render accepted/rejected result summary if lastResult exists
  -> write MarketRenderReadback row
```

## Required readback shape

```txt
MarketRenderReadback:
  id
  frame
  activeScreen
  projectionId
  actionIdsRendered
  lastResultId
  lastResultAccepted
  lastResultReason
  resourceValuesRendered
  inventoryItemsRendered
```

## Guardrails

```txt
Do not rewrite world-canvas.
Do not change active-session HUD layout for this slice.
Do not replace generic interface screen rendering.
Do not remove existing data-action or data-command behavior.
Do not require browser APIs for the fixture.
```

## Stop condition

A DOM-free fixture can produce a Market projection and render readback row, and the browser renderer can consume the same projection additively.
