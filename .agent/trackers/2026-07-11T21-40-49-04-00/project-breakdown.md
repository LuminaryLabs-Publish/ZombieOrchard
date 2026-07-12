# Project breakdown — Route-Scoped Simulation Admission

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

`ZombieOrchard` was selected as the oldest stable eligible Publish repository after active same-window writes were detected in `PhantomCommand`. The project has a visible interface router, but no simulation router. Every RAF callback advances all tickable domains regardless whether the player is at Entry, Run Setup, Pause, a management screen, Settings or Outcome.

## Plan ledger

**Goal:** document the complete product loop, domains, kits, services and the authority needed to prevent hidden gameplay mutation behind non-gameplay routes.

- [x] Compare all ten Publish repositories with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard`.
- [x] Read boot, runtime, composition, interface, gameplay, preset and renderer code.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and services.
- [x] Define route-scoped simulation admission kits and fixtures.
- [x] Update required root `.agent` files.
- [x] Add timestamped system audits.
- [ ] Implement runtime behavior and fixtures.

## Interaction loop

```txt
module boot -> retained graph -> RAF
RAF -> all-domain tick -> canvas render -> active-route HTML render
click -> composition activation -> optional nested command -> route move
```

## Domains

```txt
browser boot and RAF
runtime lifecycle: missing
fixed-step clock: missing
route-scoped simulation admission: missing
kit/domain runtime
interface screens and composition
resources and pressure
orchard and apples
construction, roster and inventory
active-session movement, pests, damage and scoring
canvas/HTML presentation
GameHost diagnostics
validation/build/deploy
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

## Services

```txt
runtime: registration, creation, commands, ticks, events, snapshots, subscriptions
interface: action activation, fields, routing, nested dispatch, Outcome routing
game: resources, pressure, apples, collection, build, hire, equip, movement, pests, damage, score
render: canvas world, HUD, generic screens, cards, delegated input, DOM replacement
proof/deploy: raw host, snapshot, manual tick, smoke, static build, Pages
```

## Main finding

`kit-runtime.tick()` invokes every domain tick. `pressure-field.tick()` always mutates. `active-session.tick()` only checks `ended`. `interface-composition` changes the visible route but does not alter a simulation phase. Pause and menus therefore do not prove simulation suspension.

## Required authority

```txt
zombie-orchard-route-scoped-simulation-admission-authority-domain
  -> simulation phase
  -> route policy
  -> domain tick classification
  -> step admission and plan
  -> suspension and resume policy
  -> terminal freeze
  -> manual-step capability
  -> step receipt and journal
  -> route/tick/frame correlation
```

## Validation state

Documentation only. Runtime, tests, build and browser smoke were not changed or executed.
