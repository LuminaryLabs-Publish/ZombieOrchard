# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-15T02-38-45-04-00`  
**Status:** `raf-clock-fixed-step-admission-authority-audited`  
**Retained statuses:** `public-runtime-capability-frame-admission-authority-central-reconciled`, `run-start-clean-reset-authority-central-reconciled`, `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

The active browser host advances one fixed `1/60` simulation step for every RAF callback and ignores the callback timestamp. Runtime elapsed, pressure growth, pest spawning, pest movement and damage therefore follow callback frequency instead of measured wall time. No accumulator, bounded catch-up, visibility-transition policy, dropped-time result or clock-bound visible-frame acknowledgement exists.

## Plan ledger

**Goal:** separate browser callback cadence from deterministic gameplay stepping while rendering one coherent Canvas2D and HTML frame from the latest accepted state.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible repositories are tracked, root-documented and synchronized.
- [x] Select only ZombieOrchard as the oldest synchronized entry.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Preserve all 27 implemented kit surfaces.
- [x] Add the timestamped RAF clock audit family.
- [x] Refresh required root `.agent` documents and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement monotonic sampling, accumulation, bounded catch-up, visibility settlement and timing fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-15T02-38-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T02-38-45-04-00.md
.agent/architecture-audit/2026-07-15T02-38-45-04-00-raf-clock-fixed-step-dsk-map.md
.agent/render-audit/2026-07-15T02-38-45-04-00-render-rate-simulation-rate-coupling-gap.md
.agent/gameplay-audit/2026-07-15T02-38-45-04-00-refresh-rate-gameplay-speed-loop.md
.agent/interaction-audit/2026-07-15T02-38-45-04-00-host-frame-command-result-map.md
.agent/clock-audit/2026-07-15T02-38-45-04-00-raf-accumulator-visibility-contract.md
.agent/deploy-audit/2026-07-15T02-38-45-04-00-refresh-rate-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T02-38-45-04-00-oldest-selection-clock-reconciliation.md
```

## Complete interaction loop

```txt
browser callback
  -> ignore RAF timestamp
  -> engine.tick(1 / 60)
  -> tick every domain
  -> render Canvas2D
  -> render HTML
  -> request next callback

variable callback rate
  -> variable simulated seconds per wall second
  -> no explicit catch-up, suspension or dropped-time settlement
```

## Required authority

`zombie-orchard-raf-clock-fixed-step-admission-authority-domain`

```txt
HostFrameCommand
  -> sample monotonic wall time
  -> accumulate clamped delta
  -> admit bounded fixed steps
  -> publish step and dropped-time receipts
  -> render once from the latest state
  -> publish HostFrameResult
  -> acknowledge FirstClockBoundVisibleFrameAck
```

## Validation boundary

Documentation only. Runtime timing, gameplay rate, rendering, public APIs, packages, tests, workflows, build and deployment were not changed. No refresh-rate independence, fixed-step correctness, hidden-tab policy, visible-frame convergence, artifact parity or production-readiness claim is made.