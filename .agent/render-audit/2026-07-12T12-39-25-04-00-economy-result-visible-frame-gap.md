# Render audit: economy result to visible-frame gap

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

Canvas and HTML render domain snapshots after commands, but neither surface receives an economy command ID, resource revision, catalog revision, mutation receipt or rejected-command evidence. A caller cannot prove which admitted economic result produced the visible money, roster, built-item or equipped-item state.

## Plan ledger

**Goal:** correlate every visible economic change with one committed semantic command result.

- [x] Trace command notification and snapshot creation.
- [x] Trace HTML resource, construction, roster and inventory projection.
- [x] Confirm canvas and HTML have no economy revision or receipt.
- [x] Define required render evidence.
- [ ] Implement and test first-frame acknowledgement.

## Current path

```txt
engine.command(...)
  -> participant mutation
  -> synchronous notify(snapshot)
  -> later RAF engine.tick()
  -> canvas render(snapshot)
  -> HTML render(snapshot)
```

## Missing evidence

```txt
economyCommandId
economyRevision
resourceRevision
catalogRevision
mutationPlanFingerprint
balanceDeltaReceipts
participantCommitReceipts
rejectionReason
firstVisibleCanvasFrame
firstVisibleHtmlFrame
```

## Required render contract

```txt
CommittedEconomyResult
  -> immutable render projection
  -> economy revision attached to snapshot
  -> HTML and canvas consume the same committed revision
  -> each surface returns a typed render result
  -> frame coordinator acknowledges the first complete matching frame
```

## Proof cases

```txt
valid build -> money/wood and built item appear under one revision
rejected negative cost -> no visual balance change
unknown item -> typed rejection and unchanged inventory projection
duplicate command ID -> same result, no second visual mutation
partial renderer failure -> no false complete-frame acknowledgement
```

No visible-frame provenance claim is made until these fixtures exist and pass.