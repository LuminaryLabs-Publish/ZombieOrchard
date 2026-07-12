# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-12T03-11-51-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival/economy shell built from a mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates simulation-clock authority. `src/start.js` calls `engine.tick(1 / 60)` exactly once per `requestAnimationFrame`, so display callback count becomes simulation time. A 30 Hz client advances about half real time, while a 120 Hz client advances about twice real time. The public `GameHost.tick(dt)` also advances the same graph without a writer lease or correlation to a visible frame.

## Plan ledger

**Goal:** establish one authoritative fixed-step clock with wall-time accumulation, one step writer, bounded catch-up, hidden-tab handling, typed results, and visible-frame receipts.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Identify the interaction loop, domains, all 27 implemented kits, and services.
- [x] Trace automatic RAF stepping and public manual stepping.
- [x] Quantify 30/60/120 Hz pressure, pest movement, damage, and spawn divergence.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files and kit registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the clock authority and executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T03-11-51-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T03-11-51-04-00-fixed-step-clock-authority-dsk-map.md
.agent/render-audit/2026-07-12T03-11-51-04-00-refresh-rate-simulation-frame-gap.md
.agent/gameplay-audit/2026-07-12T03-11-51-04-00-raf-cadence-orchard-pressure-loop.md
.agent/interaction-audit/2026-07-12T03-11-51-04-00-automatic-manual-step-admission-map.md
.agent/clock-system-audit/2026-07-12T03-11-51-04-00-step-writer-accumulator-cadence-contract.md
.agent/deploy-audit/2026-07-12T03-11-51-04-00-fixed-step-clock-fixture-gate.md
.agent/turn-ledger/2026-07-12T03-11-51-04-00.md
.agent/kit-registry.json
```

Retain prerequisite and adjacent audits:

```txt
seeded random and replay: 2026-07-11T17-01-11-04-00
runtime session instance: 2026-07-11T18-28-40-04-00
versioned save/load: 2026-07-11T20-03-22-04-00
route-scoped simulation admission: 2026-07-11T21-40-49-04-00
public capability gateway: 2026-07-11T23-41-55-04-00
composite command transaction: 2026-07-11T23-48-14-04-00
player-control reachability: 2026-07-12T01-30-07-04-00
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing: 0
root-.agent-missing: 0

ZombieOrchard      2026-07-12T01-30-07-04-00 selected
TheUnmappedHouse   2026-07-12T01-41-56-04-00
AetherVale         2026-07-12T01-58-43-04-00
MyCozyIsland       2026-07-12T02-10-14-04-00
PrehistoricRush    2026-07-12T02-21-55-04-00
TheOpenAbove       2026-07-12T02-29-50-04-00
IntoTheMeadow      2026-07-12T02-38-23-04-00
HorrorCorridor     2026-07-12T02-49-19-04-00
PhantomCommand     2026-07-12T03-00-46-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
module boot
  -> create one engine, two renderers, and raw GameHost
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> increment runtime frame and elapsed
  -> tick every domain
  -> publish snapshot
  -> render canvas and HTML

manual path
  -> GameHost.tick(dt)
  -> advance the same engine independently
  -> no automatic/manual writer exclusion
  -> no committed step/frame receipt
```

## Main finding

```txt
clock source: RAF callback count
wall-time accumulator: absent
fixed-step batch policy: absent
step writer lease: absent
step/epoch identity: absent
catch-up and lag-drop policy: absent
visibility suspension: absent
manual-step capability: absent
simulation/frame receipt: absent
```

Current wall-time rates:

```txt
30 Hz: 0.5x simulation, 0.4 pressure/s, 18 pest units/s, 3.5 condition/s
60 Hz: 1.0x simulation, 0.8 pressure/s, 36 pest units/s, 7 condition/s
120 Hz: 2.0x simulation, 1.6 pressure/s, 72 pest units/s, 14 condition/s
```

## Domains in use

```txt
browser boot, DOM, recursive RAF, and global host
runtime graph, registration, commands, ticks, events, snapshots, and subscriptions
simulation time, frame counters, and delta clamping
automatic/manual step admission and fixed-step clock authority: missing
visibility suspension, catch-up, and lag policy: missing
12 interface-screen domains and composition
resources, pressure, orchard world, construction, roster, and inventory
active-session movement, collection, phases, pests, damage, and failure
canvas and HTML rendering
Node smoke, static build, Pages deployment, and internal audit tracking
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
| runtime | registration, domain creation, command dispatch, clamped ticks, events, snapshots, subscriptions, publication |
| interface | screen state, actions, activation, routing, nested dispatch, Outcome routing |
| game | resources, pressure, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render | orchard canvas, HUD, route screens, cards, delegated click bindings, per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshot, unrestricted manual tick, Node smoke, static copy, Pages chain |

## Required authority

```txt
zombie-orchard-fixed-step-clock-authority-domain
  -> wall-time observation
  -> simulation epoch and step IDs
  -> exclusive step-writer lease
  -> exact fixed-step policy and accumulator
  -> bounded catch-up and lag classification
  -> visibility suspension and resume generation
  -> manual-step capability and admission
  -> typed batch results and one publication barrier
  -> clock observation, journal, and visible-frame receipt
  -> cadence, writer-exclusion, hidden-tab, and browser fixtures
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
2b. Player-Control Reachability Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not use display callback count as simulation time.
Do not allow automatic and manual step writers to overlap.
Do not replay hidden-tab duration as unbounded catch-up debt.
Do not claim a visible state without a committed step/frame receipt.
```