# START HERE: ZombieOrchard cross-domain transaction settlement

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-16T16-40-45-04-00`  
**Status:** `cross-domain-gameplay-transaction-settlement-authority-audited`

## Summary

The current priority is exact settlement of player actions that span orchard, resources, pressure, session, construction, roster, and interface composition. These actions currently mutate participants sequentially without transaction identity, preflight, atomic commit, rollback, idempotency, exact nested results, or a matching frame acknowledgement.

## Plan ledger

**Goal:** make every multi-domain gameplay action commit exactly once across all required participants or reject without mutation.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the interaction loop, domains, 27 implemented kits, and services.
- [x] Document the 20-surface transaction-settlement authority and browser fixture gate.
- [ ] Implement and execute participant-failure, rollback, retry, source, dist, and Pages proofs.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-16T16-40-45-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-16T16-40-45-04-00-cross-domain-transaction-settlement-dsk-map.md`
4. `.agent/transaction-audit/2026-07-16T16-40-45-04-00-participant-prepare-commit-rollback-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-cross-domain-gameplay-transaction-settlement-authority-domain`

## Retained audit

The game-audio event projection authority and all earlier pressure, determinism, persistence, lifecycle, rendering, command, and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, visual rendering, audio behavior, tests, build, and deployment remain unchanged.