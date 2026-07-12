# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-12T03-11-51-04-00
status: fixed-step-clock-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Summary

`src/start.js` calls `engine.tick(1 / 60)` once per `requestAnimationFrame`, making display callback count the simulation clock. A 30 Hz client advances about half a simulation second per wall second, while a 120 Hz client advances about two. `window.GameHost.tick(dt)` also advances the same graph without a writer lease or visible-frame correlation.

## Plan ledger

**Goal:** establish one wall-time-driven fixed-step authority for automatic/manual step admission, exact step execution, bounded catch-up, suspension, publication, observation, and frame proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Read browser boot, runtime tick, game timing, renderers, scripts, smoke proof, and audit state.
- [x] Identify the interaction loop, domains, 27 implemented kits, and services.
- [x] Quantify 30/60/120 Hz divergence.
- [x] Define clock, writer, accumulator, catch-up, visibility, result, publication, observation, and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and execute fixed-step clock fixtures.

## Interaction loop

```txt
module boot
  -> create game graph and renderers
  -> publish GameHost.engine and GameHost.tick
  -> start draw()

browser frame
  -> engine.tick(1 / 60)
  -> increment elapsed and frame
  -> tick every domain
  -> publish snapshot
  -> render canvas and HTML
  -> schedule next RAF

manual/public
  -> GameHost.tick(dt)
  -> same mutation/publication path
  -> no exclusion from RAF stepping
```

## Source-backed findings

1. RAF timestamps are ignored.
2. Runtime clamps each supplied delta but has no accumulator.
3. Every tick increments elapsed/frame, ticks every domain, and publishes immediately.
4. Public manual stepping is a second unrestricted writer.
5. Pressure adds `dt * 0.8`; pests move `dt * 36`; contact damage applies `dt * 7`.
6. Night spawn performs one `Math.random() < dt * 0.55` trial per tick.
7. No epoch, step ID, writer lease, catch-up budget, lag result, visibility generation, batch publication, or step/frame receipt exists.
8. Smoke proof tests route transition and apple presence only.

## Cadence divergence

| Display | Sim seconds / wall second | Pressure / second | Pest movement / second | Damage / second |
|---:|---:|---:|---:|---:|
| 30 Hz | 0.5 | 0.4 | 18 | 3.5 |
| 60 Hz | 1.0 | 0.8 | 36 | 7 |
| 120 Hz | 2.0 | 1.6 | 72 | 14 |

Approximate night spawn probability per wall second:

```txt
30 Hz: 24.1%
60 Hz: 42.5%
120 Hz: 66.9%
```

## Domains in use

```txt
browser boot, DOM, recursive RAF, and global host
runtime registration, commands, ticks, events, snapshots, and subscriptions
simulation elapsed time, frame count, and delta clamping
automatic/manual step admission
fixed-step accumulation, writer lease, catch-up, lag, and visibility policy
12 interface-screen domains and composition
resources, pressure, orchard, construction, roster, and inventory
active-session movement, collection, phases, pests, damage, and failure
canvas and HTML rendering
Node smoke, static build, Pages deployment, and audit tracking
```

## Implemented kits and services

```txt
implemented kits: 27
```

| Group | Services |
|---|---|
| runtime | registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions, publication |
| interface | screen state, actions, activation, routing, nested dispatch, Outcome routing |
| game | resources, pressure, trees, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render | orchard canvas, HUD, route screens, cards, delegated click bindings, per-frame DOM replacement |
| proof/deploy | raw engine, snapshot, unrestricted manual tick, smoke proof, static build, Pages |

Complete kit inventory remains recorded in `.agent/kit-registry.json`.

## Required composed domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
```

The domain must own clock source, frame observations, epoch/step IDs, writer leases, fixed-step policy, accumulator, catch-up, lag dropping, visibility suspension, manual capability, step commands/results, publication barriers, observations, journals, frame receipts, and cadence fixtures.

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