# Current audit — ZombieOrchard

## Status

```txt
last aligned: 2026-07-10T23-50-53-04-00
status: session-first-clock-second-capability-third-seeded-replay-fourth
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Selection audit

All ten accessible `LuminaryLabs-Publish` repositories were compared. All nine eligible non-Cavalry repositories had central ledger and root `.agent` state, so the oldest documented-selection rule applied.

```txt
ZombieOrchard        selected / 2026-07-10T22-11-24-04-00
TheUnmappedHouse     tracked  / 2026-07-10T22-21-17-04-00
MyCozyIsland         tracked  / 2026-07-10T22-29-21-04-00
AetherVale           tracked  / 2026-07-10T22-50-02-04-00
IntoTheMeadow        tracked  / 2026-07-10T22-58-36-04-00
PrehistoricRush      tracked  / 2026-07-10T23-08-11-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
TheCavalryOfRome     excluded by rule
```

`ZombieOrchard` was the only product repository changed.

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime(...kits)
  -> orchard-world creates fixed trees and 26 random apples
  -> attach one delegated click listener
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> clear ephemeral events
  -> tick all domains in insertion order
  -> pressure growth
  -> optional night pest random draw
  -> pest movement, damage and ended-state mutation
  -> interface-composition Outcome projection
  -> aggregate snapshot
  -> world and HTML render
  -> request next frame

DOM data-action
  -> interface-composition.activate
  -> active interface action
  -> optional child command
  -> optional screen transition

DOM data-command
  -> active-session collect | clear | next-phase
  -> synchronous mutation
  -> no stable command sequence or replay receipt
```

## Domains in use

```txt
static browser host and boot
runtime entrypoint and game factory
kit runtime and engine context
domain registry and command router
ephemeral events, ticks, snapshots and subscribers
browser animation loop and GameHost diagnostics
12 scoped interface screen domains
interface composition and DOM routing
resource ledger and pressure field
orchard world and apple collection
construction, roster and inventory runtimes
active-session player, movement, collection, pest, phase, score and failure
ambient global random source
world canvas rendering
HTML interface rendering
smoke fixture, static build and Pages deployment
```

Missing authorities:

```txt
runtime session instance and epoch
preset reset and lifecycle transaction
fixed-step clock and disposal
capability registry and input binding
seeded random source
world and encounter random streams
random decision ledger
command replay ledger
state fingerprint
render provenance
```

## Implemented kits and services

- `kit-runtime`: registration, domain construction, command routing, delta clamping, ticking, events, snapshots, and subscriptions.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, activation, and snapshots.
- `interface-composition-kit`: active/previous screen state, transitions, back navigation, child command dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability, payment, resource addition, and snapshots.
- `pressure-field-kit`: bounded adjustment and passive pressure growth.
- `orchard-world-kit`: tree generation, random apple seeding/replenishment, collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, build creation, and status.
- `roster-runtime-kit`: actor/role state, hiring, actor creation, and status.
- `inventory-runtime-kit`: inventory state and equipment assignment.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, random pest spawning, pursuit, damage, score, and failure.
- `world-canvas-render-kit` and `html-interface-render-kit`: world/HUD projection and delegated DOM input.
- `game-host-diagnostics-kit`: raw engine access, snapshots, and unrestricted manual ticking.
- `smoke-fixture-kit`, `static-build-copy-kit`, and `pages-deploy-kit`: minimal proof, artifact copy, and deployment.

## Random-consumption map

| Consumer | Draws | Missing proof |
| --- | --- | --- |
| `orchard-world.seedApples()` | tree index, apple ID, X/Y offsets, kind | seed, stream, draw indexes, decisions |
| `active-session.addPest()` | angle and pest ID | seed, stream, draw indexes, decisions |
| `active-session.tick()` | spawn admission once per night tick | tick correlation and replay receipt |
| renderers | consume resulting state only | session/tick/seed/fingerprint provenance |

## Main finding

Randomness is hidden outside the kit graph. The preset and `createOrchardGame()` accept no seed or random provider. `orchard-world-kit` and `active-session-domain-kit` call global `Math.random()` directly, while snapshots, events, command results, render observations, and `GameHost` expose no generator state or decision history.

This blocks exact reset and replay proof. Equal commands and elapsed time cannot reproduce apples, pests, score, damage, or outcome. Night spawn draws are also coupled to the current one-tick-per-RAF defect. World and encounter randomness must be partitioned so apple-generation changes cannot perturb pest timing.

## Ordered safe ledges

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

## What not to do next

Do not start with Market implementation, economy balancing, new orchard content, renderer replacement, visual polish, save/resume claims, or a broad random rewrite. Establish session and clock authority first, then inject seeded streams through the existing world and active-session kits.
