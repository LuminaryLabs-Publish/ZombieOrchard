# ZombieOrchard CSS / DPR / Drawing-Buffer Parity Gap

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

The canvas is visually full-window through CSS, but its drawing buffer is recreated at CSS-pixel resolution every frame. This produces high-DPI softness, repeated context resets and no authoritative record of which physical buffer displayed a gameplay snapshot.

## Plan ledger

**Goal:** document the visual defect and the exact render evidence required before the canvas is considered resolution-correct.

- [x] Read canvas CSS ownership.
- [x] Read drawing-buffer sizing and render order.
- [x] Compare CSS pixels with physical pixels.
- [x] Inspect world-coordinate placement.
- [x] Identify missing render-surface diagnostics.
- [ ] Add bounded DPR-aware allocation.
- [ ] Add resize and orientation fixtures.

## Current render path

```txt
#world CSS
  -> position fixed
  -> width 100vw
  -> height 100vh

world.render(snapshot)
  -> w = canvas.clientWidth || window.innerWidth
  -> h = canvas.clientHeight || window.innerHeight
  -> canvas.width = w
  -> canvas.height = h
  -> clear buffer
  -> draw world centered at w/2, h/2
```

## Visual defects

### High-DPI softness

```txt
CSS viewport:        1920 x 1080
DPR:                 2
current buffer:      1920 x 1080
physical target:     3840 x 2160
current pixel count: 2,073,600
physical pixel count:8,294,400
```

The current canvas provides one quarter of the physical display pixels in this example.

### Unbounded future correction risk

A naïve DPR multiplication is not sufficient:

```txt
CSS viewport: 3840 x 2160
DPR:          2
candidate:    7680 x 4320
pixels:       33,177,600
```

The correction requires a product pixel budget and explicit fallback tier.

### Repeated buffer reset

The width and height assignments run every rendered frame even when the dimensions are unchanged. Canvas dimension writes reset the drawing buffer and context state. The renderer currently performs no equality check and has no resize generation.

### Fixed world projection

World entities are drawn using:

```txt
screenX = canvasWidth / 2 + worldX
screenY = canvasHeight / 2 + worldY
```

No scale, camera, safe frame or clipping policy is applied. A narrow viewport can hide valid player, pest, tree and apple positions.

## Missing render observations

```txt
canvasSurfaceId
surfaceRevision
cssWidth/cssHeight
requestedDpr/appliedDpr
requestedBufferWidth/requestedBufferHeight
actualBufferWidth/actualBufferHeight
pixelBudget
fallbackTier
worldScale
worldOffset
clippedEntityCount
worldRenderResult
visibleSurfaceFrameReceipt
```

## Required render behavior

```txt
unchanged viewport
  -> no drawing-buffer resize
  -> reuse committed surface revision

viewport/DPR change
  -> create resize generation
  -> derive bounded candidate dimensions
  -> prepare and read back drawing buffer
  -> commit new surface revision
  -> derive world projection from committed surface
  -> render one frame
  -> publish visible receipt
```

## Required fixture matrix

| CSS viewport | DPR | Expected proof |
|---|---:|---|
| 320 x 480 | 1 | world-fit policy prevents silent offscreen player |
| 768 x 1024 | 2 | bounded physical dimensions and correct scale |
| 1366 x 768 | 1 | stable landscape projection |
| 1920 x 1080 | 2 | high-DPI buffer or declared fallback |
| 3840 x 2160 | 2 | pixel budget prevents unbounded allocation |
| unchanged for 600 frames | any | zero redundant resize commits |

## Gate

Do not claim a crisp, responsive or resolution-stable canvas until actual buffer dimensions, world projection and the first frame for each surface revision are executable proof artifacts.
