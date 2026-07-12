# Architecture audit: canvas render-surface authority sync

**Timestamp:** `2026-07-12T06-19-56-04-00`

## Goal

Define the DSK boundary that owns viewport observation, bounded physical allocation, world projection and visible-frame evidence.

## Current ownership

```txt
CSS and browser
  -> own viewport and device scale

world-canvas-render-kit
  -> samples CSS size during every render
  -> assigns drawing-buffer size
  -> clears and draws raw world coordinates

active-session-domain-kit / orchard-world-kit
  -> own simulation coordinates and bounds

GameHost
  -> exposes gameplay snapshot only
```

No component owns the complete surface transaction.

## Required parent domain

```txt
zombie-orchard-canvas-render-surface-authority-domain
```

## Candidate kits

```txt
canvas-surface-id-kit
canvas-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
canvas-capability-kit
resize-command-kit
resize-generation-kit
resize-coalescing-kit
render-surface-plan-kit
drawing-buffer-allocation-kit
drawing-buffer-readback-kit
world-projection-policy-kit
world-scale-policy-kit
world-viewport-membership-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-resize-rejection-kit
render-surface-observation-kit
render-surface-journal-kit
visible-surface-frame-receipt-kit
viewport-size-matrix-fixture-kit
dpr-resolution-fixture-kit
unchanged-frame-no-resize-fixture-kit
world-fit-membership-fixture-kit
browser-resize-orientation-smoke-kit
pages-canvas-surface-smoke-kit
```

## Required transaction

```txt
ViewportObservation
  -> identify canvas, runtime session and observation generation
  -> validate positive CSS dimensions
  -> normalize requested DPR
  -> enforce capability and physical-pixel budget
  -> derive bounded physical dimensions and fallback tier
  -> derive world projection and membership policy
  -> coalesce superseded observations
  -> skip unchanged allocation
  -> allocate candidate buffer and read actual dimensions
  -> commit one monotonic surface revision or preserve predecessor
  -> render from the committed projection
  -> acknowledge a visible frame citing the surface revision
```

## Dependency position

```txt
runtime session
  -> fixed-step clock
  -> route and input admission
  -> public capability gateway
  -> composite command transaction
  -> frame-publication fault containment
  -> canvas render-surface authority
  -> replay and persistence
```

## Invariants

- CSS pixels and drawing-buffer pixels are distinct quantities.
- DPR multiplication is bounded by an explicit pixel budget.
- Unchanged dimensions do not reset the canvas.
- A world entity is either projected under a named policy or reported outside membership.
- A surface allocation is not a visible-frame acknowledgement.
- Public diagnostics cite the committed surface revision.