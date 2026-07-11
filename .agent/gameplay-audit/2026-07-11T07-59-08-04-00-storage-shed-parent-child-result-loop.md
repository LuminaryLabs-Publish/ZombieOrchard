# Gameplay audit: Storage Shed parent and child result loop

## Summary

The current Storage Shed action is the clearest executable composite command. It begins as an accepted screen action, invokes a child build, can debit resources and create an object, but returns no child receipt to the caller. Parent success is therefore not equivalent to gameplay success.

## Plan ledger

**Goal:** document the complete gameplay effect chain and the exact acceptance rules required for a truthful build transaction.

- [x] Trace the preset action.
- [x] Trace screen activation.
- [x] Trace child build dispatch.
- [x] Trace resource payment.
- [x] Trace object creation and message mutation.
- [x] Identify false-success and fallback cases.
- [x] Define prepare, commit, rollback, and result behavior.
- [ ] Implement the transaction.
- [ ] Add fixtures.

## Current loop

```txt
Construction screen
  -> Storage Shed action
  -> parent screen activation accepted
  -> child command construction-runtime.build({ id: storage-shed })
  -> target lookup
  -> resource-ledger.api.pay({ wood: 4, money: 8 })
  -> built object appended
  -> construction message updated
  -> child result returned to composition
  -> child result discarded
  -> parent returns accepted
```

## Failure modes

### Insufficient resources

```txt
child returns accepted: false
parent can still return accepted: true
caller receives no shortfall or child reason
child and parent publish separately
```

### Unknown target

```txt
requested id not found
  -> first catalog item selected
  -> resources may be debited
  -> Storage Shed may be built for an invalid request
```

### Later child failure

```txt
resource payment succeeds
  -> later mutation throws or rejects
  -> no staged before state
  -> no rollback receipt
  -> resources can remain debited without a committed object
```

### Command plus route

The composition layer evaluates `action.to` independently from the child result. A future action containing both a required command and a route could navigate after child rejection.

## Required build plan

```txt
BuildPlan
  transactionId
  targetId
  admittedCatalogEntry
  resourceDebitCandidate
  builtObjectCandidate
  messageCandidate
  routeCandidate
  beforeFingerprint
```

## Required result

```txt
BuildResult
  commandId
  transactionId
  accepted
  reason
  targetAdmission
  debitReceipt
  builtObjectReceipt
  routeResult
  beforeFingerprint
  afterFingerprint
  publicationCount
  committedTickId
  firstRenderedFrameId
```

## Acceptance rules

1. Unknown target identity rejects before payment.
2. Insufficient resources rejects the parent transaction.
3. Required child rejection prevents route commitment.
4. Resource and object changes commit together.
5. Any commit failure restores all before values.
6. Accepted, rejected, and rolled-back commands publish exactly once.
7. Repeated `commandId` returns the prior result without repeating effects.
