# Render-surface audit: DPR, budget, projection and frame contract

**Timestamp:** `2026-07-12T06-19-56-04-00`

## Goal

Define the contract that binds CSS layout, physical pixels, world projection and final visible evidence.

## Surface descriptor

```txt
CanvasSurfaceDescriptor
  surfaceId
  surfaceRevision
  runtimeGeneration
  cssWidth / cssHeight
  requestedDpr / appliedDpr
  requestedBufferWidth / requestedBufferHeight
  actualBufferWidth / actualBufferHeight
  physicalPixelCount
  pixelBudget
  fallbackTier
  worldProjectionRevision
  worldScale
  worldOffset
```

## Admission rules

- Reject zero-area observations unless a named suspended-surface policy applies.
- Clamp DPR by both product tier and maximum physical-pixel count.
- Coalesce observations that are superseded before allocation.
- Treat unchanged physical dimensions and projection as `UNCHANGED`.
- Preserve the predecessor surface when allocation or readback fails.
- Reject results from stale runtime or resize generations.

## Projection rules

- The world bounds and required gameplay entities must be explicit inputs.
- The policy must state contain, camera-follow, fixed-stage or another named behavior.
- Membership results must distinguish visible, clipped, offscreen-indicated and policy-exempt entities.
- Rendering and future pointer conversion must use the same projection revision.

## Frame acknowledgement

```txt
VisibleSurfaceFrameReceipt
  frameId
  stateRevision
  simulationStep
  surfaceId
  surfaceRevision
  worldProjectionRevision
  worldRenderResult
  htmlRenderResult
  presentedAt
```

A successful allocation is not proof of a visible frame. The receipt is committed only after required render surfaces finish under the same revisions.

## Journal bounds

Keep the current descriptor, the last commit result and a bounded history of resize/fallback/failure observations. Avoid retaining canvas, context or mutable engine references in diagnostics.