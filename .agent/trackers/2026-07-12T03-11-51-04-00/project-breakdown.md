# Project breakdown: ZombieOrchard fixed-step clock authority

**Timestamp:** `2026-07-12T03-11-51-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Scope:** documentation-only architecture audit

## Plan ledger

**Goal:** replace refresh-rate-driven simulation and unrestricted manual stepping with one authoritative fixed-step clock, one writer at a time, bounded catch-up, visibility handling, typed step results, and visible-frame correlation.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Trace browser RAF ownership, `GameHost.tick`, runtime tick mutation, pressure, pest spawning, movement, damage, rendering, and smoke proof.
- [x] Identify the interaction loop, domains, all 27 implemented kits, and their services.
- [x] Quantify 30/60/120 Hz simulation divergence.
- [x] Define fixed-step writer, accumulator, catch-up, visibility, manual-step, result, observation, and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents and kit registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the clock authority and execute cadence fixtures.

## Selection comparison

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

Only `LuminaryLabs-Publish/ZombieOrchard` is changed in the Publish organization.

## Interaction loop

```txt
module boot
  -> create one mutable engine graph
  -> expose raw engine and manual tick through GameHost
  -> call draw()

browser frame
  -> engine.tick(1 / 60) exactly once
  -> every domain ticks
  -> frame and elapsed advance
  -> snapshot and listener publication occur
  -> canvas and HTML render
  -> requestAnimationFrame(draw)

external/manual path
  -> GameHost.tick(dt)
  -> the same engine advances immediately
  -> dt is clamped to 0..0.1
  -> no writer lease excludes the RAF path
  -> no frame receipt identifies the visible result
```

## Main finding

`src/start.js` uses the display callback count as simulation time. Every RAF advances exactly `1 / 60` seconds, regardless of elapsed wall time.

```txt
30 Hz display  -> 0.5 simulated seconds per wall second
60 Hz display  -> 1.0 simulated seconds per wall second
120 Hz display -> 2.0 simulated seconds per wall second
```

Consequences for source-backed systems:

```txt
rowPressure gain per wall second: 0.4 / 0.8 / 1.6
pest movement units per wall second: 18 / 36 / 72
contact condition loss per wall second: 3.5 / 7 / 14
night pest-spawn probability per wall second: ~24.1% / 42.5% / 66.9%
```

`window.GameHost.tick(dt)` can also advance the same state between automatic frames. The runtime has no clock source, accumulator, simulation epoch, step ID, single-writer lease, catch-up budget, lag-drop result, visibility barrier, manual-step capability, or committed simulation-frame receipt.

## Domains in use

```txt
browser module boot, DOM ownership, RAF and global host
runtime graph, domain registration, commands, ticks, events, snapshots and subscriptions
simulation time, frame counters and delta clamping
automatic versus manual step admission
fixed-step accumulation, catch-up and lag policy: missing
visibility suspension and resume policy: missing
12 interface-screen domains and interface composition
resource, pressure, orchard, construction, roster and inventory
active-session movement, collection, phases, pests, damage and failure
canvas and HTML projection
public diagnostics, Node smoke, static build and Pages deployment
runtime session, route, control, transaction, replay and persistence authorities retained as dependencies
```

## Implemented kits and services

```txt
implemented kits: 27
```

| Group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions, publication |
| interface kits | screen state, actions, activation, routing, nested dispatch, automatic Outcome routing |
| game kits | resources, pressure, trees, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render kits | orchard canvas, HUD, route screens, cards, delegated click bindings, per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static copy, Pages chain |

Complete inventory:

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

## Required parent domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
```

Candidate kits:

```txt
runtime-clock-source-kit
frame-time-observation-kit
simulation-epoch-kit
simulation-step-id-kit
step-writer-lease-kit
fixed-step-policy-kit
simulation-accumulator-kit
catch-up-budget-kit
lag-drop-policy-kit
visibility-suspension-kit
manual-step-capability-kit
simulation-step-command-kit
simulation-step-admission-kit
simulation-step-result-kit
tick-publication-barrier-kit
simulation-clock-observation-kit
simulation-clock-journal-kit
simulation-frame-receipt-kit
cadence-parity-fixture-kit
manual-auto-exclusion-fixture-kit
hidden-tab-resume-fixture-kit
browser-clock-smoke-kit
```

## Required transaction

```txt
RAF timestamp observation
  -> validate runtime session and visibility
  -> acquire automatic step-writer lease
  -> add bounded wall time to accumulator
  -> execute zero or more exact 1/60 simulation steps
  -> assign epoch and monotonic step IDs
  -> cap catch-up work and classify dropped lag
  -> publish one aggregate snapshot after the batch
  -> render once
  -> acknowledge the committed simulation/frame pair

manual step request
  -> require an explicit capability
  -> acquire the same exclusive writer lease or reject
  -> use the same step policy and typed result
  -> never interleave with automatic steps
```

## Required proof

```txt
30/60/120 Hz state parity for equal wall time
variable RAF cadence parity
long-frame bounded catch-up
hidden-tab suspension and bounded resume
monotonic epoch/step identity
one active step writer
manual-versus-automatic exclusion
one publication after each admitted step batch
pressure, pest movement, damage and spawn cadence parity
first visible frame cites the committed step range
```

## Validation boundary

Documentation changed only. Runtime, dependencies, scripts, rendering, deployment, and gameplay behavior were not changed. Existing smoke proof does not exercise browser cadence, wall-time accumulation, visibility, manual/automatic exclusion, catch-up, or frame correlation.