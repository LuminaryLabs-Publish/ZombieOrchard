# ZombieOrchard Render Audit: Canvas + HTML

**Timestamp:** `2026-07-08T03-08-39-04-00`

## Render surfaces

```txt
index.html
├─ canvas#world
└─ section#ui-root
```

## Canvas renderer

`src/renderer/world-canvas.js` owns direct 2D canvas drawing.

Current behavior:

```txt
- Resizes canvas to client/window size.
- Clears background with dark green fill.
- Draws tree squares from orchard-world.trees.
- Draws red/gold apple squares from orchard-world.apples.
- Draws pest squares from active-session.pests.
- Draws player square from active-session.player.
```

Known render gaps:

```txt
- Does not draw built structures.
- Does not draw roster workers.
- Does not draw inventory/tool state.
- Does not visualize phase/night pressure strongly.
- Does not consume a formal render-plan descriptor.
```

## HTML interface renderer

`src/renderer/html-interface-renderer.js` owns DOM projection and click routing.

Current behavior:

```txt
- Active-session renders HUD stats and command/action buttons.
- Generic screens render title, description, action buttons, and optional cards.
- Construction screen renders built cards.
- Roster screen renders actor cards.
- Inventory screen renders item cards.
- Outcome screen renders score/day cards.
- Clicks on data-action go to interface-composition.activate.
- Clicks on data-command go to active-session directly.
```

Known interface gaps:

```txt
- exchange has no dedicated projection branch.
- Market action results are not visible.
- Transaction history is not visible.
- Disabled reasons are not visible.
- Prices and capacity are not visible.
- Nested command results are discarded before renderer projection.
```

## Renderer rule

Keep renderer code as a host adapter. Reusable kits should emit snapshot/projection descriptors only. Do not move DOM, canvas, browser events, or raw drawing into reusable economy kits.
