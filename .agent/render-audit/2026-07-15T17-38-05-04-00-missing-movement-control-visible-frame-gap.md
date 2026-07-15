# Render audit: missing movement-control visible-frame path

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Summary

Canvas2D can render any accepted player position, but the visible page provides no movement control that can produce a new position. The renderer therefore has no player-facing path from directional intent to a matching changed frame.

## Plan ledger

**Goal:** bind accepted movement results to one visible Canvas2D frame without giving rendering authority over gameplay state.

- [x] Confirm the canvas draws `active-session.player.x/y`.
- [x] Confirm HTML exposes no directional controls.
- [x] Confirm the host installs no device movement listeners.
- [x] Define movement and frame receipts.
- [ ] Capture before/after movement frames across supported device profiles.

## Current path

```txt
snapshot active-session.player
  -> world-canvas render
  -> draw 12x12 player marker

missing player-facing predecessor
  -> no keyboard vector
  -> no touch vector
  -> no gamepad vector
  -> no on-screen vector
  -> no MovementResult
  -> no FirstPlayerMovementFrameAck
```

## Required evidence

A valid proof must bind `ControlGeneration`, `MovementCommandId`, `PlayerPositionRevision`, `SimulationRevision`, `CanvasFrameRevision`, and the first frame displaying the accepted position.

## Validation boundary

No screenshot, dimension trace, input trace, frame acknowledgement, or deployed-origin proof was executed.
