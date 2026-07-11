# Project breakdown: ZombieOrchard fixed-step clock authority

## Timestamp

`2026-07-11T15-20-27-04-00`

## Summary

ZombieOrchard advances one hard-coded `1 / 60` simulation step for every browser animation callback. The runtime therefore treats display cadence as simulation time. A 30 Hz browser advances the orchard at half the intended wall-time rate, a 120 Hz browser advances it at twice the intended rate, and background throttling has no explicit catch-up, defer, or dropped-time policy.

This pass documents the missing fixed-step clock authority that must consume the runtime/session identity defined by the earlier lifecycle audit. It changes documentation only.

## Plan ledger

**Goal:** define one session-owned wall-time accumulator that commits deterministic fixed simulation ticks, bounds catch-up work, separates render-frame identity from tick identity, freezes correctly during pause, and rejects conflicting manual stepping.

- [x] Compare all ten accessible LuminaryLabs-Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible central entry.
- [x] Read the current lifecycle audit and implementation queue.
- [x] Trace browser RAF, runtime delta admission, all-domain ticking, pressure growth, pest spawning, pursuit, damage, composition and rendering.
- [x] Identify all domains, kits and kit services.
- [x] Define the fixed-step clock DSK boundary and lifecycle dependency.
- [x] Define cadence, pause, stall, visibility, manual-step and render-correlation fixture gates.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [x] Push only to `main` with no branch or pull request.
- [ ] Implement the runtime-session authority prerequisite.
- [ ] Implement the fixed-step clock and execute fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
selected prior central timestamp: 2026-07-11T13-41-23-04-00
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` is changed in the Publish organization for this run.

## Interaction loop

```txt
module boot
  -> construct one mutable engine graph
  -> create renderers and delegated input
  -> expose raw GameHost
  -> call draw()

one browser animation callback
  -> engine.tick(1 / 60)
  -> clamp supplied delta to 0..0.1
  -> increment elapsed by supplied delta
  -> increment ctx.frame once
  -> tick every domain once
  -> pressure grows by delta
  -> night pest spawn samples Math.random against delta * 0.55
  -> pests pursue and damage by delta
  -> composition may route to Outcome
  -> aggregate mutable snapshots
  -> render canvas and HTML
  -> schedule the next callback

manual diagnostics
  -> GameHost.tick(dt)
  -> advances the same graph outside RAF ownership
```

## Main finding

`src/start.js` supplies exactly one `1 / 60` step per animation callback rather than measuring elapsed wall time. `src/kits/runtime.js` accepts that value as authoritative, advances elapsed time once, increments one frame counter and ticks every domain once.

Consequences:

```txt
30 callbacks per wall-time second
  -> 30 simulation ticks
  -> 0.5 simulated seconds

60 callbacks per wall-time second
  -> 60 simulation ticks
  -> 1.0 simulated seconds

120 callbacks per wall-time second
  -> 120 simulation ticks
  -> 2.0 simulated seconds

background or stalled callback
  -> no defined catch-up/defer/drop result

GameHost.tick(dt) between callbacks
  -> second mutation authority
  -> no automatic/manual exclusion
```

The clock also lacks independent identities for accepted wall-time samples, committed simulation ticks and rendered frames. `ctx.frame` currently behaves as a direct tick-call counter, not a presentation receipt.

## Domains in use

```txt
static browser route and ESM boot
browser runtime/session host
kit registration and mutable domain graph construction
command, tick, event, snapshot, subscription and publication routing
wall-time sampling, fixed-step accumulation and catch-up policy: missing
simulation tick identity and commit result: missing
render frame identity and clock acknowledgement: missing
pause, resume and visibility clock policy: missing
automatic/manual mutation lease: missing
12 interface-screen domains
interface route composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory runtimes
active-session movement, collection, phase, pest, damage, score and failure
world canvas projection
HTML projection and delegated interaction
GameHost diagnostics and unrestricted manual stepping
Node smoke, static build and Pages deployment
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `kit-runtime` | kit registration, domain creation, direct command routing, delta clamp, elapsed/frame mutation, all-domain tick, event recording, snapshot aggregation, subscriptions, publication |
| scoped interface kits | screen state, action catalogs, selection, fields, activation, disabled-state projection, snapshots |
| `interface-composition-kit` | route ownership, transitions, back navigation, nested dispatch, automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, addition, resource snapshot |
| `pressure-field-kit` | bounded channel adjustment, per-tick passive pressure and curse growth |
| `orchard-world-kit` | tree construction, random apple seeding and replenishment, nearby collection, world snapshot |
| `construction-runtime-kit` | catalog lookup, resource payment, build creation, status |
| `roster-runtime-kit` | hiring payment, actor creation, status |
| `inventory-runtime-kit` | inventory/equipment state and equip mutation |
| `active-session-domain-kit` | movement, collection, clearing, phase changes, random pest spawn, pursuit, damage, score and failure |
| `world-canvas-render-kit` | orchard, apple, pest, player and built-object canvas projection |
| `html-interface-render-kit` | active HUD, generic screen HTML, delegated command binding, per-frame DOM replacement |
| `game-host-diagnostics-kit` | raw engine access, snapshots and unrestricted manual tick |
| `smoke-fixture-kit` | Entry-to-Play and apple-presence proof |
| `static-build-copy-kit` | static distribution copy |
| `pages-deploy-kit` | test, build and GitHub Pages deployment chain |

## Complete kit inventory

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

## Required contract

```txt
RAF callback
  -> sample monotonic wall time
  -> validate runtime/session/epoch/lifecycle
  -> clamp frame delta by policy
  -> add accepted delta to accumulator
  -> execute zero or more fixed ticks up to maxCatchupSteps
  -> commit one result per tick
  -> return deferred/dropped time explicitly
  -> render once from the latest committed tick
  -> publish frame acknowledgement with session, tick and clock revision
```

Pause and visibility transitions must reset the wall-time baseline without injecting hidden catch-up time. Manual stepping must require an exclusive debug lease and must reject while the automatic clock owns mutation authority.

## Required proof

```txt
equal wall time at 30, 60 and 120 Hz produces equal committed state
zero-tick render frame is legal and cites the prior committed tick
multi-tick catch-up is bounded and ordered
stall overflow returns explicit deferred or dropped time
pause freezes pressure, pests, pursuit, damage and Outcome routing
resume and visibility restore reset the baseline
manual step rejects while automatic ownership is active
manual debug stepping is deterministic when exclusively leased
simulationTickId and renderFrameId remain independent and monotonic
canvas, HTML and GameHost observations cite the same committed tick
stale-session clock callbacks reject after session handoff
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

The fixed-step clock is Gate 2 and must consume Gate 1 runtime/session identity, lifecycle state and callback fencing. It must not introduce a second session or epoch model.