# Render audit: graph revision to visible frame proof

**Timestamp:** `2026-07-12T10-09-07-04-00`

## Summary

Canvas and HTML renderers consume snapshots that contain only domain projections. They cannot identify which kit graph, service bindings or installation order produced the frame. A live `addKit()` replacement can therefore alter both surfaces without a graph revision or first-visible-frame receipt.

## Plan ledger

**Goal:** require both render surfaces to cite the same committed graph and state revisions before a frame is considered authoritative.

- [x] Trace the browser frame from tick to canvas and HTML projection.
- [x] Confirm snapshots omit graph identity and installation receipts.
- [x] Confirm live domain replacement can change subsequent render reads.
- [x] Define shared graph/frame provenance.
- [ ] Implement browser and Pages fixtures.

## Current frame path

```txt
engine.tick(1 / 60)
  -> mutate domains in object insertion order
  -> create domain-only snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> no graph ID, revision or fingerprint
```

## Missing frame fields

```txt
graphId
graphRevision
graphFingerprint
resolvedPhaseOrder
serviceBindingDigest
installationReceiptIds
stateRevision
canvasFrameReceipt
htmlFrameReceipt
sharedVisibleFrameId
```

## Failure path

```txt
frame N renders predecessor active-session
  -> external script calls GameHost.engine.addKit()
  -> active-session owner is replaced in the live map
  -> frame N+1 renders new state shape
  -> no replacement result or graph revision exists
  -> canvas and HTML cannot prove coherent ownership
```

## Required proof

```txt
committed KitGraphRevision
  -> committed StateRevision
  -> one render projection plan
  -> canvas receipt cites both revisions
  -> HTML receipt cites both revisions
  -> visible-frame receipt proves parity
```

No graph-to-frame consistency claim is valid until duplicate replacement, phase-order and browser/Pages fixtures pass.