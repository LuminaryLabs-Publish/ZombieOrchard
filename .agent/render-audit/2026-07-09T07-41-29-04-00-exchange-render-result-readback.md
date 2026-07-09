# ZombieOrchard Render Audit: Exchange Render Result Readback

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Render surface

`ZombieOrchard` has a visual/render surface.

The live browser route uses two renderers:

```txt
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
```

`src/start.js` creates both renderers once, ticks the engine each frame, then passes the same snapshot into both renderers.

## Current render loop

```txt
createWorldCanvas(document.querySelector("#world"))
createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Current HTML renderer behavior

```txt
active === "active-session"
  -> render HUD strip, quick action row, and session message

active !== "active-session"
  -> render generic screen panel
  -> optionally render cards for session-select, construction, roster, inventory, outcome
  -> render current.actions
```

## Exchange-specific finding

The Exchange / Market screen currently falls through to generic screen rendering.

It does not yet have:

```txt
MarketResultProjection
Market price/capacity rows
Market accepted/rejected result panel
Market transaction history panel
MarketRenderReadback
GameHost market render diagnostics
```

## Existing renderer services

```txt
sanitize text values
render stat strips
render action buttons
render cards
route data-action to interface-composition.activate
route data-command to active-session
render active-session HUD
render generic screen panel
```

## Required next render services

```txt
project exchange screen into Market projection rows
render buy/sell action rows from MarketActionCatalog
render accepted/rejected MarketCommandResult
render resource delta / transaction history
record MarketRenderReadback
expose readback through GameHost diagnostics
support DOM-free fixture readback without browser APIs
```

## Do not change yet

```txt
world-canvas art
screen CSS
active-session HUD layout
DOM event plumbing
canvas draw loop
```

## Next safe ledge

```txt
Add exchange-specific projection and readback only after Market command/result rows exist.
```
