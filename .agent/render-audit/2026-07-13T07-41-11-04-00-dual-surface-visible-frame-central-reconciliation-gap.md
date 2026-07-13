# Render audit: dual-surface visible-frame reconciliation gap

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Summary

The browser projects one runtime snapshot through a canvas and an HTML subtree, but the two mutations are sequential and return no typed receipts. A canvas success followed by an HTML exception is therefore an unclassified partial frame.

## Plan ledger

**Goal:** make both visible surfaces cite the same immutable frame envelope and terminal commit result.

- [x] Trace `world.render(snapshot)` before `ui.render(snapshot)`.
- [x] Confirm neither renderer returns a projection receipt.
- [x] Confirm canvas buffer dimensions are reassigned during rendering.
- [x] Confirm the HTML subtree is replaced during rendering.
- [x] Confirm visible state cannot be read back through `GameHost`.
- [ ] Add surface revisions, preparation results, commit classification, and visible acknowledgement.

## Current render path

```txt
T2 snapshot
  -> world.render(T2)
     -> resize/reset canvas drawing buffer
     -> draw orchard and active-session entities
  -> ui.render(T2)
     -> select route/HUD projection
     -> replace #ui-root
  -> request next RAF
```

## Missing render evidence

```txt
FrameEnvelopeId: absent
CanvasSurfaceRevision: absent
HtmlSurfaceRevision: absent
ViewportRevision: absent
RouteRevision: absent
CanvasProjectionResult: absent
HtmlProjectionResult: absent
DualSurfaceFrameCommitResult: absent
last complete frame receipt: absent
visible fingerprint: absent
first visible acknowledgement: absent
```

## Required render result

```txt
DualSurfaceFrameCommitResult {
  frameCommitId,
  frameEnvelopeId,
  stateRevision,
  canvasResult,
  htmlResult,
  classification,
  visibleFingerprint,
  predecessorCompleteFrameId,
  recoveryAction
}
```

## Required classifications

```txt
complete
partial-canvas-only
partial-html-only
failed
stale
superseded
recovered-predecessor
```

## Deployment proof

Source, `dist`, and GitHub Pages must show equivalent frame-envelope IDs, surface receipts, classification, and visible readback before parity is claimed.

## Non-claims

No render source changed. No atomicity, recovery, parity, or visible-frame claim is made.