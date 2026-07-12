# Render audit: unreachable movement and visible-world gap

## Finding

The canvas presents a movable player marker inside a larger orchard, but the shipped browser surface has no control that can change the player's position.

`world-canvas.js` reads `active-session.player` and renders it relative to the canvas center. `html-interface-renderer.js` exposes Collect, Clear, Next Phase and route buttons. `start.js` installs no keyboard, pointer-direction or touch movement listener.

## Consequence

```txt
visible orchard extends across the canvas
  -> player marker appears at the retained start position
  -> browser input cannot issue active-session.move
  -> canvas keeps presenting a stationary player
  -> no control state, rejection reason or movement receipt is visible
```

The rendered world implies exploration, while the product interaction surface offers no path to perform it. Random apple placement can leave all collectible apples outside the player's fixed interaction radius.

## Required render contract

A committed gameplay frame should identify:

```txt
renderFrameId
stateRevision
playerPosition
controlLeaseId
inputSequence consumed
movementResultId
active route
focus state
```

The HUD should provide concise control instructions and, when movement is unavailable, expose a bounded reason such as paused route, lost focus, stale session or ended run.

## Proof gate

- A browser key press changes committed player position and the next canvas frame.
- The frame cites the matching movement result and state revision.
- Paused, title and outcome routes do not visually advance movement.
- Blur retires held movement before another frame can consume it.
- No predecessor-run movement appears after reset or disposal.
