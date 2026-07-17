# START HERE: ZombieOrchard day/phase transition admission

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Summary

`Next Phase` directly toggles day/night. A second activation can return night to day and increment the day counter before the next RAF admits any night simulation tick. The current command has no expected phase generation, minimum duration, pending lock, idempotency, participant settlement, or matching-frame acknowledgement.

## Plan ledger

**Goal:** make every day/night transition an admitted and observable settlement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard because repo-local audit state was ahead of central tracking.
- [x] Identify the complete interaction loop, domains, 27 implemented kits, and services.
- [x] Document the 19-surface phase-transition authority and deployment fixture gate.
- [x] Retain the immediately previous interactive-control audit.
- [ ] Implement phase admission and execute rapid-activation, settlement, artifact, and Pages proofs.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-16T22-59-23-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-16T22-59-23-04-00-day-phase-transition-admission-dsk-map.md`
4. `.agent/phase-system-audit/2026-07-16T22-59-23-04-00-day-night-admission-settlement-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-day-phase-transition-admission-settlement-authority-domain`

## Retained audits

The `2026-07-16T22-40-53-04-00` interactive-control audit and all earlier transaction, audio, pressure, determinism, persistence, lifecycle, rendering, command, accessibility, and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, visual rendering, audio behavior, tests, build, and deployment remain unchanged.