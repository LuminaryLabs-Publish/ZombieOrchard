# ZombieOrchard Viewport Observation to Surface Result Map

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

Viewport state currently enters the renderer as ambient mutable browser data during each frame. There is no immutable resize command, generation fence, candidate surface plan or typed result connecting browser observation to the pixels shown.

## Plan ledger

**Goal:** map browser viewport and DPR changes into one admitted command/result path that can reject stale observations and prove the displayed frame.

- [x] Trace ambient viewport reads.
- [x] Trace drawing-buffer mutation.
- [x] Trace world projection and render submission.
- [x] Identify missing command and result identities.
- [x] Define the target interaction map.
- [ ] Implement viewport adapters and surface commands.
- [ ] Execute stale-resize and browser parity fixtures.

## Current map

```txt
browser layout
  -> canvas.clientWidth / canvas.clientHeight
  -> optional window.innerWidth / innerHeight fallback
  -> direct canvas.width / canvas.height assignment
  -> direct centered projection
  -> canvas pixels
```

Current result:

```txt
command identity: none
observation identity: none
resize generation: none
surface revision: none
admission result: none
allocation result: none
projection result: none
visible-frame receipt: none
```

## Failure paths

### Rapid resize

```txt
multiple viewport changes
  -> each following RAF reads whatever values are current
  -> no ordering or coalescing record
  -> no proof which observation produced the frame
```

### Zero-size layout

```txt
canvas.clientWidth or clientHeight is zero
  -> renderer substitutes window dimensions
  -> drawing buffer can disagree with the canvas CSS rectangle
  -> no fallback reason is published
```

### Zoom or DPR change

```txt
DPR changes
  -> current renderer does not observe it
  -> surface revision does not change
  -> physical clarity changes without diagnostics
```

### Small viewport

```txt
surface shrinks
  -> raw world projection remains unchanged
  -> active entities can be clipped
  -> no visibility mismatch result exists
```

## Target command map

```txt
BrowserViewportAdapter
  -> ViewportObservation
       observationId
       runtimeSessionId
       resizeGeneration
       canvasSurfaceId
       cssRect
       devicePixelRatio
       orientation
       visibilityState

ViewportObservation
  -> PrepareRenderSurfaceCommand
       expectedSurfaceRevision
       pixelBudgetPolicyRevision
       worldProjectionPolicyRevision

PrepareRenderSurfaceCommand
  -> RenderSurfacePlan
       requested and bounded dimensions
       applied DPR
       world scale/offset
       fallback tier

RenderSurfacePlan
  -> RenderSurfaceCommitResult
       accepted or rejected
       actual dimensions
       new surface revision
       predecessor preservation

committed surface
  -> WorldRenderResult
  -> VisibleSurfaceFrameReceipt
```

## Required rejections

```txt
stale runtime session
stale resize generation
unexpected predecessor revision
non-finite or non-positive CSS dimensions
pixel budget violation without fallback
allocation/readback mismatch
stale world-projection policy revision
```

## Required parity

```txt
browser resize event and ResizeObserver produce the same normalized observation
orientation change follows the same command path
manual diagnostic resize cannot bypass admission
world renderer and GameHost read the same committed surface
HTML and canvas frame observations cite the same frame cycle
```

## Gate

Do not let browser callbacks mutate the drawing buffer directly. All surface changes must pass through one command, plan, result and visible-frame path.
