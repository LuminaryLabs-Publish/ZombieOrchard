# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-12T03-11-51-04-00
status: fixed-step-clock-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local completion
```

## Summary

`src/start.js` calls `engine.tick(1 / 60)` exactly once per `requestAnimationFrame`. The browser display cadence is therefore the simulation clock. A 30 Hz client advances about half a simulation second per wall second, while a 120 Hz client advances about two simulation seconds.

The same mutable graph is also reachable through `window.GameHost.tick(dt)`. Automatic and manual stepping have no exclusive writer lease, simulation epoch, step ID, catch-up policy, visibility barrier, publication batch, or visible-frame receipt.

## Plan ledger

**Goal:** establish one wall-time-driven fixed-step authority that owns automatic/manual step admission, exact step execution, bounded catch-up, suspension, publication, observation, and frame proof.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Read browser boot, runtime tick, active-session timing, renderers, package scripts, smoke proof, and current audit state.
- [x] Identify the interaction loop, domains, all 27 implemented kits, and services.
- [x] Confirm simulation speed changes with display cadence.
- [x] Confirm public manual stepping can overlap automatic RAF ownership.
- [x] Define clock, writer, accumulator, catch-up, visibility, result, publication, observation, and fixture contracts.
- [x] Add architecture, render, gameplay, interaction, clock-system, and deploy audits.
- [ ] Implement and run fixed-step clock fixtures.

## Interaction loop

```txt
module boot
  -> create game graph
  -> create canvas and HTML renderers
  -> publish GameHost.engine and GameHost.tick
  -> start draw()

browser frame
  -> engine.tick(1 / 60)
  -> runtime clamps the literal delta
  -> runtime increments elapsed and frame
  -> every domain.tick receives the literal delta
  -> runtime publishes a snapshot
  -> canvas and HTML render
  -> schedule next RAF

manual/public
  -> GameHost.tick(dt)
  -> same mutation and publication path
  -> no exclusion from browser-frame stepping
```

## Source-backed findings

1. `src/start.js` ignores the RAF timestamp and submits `1 / 60` for every display callback.
2. `src/kits/runtime.js` increments `ctx.elapsed` and `ctx.frame` on every call, ticks every domain, and publishes immediately.
3. Runtime delta clamping prevents very large individual deltas but does not create a fixed-step accumulator.
4. `window.GameHost.tick(dt)` exposes a second unrestricted writer to the same runtime.
5. `pressure-field.tick(dt)` adds `dt * 0.8` row pressure and `dt * 0.2` curse.
6. Night pest spawning performs one `Math.random() < dt * 0.55` trial per tick.
7. Pests move `dt * 36` units and contact damage applies `dt * 7` condition per tick.
8. At 30/60/120 Hz, source-level simulation advances at approximately 0.5x/1x/2x wall time.
9. One tick always triggers snapshot publication, so catch-up through repeated calls would also multiply public publications.
10. No simulation epoch, step ID, writer lease, accumulator, catch-up budget, lag-drop result, visibility generation, or simulation/frame receipt exists.
11. Current smoke proof verifies route transition and apple presence only.

## Quantified cadence divergence

| Display cadence | Sim seconds / wall second | Row pressure / second | Pest movement / second | Condition loss / second |
|---:|---:|---:|---:|---:|
| 30 Hz | 0.5 | 0.4 | 18 | 3.5 |
| 60 Hz | 1.0 | 0.8 | 36 | 7 |
| 120 Hz | 2.0 | 1.6 | 72 | 14 |

Approximate night pest-spawn probability per wall second:

```txt
30 Hz: 24.1%
60 Hz: 42.5%
120 Hz: 66.9%
```

## Domains in use

```txt
browser module boot, DOM ownership, RAF, and global host
runtime graph, domain registration, commands, ticks, events, snapshots, and subscriptions
simulation elapsed time, frame count, and delta clamp
automatic/manual step admission: missing
fixed-step clock, accumulator, writer, catch-up, lag, and visibility authority: missing
12 interface-screen domains and interface composition
resource ledger and pressure field
orchard world and random apple lifecycle
construction, roster, and inventory
active-session movement, collection, phases, pests, damage, and failure
canvas and HTML rendering
public diagnostics, Node smoke, static build, Pages deployment, and audit tracking
```

## Implemented kits and services

| Group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions, publication |
| interface kits | screen state, actions, activation, routing, nested dispatch, automatic Outcome routing |
| game kits | resources, pressure, trees, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render kits | orchard canvas, HUD, route screens, cards, delegated click bindings, per-frame DOM replacement |
| proof/deploy | raw engine, snapshot, unrestricted manual tick, smoke proof, static build, Pages |

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
zombie-orchard-fixed-step-clock-authority-domain
  -> runtime-clock-source-kit
  -> frame-time-observation-kit
  -> simulation-epoch-kit
  -> simulation-step-id-kit
  -> step-writer-lease-kit
  -> fixed-step-policy-kit
  -> simulation-accumulator-kit
  -> catch-up-budget-kit
  -> lag-drop-policy-kit
  -> visibility-suspension-kit
  -> manual-step-capability-kit
  -> simulation-step-command-kit
  -> simulation-step-admission-kit
  -> simulation-step-result-kit
  -> tick-publication-barrier-kit
  -> simulation-clock-observation-kit
  -> simulation-clock-journal-kit
  -> simulation-frame-receipt-kit
  -> cadence-parity-fixture-kit
  -> manual-auto-exclusion-fixture-kit
  -> hidden-tab-resume-fixture-kit
  -> browser-clock-smoke-kit
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

## Proof boundary

Do not claim cadence-independent gameplay, fixed-step determinism, automatic/manual writer safety, bounded resume, single-publication batches, or simulation-to-frame correlation until the documented fixtures pass.