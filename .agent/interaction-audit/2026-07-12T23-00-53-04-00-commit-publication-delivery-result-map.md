# Interaction audit: commit, publication and delivery result map

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Summary

The runtime exposes one undifferentiated call stack for mutation and observation. This audit maps the missing typed boundaries needed to prevent shared-object mutation, nested delivery and committed-result ambiguity.

## Plan ledger

**Goal:** define explicit commands and results from committed mutation through observer delivery and visible projection.

- [x] Map `command()` and `tick()` mutation points.
- [x] Map snapshot capture and listener iteration.
- [x] Map reentrant and throwing observer paths.
- [x] Identify missing terminal results.
- [ ] Implement typed envelopes and results.
- [ ] Execute order, fault and reentrancy fixtures.

## Current map

```txt
command/tick
  -> mutate
  -> anonymous snapshot object
  -> listener callback
  -> no delivery result
  -> no observer receipt
  -> no frame acknowledgement
```

## Required map

```txt
MutationRequest
  -> MutationAdmissionResult
  -> CommittedMutationResult
  -> PublicationPlan
  -> SnapshotEnvelope
  -> ObserverDeliveryCommand
  -> ObserverDeliveryResult
  -> PublicationDeliveryReport
  -> CanvasProjectionReceipt
  -> HtmlProjectionReceipt
  -> FirstPublicationFrameAck
```

## Rejection and failure semantics

- Stale observer generations return `ObserverRetired` without invoking the callback.
- Duplicate publication sequences return `AlreadyDelivered`.
- Reentrant mutation follows one explicit queue-or-reject policy.
- Observer exceptions return `ObserverFault` and delivery continues.
- Backpressure returns a typed budget result without silently reordering sequences.
- A delivery failure never changes `CommittedMutationResult.accepted`.

## Missing current evidence

```txt
publication ID
predecessor sequence
observer ID/generation/cursor
snapshot fingerprint
immutable envelope
terminal delivery report
projection receipts
visible frame acknowledgement
```