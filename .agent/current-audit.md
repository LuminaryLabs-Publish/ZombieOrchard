# Current audit: ZombieOrchard pressure gameplay adoption

**Timestamp:** `2026-07-16T03-41-28-04-00`  
**Status:** `pressure-threshold-gameplay-adoption-authority-audited`  
**Retained status:** `run-seed-rng-replay-authority-central-reconciled`  
**Branch:** `main`

## Summary

`pressure-field-kit` owns `rowPressure` and `curse`, advances both on every runtime tick and accepts adjustments. `active-session-domain-kit` writes `rowPressure` after collection but never reads either channel. Pest spawn probability, pest speed, contact damage, phase changes and terminal failure remain fixed and independent from pressure.

## Plan ledger

**Goal:** bind pressure revisions to authored gameplay effects, typed threshold results and a matching HUD/world frame without moving session truth out of existing domains.

- [x] Inspect pressure initialization, tick growth, commands and snapshots.
- [x] Inspect collection-side pressure writes.
- [x] Inspect pest spawn, movement, damage, phase and outcome consumers.
- [x] Inspect HUD projection and smoke coverage.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 18-surface pressure-adoption authority.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
pressure channels: rowPressure, curse
automatic growth: rowPressure +0.8/sec, curse +0.2/sec
collection write: +0.5 red apple, +2 gold apple to rowPressure
active-session pressure reads: 0
pest spawn pressure modifier: absent
pest speed pressure modifier: absent
contact damage pressure modifier: absent
phase or outcome threshold: absent
HUD projection: rowPressure only
curse projection: absent
pressure-effect fixture count: 0
```

## Required authority

`zombie-orchard-pressure-threshold-gameplay-adoption-authority-domain`

## Validation boundary

Documentation only. No pressure behavior, gameplay consequence, renderer output, test, artifact or deployment result changed.
