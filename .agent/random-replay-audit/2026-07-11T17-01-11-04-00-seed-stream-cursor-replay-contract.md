# Random and replay audit: Seed, Stream, Cursor and Replay Contract

## Plan ledger

**Goal:** define the exact deterministic state that must be owned, saved, restored and verified for ZombieOrchard replay.

- [x] Define seed and policy identity.
- [x] Define named streams and cursors.
- [x] Separate random decisions from entity identity.
- [x] Define replay journal and fingerprint requirements.
- [x] Define stale-policy and divergence results.
- [ ] Implement and execute fixtures.

## Authority state

```txt
RandomAuthoritySnapshot
  runtimeId
  sessionId
  runId
  sessionEpoch
  randomPolicyId
  randomPolicyVersion
  runSeed
  seedFingerprint
  streams[]
    streamId
    algorithmId
    state
    cursor
  entitySequences
    apple
    pest
  latestReceiptId
  replayJournalRevision
```

## Determinism boundary

The replay authority records only committed external inputs and system decisions:

```txt
session lifecycle commands
public player commands
committed fixed ticks
random decision receipts
transaction results
state fingerprints
terminal result
```

Canvas pixels and HTML strings are observations, not replay inputs.

## Canonical stream policy

```txt
orchard.apple-tree
orchard.apple-offset-x
orchard.apple-offset-y
orchard.apple-kind
session.pest-admission
session.pest-angle
```

Each stream has an independent seed derived from:

```txt
hash(runSeed, randomPolicyVersion, streamId)
```

## Replay verification

```txt
load manifest and policy revision
  -> admit seed and initial durable state
  -> replay admitted commands at recorded committed ticks
  -> reproduce random receipts by stream/cursor
  -> compare durable-state fingerprint after each transaction/tick
  -> stop on first divergence
```

## Typed divergence result

```txt
ReplayDivergenceResult
  replayId
  eventSequence
  expectedTickId
  actualTickId
  expectedStreamId
  actualStreamId
  expectedCursor
  actualCursor
  expectedReceipt
  actualReceipt
  expectedStateFingerprint
  actualStateFingerprint
  reason
```

## Save/load relationship

A versioned save must include the random authority snapshot. Restoring gameplay state without the seed, policy version, stream states, cursors and entity sequences would produce a visually plausible but non-continuable run.

## Rejection rules

- Reject unknown random algorithms or policy versions unless an explicit migration exists.
- Reject replay against a different game/preset manifest fingerprint.
- Reject stale session or run epochs.
- Reject duplicate replay events unless the cached result matches.
- Never silently reseed during restore.

No current source implements this contract.