# START HERE: ZombieOrchard save-slot session selection

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-15T12-39-01-04-00`  
**Status:** `save-slot-session-selection-admission-authority-audited`  
**Retained status:** `route-simulation-suspension-admission-authority-central-reconciled`  
**Retained statuses:** `canvas-backing-store-dpr-resize-authority-central-reconciled`, `raf-clock-fixed-step-admission-authority-central-reconciled`, `public-runtime-capability-frame-admission-authority-central-reconciled`, `run-start-clean-reset-authority-central-reconciled`, `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

Save Select exists as a route and the HTML renderer can draw slot cards, but no action reaches it, no slots are supplied, and no persistence service exists. Play and New Game reach active-session without a selected save, validated load or durable new-session result.

## Plan ledger

**Goal:** make every playable session originate from an accepted loaded slot or an accepted, durably created new session.

- [x] Compare the full Publish inventory, central ledger, current heads and root `.agent` coverage.
- [x] Exclude TheCavalryOfRome.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits and their services.
- [x] Add the `2026-07-15T12-39-01-04-00` save-slot audit family.
- [x] Refresh all required root documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement save discovery, selection, atomic restore, durable commit and reload fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-15T12-39-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T12-39-01-04-00.md
.agent/architecture-audit/2026-07-15T12-39-01-04-00-save-slot-session-selection-dsk-map.md
.agent/render-audit/2026-07-15T12-39-01-04-00-unreachable-empty-save-select-gap.md
.agent/gameplay-audit/2026-07-15T12-39-01-04-00-play-new-game-session-adoption-loop.md
.agent/interaction-audit/2026-07-15T12-39-01-04-00-save-session-command-result-map.md
.agent/persistence-audit/2026-07-15T12-39-01-04-00-save-slot-schema-adoption-contract.md
.agent/deploy-audit/2026-07-15T12-39-01-04-00-save-reload-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T12-39-01-04-00-oldest-selection-save-session-reconciliation.md
```

## Complete interaction loop

```txt
boot
  -> create all runtime and interface domains
  -> register session-select
  -> start at entry

Play
  -> move directly to active-session
  -> adopt current in-memory state

New Game
  -> move to run-setup
  -> Start moves directly to active-session
  -> no SaveSlotId or initial durable commit

Save Select
  -> no inbound action
  -> Back only
  -> renderer expects current.meta.slots
  -> preset provides none
```

## Required authority

`zombie-orchard-save-slot-session-selection-admission-authority-domain`

```txt
DiscoverSaveSlotsCommand
  -> validate and classify stored records
  -> publish immutable SaveCatalogResult

SelectSessionCommand
  -> bind SaveSlotId expected SaveRevision and RouteRevision
  -> validate or migrate one save
  -> prepare every runtime participant
  -> atomically adopt all state or preserve the predecessor
  -> publish SessionSelectionResult
  -> route only after acceptance
  -> publish FirstLoadedSessionFrameAck

CreateNewSessionCommand
  -> allocate RunGeneration and SaveSlotId
  -> reset every participant
  -> commit the initial durable document
  -> publish NewSessionResult
```

## Validation boundary

Documentation only. No persistence, save selection, migration, durable commit, reload recovery, frame convergence, artifact parity or production-readiness claim is made.
