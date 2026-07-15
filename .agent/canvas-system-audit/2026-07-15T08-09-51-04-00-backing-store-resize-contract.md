# Canvas system audit: Backing-store resize contract

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

The canvas system needs a stable logical-coordinate contract, a physical backing-store descriptor, and atomic resize adoption. The current renderer has none of these as explicit state.

## Plan ledger

**Goal:** make Canvas2D sizing deterministic, DPR-aware, change-driven, disposable, and independently testable.

- [x] Define logical and physical dimensions.
- [x] Define context-generation ownership.
- [x] Define unchanged, adopted, rejected, and failed outcomes.
- [x] Define resize and visible-frame receipts.
- [ ] Implement the contract.
- [ ] Execute the fixture matrix.

## Contract

```txt
logicalWidth  = validated CSS width
logicalHeight = validated CSS height
acceptedDpr   = clamp(deviceDpr, policyMin, policyMax)
physicalWidth  = round(logicalWidth * acceptedDpr)
physicalHeight = round(logicalHeight * acceptedDpr)
```

Adoption rules:

```txt
unchanged descriptor
  -> do not write canvas.width or canvas.height
  -> preserve ContextGeneration

changed descriptor
  -> prepare successor dimensions
  -> write both dimensions in one admitted transaction
  -> reapply logical-coordinate transform
  -> publish successor ContextGeneration
  -> retire predecessor generation

invalid or stale descriptor
  -> preserve accepted predecessor
  -> publish rejection result
```

## Drawing contract

```txt
ctx.setTransform(acceptedDpr, 0, 0, acceptedDpr, 0, 0)
clear in logical coordinates
project world entities in logical coordinates
bind CanvasFrameResult to StateRevision and RenderSurfaceRevision
```

## Fixture matrix

```txt
DPR 1.0, 1.25, 1.5, 2.0 and capped values
unchanged 60-frame viewport writes dimensions once
CSS resize writes dimensions once per accepted change
DPR change adopts one successor generation
zero and non-finite sizes reject safely
rapid stale resize results are rejected
source and dist screenshots match expected physical density
Pages frame reports the same accepted descriptor
retirement rejects late callbacks
```
