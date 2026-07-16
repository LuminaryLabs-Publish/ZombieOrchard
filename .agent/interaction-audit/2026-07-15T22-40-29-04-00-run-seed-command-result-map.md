# Interaction audit: run seed command and result map

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

No user, host or persistence command currently admits a seed. The New Game action only changes routes, while Play enters the already-created ambient-random state. Diagnostics can inspect or tick that state but cannot identify or reconstruct its random origin.

## Plan ledger

**Goal:** give seed creation, same-seed retry, new-seed creation and restore explicit command/result boundaries.

- [x] Trace entry and run-setup actions.
- [x] Trace game creation and diagnostic surfaces.
- [x] Confirm seed commands and results are absent.
- [x] Define command/result ownership.
- [ ] Implement route-bound controls and fixtures.

## Required commands

```txt
RunSeedAdmissionCommand
  input: requestedSeed or generated-seed policy
  result: accepted seed, algorithm version, RunGeneration, stream revisions

CreateNewSeededRunCommand
  input: accepted seed and expected predecessor generation
  result: clean runtime adoption or predecessor preservation

RetrySameSeedCommand
  input: completed RunGeneration and seed revision
  result: new RunGeneration with identical initial canonical hash

RestoreSeededRunCommand
  input: seed, algorithm version, stream cursors, state and command-log revision
  result: atomic restore or typed incompatibility rejection
```

## Rejection classes

```txt
invalid-seed
unsupported-algorithm-version
stale-run-generation
stale-rng-revision
corrupt-stream-state
incompatible-save
replay-hash-mismatch
retired-runtime
```

## Presentation acknowledgement

The first Canvas2D frame after create, retry or restore must publish `FirstSeedBoundWorldFrameAck` for the accepted run and canonical state hash.
