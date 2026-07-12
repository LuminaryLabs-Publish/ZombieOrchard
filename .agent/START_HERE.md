# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-12T01-30-07-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival/economy shell built from a mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates player-control reachability. The active-session domain implements `move({ x, y })`, but the shipped browser product has no keyboard, directional pointer or touch adapter that can issue it. Normal UI exposes only Collect, Clear, Next Phase and route actions. The player therefore remains at the initial `{ x: 0, y: 180 }` position, and orchard exploration is not reliably reachable.

## Plan ledger

**Goal:** connect browser movement intent to the existing active-session movement service through one route-aware, focus-aware and lifecycle-safe control authority.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Identify the interaction loop, domains, all 27 implemented kits and services.
- [x] Trace browser boot, HTML bindings, active-session movement and canvas projection.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files and the kit registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Implement the control authority and executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T01-30-07-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T01-30-07-04-00-player-control-reachability-dsk-map.md
.agent/render-audit/2026-07-12T01-30-07-04-00-unreachable-movement-visible-world-gap.md
.agent/gameplay-audit/2026-07-12T01-30-07-04-00-stationary-player-orchard-loop.md
.agent/interaction-audit/2026-07-12T01-30-07-04-00-browser-input-movement-admission-map.md
.agent/player-control-audit/2026-07-12T01-30-07-04-00-movement-binding-route-focus-contract.md
.agent/deploy-audit/2026-07-12T01-30-07-04-00-player-control-reachability-fixture-gate.md
.agent/turn-ledger/2026-07-12T01-30-07-04-00.md
.agent/kit-registry.json
```

Retain prerequisite audits:

```txt
seeded random and replay: 2026-07-11T17-01-11-04-00
runtime session instance: 2026-07-11T18-28-40-04-00
versioned save/load: 2026-07-11T20-03-22-04-00
route-scoped simulation admission: 2026-07-11T21-40-49-04-00
public capability gateway: 2026-07-11T23-41-55-04-00
composite command transaction: 2026-07-11T23-48-14-04-00
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing: 0
root-.agent-missing: 0

ZombieOrchard      2026-07-11T23-48-14-04-00 selected
TheUnmappedHouse   2026-07-12T00-01-25-04-00
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheOpenAbove       2026-07-12T00-39-05-04-00
IntoTheMeadow      2026-07-12T00-58-12-04-00
HorrorCorridor     2026-07-12T01-08-06-04-00
PhantomCommand     2026-07-12T01-20-00-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
module boot
  -> create retained graph, renderers and raw GameHost
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> snapshot all domains
  -> render canvas and active-route HTML

shipped browser controls
  -> delegated data-action / data-command clicks
  -> route actions, Collect, Clear and Next Phase
  -> no movement adapter

unreachable service
  -> active-session.command("move", { x, y })
  -> add 22 units and clamp to orchard bounds
```

## Main finding

```txt
player start: x=0, y=180
collection radius: 42
pest-clear radius: 58
movement command: implemented
browser movement binding: absent
```

The canvas displays a larger orchard and a player marker, but no product control can deliberately move that marker. Random seeding can leave all apples outside the fixed collection radius, producing a loop the player cannot resolve.

## Domains in use

```txt
browser boot, DOM and RAF
kit graph, commands, ticks, events, snapshots and publication
runtime/session, fixed-step and route admission authorities: missing
player-control reachability authority: missing
12 interface-screen domains and composition
resource, pressure, orchard, construction, roster and inventory
active-session movement, collection, clearing, phases, pests and failure
canvas and HTML projection
public diagnostics, smoke proof, static build and Pages deployment
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
| runtime | registration, domain creation, commands, ticks, events, snapshots, subscriptions and publication |
| interface | screen state, actions, activation, routing, nested dispatch and Outcome routing |
| game | resources, pressure, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, route screens, cards, delegated bindings and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Required authority

```txt
zombie-orchard-player-control-reachability-authority-domain
  -> control-binding-manifest-kit
  -> browser-keyboard-input-adapter-kit
  -> held-control-state-kit
  -> movement-intent-kit
  -> movement-vector-normalization-kit
  -> route-focus-control-lease-kit
  -> movement-command-admission-kit
  -> input-retirement-kit
  -> movement-command-result-kit
  -> control-observation-kit
  -> movement-frame-receipt-kit
  -> player-control-fixture-kit
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
