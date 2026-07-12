# Run reset audit: participant reset atomic commit contract

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

A reset cannot be implemented as a sequence of public domain commands because observers could see partially reset state and a later participant failure could strand the graph. Reset must construct and validate a complete candidate generation before one atomic install.

## Plan ledger

**Goal:** specify participant contracts, commit semantics, rollback, stale-result handling and exactly-once predecessor retirement.

- [x] Enumerate reset participants.
- [x] Define candidate-state requirements.
- [x] Define cross-domain validation.
- [x] Define atomic install and rollback.
- [x] Define predecessor retirement.
- [x] Define idempotency and stale-result policy.
- [x] Define observations and receipts.
- [ ] Implement and execute the contract.

## Participant reset contract

Each mutable participant must provide one of:

```txt
createInitialState(preset, runContext) -> CandidateState
validateInitialState(candidate, runContext) -> ValidationResult
commitInitialState(candidate, commitContext) -> ParticipantResetReceipt
retirePredecessor(predecessor, retireContext) -> RetirementResult
```

or a new domain instance that can be installed through the kit-graph authority.

## Cross-domain validation

```txt
resource keys match authored registry
construction costs reference registered resources
inventory equipped item exists and is owned
active player is inside world bounds
score/day/phase/ended match reset policy
pest and apple IDs are unique within the new generation
orchard, pest and ID streams bind to the new run seed
interface active route is compatible with run phase
participant revisions all cite the same run generation
```

## Atomic commit rule

No live participant mutates until every candidate is created and validated. The commit either installs all successor participants under one run revision or installs none.

## Failure handling

```txt
candidate creation failure -> reject; predecessor unchanged
candidate validation failure -> reject; predecessor unchanged
commit-stage failure before publication -> rollback candidate; predecessor remains authoritative
late async result from predecessor -> stale rejection
repeated command ID -> return prior result; no second reset
post-commit predecessor callback -> fenced by generation
retirement failure -> typed degraded result and bounded cleanup retry; successor identity remains explicit
```

## Required receipts

```txt
RunResetResult
ParticipantResetReceipt[]
PredecessorRetirementReceipt[]
RunStateFingerprint
RunFrameReceipt
```

Receipts must identify before and after run IDs, generations, revisions, participant fingerprints and the reset command ID.

## Non-claim

No participant reset contract exists in runtime source today.