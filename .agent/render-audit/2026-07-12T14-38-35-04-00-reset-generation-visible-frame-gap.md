# Render audit: reset generation visible-frame gap

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

Canvas and HTML render domain snapshots without a run ID, generation, reset revision or reset result. Even after a reset implementation is added, the current render contract could not prove that both surfaces display the same newly committed run.

## Plan ledger

**Goal:** require each post-reset frame to cite one committed run generation across canvas and HTML.

- [x] Trace frame order from tick to canvas and HTML.
- [x] Confirm snapshots contain no run generation.
- [x] Confirm renderers return no typed surface result.
- [x] Confirm no first-frame acknowledgement exists.
- [x] Define reset-frame receipt requirements.
- [ ] Implement and capture source/dist/Pages reset frames.

## Current frame path

```txt
requestAnimationFrame
  -> engine.tick(1/60)
  -> snapshot all live domains
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> schedule successor RAF
```

The snapshot is keyed only by domain ID. Neither renderer receives reset command identity, predecessor revision, candidate generation or commit receipt.

## Failure risks

```txt
route says active-session but participant state is predecessor data
canvas renders predecessor orchard while HTML presents a new-run route
one surface throws after reset while the other displays successor state
failed-run ended flag routes HTML back to Outcome before a new-run frame is proven
```

## Required read model fields

```txt
runId
runGeneration
runRevision
resetCommandId
resetResultRevision
participantRevisionMap
stateFingerprint
frameId
canvasSurfaceRevision
htmlSurfaceRevision
```

## Required receipt

```txt
RunFrameReceipt {
  runId
  runGeneration
  runRevision
  frameId
  participantRevisionMap
  canvas: complete|failed
  html: complete|failed
  stateFingerprint
}
```

A reset is not visibly complete until both required surfaces acknowledge the same run generation and participant fingerprint.

## Non-claim

No render source changed. No canvas/HTML reset parity or first-visible-frame proof exists.