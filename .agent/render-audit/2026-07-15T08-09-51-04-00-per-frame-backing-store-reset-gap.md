# Render audit: Per-frame Canvas2D backing-store reset gap

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

`world.render(snapshot)` assigns the canvas width and height before every draw. The backing store is therefore reinitialized on every rendered frame and is sized from CSS pixels without an explicit DPR policy.

## Plan ledger

**Goal:** resize only when the accepted physical render-surface descriptor changes, then render all unchanged frames through one stable context generation.

- [x] Trace the active Canvas2D render path.
- [x] Confirm both dimension assignments are inside every render call.
- [x] Confirm CSS uses a full-viewport logical surface.
- [x] Confirm no DPR policy or conditional resize guard exists.
- [x] Confirm no browser fixture proves backing-store behavior.
- [ ] Implement versioned physical sizing and stable-frame reuse.

## Current path

```txt
snapshot
  -> read CSS client width and height
  -> write canvas.width
  -> write canvas.height
  -> clear logical CSS-sized backing store
  -> draw trees apples pests and player
```

## Source-backed gaps

```txt
conditional width assignment: absent
conditional height assignment: absent
devicePixelRatio consumption: absent
physical-size descriptor: absent
ResizeObserver: absent
DPR-change observer: absent
context generation: absent
resize adoption result: absent
retirement receipt: absent
first matching visible frame acknowledgement: absent
```

## Risk boundary

The source permits repeated backing-store initialization and low-density output on high-DPR displays. No allocation trace, frame-time trace, screenshot comparison, or pixel-density measurement was executed, so no visible or performance defect is claimed.

## Acceptance target

```txt
logical size = accepted CSS viewport
physical size = round(logical size * accepted DPR)
canvas width/height change only when physical size changes
context transform maps logical coordinates to physical pixels
unchanged frames preserve context generation
resize publishes result before visible-frame acknowledgement
```
