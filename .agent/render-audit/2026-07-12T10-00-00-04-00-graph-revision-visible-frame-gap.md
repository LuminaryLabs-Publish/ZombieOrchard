# Render audit: graph revision and visible-frame gap

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

Canvas and HTML render from domain snapshots that carry no kit-graph identity. A post-start domain replacement can change the state schema and owner while the renderers continue using the same keys, with no graph transition or first-frame receipt.

## Plan ledger

**Goal:** require every visible canvas and HTML projection to identify the committed kit graph that produced its state.

- [x] Trace graph construction to snapshots.
- [x] Trace snapshots into both renderers.
- [x] Confirm graph identity is absent.
- [x] Confirm domain replacement has no render transition.
- [x] Define graph-frame receipts and stale-frame rejection.
- [ ] Implement browser and Pages pixel/DOM proof.

## Current render path

```txt
mutable domains map
  -> engine.snapshot()
  -> object keyed only by domain ID
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> no graph ID, revision or fingerprint
```

## Failure path

```txt
visible frame N uses active-session owner A
  -> GameHost.engine.addKit installs owner B with same domain ID
  -> owner A disappears without disposal or migration
  -> next snapshot uses B under the same key
  -> canvas and HTML may project changed or partial shape
  -> no graph transition result explains the frame change
```

## Missing render evidence

```txt
graphId
graphRevision
graphFingerprint
stateRevision
canvasGraphFrameReceipt
htmlGraphFrameReceipt
firstGraphFrameAck
staleGraphFrameRejection
replacementTransitionFrame
```

## Required flow

```txt
committed KitGraphRevision
  -> state snapshot includes graph provenance
  -> render plans validate expected graph revision
  -> canvas commits one graph-frame receipt
  -> HTML commits one graph-frame receipt
  -> host acknowledges both receipts under one fingerprint
  -> stale predecessor frames are rejected
```

## Required fixtures

```txt
initial frame cites installed graph fingerprint
failed candidate graph produces no visible revision
successful explicit replacement produces one transition revision
stale predecessor snapshot cannot render after graph commit
canvas and HTML cite the same graph revision
source, dist and Pages receipts agree
```

## Validation boundary

Rendering behavior was not changed and no browser or Pages smoke was run.