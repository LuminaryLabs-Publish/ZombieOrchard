# Gameplay audit: command and tick publication reconciliation

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Summary

Gameplay commands and simulation ticks mutate domain state before observer publication. Because publication is synchronous and unisolated, observer behavior can change the apparent result of an already committed gameplay transition.

## Plan ledger

**Goal:** preserve committed gameplay results independently from observer delivery while keeping observation order monotonic.

- [x] Trace command mutation through notification and result return.
- [x] Trace tick mutation through notification, rendering and RAF continuation.
- [x] Confirm observer failure can cause caller retry after a successful commit.
- [x] Confirm nested mutation can overtake predecessor publication.
- [ ] Add committed mutation IDs and idempotent retry handling.
- [ ] Add ordered observer delivery fixtures.

## Command loop

```txt
command accepted
  -> domain state mutates
  -> publication starts synchronously
  -> observer may throw or re-enter
  -> original caller receives result only if all delivery returns
```

## Gameplay consequences

```txt
throw after resource payment -> caller may retry and pay twice
throw after construction -> caller may retry an already-created object
nested command -> observers can see successor before predecessor
slow observer -> stalls command completion and the frame
```

## Required separation

```txt
CommittedCommandResult
  != ObserverDeliveryReport

CommittedTickResult
  != ObserverDeliveryReport
```

Observer delivery may report partial failure, timeout or retirement, but must not rewrite the accepted/committed status of the gameplay operation.

## Proof gap

The smoke suite does not register observers and cannot prove retry safety, monotonic publication or gameplay continuity after observer failure.