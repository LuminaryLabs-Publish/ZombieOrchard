# Architecture audit: world viewport and camera DSK map

**Timestamp:** `2026-07-18T08-39-41-04-00`  
**Status:** `world-viewport-camera-coverage-authority-audited`

## Current composition

```txt
browser host
  -> kit-runtime
  -> interface domain kits
  -> interface-composition-kit
  -> resource, pressure and orchard-world kits
  -> construction, roster and inventory runtime kits
  -> active-session-domain-kit
  -> world-canvas-render-kit
  -> html-interface-render-kit
```

## Current ownership

- `orchard-world-kit` owns tree/apple generation and publishes world bounds.
- `active-session-domain-kit` owns player and pest world positions.
- `world-canvas-render-kit` owns canvas sizing and directly projects all world positions.
- No domain owns camera state, viewport admission, fit scale, safe area, world-to-screen transforms or visible-entity classification.
- The renderer does not consume `orchard-world.bounds` when choosing projection.

## DSK/domain gap

The current renderer combines viewport measurement, camera assumptions and drawing in one host-local function. The fixed assumptions are implicit:

```txt
camera position = (0, 0)
projection scale = 1
rotation = 0
viewport policy = crop anything outside the canvas
```

Those assumptions are not represented by a versioned policy, command result, digest or frame acknowledgement.

## Proposed domain

`zombie-orchard-world-viewport-camera-coverage-authority-domain`

```txt
world-extent-policy-kit
  + viewport-metrics-kit
  + camera-state-kit
  + camera-follow-policy-kit
  + camera-clamp-policy-kit
  + projection-scale-policy-kit
  + safe-area-inset-kit
  -> ViewportAdmissionResult
  -> CameraSettlementResult
  -> WorldProjectionResult
  -> EntityVisibilityResult
  -> WorldViewportFrameDigest
  -> FirstCameraBoundFrameAck
```

## Target integration

```txt
orchard-world bounds
active-session player position
viewport metrics and safe area
  -> camera admission
  -> camera clamp/follow settlement
  -> one immutable projection snapshot
  -> Canvas2D render
  -> first matching presented-frame acknowledgement
```

## Constraint

Keep the change inside the existing world-render boundary. This does not require a repository restructure or replacement of the Canvas2D renderer.
