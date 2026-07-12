# ZombieOrchard Frame Publication Fault Containment DSK Map

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

The runtime has no authority between durable state commit and public/visible projection. This composed domain separates committed command/step results from observer delivery, render-stage success, successor scheduling, recovery, and frame acknowledgement.

## Plan ledger

**Goal:** define the smallest complete DSK composition that prevents observer or renderer failure from rewriting committed results or silently terminating the browser loop.

- [x] Map command and tick mutation boundaries.
- [x] Map subscriber registration and delivery.
- [x] Map world and HTML render stages.
- [x] Map successor RAF scheduling.
- [x] Separate recoverable observer/render failures from critical simulation failures.
- [x] Define identities, results, policies, journals, observations, and fixtures.
- [ ] Implement only after runtime-session and command-transaction boundaries are preserved.

## Parent domain

```txt
zombie-orchard-frame-publication-fault-containment-authority-domain
```

## Composition

```txt
zombie-orchard-frame-publication-fault-containment-authority-domain
  identity
    -> frame-cycle-id-kit
    -> frame-cycle-generation-kit
    -> command-commit-revision-kit

  stage model
    -> frame-cycle-stage-kind-kit
    -> frame-cycle-stage-result-kit
    -> frame-cycle-lease-kit

  publication
    -> post-commit-publication-barrier-kit
    -> detached-publication-snapshot-kit
    -> observer-lease-kit
    -> observer-delivery-result-kit
    -> observer-fault-isolation-kit
    -> observer-quarantine-policy-kit
    -> observer-revocation-result-kit

  rendering
    -> world-render-stage-result-kit
    -> html-render-stage-result-kit
    -> render-fault-classification-kit

  scheduling and recovery
    -> frame-schedule-finalizer-kit
    -> frame-cycle-result-kit
    -> frame-recovery-policy-kit
    -> frame-recovery-generation-kit

  observation
    -> frame-fault-journal-kit
    -> frame-cycle-observation-kit
    -> visible-frame-receipt-kit

  proof
    -> command-notification-fault-fixture-kit
    -> subscriber-throw-loop-liveness-fixture-kit
    -> renderer-throw-loop-liveness-fixture-kit
    -> multi-listener-isolation-fixture-kit
    -> browser-frame-recovery-smoke-kit
```

## Stage model

```txt
SIMULATION_COMMIT
PUBLICATION_SNAPSHOT
OBSERVER_DELIVERY
WORLD_RENDER
HTML_RENDER
FRAME_ACK
SUCCESSOR_SCHEDULE
RECOVERY
STOP
```

Each stage returns:

```txt
FrameCycleStageResult {
  frameCycleId
  frameCycleGeneration
  stage
  status
  startedAtSequence
  completedAtSequence
  stateRevision
  publicationCycleId
  observerLeaseId?
  surfaceId?
  faultClass?
  errorCode?
}
```

## Observer contract

```txt
ObserverLease {
  observerLeaseId
  runtimeSessionId
  generation
  state
  failureCount
  createdAtSequence
  revokedAtSequence?
}

ObserverDeliveryResult {
  publicationCycleId
  observerLeaseId
  status: DELIVERED | FAILED | QUARANTINED | REVOKED | STALE
  stateRevision
  errorCode?
}
```

A failed observer cannot:

```txt
rewrite the committed command result
prevent later observers from receiving the snapshot
throw into the browser frame owner
claim a successful delivery
remain active after deterministic revocation policy closes its lease
```

## Frame-cycle result

```txt
FrameCycleResult {
  frameCycleId
  frameCycleGeneration
  stateRevision
  publicationCycleId
  observerSummary
  worldRenderResult
  htmlRenderResult
  scheduleResult
  recoveryResult
  status: COMPLETE | PARTIAL | FAILED | RECOVERING | STOPPED
  visibleFrameReceiptId?
}
```

## Required transaction

```txt
committed command or fixed step batch
  -> allocate frame/publication identity
  -> clone one detached snapshot
  -> invoke each observer through isolated delivery
  -> collect delivery summary
  -> run required render stages independently
  -> classify frame result
  -> acknowledge visible frame only when policy requirements pass
  -> finalize successor scheduling or explicit stop
  -> append bounded detached fault observation
```

## Failure policy

```txt
observer failure
  -> recoverable
  -> isolate, record, continue later deliveries
  -> quarantine/revoke under explicit threshold

single render-surface failure
  -> policy-defined PARTIAL or FAILED
  -> no false complete-frame receipt
  -> successor scheduling remains explicit

critical simulation-stage failure
  -> not hidden as observer/render recovery
  -> transition runtime session to FAULTED or STOPPED
  -> require explicit recovery/restart authority
```

## Invariants

```txt
one committed mutation has one stable result meaning
observer delivery failure changes no committed gameplay owner
one observer cannot suppress later observers
one cycle has one explicit successor-schedule result
a failed required surface cannot produce a complete visible-frame receipt
stale recovery generations cannot submit frames or callbacks
fault observations are detached and bounded
```

## Dependency boundary

```txt
runtime session identity
  -> fixed-step and route admission
  -> public capability gateway
  -> composite command transaction
  -> frame-publication fault containment
  -> replay and persistence
```

This domain does not make partially executed domain ticks atomic. It starts at a committed command/step boundary and routes critical simulation failure to explicit lifecycle recovery rather than silently continuing.
