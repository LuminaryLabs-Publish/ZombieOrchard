# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T21-40-49-04-00
status: route-scoped-simulation-admission-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
```

## Summary

`ZombieOrchard` renders interface routes independently from simulation admission. `src/start.js` calls `engine.tick(1 / 60)` on every RAF callback. `src/kits/runtime.js` then ticks every domain without consulting the active route, lifecycle or pause state. `interface-composition` changes only the visible route.

The result is hidden mutation: pressure grows before Play and while menus are open; pests, pursuit and damage may continue while Pause or management screens cover the world; Outcome freezes only the active-session domain through `ended`, while pressure still advances.

## Plan ledger

**Goal:** define one route/lifecycle admission policy that decides which simulation domains may advance, produces a committed step receipt, and correlates that decision with the visible interface and rendered frame.

- [x] Compare all accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip active same-window `PhantomCommand` writes.
- [x] Select only `ZombieOrchard` as the oldest stable eligible repository.
- [x] Read boot, runtime, composition, scoped interfaces, gameplay, preset and renderers.
- [x] Identify the interaction loop, all domains, implemented kits and offered services.
- [x] Trace hidden mutation across Entry, Run Setup, Pause, management, Title, Settings and Outcome.
- [x] Define route policy, simulation phase, step admission, result, journal and fixture contracts.
- [x] Add architecture, render, gameplay, interaction, simulation-admission and deploy audits.
- [ ] Implement the authority and run executable fixtures.

## Interaction loop

```txt
module boot
  -> create retained graph
  -> start RAF immediately

RAF
  -> engine.tick(1 / 60)
  -> pressure-field.tick()
  -> active-session.tick()
  -> interface-composition.tick()
  -> snapshot
  -> world canvas render
  -> interface render

interface activation
  -> activate action on visible route
  -> optional nested command
  -> move composition.active
  -> no simulation phase transition
```

## Source-backed findings

1. `src/start.js` begins ticking immediately after module evaluation, before Play or New Game.
2. `createKitRuntime().tick()` iterates every registered domain on every admitted call.
3. `pressure-field.tick()` always increments `rowPressure` and `curse`.
4. `active-session.tick()` checks only `state.ended`; it does not check the visible route or pause state.
5. `interface-composition` stores `active` and `previous` only and has no simulation policy.
6. The Pause action routes to `interrupt`, but the RAF and gameplay ticks continue.
7. Construction, Market, Roster, Inventory and Codex are interface routes, not simulation barriers.
8. Entry, Run Setup and Settings can age the retained graph before gameplay begins.
9. Outcome stops active-session mutation only because `ended` is true; pressure continues.
10. `GameHost.tick(dt)` can advance the same graph regardless route.
11. Canvas rendering continues on every route and carries no route/phase/tick/frame receipt.
12. The smoke test does not assert menu idleness, pause suspension or management-screen policy.

## Domains in use

```txt
browser module boot and RAF host
runtime/run/session lifecycle authority: missing
fixed-step clock authority: missing
route-scoped simulation admission authority: missing
kit/domain registration and graph construction
command, tick, event, snapshot, subscription and publication routing
12 interface-screen domains
interface composition and automatic Outcome routing
resource ledger
pressure field
orchard world and apple lifecycle
construction, roster and inventory
active-session movement, phases, pests, damage, score and failure
canvas and HTML presentation
GameHost diagnostics
smoke, static build and Pages deployment
```

## Implemented kits and services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, elapsed/frame mutation, all-domain tick, events, snapshots, subscriptions and publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, gain and resource projection |
| `pressure-field-kit` | clamped pressure channels and unconditional per-tick growth |
| `orchard-world-kit` | tree grid, random apple population, nearest collection and refill |
| construction/roster/inventory kits | build, hire and equip mutations |
| `active-session-domain-kit` | movement, collection, phase changes, pests, pursuit, damage, score and terminal failure |
| render kits | orchard canvas, HUD, generic screens, cards, delegated actions and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Complete implemented kit inventory

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

## Required composed domain

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

## Required step transaction

```txt
StepCommand
  -> admit runtimeId, runId, sessionEpoch and lifecycle
  -> read committed interface route and route revision
  -> resolve explicit route simulation policy
  -> classify domains as simulation, presentation or inactive
  -> admit bounded fixed steps only when policy permits
  -> commit one simulationTickId and domain receipts
  -> render canvas and HTML from the same committed receipt
  -> acknowledge route, simulation phase, tick and frame
```

Rejected or suspended steps must not mutate pressure, pests, player condition, score or other run state. Resume must not synthesize hidden catch-up unless an explicit product policy admits it.

## Route policy baseline

| Route | Safe default |
|---|---|
| entry | no run simulation |
| session-select | no run simulation |
| run-setup | no run simulation |
| active-session | simulation active |
| interrupt | simulation suspended |
| construction/exchange/roster/inventory/knowledge | explicit policy; suspend for current prototype |
| preferences | no run simulation |
| outcome | terminal mutation suspended |

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```
