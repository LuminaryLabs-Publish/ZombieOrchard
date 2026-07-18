# Current audit: ZombieOrchard pest population budget

**Timestamp:** `2026-07-17T21-40-33-04-00`  
**Status:** `pest-population-spawn-budget-retirement-authority-audited`  
**Retained status:** `player-stamina-effort-recovery-projection-authority-central-reconciled`  
**Branch:** `main`

## Summary

Night simulation admits pest creation through an inline random predicate and appends directly to `state.pests`. There is no capacity, lifetime, wave, phase-exit or distance-retirement policy. Every retained pest is updated each tick and projected each frame.

## Checklist

**Goal:** make pest threat and workload bounded, explicit and provable without replacing the existing active-session simulation.

- [x] Inspect runtime ticking, phase transition, spawn, movement, contact, clearing, snapshot and Canvas2D projection paths.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 19-surface pest population authority.
- [x] Define long-night, capacity, retirement, frame and deployed-origin fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
spawn source: night tick
spawn predicate: Math.random() < dt * 0.55
expected spawn rate: about 0.55 pests/second
append capacity check: absent
maximum population: absent
lifetime retirement: absent
phase-exit retirement: absent
distance retirement: absent
player clear retirement: present, one nearby target
tick work: all retained pests
render work: all retained pests
population HUD: absent
PestSpawnAdmissionResult: absent
PestPopulationResult: absent
FirstPestBudgetBoundFrameAck: absent
pest population fixtures: 0
```

A ten-minute uncleared night has an expected addition of roughly 330 pests. No production regression was reproduced; this is a gameplay-envelope, workload-bounding and executable-proof gap.

## Required authority

`zombie-orchard-pest-population-spawn-budget-retirement-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, CSS, Canvas2D, input, dependency, test, artifact, workflow or deployment behavior changed.