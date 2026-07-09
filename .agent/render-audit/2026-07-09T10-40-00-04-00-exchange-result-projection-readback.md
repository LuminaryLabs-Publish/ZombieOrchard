# ZombieOrchard Render Audit — Exchange Result Projection Readback

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Scope

Visual/render-surface audit for the current HTML/canvas presentation.

Runtime source remains unchanged.

## Current render path

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Canvas renderer

`world-canvas` consumes orchard/session snapshots and draws the visible orchard world.

Current responsibility:

```txt
trees
apples
pests
built objects
player marker
```

The next Market proof does not need to alter the canvas renderer.

## HTML interface renderer

`html-interface-renderer` currently has two render modes:

```txt
active === "active-session"
  -> session HUD with day, phase, money, apples, wood, pressure, condition, quick commands, session actions, message

all other screens
  -> generic panel with title, description, optional cards, action buttons
```

Exchange currently uses the generic screen branch.

## Missing render readback

```txt
- No Exchange-specific Market projection.
- No visible Market action catalog readback.
- No last accepted/rejected result row.
- No rejection reason projection.
- No transaction history projection.
- No renderer-facing `MarketRenderReadback` summary.
- No GameHost-readable rendered/action/result counts.
```

## Required next render proof

```txt
MarketResultProjection:
  active screen
  available actions
  resource values
  inventory capacity
  lastResult
  rejection reason
  transaction count

MarketRenderReadback:
  active === exchange
  renderedActionCount
  renderedLastResult
  renderedReason
  renderedTransactionCount
  unsupportedFields
```

## Constraint

Do not replace `html-interface-renderer` or `world-canvas` for the next slice. Add a bounded Exchange branch and additive readback only.
