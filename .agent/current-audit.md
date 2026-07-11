# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T12-01-38-04-00
status: fixed-step-clock-cadence-pause-manual-tick-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending
central internal change log: pending
```

## Summary

`ZombieOrchard` advances one hard-coded `1/60` simulation step for every browser animation frame. The runtime also exposes unrestricted manual ticking. Simulation rate therefore depends on RAF cadence and debug calls rather than elapsed wall time, lifecycle state or one authoritative committed-tick schedule.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining a session-owned fixed-step clock with deterministic tick identity, bounded catch-up, pause barriers and render correlation.

- [x] Compare all ten accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible documented repository.
- [x] Read browser host, runtime, composition and gameplay timing paths.
- [x] Identify all domains, implemented kits and provided services.
- [x] Trace automatic RAF and manual `GameHost.tick()` mutation paths.
- [x] Define accumulator, catch-up, dropped-time and pause contracts.
- [x] Add architecture, render, gameplay, interaction, clock and deploy audits.
- [x] Push documentation only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central review timestamp after concurrent PhantomCommand refresh
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> create canvas and HTML renderers
  -> expose GameHost
  -> draw()

one draw callback
  -> engine.tick(1 / 60)
  -> ctx.delta = clamp(delta, 0, 0.1)
  -> ctx.elapsed += delta
  -> ctx.frame += 1
  -> clear events
  -> tick every domain once
  -> notify subscribers
  -> aggregate snapshot
  -> render world and UI
  -> requestAnimationFrame(draw)
```

## Clock findings

### Display cadence controls gameplay speed

`draw()` passes a constant `1 / 60`; it never reads the RAF timestamp. At 30 Hz, only 30 simulation steps occur per second. At 120 Hz, 120 steps occur per second.

```txt
pressure growth per real second
  30 Hz  -> 0.4 rowPressure, 0.1 curse
  60 Hz  -> 0.8 rowPressure, 0.2 curse
  120 Hz -> 1.6 rowPressure, 0.4 curse
```

Night pest admission, pursuit and damage scale the same way because they consume the same fixed delta once per RAF.

### The runtime is not an accumulator

`engine.tick(delta)` clamps one supplied delta and ticks each domain once. It does not:

```txt
measure wall time
accumulate residual time
run zero or multiple fixed updates
limit catch-up work
record dropped time
publish overrun results
```

### Automatic and manual ticks race

`window.GameHost.tick(dt)` calls the same `engine.tick()` directly. A debug caller can advance elapsed time, frame count, pressure, pests, damage and automatic Outcome routing between browser RAF callbacks.

### Lifecycle does not gate the clock

Every domain ticks regardless of the active route. Pause, Entry, Title and Outcome are interface states, not simulation-clock barriers. The composition domain also checks terminal state on every tick and can route back to Outcome after Title.

### Tick and render identities are conflated

`ctx.frame` increments once per `engine.tick()`. The renderers consume a later aggregate snapshot, but there is no distinct:

```txt
simulationTickId
renderFrameId
clockRevision
sessionEpoch
stateFingerprint
firstFrameAcknowledgement
```

## Domains in use

```txt
browser route and runtime host
runtime graph construction
command, tick, event, snapshot, subscription and publication routing
12 interface-screen domains
route composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory
active-session movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML projection and delegated input
GameHost diagnostics/manual control
smoke, build and Pages deployment
missing runtime-session authority
missing fixed-step clock authority
missing capability, transaction, replay and persistence authority
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `kit-runtime` | kit registration, domain creation, direct command routing, delta clamp, all-domain tick, events, snapshots, subscriptions, publication |
| screen domain kits | screen state, action catalogs, selection, fields, activation, static disabled state, snapshots |
| `interface-composition-kit` | route ownership, transitions, back, nested dispatch, automatic Outcome routing |
| `resource-ledger-kit` | affordability, Boolean payment, addition, snapshot |
| `pressure-field-kit` | bounded adjustment, passive per-tick growth, snapshot |
| `orchard-world-kit` | tree generation, random apple seeding/replenishment, nearby collection, snapshot |
| `construction-runtime-kit` | catalog lookup, payment, construction creation, status |
| `roster-runtime-kit` | hiring payment, actor creation, status |
| `inventory-runtime-kit` | item/equipment state, equip mutation |
| `active-session-domain-kit` | movement, collection, pest clearing, phase change, pest spawn/pursuit, damage, score, failure |
| render kits | canvas world/HUD, interface HTML, delegated bindings, full projection replacement |
| diagnostics/proof/deploy kits | raw engine, snapshot, manual tick, smoke, static copy, Pages deployment |

## Required composed domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
  -> clock-descriptor-kit
  -> wall-time-sample-kit
  -> fixed-step-accumulator-kit
  -> simulation-tick-id-kit
  -> render-frame-id-kit
  -> lifecycle-tick-admission-kit
  -> clock-catchup-budget-kit
  -> dropped-time-result-kit
  -> clock-overrun-policy-kit
  -> automatic-tick-lease-kit
  -> manual-step-command-kit
  -> manual-automatic-exclusion-kit
  -> visibility-resume-policy-kit
  -> committed-tick-receipt-kit
  -> render-frame-clock-ack-kit
  -> clock-observation-kit
  -> clock-journal-kit
  -> cadence-parity-fixture-kit
  -> pause-freeze-fixture-kit
```

## Required clock contract

```txt
wall-time sample
  -> clamp frame delta
  -> accumulate admitted time
  -> run 0..N fixed simulation steps
  -> advance one monotonic tick ID per step
  -> stop at catch-up budget
  -> emit dropped/deferred-time result
  -> render latest committed tick once
  -> acknowledge tick ID in render frame receipt
```

## Fixture matrix

```txt
30 / 60 / 120 Hz for equal wall duration -> equal committed tick count and state
pause for wall duration -> zero gameplay ticks
resume -> no unbounded catch-up burst
large stall -> bounded steps plus explicit dropped/deferred time
manual step while automatic clock active -> typed rejection
manual step under debug lease -> exactly one committed tick
terminal state -> exactly-once final tick and stable Outcome
render frame -> cites latest committed tick and clock revision
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

Clock authority must consume session identity from Gate 1. Capability, transaction, replay and persistence layers must consume committed tick identity from this gate.
