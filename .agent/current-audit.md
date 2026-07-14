# Current audit: ZombieOrchard

**Timestamp:** `2026-07-14T10-59-56-04-00`  
**Status:** `roster-hiring-gameplay-adoption-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard exposes roster state without an admitted hiring capability. The browser route cannot hire, raw commands trust caller-controlled cost and name, malformed costs can create free workers or increase money, roles are hardcoded, and accepted actors never affect gameplay or Canvas2D.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining hiring as one authored-offer, positive-cost, actor-identity, role-effect, render, rollback and proof transaction.

- [x] Compare the current Publish organization inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read roster, resource, interaction, gameplay, render, proof, build and deployment surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped roster-hiring audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run roster-hiring fixtures.

## Complete interaction loop

```txt
roster route
  -> actor cards and Back only
  -> no authored Hire action

raw command
  -> roster-runtime/hire
  -> accept caller-controlled cost and name
  -> resource-ledger.pay supplied amount
  -> append actor with hardcoded harvest role
  -> return generic accepted result

adversarial payloads
  -> negative cost increases money
  -> truthy non-numeric cost becomes zero
  -> HTML-like name reaches innerHTML projection

post-hire gameplay
  -> active-session reads no roster state
  -> worker creates no labor effect
  -> HUD and Canvas2D omit worker state
```

## Domains in use

```txt
browser DOM, delegated input, Canvas2D, RAF, error panel and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
12 interface domains and interface composition
resource ledger, pressure, orchard, construction, roster and inventory
movement, collection, phases, pests, clearing, score, damage, failure and outcome
hire offers, cost settlement, actor identity, roles, capacity, worker effects, rollback and visible proof
HTML and Canvas2D presentation
validation, static build, Pages deployment and central tracking
```

## Implemented kits and services

```txt
27 total surfaces: 19 engine-installed and 8 host/tooling/support
runtime and scoped interface composition
12 route/interface domains
resource, pressure, orchard, construction, roster and inventory services
active-session movement, collection, phases, pests, clearing, score, damage and failure
Canvas2D and HTML projection
raw GameHost diagnostics
smoke, build and Pages deployment
```

## Source-backed findings

- The roster interface exposes Back only.
- `roster-runtime` accepts raw `hire` commands and trusts `payload.cost` and `payload.name`.
- Negative costs pass resource checks and increase money when subtracted.
- Truthy non-numeric costs normalize to zero and allow a free hire.
- Hired actor IDs derive from current array length and every role is hardcoded to `harvest`.
- The HTML renderer does not escape caller-controlled names before `innerHTML` projection.
- Active-session and Canvas2D read no roster state.
- The smoke test never exercises roster navigation, hiring, settlement, worker effects or projection.

## Required parent domain

```txt
zombie-orchard-roster-hiring-gameplay-adoption-authority-domain
```

## Required transaction

```txt
HireWorkerCommand
  -> bind run and expected participant revisions
  -> resolve an exact authored offer and role
  -> validate positive cost, identity, capacity and duplicate policy
  -> reserve resources without predecessor mutation
  -> prepare mandatory roster, gameplay and presentation consumers
  -> atomically commit one RosterRevision and WorkerEffectRevision
  -> publish typed results and participant receipts
  -> acknowledge the matching visible frame
  -> otherwise release reservation and restore the predecessor
```

## Current file family

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

## Validation boundary

Documentation only. No runtime, gameplay, roster, resource, renderer, HTML, CSS, dependency, package-script, test, workflow, build or deployment behavior changed.