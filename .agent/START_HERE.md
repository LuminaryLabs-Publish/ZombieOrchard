# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-14T16-41-33-04-00`  
**Status:** `run-start-clean-reset-authority-central-reconciled`  
**Retained statuses:** `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard creates one mutable engine and all gameplay domains once at page load. Play, New Game, Start, Pause, Title, and outcome actions only change the interface route. Every domain still ticks on every RAF, and a second start reuses the predecessor's ended session, resources, pressure, orchard, construction, roster, inventory, score, damage, and pests.

## Plan ledger

**Goal:** make each Play, New Game, or retry request produce one deterministic clean run generation, atomically adopted by every mandatory domain and both render surfaces.

- [x] Compare all 11 current Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories are tracked, root-documented, and synchronized.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Inspect boot, runtime, interface, gameplay, render, smoke, build, and deployment surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add the timestamped clean-run reset audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement clean-run generation, suspension, atomic adoption, and executable fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-14T16-41-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T16-41-33-04-00.md
.agent/architecture-audit/2026-07-14T16-41-33-04-00-run-start-clean-reset-dsk-map.md
.agent/render-audit/2026-07-14T16-41-33-04-00-stale-predecessor-world-frame-gap.md
.agent/gameplay-audit/2026-07-14T16-41-33-04-00-new-game-reuses-ended-session-loop.md
.agent/interaction-audit/2026-07-14T16-41-33-04-00-run-start-command-reset-result-map.md
.agent/run-reset-audit/2026-07-14T16-41-33-04-00-clean-run-generation-contract.md
.agent/deploy-audit/2026-07-14T16-41-33-04-00-clean-run-reset-fixture-gate.md
.agent/central-sync-audit/2026-07-14T16-41-33-04-00-oldest-selection-clean-run-reset-reconciliation.md
```

## Complete interaction loop

```txt
page load
  -> construct one engine and one mutable domain graph
  -> seed random orchard once
  -> begin perpetual RAF

Play
  -> route to active-session only

New Game -> Start
  -> route through run-setup to active-session only

all routes
  -> every domain ticks
  -> pressure and active gameplay continue behind title, setup, pause, menus, and outcome

failure -> outcome -> Title
  -> route returns to entry
  -> predecessor state remains

second Play or Start
  -> reuse predecessor generation
  -> ended state can route immediately back to outcome
```

## Required authority

```txt
zombie-orchard-run-start-clean-reset-authority-domain
```

## Required transaction

```txt
RunStartCommand
  -> bind command, host, predecessor, preset, seed, and route revisions
  -> settle or preserve the predecessor outcome
  -> allocate RunId and RunGeneration
  -> privately prepare every gameplay, interface, event, and presentation candidate
  -> validate all candidates against one preset fingerprint and deterministic seed
  -> atomically adopt all mandatory participants or preserve every predecessor
  -> reject duplicate, stale, retired, or superseded work
  -> publish RunStartResult and participant receipts
  -> route to active-session after adoption
  -> acknowledge FirstVisibleRunFrameAck
```

## Validation boundary

Documentation only. Runtime source, gameplay, route behavior, renderer behavior, random generation, dependencies, package scripts, tests, workflows, build, and deployment were not changed. No clean reset, deterministic run identity, pause fidelity, atomic domain replacement, stale-work isolation, first-frame convergence, artifact parity, or production-readiness claim is made.