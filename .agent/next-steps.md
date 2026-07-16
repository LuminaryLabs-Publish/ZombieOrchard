# Next steps: ZombieOrchard run seed, RNG state and replay

**Timestamp:** `2026-07-15T22-40-29-04-00`  
**Status:** `run-seed-rng-replay-authority-audited`

## Summary

Replace direct `Math.random()` calls with one versioned run authority and isolated named streams. Do not use a single shared stream for unrelated systems because extra apple draws would perturb pest results.

## Plan ledger

**Goal:** make same-seed runs exactly reproducible and version-compatible across create, retry, save, restore, replay, build and Pages.

- [ ] Define `RunIdentity`, seed encoding and RNG algorithm version.
- [ ] Add seed admission to new-run creation.
- [ ] Inject the random authority into `createOrchardGame()`.
- [ ] Partition `orchard-layout`, `apple-refill`, `pest-spawn` and `entity-id` streams.
- [ ] Remove direct gameplay calls to global `Math.random()`.
- [ ] Publish stream revisions, draw counts and serializable cursors.
- [ ] Use deterministic entity IDs.
- [ ] Include seed and stream state in save/restore contracts.
- [ ] Add same-seed retry and explicit new-seed creation.
- [ ] Record accepted commands and fixed-step revisions for replay.
- [ ] Canonically hash snapshots at checkpoints.
- [ ] Publish `FirstSeedBoundWorldFrameAck`.
- [ ] Add same-seed, different-seed, stream-isolation, refill, pest, restore, replay, source/dist and Pages fixtures.

## Checkpoint

Do not claim deterministic runs until two independent runtimes reproduce identical canonical hashes through initial creation, apple refill, pest spawning, save/restore and same-seed retry.
