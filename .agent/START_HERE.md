# START HERE: ZombieOrchard run seed, RNG state and replay

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-15T22-40-29-04-00`  
**Status:** `run-seed-rng-replay-authority-audited`

## Summary

The current priority is deterministic run identity. Orchard apples, apple refill, pest spawn angles and generated IDs use ambient `Math.random()`, while no explicit seed, RNG algorithm, named stream, cursor, restore state, replay log or same-seed proof exists.

## Plan ledger

**Goal:** make each run reproducible from an accepted seed, versioned named random streams, accepted commands and fixed simulation steps.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the interaction loop, domains, 27 kits and services.
- [x] Document the run-seed/RNG/replay authority and fixture gate.
- [ ] Implement and execute deterministic source, dist and Pages proofs.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-15T22-40-29-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-15T22-40-29-04-00-run-seed-rng-replay-dsk-map.md`
4. `.agent/determinism-audit/2026-07-15T22-40-29-04-00-seed-stream-snapshot-replay-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-run-seed-rng-replay-authority-domain`

## Boundary

Documentation only. Runtime behavior, tests, build and deployment remain unchanged.
