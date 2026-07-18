# ZombieOrchard project breakdown: pest population budget

**Timestamp:** `2026-07-17T21-40-33-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `pest-population-spawn-budget-retirement-authority-audited`

## Summary

The current Publish inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten remain centrally tracked, retain root `.agent` state, and have `main` heads matching their documented repo-local heads. ZombieOrchard had the oldest synchronized documented timestamp and was the only selected project.

The focused audit found that night simulation can append pests indefinitely. `active-session-domain-kit` tests `Math.random() < dt * 0.55`, appends a new pest on success, updates every pest every tick, and retires pests only when the player clears them. `world-canvas-render-kit` draws every retained pest each frame. No maximum population, lifetime, wave budget, update budget, render budget, or population projection exists.

No measured production regression is claimed. The source-backed gap is an unbounded population whose simulation and rendering cost scale linearly with time spent at night and player clearing rate.

## Interaction loop

```txt
entry / new run
  -> active-session
  -> day movement, collection and menu actions
  -> player selects Next Phase
  -> night begins
  -> every accepted simulation tick may append one pest
  -> every retained pest moves toward the player
  -> contact drains player condition
  -> Clear retires at most one nearby pest
  -> Canvas2D draws every retained pest
  -> player manually advances phase or loses the run
```

## Domains in use

```txt
runtime and command dispatch
scoped interface and route composition
entry, run setup, save-select, active-session, interrupt and outcome
resource ledger and pressure field
orchard world generation and collection
construction, roster and inventory
movement, pest spawn, chase, contact damage, clearing, score and failure
Canvas2D world projection and HTML HUD projection
browser host diagnostics
smoke validation, static build and Pages deployment
central documentation governance
```

## Implemented kits and offered services

The repository retains 27 implemented kit surfaces:

```txt
kit-runtime
  registration, domain creation, command dispatch, delta clamping,
  ticking, event buffering, snapshots and subscriptions

scoped-interface-domain-kit
  screen state, field mutation, selection, action activation,
  events and snapshots

entry-domain-kit
  Play, New Game and Settings

session-select-domain-kit
  Save Select projection and Back

run-setup-domain-kit
  run setup projection, Start and Back

active-session-domain-kit
  movement, collection, phase changes, pest simulation, contact damage,
  clearing, score, failure and public stamina state

interrupt-domain-kit
  Pause, Resume and Title

construction-domain-kit
  construction projection, Storage Shed action and Back

exchange-domain-kit
  Market projection and Back

roster-domain-kit
  Roster projection and Back

inventory-domain-kit
  Inventory projection and Back

knowledge-domain-kit
  Codex projection and Back

preferences-domain-kit
  Settings projection and Back

outcome-domain-kit
  outcome projection and Title

interface-composition-kit
  route transitions, nested commands, Back and outcome routing

resource-ledger-kit
  balance checks, payments, grants and snapshots

pressure-field-kit
  pressure channels, clamped adjustment, time growth, commands and snapshots

orchard-world-kit
  tree generation, apple generation/refill, collection, bounds and snapshots

construction-runtime-kit
  catalog lookup, payment, built records, messages and snapshots

roster-runtime-kit
  hiring payment, actor records, messages and snapshots

inventory-runtime-kit
  item snapshots and equipment mutation

world-canvas-render-kit
  canvas sizing and player/tree/apple/pest projection

html-interface-render-kit
  delegated route/gameplay commands, HUD and card projection

game-host-diagnostics-kit
  raw engine exposure, state readback and manual ticking

smoke-fixture-kit
  entry, Play and orchard-apple assertions

static-build-copy-kit
  static dist assembly

pages-deploy-kit
  GitHub Pages publication
```

## Source-backed population finding

```txt
night spawn probability:        dt * 0.55
expected spawn rate:            about 0.55 pests/second while night is active
population cap:                 absent
natural lifetime:               absent
phase-exit retirement:          absent
out-of-bounds retirement:       absent
clear command retirement:       one nearby target
per-tick work:                  iterate every retained pest
per-frame projection:           draw every retained pest
HUD population projection:      absent
long-night population fixture:  absent
```

At the current rate, an uncleared ten-minute night has an expected addition of roughly 330 pests. Because the phase transition is player-controlled, the night duration is not bounded by the runtime.

## Proposed authority

**Proposed only; runtime code was not changed:**

`zombie-orchard-pest-population-spawn-budget-retirement-authority-domain`

```txt
PestSpawnAdmissionCommand
  -> bind phase, run generation, population revision and policy
  -> accept, defer or reject one spawn
  -> PestSpawnAdmissionResult

PestPopulationSettlementCommand
  -> enforce capacity, lifetime and retirement policy
  -> publish PestPopulationResult

PestWorkBudgetCommand
  -> bound update and render work for the accepted population
  -> PestWorkBudgetResult

PestProjectionCommitCommand
  -> project population and pressure evidence
  -> FirstPestBudgetBoundFrameAck
```

## Planned surfaces

```txt
zombie-orchard-pest-population-spawn-budget-retirement-authority-domain
pest-population-policy-kit
pest-spawn-admission-kit
pest-capacity-budget-kit
spawn-rate-policy-kit
phase-spawn-adapter-kit
pest-lifetime-retirement-kit
pest-distance-retirement-kit
pest-wave-generation-kit
pest-update-budget-kit
pest-render-budget-kit
pest-population-result-kit
pest-pressure-coupling-kit
pest-hud-projection-kit
first-pest-budget-bound-frame-ack-kit
long-night-population-fixture-kit
phase-toggle-population-fixture-kit
clear-retirement-fixture-kit
source-dist-pages-pest-parity-kit
```

## Files in this audit family

```txt
.agent/trackers/2026-07-17T21-40-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T21-40-33-04-00.md
.agent/architecture-audit/2026-07-17T21-40-33-04-00-pest-population-budget-dsk-map.md
.agent/render-audit/2026-07-17T21-40-33-04-00-unbounded-pest-projection-cost-gap.md
.agent/gameplay-audit/2026-07-17T21-40-33-04-00-night-pest-accumulation-loop.md
.agent/interaction-audit/2026-07-17T21-40-33-04-00-pest-spawn-retirement-command-result-map.md
.agent/pest-system-audit/2026-07-17T21-40-33-04-00-population-capacity-lifetime-contract.md
.agent/deploy-audit/2026-07-17T21-40-33-04-00-pest-budget-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T21-40-33-04-00-oldest-selection-pest-budget-reconciliation.md
```

## Validation boundary

Documentation only. Runtime JavaScript, gameplay, simulation, rendering, input, package scripts, tests, workflows and deployment remain unchanged.