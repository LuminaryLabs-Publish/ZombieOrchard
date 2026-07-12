# ZombieOrchard project breakdown

## Run timestamp

```txt
2026-07-11T20-03-22-04-00
```

## Plan ledger

**Goal:** document the full current product surface and define the missing versioned save/load authority without changing runtime behavior.

- [x] Compare the complete accessible Publish organization list with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Read the browser host, runtime, composition, interface, game domains, preset, renderers and smoke test.
- [x] Identify the interaction loop.
- [x] Identify every domain in use.
- [x] Identify every implemented kit and offered service.
- [x] Trace the existing Save Select surface and prove that persistence is absent.
- [x] Define the required DSK/domain boundary, transactions and fixtures.
- [x] Update the root `.agent` state and central tracking on `main`.
- [ ] Implement prerequisite runtime authorities and persistence code.

## Selection result

```txt
selected: LuminaryLabs-Publish/ZombieOrchard
reason: oldest eligible central ledger timestamp
excluded: LuminaryLabs-Publish/TheCavalryOfRome
other Publish repositories changed: none
```

## Interaction loop

```txt
module import
  -> createOrchardGame()
  -> construct one mutable graph
  -> seed random apples
  -> create renderers
  -> install delegated click input
  -> start recursive RAF

Entry
  -> Play -> active-session
  -> New Game -> run-setup
  -> Settings -> preferences
  -> no Save Select route

Save Select, if forced active
  -> generic screen domain
  -> renderer reads meta.slots
  -> no slots, load actions or storage service

snapshot
  -> aggregate current domain projections
  -> no inverse restore
  -> no clock/random continuation
```

## Domains in use

```txt
browser host and ESM route
runtime graph and command/tick routing
12 interface domains
interface composition
resource ledger
pressure field
orchard world
construction
roster
inventory
active-session gameplay
canvas rendering
HTML rendering and delegated input
diagnostics
smoke proof
static build
Pages deployment
missing runtime-session authority
missing fixed-step clock authority
missing capability and transaction authority
missing seeded randomness and replay authority
missing versioned persistence authority
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

```txt
runtime:
  registration, construction, commands, ticks, events,
  snapshots, subscriptions, publication

interface:
  screen state, fields, actions, selection, activation,
  route composition, child dispatch, Outcome routing

gameplay:
  resources, pressure, apples, collection, construction,
  hiring, inventory, movement, phases, pests, damage,
  scoring and terminal failure

presentation:
  orchard canvas, HUD, generic screens, slot cards,
  delegated click bindings and DOM replacement

proof/deploy:
  raw diagnostics, manual tick, smoke test,
  static copy and Pages deployment
```

## Primary finding

The repository contains the shape of a Save Select screen but no durable continuity path. There is no route to it, slot index, storage adapter, save/load command, versioned envelope, migration, deterministic continuation, atomic load transaction, rollback or restored-frame proof.

## Required output set

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-11T20-03-22-04-00.md
.agent/architecture-audit/2026-07-11T20-03-22-04-00-versioned-save-load-authority-dsk-map.md
.agent/render-audit/2026-07-11T20-03-22-04-00-save-slot-load-result-frame-gap.md
.agent/gameplay-audit/2026-07-11T20-03-22-04-00-play-new-game-save-select-continuity-loop.md
.agent/interaction-audit/2026-07-11T20-03-22-04-00-save-load-slot-command-result-map.md
.agent/persistence-audit/2026-07-11T20-03-22-04-00-versioned-slot-migration-restore-contract.md
.agent/deploy-audit/2026-07-11T20-03-22-04-00-persistence-roundtrip-fixture-gate.md
```

## Validation boundary

Documentation only. No runtime, package, rendering or deployment behavior was changed, and no persistence claim is made.