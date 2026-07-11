# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T15-20-27-04-00
status: fixed-step-clock-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

ZombieOrchard advances one hard-coded `1 / 60` simulation step per browser animation callback. Display cadence therefore controls simulated elapsed time, pressure growth, pest-spawn trials, pursuit, damage and terminal timing. The runtime has no wall-time accumulator, catch-up budget, overrun result, pause/visibility clock barrier, independent simulation-tick/render-frame identity or automatic/manual tick exclusion.

## Plan ledger

**Goal:** define a session-owned fixed-step clock that converts monotonic wall time into bounded deterministic ticks and correlates the latest committed tick with canvas, HTML and public readback.

- [x] Compare all ten accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Trace RAF, delta admission, elapsed/frame mutation and all-domain ticking.
- [x] Trace pressure, pest spawn, pursuit, damage, failure and Outcome routing.
- [x] Identify all domains, kits and services.
- [x] Define wall-time, accumulator, catch-up, pause, visibility, manual-step and render-correlation contracts.
- [x] Add architecture, render, gameplay, interaction, clock and deploy audits.
- [x] Push documentation only to `main` with no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement Gate 1 runtime-session authority.
- [ ] Implement Gate 2 clock authority and run fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central timestamp
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
src/start.js
  -> create graph, renderers and GameHost
  -> draw()

draw callback
  -> engine.tick(1 / 60)
  -> elapsed += delta
  -> ctx.frame += 1
  -> every domain tick(dt)
  -> snapshot
  -> canvas render
  -> HTML render
  -> next RAF

GameHost.tick(dt)
  -> same mutation path outside RAF ownership
```

## Main findings

1. `src/start.js` ignores the RAF timestamp and submits one `1 / 60` step per callback.
2. `src/kits/runtime.js` clamps and commits exactly one supplied delta, with no accumulator or catch-up loop.
3. `pressure-field-kit` and `active-session-domain-kit` consume delta for pressure, pest spawn, pursuit and damage.
4. Pause, Resume and Title are interface routes, not clock barriers.
5. `GameHost.tick(dt)` provides a second unleased mutation path.
6. `ctx.frame` counts tick calls and does not identify rendered frames.
7. Snapshots contain no runtime/session/tick/render provenance.

## Domains in use

```txt
browser boot and runtime host
kit/domain graph construction
direct command and tick routing
events, snapshots, subscriptions and publication
runtime-session lifecycle authority: missing
wall-time and fixed-step clock authority: missing
pause/visibility and catch-up policy: missing
automatic/manual mutation ownership: missing
simulation-tick/render-frame correlation: missing
12 interface-screen domains and composition
resource, pressure, orchard, construction, roster and inventory
movement, collection, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, build and Pages deployment
```

## Implemented kit services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta clamp, elapsed/frame mutation, all-domain tick, events, snapshots, subscriptions, publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch, automatic Outcome route |
| game kits | resources, pressure, orchard/apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render kits | orchard canvas, HUD, generic screens, delegated actions, per-frame HTML replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke, static copy and Pages chain |

## Required composed domain

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

## Required proof

```txt
30/60/120 Hz equal-wall-time state parity
zero-tick and multi-tick render callbacks
bounded stall catch-up with explicit overflow result
pause freeze and clean resume baseline
visibility baseline reset
automatic/manual exclusion
exclusive manual stepping
independent monotonic simulationTickId/renderFrameId
canvas/HTML/GameHost committed-tick parity
stale-session callback rejection
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

Gate 2 must consume Gate 1 runtime/session identity, lifecycle state and callback generation. It must not introduce parallel ownership.