# Project breakdown: ZombieOrchard composite command transactions

## Plan ledger

**Goal:** map the entire command path and define one atomic authority across parent action resolution, child commands, gameplay participants, publication and visible-frame acknowledgement.

- [x] Compare the full Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard`.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and offered services.
- [x] Trace nested action dispatch and every multi-domain gameplay command.
- [x] Define the DSK/domain boundary and fixture gate.
- [x] Update root `.agent` state on `main`.
- [ ] Implement runtime authority and fixtures.

## Selection result

```txt
Publish repositories: 10
eligible after Cavalry exclusion: 9
new or central-ledger-missing: 0
root-.agent-missing: 0
selected: LuminaryLabs-Publish/ZombieOrchard
reason: oldest eligible central entry; newer repo-local state also required central reconciliation
```

## Interaction loop

```txt
click
  -> data-action/data-command
  -> engine.command
  -> domain command
  -> optional nested engine.command
  -> immediate participant mutations
  -> one or more notify calls
  -> RAF later snapshots and renders canvas + HTML
```

## Command paths

```txt
interface action
  -> scoped domain activate
  -> action descriptor
  -> optional child command
  -> optional route move

collect
  -> orchard collectNear removes apple and reseeds
  -> ledger add reward if present
  -> pressure adjust if present
  -> score/message mutation

clear
  -> pest damage/removal
  -> score mutation
  -> ledger scrap add if present

build/hire
  -> ledger payment
  -> entity append
```

## Domains

```txt
browser host and RAF
kit runtime and mutable context
interface-screen domains
interface composition
resource ledger
pressure field
orchard world
construction runtime
roster runtime
inventory runtime
active session
canvas render
HTML render
public diagnostics
smoke/build/deploy
missing composite command authority
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Offered services

| Group | Services |
|---|---|
| runtime | domain registration, commands, ticks, events, snapshots, subscriptions, publication |
| interface | state, fields, selection, activation, action descriptors, nested dispatch, routes |
| game | resources, pressure, apples, collection, construction, hiring, equipment, movement, pests, damage, score |
| render | canvas world/HUD, HTML routes/cards/actions |
| proof/deploy | host readback, manual stepping, smoke, static build, Pages |

## Principal defect

The parent activation result is not the aggregate command result. A Storage Shed child can reject while the parent returns success. Multi-domain effects can also partially mutate because there is no prepare/commit/rollback contract.

## Required domain

```txt
zombie-orchard-composite-command-transaction-authority-domain
```

Required services:

```txt
command and transaction identity
session/route/revision admission
full action-plan resolution
participant prepare/commit/rollback
idempotency
buffered events and single publication
aggregate result and journal
canvas/HTML frame receipt
failure-injection fixtures
```