# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-14T21-41-41-04-00`  
**Status:** `public-runtime-capability-frame-admission-authority-central-reconciled`  
**Retained statuses:** `run-start-clean-reset-authority-central-reconciled`, `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard publishes the complete mutable engine through `window.GameHost`. Public callers can read runtime internals, install kits, dispatch arbitrary commands, call direct domain APIs, subscribe indefinitely and manually tick every domain. A manual tick does not render, so the next RAF advances again before HTML and Canvas2D show state.

## Plan ledger

**Goal:** replace ambient raw runtime ownership with versioned, least-authority capabilities whose accepted mutations settle once and are acknowledged by both render surfaces.

- [x] Compare all 11 Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible repositories are tracked, root-documented and aligned.
- [x] Select only ZombieOrchard as the oldest synchronized entry.
- [x] Inspect host publication, runtime mutation, manual ticking and presentation order.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add the timestamped public capability audit family.
- [x] Refresh required root `.agent` documents and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement least-authority publication, external-tick leases, typed results, frame acknowledgement and retirement.

## Read this run first

```txt
.agent/trackers/2026-07-14T21-41-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T21-41-41-04-00.md
.agent/architecture-audit/2026-07-14T21-41-41-04-00-public-runtime-capability-frame-admission-dsk-map.md
.agent/render-audit/2026-07-14T21-41-41-04-00-manual-tick-visible-frame-divergence-gap.md
.agent/gameplay-audit/2026-07-14T21-41-41-04-00-external-tick-double-step-loop.md
.agent/interaction-audit/2026-07-14T21-41-41-04-00-public-capability-command-result-map.md
.agent/host-capability-audit/2026-07-14T21-41-41-04-00-gamehost-read-write-tick-contract.md
.agent/deploy-audit/2026-07-14T21-41-41-04-00-public-capability-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T21-41-41-04-00-oldest-selection-public-capability-reconciliation.md
```

## Complete interaction loop

```txt
page load
  -> construct one engine and mutable domain graph
  -> publish raw GameHost
  -> start recursive RAF

normal RAF
  -> tick all domains
  -> render Canvas2D
  -> render HTML

public caller
  -> get unversioned state
  -> or call manual tick
  -> or reach engine commands, addKit, ctx, domains and direct APIs

manual tick
  -> advance all domains and notify subscribers
  -> render nothing

next RAF
  -> advance all domains again
  -> render later state without a matching public-mutation receipt
```

## Required authority

```txt
zombie-orchard-public-runtime-capability-frame-admission-authority-domain
```

## Required transactions

```txt
PublicCapabilityPublicationCommand
  -> publish immutable readback and allowlisted product commands
  -> exclude raw engine and mutable internals
  -> bind host, run, route, pause and policy revisions

PublicMutationCommand
  -> bind capability, caller, command and expected state revisions
  -> reject stale, duplicate, retired or ineligible work
  -> settle exactly once
  -> publish typed result
  -> acknowledge matching HTML and Canvas2D frames

ExternalTickCommand
  -> disabled in production by default
  -> require an explicit debug/test lease
  -> classify headless versus visible execution
  -> publish exact runtime and presentation receipts
```

## Validation boundary

Documentation only. Runtime source, public API behavior, gameplay, rendering, dependencies, package scripts, tests, workflows, build and deployment were not changed. No least-authority publication, external-tick safety, visible-frame convergence, capability retirement, artifact parity or production-readiness claim is made.