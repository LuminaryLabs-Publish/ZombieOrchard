# Interaction audit: viewport observation to surface commit

**Timestamp:** `2026-07-12T06-19-56-04-00`

## Goal

Map browser viewport changes into an admitted, revisioned render-surface command instead of ambient reads during drawing.

## Current map

```txt
resize / orientation / zoom / layout
  -> browser mutates ambient CSS and device scale
  -> no event identity enters the runtime
  -> next render samples clientWidth/clientHeight
  -> width/height are assigned directly
  -> no result is returned
```

## Required map

```txt
viewport adapter
  -> ViewportObservation {
       observationId,
       source,
       cssWidth,
       cssHeight,
       devicePixelRatio,
       runtimeGeneration,
       canvasSurfaceId
     }

surface authority
  -> reject invalid or stale observation
  -> coalesce superseded observations
  -> derive bounded RenderSurfacePlan
  -> commit renderer buffer and world projection
  -> return SurfaceCommitResult

frame authority
  -> render using committed surfaceRevision
  -> publish VisibleSurfaceFrameReceipt
```

## Required result states

```txt
COMMITTED
UNCHANGED
COALESCED
REJECTED_ZERO_AREA
REJECTED_STALE_GENERATION
FALLBACK_PIXEL_BUDGET
FAILED_ALLOCATION
ROLLED_BACK
```

## Diagnostics

`GameHost` should expose a detached read model containing the current surface ID/revision, CSS and physical sizes, applied DPR, pixel budget tier, world projection revision and latest visible frame. It should not expose mutable allocation controls.

## Input relationship

Future player controls must use the same committed projection for pointer/world conversion. Input must not derive coordinates from an ambient viewport that differs from the rendered surface.