# Known gaps: ZombieOrchard pest population budget

**Timestamp:** `2026-07-17T21-40-33-04-00`  
**Status:** `pest-population-spawn-budget-retirement-authority-audited`

## Summary

Pest threat and workload have no explicit ceiling. Spawn, retained population, simulation work, snapshot size and Canvas2D projection can all grow with time spent at night.

## Checklist

**Goal:** keep the population and proof gaps explicit until creation, retirement and projection are bounded.

- [x] Record source-backed spawn, storage, update, retirement and projection gaps.
- [x] Preserve current product boundaries.
- [x] Define required results and fixtures.
- [ ] Close the gaps in runtime code and executable proof.

## Gaps

```txt
PestPopulationPolicy schema and revision
soft and hard population capacity
spawn admission command
spawn acceptance/defer/rejection result
deterministic spawn cadence
maximum spawn per accepted tick
run and phase generation binding
stable pest generation identity
spawn timestamp or age evidence
maximum lifetime policy
day-entry retirement/preservation policy
distance retirement policy
capacity-reached behavior
pressure-to-spawn policy adapter
bounded per-tick update work
bounded visible projection work
reward-safe retirement reason
PestPopulationResult
pest/threat HUD projection
FirstPestBudgetBoundFrameAck
long-night capacity fixture
phase-toggle fixture
clear-versus-spawn fixture
retirement reward fixture
reset/new-run fixture
source/dist/Pages pest parity
```

## Retained gaps

The player-stamina audit and all earlier host lifecycle, phase, control, transaction, audio, pressure, determinism, persistence, rendering, command, accessibility, kit-graph and gameplay-adoption gaps remain retained unless separately implemented and validated.