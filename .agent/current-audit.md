# Current audit: ZombieOrchard run seed, RNG state and replay

**Timestamp:** `2026-07-15T22-40-29-04-00`  
**Status:** `run-seed-rng-replay-authority-audited`  
**Retained status:** `player-movement-action-coverage-authority-central-reconciled`  
**Branch:** `main`

## Summary

`orchard-world-kit` and `active-session-domain-kit` consume ambient global `Math.random()` for apple placement, apple kind, generated IDs and pest spawning. No run seed, RNG algorithm version, named stream state or deterministic replay result is published.

## Plan ledger

**Goal:** bind generation and simulation randomness to one accepted RunGeneration that can be retried, saved, restored and replayed.

- [x] Inspect preset and run setup.
- [x] Inspect orchard creation and refill.
- [x] Inspect pest generation and IDs.
- [x] Inspect snapshots, diagnostics, rendering and smoke.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 20-surface seeded-run authority.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
ambient Math.random consumers: orchard apples, apple ids, pest angles, pest ids
explicit run seed: absent
RNG provider injection: absent
algorithm and stream versions: absent
RNG snapshot and restore: absent
same-seed retry and replay: absent
deterministic fixture count: 0
```

## Required authority

`zombie-orchard-run-seed-rng-replay-authority-domain`

## Validation boundary

Documentation only. No runtime behavior, deterministic guarantee, test, artifact or deployment result changed.
