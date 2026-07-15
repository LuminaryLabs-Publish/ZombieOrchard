# Render audit: manual tick visible-frame divergence

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

`GameHost.tick(dt)` advances simulation and returns a snapshot but does not call the Canvas2D or HTML renderer. The next RAF advances the engine again before rendering, so the first visible frame after an external tick can represent a later state than the tick result.

## Plan ledger

**Goal:** require every externally admitted visible mutation to identify and acknowledge the exact HTML and Canvas2D frame that presents it.

- [x] Trace `GameHost.tick()`.
- [x] Trace recursive RAF ordering.
- [x] Confirm both renderers are called only from RAF `draw()`.
- [x] Confirm snapshots omit runtime and presentation frame revisions.
- [ ] Add one simulation-result to presentation-frame contract.
- [ ] Add browser capture fixtures.

## Current path

```txt
external caller
  -> GameHost.tick(dt)
  -> engine frame N settles
  -> subscribers receive snapshot N
  -> no renderer runs

next RAF
  -> engine frame N+1 settles
  -> Canvas2D renders N+1
  -> HTML renders N+1
```

## Missing evidence

```txt
PublicMutationResultId
RuntimeFrameRevision
HtmlFrameRevision
CanvasFrameRevision
snapshot fingerprint
route and run generation
FirstVisiblePublicMutationFrameAck
headless-step classification
```

## Required frame result

```txt
PublicMutationResult
  -> accepted runtime frame
  -> accepted snapshot fingerprint
  -> expected HTML and Canvas2D presentation policy
  -> first matching HTML frame receipt
  -> first matching Canvas2D frame receipt
  -> terminal visible acknowledgement
```

## Validation boundary

No browser or visual fixture was run. This is a source-proven ordering gap, not a claim that a user-visible defect was reproduced.