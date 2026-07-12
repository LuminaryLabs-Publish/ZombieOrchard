# Render audit: per-frame DOM replacement and visible-interface gap

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The visual interface is redrawn as a complete HTML subtree on every RAF callback. Canvas rendering and HTML projection are sequential calls, but neither returns a typed result and no shared frame receipt proves that the world and interface correspond to the same committed revision.

## Plan ledger

**Goal:** make HTML rendering minimal, revisioned and correlated with the visible canvas frame.

- [x] Trace RAF to canvas and HTML consumers.
- [x] Confirm both HTML branches replace the complete root.
- [x] Confirm no no-op, mutation count or render result exists.
- [x] Define canvas/HTML parity evidence.
- [ ] Implement and run visual/browser fixtures.

## Current frame path

```txt
engine.tick
  -> snapshot
  -> world.render
       no typed result
  -> ui.render
       root.innerHTML replacement
       no typed result
  -> schedule RAF
```

## Visual gaps

```txt
canvas and HTML have no shared frame ID
HTML has no projection revision
unchanged HUD values still replace DOM
focused controls can disappear between frames
message nodes can be recreated without a semantic change
no first-paint or paint-eligible interface receipt exists
renderer failure can stop successor RAF scheduling
```

## Required visible-frame evidence

```txt
VisibleGameFrameReceipt
  frameId
  stateRevision
  canvasSurfaceRevision
  canvasRenderResult
  interfaceProjectionRevision
  interfaceProjectionResult
  focusResult
  accessibilityResult
  paint acknowledgement
```

## Required fixtures

```txt
unchanged active-session HUD -> no DOM mutation
changed resource count -> one interface revision
route change -> one intentional focus transition
canvas and HTML cite the same state/frame revision
renderer failure returns a typed stage failure
built artifact and Pages produce equivalent receipts
```
