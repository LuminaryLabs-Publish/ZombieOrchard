# ZombieOrchard Render Audit: Exchange Result Render Readback Map

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Render surface

`ZombieOrchard` has a visual/render surface:

```txt
world-canvas:
  src/renderer/world-canvas.js
  canvas#world
  trees
  apples
  pests
  player

html-interface-renderer:
  src/renderer/html-interface-renderer.js
  #ui-root
  active-session HUD
  generic interface screens
  data-action buttons
  data-command buttons
```

## Current render loop

```txt
src/start.js
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

## Current Exchange render behavior

```txt
interface-composition.active === "exchange"
  -> current = snapshot["interface-composition"].activeSnapshot
  -> html-interface-renderer falls through to generic screen panel
  -> current.title renders as Market
  -> current.description renders if configured
  -> current.actions renders Back only
```

## Missing readback

```txt
- No Market-specific HTML projection.
- No visible sell/buy action count.
- No rendered price/capacity rows.
- No rendered last accepted/rejected result.
- No rendered rejection reason.
- No rendered transaction history.
- No Exchange render readback snapshot.
- No GameHost market diagnostics pointing at what the renderer consumed.
```

## Required render contract

```txt
MarketResultProjection:
  activeScreen
  actions[]
  prices
  capacity
  resourcesBefore
  resourcesAfter
  inventoryBefore
  inventoryAfter
  lastResult
  transactions[]

MarketRenderReadback:
  activeScreen
  visibleActionCount
  visibleActionIds[]
  visiblePriceCount
  visibleTransactionCount
  lastResultId
  lastRejectedReason
  lastAcceptedMutation
  rendererBranch
```

## Recommendation

Add Exchange-specific rendering only after Market result records exist. The renderer should consume a projection record and then write a readback record so fixtures can prove the UI branch shows the same accepted/rejected state that the source authority produced.
