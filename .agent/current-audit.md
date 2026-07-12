# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-12T01-30-07-04-00
status: player-control-reachability-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Summary

The browser product does not expose the movement service already implemented by `active-session`. `start.js` creates the game, renderers, public host and RAF without keyboard or touch input. The HTML renderer binds only click actions and exposes Collect, Clear, Next Phase and route buttons. `world-canvas.js` is render-only.

The player starts at `{ x: 0, y: 180 }`. Since collection requires an apple within 42 units, random apple placement can produce a normal run in which the player cannot reach any collectible and has no action capable of changing that condition.

## Plan ledger

**Goal:** establish one browser-to-gameplay movement path with route/focus admission, held-input retirement, typed results and visible-frame proof.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Read boot, runtime composition, preset actions, HTML controls, active-session movement and canvas projection.
- [x] Identify the interaction loop, domains, all 27 implemented kits and services.
- [x] Confirm the movement command has no shipped product binding.
- [x] Define control binding, route/focus admission, retirement, result and fixture contracts.
- [x] Add architecture, render, gameplay, interaction, player-control and deploy audits.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run player-control fixtures.

## Interaction loop

```txt
Play
  -> route becomes active-session
  -> RAF ticks every domain and renders the world

browser controls
  -> route buttons
  -> Collect
  -> Clear
  -> Next Phase

movement
  -> active-session.command("move", { x, y }) exists
  -> no keyboard/pointer/touch adapter calls it
  -> player position remains unchanged in normal product use
```

## Source-backed findings

1. `src/start.js` installs no movement input listener.
2. `html-interface-renderer.js` installs one delegated click listener only.
3. Active-session buttons are Collect, Clear and Next Phase.
4. `world-canvas.js` has no pointer or touch input path.
5. `active-session.command("move")` adds `22 * x/y` and clamps to orchard bounds.
6. The player starts at `{ x: 0, y: 180 }`.
7. Collection requires an apple within 42 units.
8. Apples are randomly seeded around the orchard, so initial reachability is not guaranteed.
9. No binding manifest, held-key state, focus lease, route admission, input sequence or retirement service exists.
10. No movement result is correlated to a canvas/HTML frame.
11. Existing smoke proof checks route transition and apple presence only.

## Domains in use

```txt
browser boot, DOM and recursive RAF
runtime graph, commands, ticks, events, snapshots and subscriptions
runtime/session lifecycle authority: missing
fixed-step and single-writer authority: missing
route-scoped simulation admission authority: missing
player-control reachability authority: missing
public capability and composite transaction authorities: missing
12 interface-screen domains and composition
resources, pressure, orchard world, construction, roster and inventory
active-session movement, collection, phases, pests, damage and failure
canvas and HTML rendering
Node smoke, static build and Pages deployment
```

## Implemented kits and services

| Group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, clamped ticks, events, snapshots, subscriptions and publication |
| interface kits | screen state, actions, activation, routing, nested dispatch and Outcome routing |
| game kits | resources, pressure, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render kits | orchard canvas, HUD, route screens, cards, delegated click bindings and per-frame DOM replacement |
| proof/deploy | raw host, snapshot, manual tick, Node smoke, static build and Pages |

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

## Ordered safe ledges

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
