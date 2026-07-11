# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T23-50-53-04-00`.

```txt
status: session-first-clock-second-capability-third-seeded-replay-fourth
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local audit set is complete
```

## Selection audit

```txt
Accessible LuminaryLabs-Publish repositories: 10
Eligible non-Cavalry repositories: 9
Central ledger entries present: 9/9
Root .agent state present: 9/9
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
Selected: LuminaryLabs-Publish/ZombieOrchard
Selection rule: oldest eligible documented fallback
Prior selected-repo alignment: 2026-07-10T22-11-24-04-00
```

Current comparison:

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

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime(...kits)
  -> orchard-world creates fixed trees and 26 random apples
  -> create canvas renderer and HTML renderer
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
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next frame

DOM data-action
  -> interface-composition.activate
  -> active interface domain.activate
  -> optional child command
  -> optional screen transition

DOM data-command
  -> active-session collect | clear | next-phase
  -> synchronous mutation
  -> no stable command sequence or replay receipt
```

## Domains in use

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
ephemeral-event-emitter
tick-dispatcher
snapshot-aggregator
subscription-notifier
browser-animation-loop
gamehost-diagnostics
interface-screen-state
interface-composition
data-action-routing
data-command-routing
entry-domain
session-select-domain
run-setup-domain
active-session-domain
interrupt-domain
construction-domain
exchange-domain
roster-domain
inventory-domain
knowledge-domain
preferences-domain
outcome-domain
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
player-state
player-movement
apple-collection
pest-simulation
phase-progression
score-and-failure
global-random-source
apple-generation-randomness
pest-spawn-randomness
world-canvas-renderer
html-interface-renderer
smoke-fixture
static-build-copy
pages-deploy
central-ledger-sync
```

Missing authority domains:

```txt
runtime-session-instance
session-epoch
session-lifecycle-transaction
preset-reset-factory
fixed-step-clock
resource-disposal
capability-registry
interaction-binding-authority
seeded-random-source
session-random-streams
random-decision-ledger
command-replay-ledger
state-fingerprint
render-provenance
```

## Implemented kits and services

- `kit-runtime`: kit registration, domain construction, command routing, delta clamping, tick routing, ephemeral event emission, aggregate snapshots, and subscriber notification.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, action activation, and snapshots.
- `interface-composition-kit`: active/previous screen state, transitions, back navigation, parent activation, child command dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability checks, boolean payment, resource addition, and resource snapshots.
- `pressure-field-kit`: bounded channel adjustment and passive pressure growth on every tick.
- `orchard-world-kit`: fixed tree grid, global-random apple seeding and replenishment, nearby collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, built-object creation, and status messages.
- `roster-runtime-kit`: actor/role state, hiring payment, actor creation, and status messages.
- `inventory-runtime-kit`: inventory state and unrestricted equipment assignment.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, global-random pest spawning, pursuit, damage, score, failure, and action descriptors.
- `world-canvas-render-kit`: canvas resizing and world/player/pest projection.
- `html-interface-render-kit`: delegated click routing, HUD projection, quick gameplay commands, generic screen cards, and full per-frame HTML replacement.
- `game-host-diagnostics-kit`: raw engine access, aggregate state readback, and unrestricted manual ticking.
- `smoke-fixture-kit`: Entry-to-Play transition and apple-presence checks.
- `static-build-copy-kit`: static artifact copying.
- `pages-deploy-kit`: test, build, artifact upload, and Pages deployment from `main`.

## Random-consumption map

| Consumer | Random draws | Snapshot evidence | Replay consequence |
| --- | --- | --- | --- |
| `orchard-world.seedApples()` | tree selection, apple ID, X offset, Y offset, kind | resulting apples only | initial world and replenishment cannot be reproduced |
| `active-session.addPest()` | spawn angle and pest ID | resulting pest only | spawn identity and direction cannot be reproduced |
| `active-session.tick()` | night spawn admission per tick | no decision row | call count and cadence change encounter sequence |
| smoke test | accepts any nonempty apple set | no seed assertion | nondeterministic regressions remain invisible |

## Main finding

The runtime has hidden random state outside the kit graph. `createOrchardGame()` accepts a preset but no random provider, and the preset carries no seed. `orchard-world-kit` and `active-session-domain-kit` call global `Math.random()` directly. Random IDs, spawn decisions, and source state are absent from snapshots, events, command results, render observations, and `GameHost`.

This blocks exact reset proof and replay proof. A nominal New Game cannot declare whether it should reuse the same seed, derive a new seed, or restore a recorded stream. Equal commands and equal elapsed time cannot be expected to produce equal apples, pests, score, or outcome.

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

Do not start with Market implementation, economy balancing, new orchard content, renderer replacement, visual polish, save/resume claims, or broad random rewrites. First establish session ownership and fixed-step time, then inject seeded stream ownership through the existing world and active-session kits.
