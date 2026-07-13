# Architecture audit: runtime observer publication central reconciliation

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Summary

The runtime currently treats observer delivery as ambient control flow inside `command()` and `tick()`. It needs a bounded publication authority that starts only after state commit and cannot change the committed result.

## Plan ledger

**Goal:** define the DSK boundary that separates mutation, immutable publication, observer delivery and visible-frame acknowledgement.

- [x] Confirm runtime mutation precedes `notify()`.
- [x] Confirm one shared snapshot is passed to every listener.
- [x] Confirm nested command/tick can publish during predecessor delivery.
- [x] Confirm listener failure is not isolated.
- [x] Reconcile repo-local findings with central tracking.
- [ ] Implement the authority and fixtures.

## Current boundary

```txt
command/tick
  -> mutate domains
  -> snapshot
  -> synchronous listeners
  -> caller/render continuation
```

## Required composed domain

`zombie-orchard-runtime-observer-publication-authority-domain`

### Identity and provenance

```txt
runtime-publication-id-kit
runtime-publication-sequence-kit
snapshot-envelope-kit
snapshot-fingerprint-kit
observer-id-kit
observer-generation-kit
observer-cursor-kit
```

### Admission and delivery

```txt
snapshot-immutability-kit
observer-subscription-kit
observer-delivery-queue-kit
observer-reentrancy-guard-kit
observer-mutation-admission-kit
observer-fault-isolation-kit
observer-backpressure-budget-kit
observer-retirement-kit
```

### Results and proof

```txt
observer-delivery-result-kit
committed-command-result-kit
committed-tick-result-kit
publication-journal-kit
publication-observation-kit
first-publication-frame-ack-kit
observer-order-fixture-kit
observer-fault-fixture-kit
observer-reentrancy-fixture-kit
observer-source-dist-pages-parity-fixture-kit
```

## Ownership rule

Domain mutation owns the state commit. Publication authority owns immutable envelopes and ordered delivery. Observers own only their local reaction. No observer may mutate the envelope, invalidate a committed command, nest delivery or prevent remaining observers and rendering from progressing.

## Required transaction

```txt
CommittedMutation
  -> PublicationPlan
  -> immutable SnapshotEnvelope
  -> queued monotonic delivery
  -> per-observer DeliveryResult
  -> bounded journal and observation
  -> admitted canvas/HTML projection
  -> FirstPublicationFrameAck
```

## Non-claims

The authority is documented only. Runtime implementation and executable proof remain absent.