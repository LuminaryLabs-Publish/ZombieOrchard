# Interaction audit: Canvas render-surface command and result map

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

Viewport and DPR changes currently enter the renderer as ambient browser state. No explicit command binds the observation to a renderer generation, and no result proves which backing store was accepted.

## Plan ledger

**Goal:** convert ambient viewport mutation into explicit commands, immutable results, stale-work rejection, and visible-frame acknowledgement.

- [x] Identify ambient inputs.
- [x] Identify missing command identity and expected revisions.
- [x] Define resize, render, and retirement results.
- [ ] Implement command admission.
- [ ] Implement browser fixture coverage.

## Command map

```txt
CanvasRenderSurfaceCommand
  input:
    commandId
    RenderSurfaceId
    expectedRendererRevision
    expectedContextGeneration
    viewportRevision
    cssWidth
    cssHeight
    dpr
    dprPolicyRevision

  outcomes:
    unchanged
    adopted
    rejected-stale
    rejected-invalid-size
    failed-preserved-predecessor

  result:
    RenderSurfaceRevision
    logicalSize
    physicalSize
    acceptedDpr
    ContextGeneration
    resized
    predecessorRetirementReceipt
```

```txt
CanvasFrameCommand
  -> bind StateRevision and RenderSurfaceRevision
  -> clear and draw once
  -> publish CanvasFrameResult
  -> publish FirstCanvasResizeFrameAck when required
```

```txt
CanvasRenderSurfaceRetirementCommand
  -> reject late resize/render work
  -> release observer and context ownership
  -> publish retirement receipt exactly once
```
