# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-14T10-59-56-04-00`  
**Status:** `roster-hiring-gameplay-adoption-authority-central-reconciled`  
**Retained statuses:** `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, Canvas2D and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates roster hiring. The roster browser route is read-only, while raw commands accept caller-controlled names and costs. Negative costs can increase money, non-numeric costs can normalize to zero, every actor receives the hardcoded `harvest` role, and hired actors never affect active gameplay or Canvas2D.

## Plan ledger

**Goal:** make hiring one validated transaction from authored offer through positive-cost settlement, actor identity, role capability, gameplay adoption, matching projection, rollback and visible proof.

- [x] Compare all 11 current Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories are tracked, root-documented and synchronized.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read boot, runtime, interface, gameplay, roster, resource, renderer, smoke and package surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add the timestamped roster-hiring audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement roster admission, safe settlement, worker effects and executable fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-14T10-59-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T10-59-56-04-00.md
.agent/architecture-audit/2026-07-14T10-59-56-04-00-roster-hiring-gameplay-adoption-dsk-map.md
.agent/render-audit/2026-07-14T10-59-56-04-00-hired-worker-visible-state-gap.md
.agent/gameplay-audit/2026-07-14T10-59-56-04-00-inert-worker-orchard-loop.md
.agent/interaction-audit/2026-07-14T10-59-56-04-00-hire-worker-command-result-map.md
.agent/roster-audit/2026-07-14T10-59-56-04-00-hire-offer-cost-role-settlement-contract.md
.agent/deploy-audit/2026-07-14T10-59-56-04-00-roster-hiring-fixture-gate.md
.agent/central-sync-audit/2026-07-14T10-59-56-04-00-repo-ledger-roster-hiring-reconciliation.md
```

## Complete interaction loop

```txt
browser roster path
  -> enter active-session
  -> open Roster
  -> render actor cards
  -> expose Back only
  -> no authored Hire action

raw hire path
  -> GameHost.engine.command("roster-runtime", "hire", payload)
  -> trust caller-controlled cost and name
  -> negative cost can increase money
  -> non-numeric cost can normalize to zero
  -> append actor with hardcoded harvest role
  -> publish generic accepted result

post-hire
  -> roster route can display actor
  -> active-session never reads roster
  -> HUD omits workers and effects
  -> Canvas2D omits workers
  -> no roster revision or first visible worker frame is acknowledged
```

## Required authority

```txt
zombie-orchard-roster-hiring-gameplay-adoption-authority-domain
```

## Required transaction

```txt
HireWorkerCommand
  -> bind run, command, roster, worker-catalog, resource and route revisions
  -> resolve one authored offer and role descriptor
  -> validate positive cost, balance, capacity, identity and duplicate policy
  -> reserve resources without mutating the predecessor
  -> prepare roster, gameplay, HTML and Canvas2D candidates
  -> atomically commit one RosterRevision and WorkerEffectRevision
  -> publish HireWorkerResult and participant receipts
  -> acknowledge FirstVisibleRosterFrameAck
  -> otherwise release reservation and restore every predecessor
```

## Validation boundary

Documentation only. Runtime source, gameplay, roster behavior, resource behavior, HTML, CSS, Canvas2D behavior, dependencies, package scripts, tests, workflows, build and deployment were not changed. No safe hiring, positive-cost settlement, actor identity policy, worker gameplay effect, matching visible state, rollback or production-readiness claim is made.