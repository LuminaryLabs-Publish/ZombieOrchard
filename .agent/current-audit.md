# Current audit: ZombieOrchard cross-domain gameplay transaction settlement

**Timestamp:** `2026-07-16T16-40-45-04-00`  
**Status:** `cross-domain-gameplay-transaction-settlement-authority-audited`  
**Retained status:** `game-audio-event-projection-authority-central-reconciled`  
**Branch:** `main`

## Summary

Collection, clearing, construction, and hiring are single player actions implemented as several immediate domain mutations. No authority binds their participants to one transaction identity, expected revisions, preflight, prepared intents, atomic commit, rollback, duplicate handling, exact nested result, or presented-frame acknowledgement.

## Plan ledger

**Goal:** settle every multi-domain gameplay command exactly once, or reject it before any participant changes.

- [x] Inspect boot, runtime, composition, game domains, delegated HTML input, Canvas2D/HTML projection, smoke, build, and deployment.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 20-surface cross-domain transaction authority.
- [x] Define participant failure, rollback, retry, nested-result, parity, and frame-convergence fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
collect removes/replaces apple before optional rewards and pressure
clear can remove pest before optional scrap reward
construction and roster debit before acquired-record mutation
interface composition discards nested command result
TransactionId: absent
IdempotencyKey: absent
expected participant revisions: absent
preflight and prepare: absent
atomic commit: absent
rollback or compensation: absent
terminal transaction journal: absent
FirstTransactionBoundFrameAck: absent
cross-domain failure fixture count: 0
```

No partial-settlement incident was reproduced. This is an ownership and proof gap.

## Required authority

`zombie-orchard-cross-domain-gameplay-transaction-settlement-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, Canvas2D, audio, dependency, test, artifact, workflow, or deployment behavior changed.