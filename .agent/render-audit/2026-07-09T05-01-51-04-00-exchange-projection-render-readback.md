# Render Audit: Exchange Projection Render Readback

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Current render surface

```txt
src/start.js
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> draw()
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## World canvas renderer

`world-canvas` currently renders:

```txt
background
orchard trees
apples
active-session pests
active-session player
```

It is not the blocker for Market work.

## HTML interface renderer

`html-interface-renderer` currently renders:

```txt
active-session HUD
session-select cards
construction built cards
roster cards
inventory cards
outcome summary cards
generic panel for all other screens
```

The Exchange/Market screen currently falls through to the generic panel branch.

## Required Market render path

```txt
snapshot["interface-composition"].active === "exchange"
  -> read MarketResultProjection
  -> render sell/buy rows
  -> render accepted/rejected lastResult message
  -> render resource deltas
  -> render inventory intake preview
  -> emit/retain MarketRenderReadback
```

## Required readback shape

```txt
MarketRenderReadback
  active: exchange
  actionRowsRendered
  resourceValuesRead
  lastResultRead
  projectionVersion
  renderedMessage
  warnings
```

## Compatibility rules

```txt
Do not change canvas layout for this pass.
Do not remove active-session HUD behavior.
Do not remove generic scoped-interface rendering.
Do not remove existing data-action buttons.
Add the Exchange branch before the generic screen branch.
Expose readback additively for fixtures and GameHost diagnostics.
```

## Main finding

Render work should be limited to proving that the Exchange renderer consumes a source-owned Market projection and exposes readback.

A visual redesign, CSS pass, or canvas overhaul would be premature until Market command results are fixture-readable.
