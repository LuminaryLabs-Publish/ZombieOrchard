# Project breakdown: ZombieOrchard construction settlement

**Timestamp:** `2026-07-14T00-38-19-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Selection:** oldest eligible documented repository

## Summary

ZombieOrchard was selected after the full Publish inventory matched the central ledger and every eligible repository had root `.agent` coverage. This breakdown inventories the complete interaction loop, domains, 27 implemented kits and services, then isolates the Storage Shed transaction gap between resource payment, internal state, visible world adoption, collision, gameplay effect, and rollback.

## Plan ledger

**Goal:** update one repository with a complete, timestamped internal audit and synchronize the result into the central LuminaryLabs ledger.

- [x] Enumerate ten Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare nine eligible repositories against the central ledger.
- [x] Confirm nine root `.agent` folders.
- [x] Confirm no repository is new, missing, undocumented, or locally ahead.
- [x] Select only ZombieOrchard by the oldest eligible timestamp.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all kits and offered services.
- [x] Add architecture, render, gameplay, interaction, construction, deployment, central-sync, tracker, and turn-ledger documents.
- [x] Refresh required root `.agent` documents and registry.
- [x] Push only to `main` with no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0
locally-ahead repositories: 0

ZombieOrchard      2026-07-13T18-00-38-04-00 selected
TheUnmappedHouse   2026-07-13T19-58-19-04-00
AetherVale         2026-07-13T20-40-15-04-00
PhantomCommand     2026-07-13T21-02-54-04-00
PrehistoricRush    2026-07-13T21-38-52-04-00
IntoTheMeadow      2026-07-13T22-40-52-04-00
TheOpenAbove       2026-07-13T22-58-22-04-00
HorrorCorridor     2026-07-13T23-38-39-04-00
MyCozyIsland       2026-07-13T23-58-48-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was modified in the Publish organization.

## Complete interaction loop

```txt
browser boot
  -> create mutable kit runtime
  -> install gameplay and interface kits
  -> create Canvas2D and HTML renderers
  -> expose raw GameHost
  -> begin fixed 1/60 RAF tick

menu and play
  -> delegated HTML action
  -> interface-composition command
  -> scoped interface activation
  -> route transition to active-session

construction
  -> transition from active-session to construction
  -> activate Storage Shed action
  -> nested construction-runtime build
  -> catalog lookup with first-item fallback
  -> immediate resource debit
  -> append generated built record
  -> discard nested result
  -> HTML lists the record
  -> Canvas2D ignores the record
  -> return to active-session with no structure effect

gameplay
  -> movement, collection, pest clearing, and phase changes
  -> resource, pressure, orchard, score, damage, and outcome mutation
  -> snapshot
  -> Canvas2D and HTML projection
```

## Domains in use

```txt
browser document, DOM, delegated input, Canvas2D, RAF, error panel, and GameHost
kit runtime, domain registration, command dispatch, tick, event, snapshot, and subscription
entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, and outcome interfaces
interface composition and nested action routing
resource ledger, pressure field, orchard world, construction, roster, and inventory
movement, apples, pests, phases, score, damage, failure, and outcome
construction item, cost, placement, render, collision, effect, settlement, rollback, and visible proof
HTML content safety and command admission
smoke validation, static build, Pages deployment, repo-local tracking, and central tracking
```

## Implemented kits and services

```txt
kit-runtime: registration, domains, arbitrary commands, ticks, events, snapshots, subscriptions
scoped-interface-domain-kit: state, fields, selection, actions, events, snapshots
12 interface kits: authored route-specific controls and projections
interface-composition-kit: transition, Back, nested command, Outcome routing
resource-ledger-kit: canPay, pay, add, snapshot
pressure-field-kit: adjust, tick, snapshot
orchard-world-kit: trees, apples, collect-near, refill, bounds, snapshot
construction-runtime-kit: catalog, payment, built record, message, snapshot
roster-runtime-kit: payment, hiring, names, snapshot
inventory-runtime-kit: equipment mutation and snapshot
world-canvas-render-kit: Canvas2D world projection
html-interface-render-kit: HUD, screens, cards, delegated controls, HTML projection
game-host-diagnostics-kit: raw engine, state readback, manual tick
smoke-fixture-kit: Entry, Play, apple assertions
static-build-copy-kit: dist copy
pages-deploy-kit: Pages publication

engine-installed kit surfaces: 19
host/tooling/support surfaces: 8
total implemented surfaces: 27
```

## Main findings

```txt
unknown construction item fallback: present
resource reservation: absent
placement validation: absent
bounds/overlap policy: absent
construction render descriptor: absent
Canvas2D built-record consumer: absent
collision consumer: absent
gameplay-effect consumer: absent
nested terminal-result propagation: absent
command identity/idempotency: absent
rollback: absent
first visible construction-frame acknowledgement: absent
construction fixtures: absent
```

## Required authority

```txt
zombie-orchard-construction-settlement-world-adoption-authority-domain
```

## Required output family

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-14T00-38-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T00-38-19-04-00.md
.agent/architecture-audit/2026-07-14T00-38-19-04-00-construction-settlement-world-adoption-dsk-map.md
.agent/render-audit/2026-07-14T00-38-19-04-00-built-structure-visible-world-gap.md
.agent/gameplay-audit/2026-07-14T00-38-19-04-00-resource-payment-inert-construction-loop.md
.agent/interaction-audit/2026-07-14T00-38-19-04-00-build-command-settlement-adoption-map.md
.agent/construction-audit/2026-07-14T00-38-19-04-00-placement-collision-effect-contract.md
.agent/deploy-audit/2026-07-14T00-38-19-04-00-construction-adoption-fixture-gate.md
.agent/central-sync-audit/2026-07-14T00-38-19-04-00-repo-ledger-construction-adoption-reconciliation.md
```

## Validation

Documentation only. Runtime, gameplay, renderer, HTML, CSS, tests, scripts, dependencies, workflow, build, and deployment were not changed. No transactional construction or production-readiness claim is made.
