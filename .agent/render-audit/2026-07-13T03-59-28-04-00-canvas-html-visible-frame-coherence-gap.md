# Render audit: canvas/HTML visible-frame coherence gap

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

The canvas and HTML are rendered from one function call path but are not one committed frame. They have no shared frame ID, revision, fingerprint, result, rollback, or visible acknowledgement.

## Plan ledger

**Goal:** prove both visible surfaces adopted the same immutable frame envelope or return a typed partial/failure result.

- [x] Trace canvas allocation and drawing.
- [x] Trace HTML route/HUD projection.
- [x] Confirm surface mutation order.
- [x] Confirm missing per-surface and combined results.
- [x] Confirm route/world visibility is implicit.
- [ ] Add browser surface fixtures.

## Current path

```txt
engine.tick()
  -> returned snapshot T2
  -> world.render(T2)
     -> canvas.width = CSS width
     -> canvas.height = CSS height
     -> clear and draw world
  -> ui.render(T2)
     -> choose route/HUD
     -> root.innerHTML = complete projection
  -> requestAnimationFrame(draw)
```

## Findings

### Canvas mutation

The drawing buffer is reallocated every frame. The renderer returns no surface revision, viewport revision, projection result, or content fingerprint.

### HTML mutation

The entire root subtree is replaced every frame. The renderer returns no route revision, projection result, focus receipt, or content fingerprint.

### Sequential partial frame

The canvas mutates before the HTML. If HTML projection throws after canvas success, the screen can contain new canvas pixels and old DOM without a typed partial-frame result.

### Implicit route/world projection

The canvas always reads `orchard-world` and `active-session`. It does not read `interface-composition.active`. Menu and outcome surfaces therefore overlay a live gameplay world without an explicit visibility policy.

### Missing visible proof

No browser-facing record contains:

```txt
FrameEnvelopeId
StateRevision
CanvasSurfaceRevision
CanvasProjectionResult
HtmlSurfaceRevision
HtmlProjectionResult
FrameCommitId
FrameFingerprint
FirstDualSurfaceFrameAck
```

## Required result

```txt
DualSurfaceFrameCommitResult {
  frameCommitId,
  frameEnvelopeId,
  stateRevision,
  canvasResult,
  htmlResult,
  classification,
  visibleFingerprint,
  recoveryAction,
  successorScheduled
}
```

## Required browser fixtures

```txt
both surfaces update from one envelope
canvas update and HTML update expose matching revision
HTML failure after canvas success produces partial result
canvas failure does not silently label HTML as complete
route change applies declared canvas visibility policy
last complete frame remains readable after failure
rapid commands do not mix surface revisions
Pages output matches source behavior
```

## Validation boundary

Documentation only. No renderer behavior changed and no browser surface fixture was executed.
