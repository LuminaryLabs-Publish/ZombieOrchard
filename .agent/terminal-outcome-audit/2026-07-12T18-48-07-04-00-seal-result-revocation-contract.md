# Terminal outcome audit: seal, result and revocation contract

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

This contract defines the minimum authority required to convert failure evidence into an immutable run result and permanently close mutable gameplay for that run generation.

## Plan ledger

**Goal:** guarantee one final result, zero post-terminal gameplay effects and one provable Outcome projection.

- [x] Define terminal identity.
- [x] Define predicate and participant evidence.
- [x] Define immutable summary ownership.
- [x] Define capability revocation.
- [x] Define duplicate/stale behavior.
- [x] Define observation and frame proof.
- [ ] Implement the contract.

## Terminal identity

```txt
terminalOutcomeId = stable ID for one accepted terminal commit
terminalRevision = monotonic result revision
sessionId = browser/runtime session
runGeneration = current run instance
cause = canonical terminal cause
candidateId = idempotent settlement command
```

## Frozen summary

```txt
score
day
phase
player condition and transform
resource balances and revision
pressure channels and revision
orchard/world revision
built-item summary
roster summary
inventory summary
terminal message
cause evidence fingerprint
```

Presentation labels may be derived later. Authoritative values must not be reread from mutable participants after commit.

## Revocation contract

After `TERMINAL_COMMITTED`:

```txt
move: reject
collect: reject
clear: reject
next-phase: reject
build: reject
hire: reject
equip: reject
resource add/pay through gameplay capabilities: reject
simulation mutation: reject
readback: allow
Outcome projection: allow
explicit restart/title lifecycle command: delegated to run/session authority
```

## Atomicity contract

```txt
before
  active run and no terminal result

commit
  terminal result
  terminal phase
  capability revocation
  Outcome route reference
  observation row

after
  all point to same terminalOutcomeId and revision
```

A partial commit is invalid. Failure must preserve the predecessor active generation or move to a typed indeterminate/recovery state.

## Idempotency contract

```txt
same candidateId + same fingerprint
  -> replay accepted result

same candidateId + different fingerprint
  -> reject conflict

new candidate after terminal committed
  -> return existing terminal result or terminal-already-committed
```

## Observation contract

```txt
terminalOutcomeId
terminalRevision
candidateId
cause
predicateEvidence
participantBeforeRevisions
frozenSummaryFingerprint
revokedCapabilityRevision
outcomeRouteRevision
firstVisibleFrameId
```

## Fixture matrix

```txt
single pest lethal hit
multiple simultaneous lethal contacts
condition already zero
duplicate candidate
stale gameplay revision
participant revision changes during preparation
post-terminal direct commands
post-terminal nested commands
Outcome summary immutability
source/dist/Pages parity
```
