# Gameplay audit: Simulation-to-Canvas2D frame loop

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

Gameplay state is advanced, snapshotted, and projected into Canvas2D once per host callback. The gameplay domains do not own the render-surface problem, but every accepted gameplay frame currently triggers an unconditional backing-store reset before presentation.

## Plan ledger

**Goal:** preserve gameplay truth while replacing render-resource churn with one independently versioned presentation transaction.

- [x] Trace gameplay tick to snapshot.
- [x] Trace snapshot to world and HTML renderers.
- [x] Keep orchard and active-session state authoritative.
- [x] Isolate backing-store ownership to presentation.
- [ ] Bind rendered snapshot revision to the accepted render-surface generation.
- [ ] Prove the first frame after resize and unchanged subsequent frames.

## Loop

```txt
engine.tick(dt)
  -> resource pressure orchard construction roster inventory and interface tick
  -> active-session movement collection pests damage score and outcome tick
  -> immutable snapshot returned
  -> Canvas2D render-surface reset
  -> trees apples pests and player projected
  -> HTML route/HUD projected
```

## Required separation

```txt
gameplay result
  -> StateRevision

render-surface result
  -> RenderSurfaceRevision
  -> ContextGeneration

visible frame
  -> StateRevision
  -> RenderSurfaceRevision
  -> CanvasFrameId
```

Gameplay must not allocate, resize, or retire Canvas2D resources. The canvas authority must not mutate gameplay state.
