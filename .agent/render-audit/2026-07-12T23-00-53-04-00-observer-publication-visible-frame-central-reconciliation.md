# Render audit: observer publication visible-frame reconciliation

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Summary

`draw()` calls `engine.tick()` before both renderers and schedules the successor RAF only after rendering. A subscriber failure can therefore occur after simulation commit but before canvas projection, HTML projection and the next frame request.

## Plan ledger

**Goal:** make visible projection consume an identified publication without allowing observer delivery to stop frame-loop progress.

- [x] Confirm tick precedes canvas and HTML rendering.
- [x] Confirm successor RAF is scheduled after both renderers.
- [x] Confirm observer exceptions escape tick.
- [x] Confirm no publication/frame correlation exists.
- [ ] Add typed tick, delivery and frame results.
- [ ] Add browser and Pages liveness fixtures.

## Current risk

```txt
state commits
  -> observer throws
  -> engine.tick throws
  -> canvas render skipped
  -> HTML render skipped
  -> successor RAF skipped
```

The previous visible frame can remain on screen while authoritative state has already advanced.

## Required evidence chain

```txt
PublicationId + sequence
  -> immutable SnapshotEnvelope
  -> ObserverDeliveryReport
  -> CanvasProjectionReceipt
  -> HtmlProjectionReceipt
  -> FirstPublicationFrameAck
```

## Required rules

- Render from one admitted immutable envelope.
- Do not recapture a second anonymous snapshot for the same tick.
- Record canvas and HTML adoption against the same publication sequence.
- Isolate observer failures from renderer admission.
- Preserve successor RAF scheduling through bounded error handling.
- Never claim a visible successor frame without a matching acknowledgement.

## Proof gap

No source, browser, `dist` or deployed Pages fixture currently injects a throwing or reentrant observer and verifies frame-loop liveness.