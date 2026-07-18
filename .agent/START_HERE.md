# START HERE: ZombieOrchard pest population budget

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-17T21-40-33-04-00`  
**Status:** `pest-population-spawn-budget-retirement-authority-audited`

## Summary

Night simulation can append pests indefinitely. Each retained pest is updated every tick and drawn every frame, while retirement occurs only through successful nearby clearing. There is no authored population capacity, lifetime, phase-exit policy, update budget, render budget or visible population proof.

The focused next authority should bound pest creation and retirement inside the existing active-session domain and bind the accepted population revision to the matching Canvas2D frame.

## Checklist

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 27 implemented kits and their services.
- [x] Document the 19-surface pest population authority and deployment fixture gate.
- [x] Retain the stamina audit and all earlier findings.
- [ ] Implement a population policy and execute long-night, retirement, frame and origin-parity fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-17T21-40-33-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-17T21-40-33-04-00-pest-population-budget-dsk-map.md`
4. `.agent/pest-system-audit/2026-07-17T21-40-33-04-00-population-capacity-lifetime-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-pest-population-spawn-budget-retirement-authority-domain`

## Retained audits

The `2026-07-17T09-43-24-04-00` player-stamina audit and all earlier host lifecycle, phase, control, transaction, audio, pressure, determinism, persistence, rendering, command, accessibility, kit-graph and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, rendering, input, tests, build and deployment remain unchanged.