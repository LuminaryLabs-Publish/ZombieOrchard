# ZombieOrchard Canvas Render Audit

**Timestamp:** `2026-07-08T08-02-32-04-00`

## Purpose

Record the visual/render surface for `ZombieOrchard` and keep renderer work subordinate to source-owned game/economy state.

## Current render loop

```txt
src/start.js
-> const snapshot = engine.tick(1 / 60)
-> world.render(snapshot)
-> ui.render(snapshot)
-> requestAnimationFrame(draw)
```

## World canvas renderer

```txt
source: src/renderer/world-canvas.js
surface: canvas#world
input: engine snapshot
projection:
  snapshot["orchard-world"].trees
  snapshot["orchard-world"].apples
  snapshot["active-session"].pests
  snapshot["active-session"].player
```

Current draw behavior:

```txt
- fill background #071007
- draw trees as green 16x16 rects
- draw apples as red/gold 6x6 rects
- draw pests as green 16x16 rects
- draw player as pale 12x12 rect
```

## HTML interface renderer

```txt
source: src/renderer/html-interface-renderer.js
surface: section#ui-root
input: engine snapshot
projection:
  snapshot["interface-composition"]
  snapshot["active-session"]
  snapshot["resource-ledger"].values
  snapshot["pressure-field"].channels
  snapshot["construction-runtime"]
  snapshot["roster-runtime"]
  snapshot["inventory-runtime"]
```

Current UI behavior:

```txt
active-session:
  renders day/phase/money/apples/wood/pressure/condition HUD
  renders Collect, Clear, Next Phase, and active-session actions

generic screens:
  renders current title/description/actions
  optionally renders Slots, Built, Roster, Items, or Summary cards
```

## Render gaps

```txt
- No world render plan exists yet.
- No buildings are drawn in world canvas.
- No roster actors are drawn in world canvas.
- No pressure/night overlay is drawn in world canvas.
- No Market/economy status is drawn in world canvas.
- No exchange-specific HTML projection exists.
- Transaction history is not available to render.
- Price/capacity rows are not available to render.
```

## Renderer authority rule

The HTML renderer should consume Market projection data only.

It should not own:

```txt
- prices
- capacity
- affordability
- purchase mutation
- sell mutation
- rejection reasons
- transaction history
```

## Next render boundary

Add `MarketResultProjection` first, then let `html-interface-renderer` consume that projection on the `exchange` screen.

Target projection:

```txt
MarketResultProjection:
  title
  message
  rows:
    actionId
    label
    description
    price
    capacity
    disabled
    disabledReason
  lastResult:
    accepted
    reason
    commandId
  transactions:
    id
    type
    summary
    resourceDeltas
    inventoryDeltas
```

## Render validation target

The next render validation should prove:

```txt
- active-session HUD still renders from the current snapshot shape
- exchange screen renders sell/buy/back rows from MarketResultProjection
- transaction rows render only from projection data
- rejected result messages render without resource/inventory mutation
- accepted result messages render with transaction history
```

Do not start by making the orchard prettier.

Start by proving the renderer consumes the right source-owned economy projection.
