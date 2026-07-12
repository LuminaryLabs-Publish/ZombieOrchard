# ZombieOrchard Canvas Render Surface Authority DSK Map

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

The active renderer combines viewport observation, drawing-buffer mutation, world projection and frame drawing inside one `render(snapshot)` function. The missing architecture is a composed domain that owns surface identity, resize admission, physical-pixel policy, world fit, commit/rollback and visible-frame proof.

## Plan ledger

**Goal:** separate browser observations from committed render-surface state and make all render consumers reference one admitted surface revision.

- [x] Trace page/CSS ownership into `world-canvas.js`.
- [x] Identify CSS, drawing-buffer, DPR and world-coordinate domains.
- [x] Identify the existing `world-canvas-render-kit` service boundary.
- [x] Define the parent authority domain.
- [x] Define candidate kits, commands, plans and results.
- [x] Define consumer and proof relationships.
- [ ] Implement the composed domain.
- [ ] Replace ambient per-frame sizing.
- [ ] Execute the fixture matrix.

## Current ownership

```txt
index.html
  -> owns #world canvas element

src/styles.css
  -> fixes #world to 100vw x 100vh

src/start.js
  -> creates world renderer
  -> calls world.render(snapshot) every RAF

src/renderer/world-canvas.js
  -> reads CSS dimensions
  -> selects window fallback
  -> writes canvas.width / canvas.height
  -> clears the buffer
  -> projects raw world coordinates around center
  -> draws world entities
```

This single function currently acts as observation, policy, allocation, projection, commit and drawing authority without explicit identities or results.

## Required parent domain

```txt
zombie-orchard-canvas-render-surface-authority-domain
```

## Subdomain composition

### Surface identity and lifecycle

```txt
canvas-surface-id-kit
  owns stable canvas surface identity

canvas-surface-revision-kit
  owns monotonically increasing committed surface revision

resize-generation-kit
  owns viewport/resize observation generation

render-surface-commit-kit
  commits one admitted plan

render-surface-rollback-kit
  preserves predecessor state when preparation fails
```

### Observation and policy

```txt
viewport-observation-kit
  captures CSS rectangle, viewport dimensions, orientation and visibility

device-pixel-ratio-policy-kit
  normalizes requested DPR and product cap

render-pixel-budget-kit
  bounds width x height before drawing-buffer mutation

canvas-capability-kit
  exposes maximum dimensions and supported context state

resize-coalescing-kit
  drops superseded observations before allocation
```

### Planning and preparation

```txt
resize-command-kit
  immutable request containing generation and expected predecessor revision

render-surface-plan-kit
  derives requested CSS and physical dimensions

drawing-buffer-allocation-kit
  applies candidate canvas.width / canvas.height only when changed

drawing-buffer-readback-kit
  records actual committed canvas dimensions

world-projection-policy-kit
  selects fit, contain or product-specific projection behavior

world-scale-policy-kit
  derives scale and center offset from nominal 720 x 560 world bounds

world-viewport-membership-kit
  classifies visible, clipped and outside simulation positions
```

### Results and observation

```txt
stale-resize-rejection-kit
  rejects old generations and predecessor revisions

render-surface-observation-kit
  publishes requested and applied dimensions, DPR, scale and fallback reason

render-surface-journal-kit
  retains bounded resize/commit history

visible-surface-frame-receipt-kit
  correlates surface revision, state revision and committed canvas frame
```

### Proof kits

```txt
viewport-size-matrix-fixture-kit
dpr-resolution-fixture-kit
unchanged-frame-no-resize-fixture-kit
world-fit-membership-fixture-kit
stale-resize-generation-fixture-kit
browser-resize-orientation-smoke-kit
pages-canvas-surface-smoke-kit
```

## Commands

```txt
ObserveViewport
PrepareRenderSurface
CommitRenderSurface
RejectRenderSurface
RenderWorldFrame
AcknowledgeVisibleSurfaceFrame
```

## Core descriptors

### `ViewportObservation`

```txt
observationId
resizeGeneration
runtimeSessionId
canvasSurfaceId
cssWidth
cssHeight
devicePixelRatio
orientation
visibilityState
observedAt
```

### `RenderSurfacePlan`

```txt
surfaceId
predecessorRevision
candidateRevision
sourceObservationId
requestedCssWidth
requestedCssHeight
requestedDpr
appliedDpr
requestedBufferWidth
requestedBufferHeight
pixelCount
pixelBudget
worldScale
worldOffsetX
worldOffsetY
fallbackTier
```

### `RenderSurfaceResult`

```txt
accepted
reason
surfaceId
surfaceRevision
resizeGeneration
actualBufferWidth
actualBufferHeight
actualPixelCount
worldScale
worldOffsetX
worldOffsetY
predecessorPreserved
```

### `VisibleSurfaceFrameReceipt`

```txt
frameId
runtimeSessionId
stateRevision
surfaceId
surfaceRevision
worldRenderResult
htmlRenderResult
presentedAt
```

## Required transaction

```txt
ViewportObservation
  -> validate runtime session and canvas identity
  -> reject stale resize generation
  -> normalize CSS dimensions and DPR
  -> enforce capability and pixel budget
  -> derive candidate physical dimensions
  -> derive world scale and offset
  -> skip allocation when candidate equals committed surface
  -> prepare drawing buffer
  -> read actual dimensions
  -> commit one surface revision or preserve predecessor
  -> render against committed projection
  -> acknowledge visible surface frame
```

## Consumer map

| Consumer | Required surface data |
|---|---|
| world canvas renderer | committed dimensions, center, scale, revision |
| world membership diagnostics | viewport bounds and projection |
| HTML renderer | correlated frame/surface revision |
| GameHost diagnostics | requested/applied dimensions and fallback |
| browser fixture | deterministic resize and DPR results |
| Pages smoke | deployed surface and visible-frame receipt |

## Dependency order

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Route and Input Admission
  -> Public Capability Gateway
  -> Composite Command Transaction Authority
  -> Frame Publication Fault Containment Authority
  -> Canvas Render Surface Authority
  -> Seeded Replay and Persistence Authorities
```

## Gate

Do not let the canvas renderer continue to own policy through ambient dimension writes. The committed render-surface descriptor must be the only source for drawing-buffer dimensions and world projection.
