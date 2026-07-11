# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T15-20-27-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, static build and Pages deployment.

The current audit establishes the missing fixed-step clock authority. The browser advances exactly one hard-coded `1 / 60` simulation step per animation callback, so display cadence controls pressure growth, pest spawning, pursuit, damage and time to Outcome. There is no wall-time accumulator, bounded catch-up policy, pause/visibility clock barrier, independent simulation-tick/render-frame identity or automatic/manual tick exclusion.

## Plan ledger

**Goal:** preserve the current orchard behavior while making simulation time session-owned, cadence-independent, bounded under stalls, frozen during pause and provably correlated with rendered output.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace RAF timing, delta admission, pressure, pests, damage, Outcome routing and rendering.
- [x] Define the fixed-step clock DSK boundary and its dependency on runtime-session authority.
- [x] Add timestamped architecture and system audits.
- [x] Change no runtime source.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement Gate 1 runtime-session authority.
- [ ] Implement Gate 2 fixed-step clock authority and executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T15-20-27-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T15-20-27-04-00-fixed-step-clock-authority-dsk-map.md
.agent/render-audit/2026-07-11T15-20-27-04-00-simulation-tick-render-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T15-20-27-04-00-raf-cadence-pressure-pest-speed-loop.md
.agent/interaction-audit/2026-07-11T15-20-27-04-00-pause-manual-step-clock-admission-map.md
.agent/clock-authority-audit/2026-07-11T15-20-27-04-00-wall-time-accumulator-catchup-contract.md
.agent/deploy-audit/2026-07-11T15-20-27-04-00-cadence-parity-fixture-gate.md
.agent/turn-ledger/2026-07-11T15-20-27-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
module boot
  -> create one engine graph immediately
  -> create canvas and HTML renderers
  -> attach delegated click listener
  -> expose raw GameHost
  -> start recursive RAF

one RAF callback
  -> engine.tick(1 / 60)
  -> tick every domain once
  -> grow pressure and curse
  -> run night pest-spawn trial
  -> move pests and apply damage
  -> route to Outcome when ended
  -> aggregate snapshot
  -> render canvas and HTML
  -> schedule next callback

manual diagnostics
  -> GameHost.tick(dt)
  -> mutate the same graph outside RAF ownership
```

## Main finding

```txt
browser callback cadence
  -> simulation tick count
  -> simulated elapsed time
  -> pressure growth
  -> pest-spawn trial count
  -> pursuit and damage
  -> terminal timing
```

At 30 Hz the product advances roughly half as much simulation time per wall second as at 60 Hz. At 120 Hz it advances roughly twice as much. Background throttling has no explicit catch-up, defer or drop result. Pause and Title are routes, not clock barriers, and unrestricted `GameHost.tick(dt)` can compete with automatic RAF stepping.

## Domains in use

```txt
static browser route and ESM boot
browser runtime/session host
kit registration and mutable graph construction
command, tick, event, snapshot, subscription and publication routing
runtime/session lifecycle authority: missing
wall-time sampling and fixed-step accumulation: missing
catch-up budget and overrun policy: missing
pause/resume and visibility clock policy: missing
automatic/manual tick ownership: missing
simulation-tick and render-frame identity: missing
12 scoped interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory runtimes
active-session movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML projection and delegated interaction
GameHost diagnostics and direct mutation
Node smoke, static build and Pages deployment
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

```txt
kit runtime
  registration, domain creation, direct commands, delta clamp,
  elapsed/frame mutation, all-domain ticks, events, snapshots,
  subscriptions and publication

interface kits
  screen state, actions, selection, fields, activation,
  disabled-state projection, routing and nested dispatch

game kits
  resources, pressure, orchard/apples, construction, hiring,
  equipment, movement, phase changes, pests, damage, score and failure

render kits
  orchard canvas, HUD, generic screen HTML, delegated bindings
  and per-frame DOM replacement

diagnostics/proof/deploy
  raw engine, snapshots, unrestricted manual tick,
  Entry-to-Play smoke, apple proof, static copy and Pages chain
```

## Required clock domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
  -> clock-descriptor-kit
  -> monotonic-wall-time-sample-kit
  -> wall-time-baseline-kit
  -> fixed-step-accumulator-kit
  -> lifecycle-tick-admission-kit
  -> simulation-tick-id-kit
  -> simulation-tick-result-kit
  -> clock-catchup-budget-kit
  -> clock-overrun-policy-kit
  -> dropped-time-result-kit
  -> pause-clock-barrier-kit
  -> visibility-resume-policy-kit
  -> automatic-tick-lease-kit
  -> manual-step-command-kit
  -> manual-automatic-exclusion-kit
  -> render-frame-id-kit
  -> committed-tick-receipt-kit
  -> render-frame-clock-ack-kit
  -> clock-observation-kit
  -> clock-journal-kit
  -> cadence-parity-fixture-kit
  -> pause-stall-manual-step-fixture-kit
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ ZombieOrchard Fixed-Step Clock Authority
+ Start / Pause / 30-60-120 Hz / Stall / Manual-Step Fixture Gate
```

Gate 2 must consume Gate 1 runtime/session identity, lifecycle state and stale-callback fencing. It must not create a second session model.