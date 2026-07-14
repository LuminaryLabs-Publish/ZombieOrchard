# Interaction audit: run-start command and reset results

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

Current UI actions return route-transition acceptance, not run-start acceptance. A successful `Start` therefore means only that `active-session` exists as a route; it says nothing about clean state, seed, predecessor settlement, or render adoption.

## Plan ledger

**Goal:** replace ambiguous route success with typed run-start and run-exit results that every mandatory participant can cite.

- [x] Trace delegated click handling.
- [x] Trace interface action activation and nested commands.
- [x] Confirm Play and Start have no gameplay command.
- [x] Confirm Title has no exit or reset command.
- [ ] Add command identities, expected revisions, result classes, and receipts.

## Current result map

```txt
Play / Start
  -> interface-composition.activate
  -> scoped interface activate returns action descriptor
  -> interface-composition.move("active-session")
  -> { accepted: true, active: "active-session" }

Title
  -> route transition to entry
  -> no RunExitResult

failure or outcome
  -> implicit tick-time route transition
  -> no immutable outcome or predecessor citation
```

## Required result classes

```txt
RunStartAccepted
RunStartDuplicate
RunStartStale
RunStartRejected
RunStartPreparationFailed
RunStartAdoptionFailed
RunStartSuperseded
RunExitAccepted
RunExitDuplicate
RunExitStale
RunExitRejected
```

## Required receipts

```txt
resource reset receipt
pressure reset receipt
orchard-world seed/reset receipt
construction reset receipt
roster reset receipt
inventory reset receipt
active-session reset receipt
interface route adoption receipt
HTML projection receipt
Canvas2D projection receipt
FirstVisibleRunFrameAck
```

Route transition is a consequence of accepted run adoption, not proof that a run started.