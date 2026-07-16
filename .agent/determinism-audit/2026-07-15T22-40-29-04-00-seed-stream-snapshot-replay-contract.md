# Determinism audit: seed, stream, snapshot and replay contract

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

A deterministic run needs more than one integer seed. It needs an algorithm version, isolated named streams, stable entity identity, serializable stream cursors, command ordering and canonical hashing.

## Plan ledger

**Goal:** define the minimum stable contract required for reproducible generation and simulation.

- [x] Identify random consumers and coupling.
- [x] Define versioned seed and stream state.
- [x] Define snapshot, restore and replay invariants.
- [x] Define deterministic proof rows.
- [ ] Implement and execute the contract.

## Run identity

```txt
RunIdentity {
  runGeneration
  seed
  seedEncodingVersion
  rngAlgorithmId
  rngAlgorithmVersion
  streamDerivationVersion
}
```

## Named streams

```txt
orchard-layout
apple-refill
pest-spawn
entity-id
```

Each stream publishes its own revision, draw count and serializable state. Adding a draw to one stream must not change another stream.

## Snapshot contract

```txt
SeededRunSnapshot {
  runIdentity
  streamStates
  gameplayState
  acceptedCommandRevision
  fixedStepRevision
  canonicalHash
}
```

## Replay invariant

```txt
same RunIdentity
+ same accepted command sequence
+ same fixed-step sequence
+ same compatible implementation version
= same canonical snapshot hash at every checkpoint
```

## Restore invariant

A restore either adopts all gameplay and RNG participants at the exact recorded revisions or preserves the predecessor runtime. Partial adoption is invalid.

## Version policy

Saved runs must name the RNG algorithm and stream-derivation versions. Unsupported versions must be rejected or migrated explicitly; they must never silently execute under a different generator.
