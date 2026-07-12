# Render audit: drawing-buffer and world-projection proof gap

**Timestamp:** `2026-07-12T06-19-56-04-00`

## Goal

Record the gap between browser CSS layout, physical canvas allocation, fixed world coordinates and visible-frame proof.

## Source path

`src/styles.css` makes `#world` fill `100vw x 100vh`. `src/renderer/world-canvas.js` then reads `clientWidth/clientHeight`, falls back to window dimensions and assigns those values to `canvas.width` and `canvas.height` inside every render.

## Current render path

```txt
CSS rectangle
  -> width/height sample
  -> unconditional drawing-buffer assignment
  -> context reset
  -> background clear
  -> center + raw entity coordinate
  -> canvas pixels
```

## Gaps

```txt
DPR not sampled
CSS and physical pixels conflated
no maximum pixel budget
no capability limit or fallback tier
no unchanged-size short circuit
no allocation/readback result
no context-reset observation
no world scale or camera transform
no contain/cover policy
no required-entity membership result
no surface revision in GameHost
no visible-frame receipt
```

## Concrete viewport mismatch

The gameplay world accepts approximately `x=-360..360` and `y=-280..280`. A `320 x 568` canvas only exposes about `x=-160..160` under the current centered 1:1 projection. A valid player, pest or apple can therefore exist outside the visible horizontal region.

## Required evidence

```txt
CSS size observation
requested and applied DPR
requested and actual buffer dimensions
pixel count and fallback tier
surface revision
world projection revision
world scale and offset
entity membership result
first visible frame using the committed surface
```

## Proof gate

Do not claim high-DPI clarity, stable canvas state, viewport-safe gameplay or surface/frame parity until real browser fixtures inspect drawing-buffer dimensions and rendered membership across the viewport matrix.