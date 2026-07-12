# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T21-40-49-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, static build and Pages deployment.

The current audit establishes the missing route-scoped simulation admission boundary. The browser RAF calls `engine.tick()` continuously, the runtime ticks every domain, and interface composition only changes the visible route. Entry, Run Setup, Settings, Pause, management screens and Outcome therefore do not define whether pressure, pests, damage and other run state may advance.

## Plan ledger

**Goal:** define one authoritative policy that classifies every route and lifecycle phase, admits only the correct simulation work, freezes hidden gameplay when required, and correlates route, simulation phase, committed tick and rendered frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Avoid `PhantomCommand` because same-window documentation writes were active.
- [x] Select only `ZombieOrchard` as the oldest stable eligible repository.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Trace RAF, all-domain ticking, interface routing, pressure growth, pest updates, pause and terminal behavior.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` with no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement session, clock and route-scoped simulation admission fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T21-40-49-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T21-40-49-04-00-route-scoped-simulation-admission-dsk-map.md
.agent/render-audit/2026-07-11T21-40-49-04-00-route-simulation-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T21-40-49-04-00-hidden-route-simulation-loop.md
.agent/interaction-audit/2026-07-11T21-40-49-04-00-route-phase-command-admission-map.md
.agent/simulation-admission-audit/2026-07-11T21-40-49-04-00-route-policy-tick-contract.md
.agent/deploy-audit/2026-07-11T21-40-49-04-00-route-suspension-fixture-gate.md
.agent/turn-ledger/2026-07-11T21-40-49-04-00.md
.agent/kit-registry.json
```

Retain the prerequisite audits:

```txt
seeded random and replay: 2026-07-11T17-01-11-04-00
runtime session instance: 2026-07-11T18-28-40-04-00
versioned save/load: 2026-07-11T20-03-22-04-00
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

PhantomCommand     active same-window writes, skipped
ZombieOrchard      2026-07-11T20-03-22-04-00 selected
TheUnmappedHouse   2026-07-11T20-11-26-04-00
AetherVale         2026-07-11T20-30-33-04-00
IntoTheMeadow      2026-07-11T20-38-07-04-00
MyCozyIsland       2026-07-11T20-51-14-04-00
PrehistoricRush    2026-07-11T21-00-00-04-00
TheOpenAbove       2026-07-11T21-08-57-04-00
HorrorCorridor     2026-07-11T21-21-12-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
module boot
  -> create one mutable engine graph
  -> seed orchard apples
  -> create canvas and HTML renderers
  -> install delegated click listener
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> runtime ticks every domain
  -> pressure grows regardless visible route
  -> active-session pests and damage update whenever not ended
  -> canvas renders orchard/session state
  -> HTML renders the current interface route

interface action
  -> composition activates current route action
  -> optional nested domain command
  -> visible route changes
  -> no simulation admission state changes
```

## Main finding

```txt
visible interface route
  !=
authoritative simulation phase
```

`interface-composition` owns only `active` and `previous`. It does not own `NOT_STARTED`, `RUNNING`, `PAUSED`, `TERMINAL` or a route policy. `kit-runtime.tick()` invokes every domain tick on every RAF callback. `pressure-field.tick()` always advances, while `active-session.tick()` advances whenever the retained run is not ended.

Consequences:

```txt
Entry and Run Setup can age the hidden graph before Play
Pause can continue pressure, pests, pursuit and damage
Build, Market, Roster, Inventory and Codex can hide advancing danger
Title and Settings do not suspend the retained run
Outcome freezes only active-session through ended, while pressure continues
GameHost.tick(dt) bypasses visible-route expectations
```

## Domains in use

```txt
static browser route and ESM boot
runtime and run lifecycle authority: missing
fixed-step clock authority: missing
route-scoped simulation admission authority: missing
kit registration and mutable graph construction
commands, ticks, events, snapshots, subscriptions and publication
12 scoped interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world, trees, apples and collection refill
construction, roster and inventory runtimes
active-session movement, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, static build and Pages deployment
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

## Kit services

| Kit group | Services |
|---|---|
| runtime | registration, domain creation, command dispatch, delta clamping, all-domain ticks, events, snapshots, subscriptions and publication |
| interface | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| game | resources, pressure, trees and apples, collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, generic screens, slot-card projection, delegated bindings and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshots, manual tick, smoke proof, static copy and Pages chain |

## Required authority

```txt
zombie-orchard-route-scoped-simulation-admission-authority-domain
  -> simulation-phase-state-kit
  -> route-simulation-policy-kit
  -> domain-tick-classification-kit
  -> simulation-step-admission-kit
  -> simulation-step-plan-kit
  -> inactive-run-suspension-kit
  -> pause-resume-admission-kit
  -> management-route-time-policy-kit
  -> terminal-freeze-policy-kit
  -> manual-step-capability-kit
  -> simulation-step-receipt-kit
  -> route-tick-frame-correlation-kit
  -> simulation-admission-journal-kit
  -> route-suspension-fixture-kit
  -> hidden-mutation-fixture-kit
```

## Safe default route policy

```txt
entry, session-select, run-setup, preferences
  -> no run simulation admitted

active-session
  -> run simulation admitted

interrupt
  -> run simulation suspended

construction, exchange, roster, inventory, knowledge
  -> explicit product policy required
  -> safe prototype default: suspended

outcome
  -> terminal run mutation suspended
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission
+ Menu/Pause/Management/Outcome Suspension Fixture Gate
```
