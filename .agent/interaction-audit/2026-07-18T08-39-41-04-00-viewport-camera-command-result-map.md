# Interaction audit: viewport and camera command/result map

**Timestamp:** `2026-07-18T08-39-41-04-00`

## Current path

```txt
browser resize or initial layout
  -> canvas clientWidth/clientHeight read during render
  -> backing store replaced
  -> world origin centered
  -> raw entity positions added
  -> frame drawn
```

There is no explicit command or result between viewport evidence and the rendered world frame.

## Proposed commands and results

```txt
ViewportAdmissionCommand
  viewportWidth
  viewportHeight
  devicePixelRatio
  safeAreaInsets
  hudOcclusion
  viewportGeneration
  -> ViewportAdmissionResult

CameraSettlementCommand
  worldBounds
  playerPosition
  priorCamera
  followPolicy
  clampPolicy
  scalePolicy
  -> CameraSettlementResult

WorldProjectionCommand
  cameraResult
  entityWorldPositions
  -> WorldProjectionResult

EntityVisibilityClassificationCommand
  projectedBounds
  interactionFocus
  -> EntityVisibilityResult

WorldFrameCommitCommand
  viewportGeneration
  cameraGeneration
  projectionDigest
  -> WorldViewportFrameDigest
  -> FirstCameraBoundFrameAck
```

## Rejection and fallback states

```txt
invalid-viewport
zero-size-deferred
fit-world
follow-player
clamped-to-world
safe-area-adjusted
interaction-focus-adjusted
stale-viewport-rejected
stale-camera-rejected
projection-overflow
```

## Required behavior

A resize, orientation change or HUD safe-area change must not silently produce a frame from mixed viewport and camera generations. The accepted result should be inspectable through diagnostics and executable fixtures.
