# START HERE: ZombieOrchard route-bound simulation suspension

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-15T08-26-01-04-00`  
**Status:** `route-simulation-suspension-admission-authority-audited`  
**Retained status:** `canvas-backing-store-dpr-resize-authority-central-reconciled`  
**Retained statuses:** `raf-clock-fixed-step-admission-authority-central-reconciled`, `public-runtime-capability-frame-admission-authority-central-reconciled`, `run-start-clean-reset-authority-central-reconciled`, `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

Interface composition changes the visible route but does not change simulation eligibility. Pressure and active-session hazards continue ticking during Pause, Build, Market, Roster, Inventory, Codex, Settings and title-facing screens.

## Plan ledger

**Goal:** atomically bind every route transition to an explicit simulation policy and a matching visible-frame acknowledgement.

- [x] Compare the full Publish inventory, central ledger, current heads and root `.agent` coverage.
- [x] Exclude TheCavalryOfRome.
- [x] Select only ZombieOrchard because its completed canvas audit advanced beyond the central ledger.
- [x] Identify the interaction loop, domains, all 27 implemented kits and offered services.
- [x] Add the `2026-07-15T08-26-01-04-00` route-suspension audit family.
- [x] Refresh required root documents and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement route-bound tick leases and execute the fixture matrix.

## Read this run first

```txt
.agent/trackers/2026-07-15T08-26-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T08-26-01-04-00.md
.agent/architecture-audit/2026-07-15T08-26-01-04-00-route-simulation-suspension-dsk-map.md
.agent/render-audit/2026-07-15T08-26-01-04-00-hidden-gameplay-route-frame-gap.md
.agent/gameplay-audit/2026-07-15T08-26-01-04-00-paused-and-management-screen-damage-loop.md
.agent/interaction-audit/2026-07-15T08-26-01-04-00-route-simulation-command-result-map.md
.agent/route-suspension-audit/2026-07-15T08-26-01-04-00-active-route-tick-lease-contract.md
.agent/deploy-audit/2026-07-15T08-26-01-04-00-route-suspension-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T08-26-01-04-00-runtime-ahead-route-suspension-reconciliation.md
```

## Complete interaction loop

```txt
page load
  -> create all gameplay, interface and composition domains
  -> interface-composition starts at entry
  -> create Canvas2D and HTML renderers
  -> start RAF loop

every runtime tick
  -> pressure-field ticks regardless active route
  -> active-session ticks unless its run has ended
  -> pests may spawn, move and damage the player
  -> interface-composition checks ended state and may route to outcome
  -> Canvas2D renders orchard and active-session state
  -> HTML renders only the selected interface route

Pause, Build, Market, Roster, Inventory, Codex, Settings or Title
  -> interface-composition changes active route
  -> no simulation lease or suspension result changes
  -> pressure and active-session continue ticking behind the selected screen
  -> a paused or management-screen player can still be damaged
  -> terminal state can route to outcome without an admitted resume
```

## Required authority

`zombie-orchard-interface-route-simulation-suspension-authority-domain`

```txt
RouteSimulationAdmissionCommand
  -> bind RunGeneration RouteRevision TransitionCommandId and expected SimulationRevision
  -> resolve the destination route and its SimulationPolicyDescriptor
  -> classify running suspended background-safe terminal or retired
  -> prepare pressure and active-session tick leases
  -> atomically adopt the route and simulation policy
  -> reject stale duplicate conflicting or retired transitions
  -> publish RouteSimulationAdmissionResult
  -> render Canvas2D and HTML from the accepted SimulationRevision
  -> publish FirstRouteBoundVisibleFrameAck

ResumeSimulationCommand
  -> require the matching suspended run and route revision
  -> settle stale input and elapsed-time debt
  -> reactivate pressure and active-session ticks exactly once
  -> publish ResumeSimulationResult
```

## Validation boundary

Documentation only. No pause-safety, route-bound simulation, resume correctness, visible-frame convergence, artifact parity or production-readiness claim is made.
