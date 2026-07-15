# START HERE: ZombieOrchard player movement control coverage

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-15T17-38-05-04-00`  
**Status:** `player-movement-action-coverage-authority-audited`  
**Retained status:** `save-slot-session-selection-admission-authority-central-reconciled`  
**Retained statuses:** `route-simulation-suspension-admission-authority-central-reconciled`, `canvas-backing-store-dpr-resize-authority-central-reconciled`, `raf-clock-fixed-step-admission-authority-central-reconciled`, `public-runtime-capability-frame-admission-authority-central-reconciled`, `run-start-clean-reset-authority-central-reconciled`, `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

The active session implements movement and Canvas2D renders player position, but the shipped browser host and HTML surface expose no directional producer. Collect and Clear are proximity-gated, so players cannot intentionally navigate the core harvest-and-defend loop through the product UI.

## Plan ledger

**Goal:** provide complete, lifecycle-safe movement action coverage from supported input devices through accepted player position and the first matching visible frame.

- [x] Compare the full Publish inventory, central ledger, current heads, and root `.agent` coverage.
- [x] Exclude TheCavalryOfRome.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the interaction loop, all domains, all 27 implemented kits, and their services.
- [x] Add the `2026-07-15T17-38-05-04-00` player-control audit family.
- [x] Refresh all required root documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement keyboard and visible touch-compatible controls, then execute device, lifecycle, build, and Pages fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-15T17-38-05-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T17-38-05-04-00.md
.agent/architecture-audit/2026-07-15T17-38-05-04-00-player-movement-control-action-coverage-dsk-map.md
.agent/render-audit/2026-07-15T17-38-05-04-00-missing-movement-control-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T17-38-05-04-00-unreachable-proximity-gameplay-loop.md
.agent/interaction-audit/2026-07-15T17-38-05-04-00-player-movement-command-result-map.md
.agent/input-audit/2026-07-15T17-38-05-04-00-device-action-coverage-lifecycle-contract.md
.agent/deploy-audit/2026-07-15T17-38-05-04-00-movement-control-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T17-38-05-04-00-oldest-selection-player-control-reconciliation.md
```

## Interaction loop

```txt
boot -> create engine and renderers -> start RAF
active session -> tick -> draw player/apples/pests -> render HTML commands
HTML -> Collect / Clear / Next Phase / route actions
active-session -> move command exists but receives no shipped input
collect radius 42 and clear distance 58 -> intentional approach unavailable
```

## Required authority

`zombie-orchard-player-movement-control-action-coverage-authority-domain`

```txt
PlayerControlAdmissionCommand
  -> bind document runtime route device capability action map and control generation
  -> require complete movement coverage
  -> publish visible controls where required
  -> normalize all device producers
  -> settle focus route blur visibility and hybrid conflicts
  -> submit MovementCommand against expected PlayerPositionRevision
  -> publish MovementResult
  -> publish FirstPlayerMovementFrameAck
```

## Validation boundary

Documentation only. No movement producer, input lifecycle, browser proof, artifact parity, Pages parity, or production-readiness claim is made.
