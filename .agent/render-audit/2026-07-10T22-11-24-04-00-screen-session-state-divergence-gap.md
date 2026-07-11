# Render audit — Screen/session state divergence

Timestamp: `2026-07-10T22-11-24-04-00`

## Render surfaces

```txt
world-canvas-render-kit
  -> canvas size
  -> orchard trees
  -> apples
  -> pests
  -> player

html-interface-render-kit
  -> delegated click listener
  -> active-session HUD
  -> quick gameplay commands
  -> generic screen panels
  -> full innerHTML replacement every frame
```

## Current source contract

Both renderers receive only the aggregate domain snapshot. Neither receives or records:

```txt
session state
session epoch
committed simulation tick
render frame ID
state fingerprint
lifecycle transition result
reset provenance
retired/disposed status
```

## Divergence cases

### Entry while simulation is live

The interface can display Entry while pressure and active-session state continue to tick. The canvas also continues rendering the live orchard and player beneath the screen.

### Pause while simulation is live

The interface can display Paused while pests continue to spawn, move, and damage the player. The visual label is not evidence of runtime pause.

### New Game without new render source

Entry -> Run Setup -> Gameplay retains the same domain graph. The renderer has no way to prove that a new session was created because no session identity exists.

### Outcome -> Title bounce

Outcome -> Title can render Entry for one frame, then interface composition can observe the persistent `ended` flag and move back to Outcome. The renderer projects the oscillating screen state but cannot explain its lifecycle cause.

## Resource lifecycle gap

`createHtmlInterfaceRenderer()` installs a click listener and returns only `{ render }`. `createWorldCanvas()` returns only `{ render }`. No disposer exists for either surface, and `src/start.js` does not retain a cancellable RAF handle.

## Required render readback

```json
{
  "sessionEpoch": 2,
  "sessionState": "running",
  "simulationTick": 420,
  "renderFrame": 615,
  "sourceFingerprint": "...",
  "screen": "active-session",
  "worldRendered": true,
  "uiRendered": true,
  "disposed": false
}
```

## Required updates

1. Keep lifecycle authority outside the renderers.
2. Include session epoch, lifecycle state, committed tick, and source fingerprint in immutable render input.
3. Record the last consumed source row in JSON-safe renderer readback.
4. Render lifecycle controls from typed capability/lifecycle descriptors.
5. Return idempotent `dispose()` methods.
6. Remove the delegated click listener during disposal.
7. Stop rendering retired sessions.
8. Add a browser smoke that verifies one live listener and one live RAF after repeated reset/re-entry.

## Gate

Rendering quality is not the blocker. The blocker is proving that the visible screen and world are projections of the same committed session instance.