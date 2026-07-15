# Architecture audit: Canvas backing-store and DPR DSK map

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

The active world renderer combines CSS-size observation, physical backing-store allocation, context initialization, logical projection, clearing, and drawing in one unversioned `render(snapshot)` function.

## Plan ledger

**Goal:** separate observation, policy, allocation, adoption, projection, retirement, and proof without changing gameplay-domain ownership.

- [x] Identify current ownership boundaries.
- [x] Preserve the existing world snapshot contract.
- [x] Keep HTML rendering separate.
- [x] Define one parent authority and 18 subordinate surfaces.
- [ ] Implement the authority.
- [ ] Prove source, build, and Pages behavior.

## Current DSK map

```txt
world-canvas-render-kit
  -> sample canvas.clientWidth/clientHeight
  -> assign canvas.width/canvas.height
  -> acquire and retain one 2D context
  -> clear
  -> project orchard-world and active-session snapshots
```

Missing boundaries:

```txt
viewport observation
DPR policy
physical-size derivation
resize change detection
backing-store adoption
context generation
logical-coordinate transform
resize result
stale work rejection
retirement receipt
visible-frame acknowledgement
```

## Required parent domain

`zombie-orchard-canvas-backing-store-dpr-resize-authority-domain`

## Proposed service composition

```txt
CanvasRenderSurfaceCommand
  -> viewport-css-size-sample-kit
  -> device-pixel-ratio-policy-kit
  -> backing-store-size-descriptor-kit
  -> resize-change-detection-kit
  -> render-surface-admission-kit
  -> canvas-context-generation-kit
  -> context-transform-scale-kit
  -> render-surface-resize-result-kit
  -> first-canvas-resize-frame-ack-kit
  -> context-retirement-kit
```

## Service contract

```txt
input:
  RenderSurfaceId
  viewport revision
  logical CSS width and height
  DPR policy revision
  renderer revision
  expected prior context generation

result:
  accepted logical size
  accepted physical size
  accepted DPR
  context generation
  resized boolean
  retired generation receipt
  rendered snapshot revision
  FirstCanvasResizeFrameAck
```

## Dependency rule

Gameplay, orchard generation, pressure, pests, player state, and interface routing remain upstream. The canvas authority consumes immutable snapshots and owns presentation resources only.
