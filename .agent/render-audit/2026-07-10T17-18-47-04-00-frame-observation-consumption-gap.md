# Render audit: frame observation and consumption gap

Timestamp: `2026-07-10T17-18-47-04-00`

## Current render loop

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

## World canvas surface

`src/renderer/world-canvas.js`:

- Resizes the canvas to CSS dimensions every frame.
- Clears the frame.
- Draws trees, apples, pests, and the player from aggregate snapshots.
- Records no frame ID, snapshot fingerprint, object counts, or consumed source rows.

## HTML interface surface

`src/renderer/html-interface-renderer.js`:

- Binds `[data-action]` to `interface-composition.activate`.
- Binds `[data-command]` to direct `active-session` commands.
- Projects active-session HUD or generic screen panels.
- Replaces `root.innerHTML` every frame.
- Records no command result, frame ID, projection fingerprint, or render-consumption row.

## Current proof gap

A visible frame cannot be linked back to:

```txt
scenario seed
random draw range
command request/result range
durable event range
committed state fingerprint
active projection fingerprint
world renderer consumption
HTML renderer consumption
```

The current render order is consistent inside `draw()`, but consistency is not observable. A screenshot or DOM state cannot prove which exact snapshot was rendered.

## Required readback

Each renderer should return or publish an immutable consumption row:

```txt
{
  rendererId,
  frame,
  stateFingerprint,
  projectionFingerprint,
  consumedDomains,
  objectCounts,
  commandRange,
  eventRange
}
```

For the HTML renderer, include:

```txt
activeScreen
actionIds
commandIds
messageFingerprint
```

For the world renderer, include:

```txt
treeCount
appleCount
pestCount
playerPresent
canvasWidth
canvasHeight
```

## Recommendation

Do not replace either renderer. Add consumption readback at the existing render boundaries, then expose bounded rows through GameHost and fixtures. Rendering fidelity is not the immediate blocker; frame identity is.