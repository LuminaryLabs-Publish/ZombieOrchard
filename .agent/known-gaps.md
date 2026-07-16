# Known gaps: ZombieOrchard cross-domain gameplay transaction settlement

**Timestamp:** `2026-07-16T16-40-45-04-00`  
**Status:** `cross-domain-gameplay-transaction-settlement-authority-audited`

## Summary

Multi-domain gameplay actions can report acceptance after sequential, independently owned mutations without proof that all intended participants settled together.

## Plan ledger

**Goal:** keep transaction ownership and proof gaps explicit until implemented and executed.

- [x] Record source-backed mutation-order and result-propagation gaps.
- [x] Preserve participant ownership boundaries.
- [x] Define required settlement results and fixtures.
- [ ] Close the gaps in runtime code.

## Gaps

```txt
stable TransactionId and IdempotencyKey
canonical payload digest and attempt identity
expected participant revisions
required-participant capability admission
preflight before mutation
immutable prepared participant intents
atomic multi-participant commit
rollback or explicit compensation
terminal transaction journal
exact duplicate-result replay
nested command result propagation
partial/ambiguous failure classification
transaction-bound HTML revision
transaction-bound Canvas2D revision
FirstTransactionBoundFrameAck
missing-participant fixtures
stale-revision fixtures
duplicate-delivery fixtures
rollback/compensation fixtures
source/dist/Pages transaction parity fixtures
```

## Retained gaps

The game-audio authority and previously documented pressure, determinism, persistence, lifecycle, rendering, command, accessibility, and gameplay-adoption gaps remain retained unless separately implemented and validated.