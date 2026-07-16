# Known gaps: ZombieOrchard run seed, RNG state and replay

**Timestamp:** `2026-07-15T22-40-29-04-00`  
**Status:** `run-seed-rng-replay-authority-audited`

## Summary

The current priority gap is ambient randomness without run identity or replay state. Generated apples and pests are visible and playable, but their origin cannot be reconstructed from a seed, algorithm version, stream cursor or command log.

## Plan ledger

**Goal:** close identity, stream isolation, snapshot, replay and visible-frame evidence gaps without moving world or session truth out of their existing domains.

- [ ] Run seed schema and admission.
- [ ] Run generation identity.
- [ ] RNG algorithm and stream-derivation versioning.
- [ ] Named independent random streams.
- [ ] Deterministic entity IDs.
- [ ] Stream revision, draw count and cursor snapshots.
- [ ] Exact RNG restore.
- [ ] Same-seed retry and new-seed run creation.
- [ ] Seed-version migration or typed rejection.
- [ ] Accepted command replay log.
- [ ] Canonical deterministic snapshot hashing.
- [ ] First seed-bound visible-frame acknowledgement.
- [ ] Source, dist and Pages deterministic fixtures.

## Current evidence gaps

```txt
seed fields: 0
RNG provider surfaces: 0
named streams: 0
serialized RNG states: 0
same-seed retry paths: 0
replay logs: 0
deterministic snapshot hashes: 0
browser deterministic traces: 0
artifact deterministic traces: 0
deployed deterministic traces: 0
```

## Retained gaps

Prior player-control, save, route-suspension, clock, canvas, diagnostic, reset, roster, inventory, construction, HTML, startup, frame-coherence, event and observer findings remain retained in their timestamped audit families.
