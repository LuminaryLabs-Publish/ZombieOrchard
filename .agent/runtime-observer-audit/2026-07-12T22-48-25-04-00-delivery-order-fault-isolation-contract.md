# Runtime observer audit: delivery order and fault-isolation contract

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

This contract defines the minimum runtime semantics required before subscriptions can be treated as reliable infrastructure.

## Plan ledger

**Goal:** guarantee immutable, monotonic, bounded and diagnosable delivery.

- [x] Define identity contract.
- [x] Define ordering contract.
- [x] Define failure contract.
- [x] Define retirement contract.
- [x] Define frame-correlation contract.
- [ ] Implement and validate.

## Identity contract

Every publication requires:

```txt
runtimeSessionId
publicationId
publicationSequence
predecessorSequence
stateRevision
frame
elapsed
eventRange
snapshotFingerprint
```

Every observer requires:

```txt
observerId
observerGeneration
subscribedAtSequence
lastDeliveredSequence
status
budgetPolicy
```

## Ordering contract

- Delivery for sequence N completes before sequence N+1 starts.
- Reentrant commands or ticks are queued or rejected by explicit policy.
- An observer never receives a lower sequence after a higher sequence.
- Coalescing, when enabled, records exactly which sequences were skipped.

## Immutability contract

- The envelope and domain projections are read-only.
- One observer cannot alter another observer's delivery.
- Snapshot fingerprint remains stable through delivery.

## Failure contract

- Each callback is isolated.
- A failure produces `ObserverDeliveryFailed`.
- Remaining observers continue.
- The committed mutation result remains available.
- Failure reporting is bounded and cannot recursively publish without policy.

## Retirement contract

- Unsubscribe is idempotent.
- Retired generations receive no successor sequence.
- Subscription changes during delivery follow one documented policy.

## Frame contract

Canvas and HTML presentation consume an admitted publication sequence and publish one shared visible-frame acknowledgement.
