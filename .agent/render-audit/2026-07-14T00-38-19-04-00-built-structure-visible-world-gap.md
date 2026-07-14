# Render audit: built-structure visible-world gap

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

The HTML route can display a purchased Storage Shed while the playable Canvas2D world remains unchanged. The two surfaces therefore disagree about whether the construction has entered the world.

## Plan ledger

**Goal:** bind accepted construction state to one Canvas2D and HTML revision and acknowledge the first visible matching frame.

- [x] Inspect both renderers.
- [x] Trace construction snapshot consumption.
- [x] Confirm the HTML renderer reads built records.
- [x] Confirm the Canvas2D renderer ignores built records.
- [x] Define the missing visible-frame contract.
- [ ] Add executable source, dist, and Pages render fixtures.

## Current projection split

```txt
construction-runtime.built
  -> html-interface-renderer
     -> Built cards on construction route

construction-runtime.built
  -X-> world-canvas-renderer
     -> no structure geometry
     -> no placement marker
     -> no collision projection
     -> no effect projection
```

## Visible consequences

- A resource debit can be visible in HUD values.
- A built card can be visible on the construction route.
- Returning to active-session shows no purchased object.
- There is no render revision or frame ID connecting the debit, card, and world.
- There is no acknowledgement that a matching Canvas2D frame was presented.

## Required render contract

```txt
ConstructionRenderCandidate
  -> bind ConstructionRevision and WorldRevision
  -> derive geometry from the accepted descriptor
  -> validate viewport and placement
  -> prepare without mutating the visible canvas
  -> commit with HTML projection under one frame envelope
  -> publish ConstructionCanvasProjectionResult
  -> publish FirstVisibleConstructionFrameAck
```

## Fixture gate

```txt
accepted structure appears at accepted coordinates
HTML and Canvas show the same construction revision
rejected build changes neither surface
failed canvas candidate preserves predecessor
resize retains the same world placement
source/dist/Pages images match semantic expectations
```

No visible-construction or frame-coherence claim is made.
