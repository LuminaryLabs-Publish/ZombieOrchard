# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T22-11-24-04-00`.

```txt
status: session-instance-authority-first-clock-second-capability-third
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
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
Prior selected-repo alignment: 2026-07-10T20-30-23-04-00
```

Current comparison:

```txt
ZombieOrchard        selected / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor       tracked  / 2026-07-10T21-39-22-04-00
PhantomCommand       tracked  / 2026-07-10T21-49-26-04-00
TheCavalryOfRome     excluded by rule
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime(...kits)
  -> construct resource, pressure, world, construction, roster,
     inventory, interface, active-session, and composition domains
  -> create canvas renderer and HTML renderer
  -> attach one delegated click listener
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> all domain ticks in insertion order
  -> aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next frame

DOM data-action
  -> interface-composition.activate
  -> active interface domain.activate
  -> optional nested child command
  -> optional screen transition

DOM data-command
  -> active-session collect | clear | next-phase
  -> synchronous mutation
  -> next frame projects aggregate state
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
```

## Implemented kits and services

- `kit-runtime`: kit registration, domain construction, command routing, delta clamping, tick routing, ephemeral event emission, aggregate snapshots, and subscriber notification.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, action activation, and snapshots.
- `interface-composition-kit`: active/previous screen state, transitions, back navigation, parent activation, child command dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability checks, atomic boolean payment, resource addition, and resource snapshots.
- `pressure-field-kit`: bounded channel adjustment and passive pressure growth on every tick.
- `orchard-world-kit`: fixed tree grid, random apple seeding and replenishment, nearby collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, built-object creation, and status messages.
- `roster-runtime-kit`: actor/role state, hiring payment, actor creation, and status messages.
- `inventory-runtime-kit`: inventory state and unrestricted equipment assignment.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, pest spawning, pursuit, damage, score, failure, and action descriptors.
- `world-canvas-render-kit`: canvas resizing and world/player/pest projection.
- `html-interface-render-kit`: delegated click routing, HUD projection, quick gameplay commands, generic screen cards, and full per-frame HTML replacement.
- `game-host-diagnostics-kit`: raw engine access, aggregate state readback, and unrestricted manual ticking.
- `smoke-fixture-kit`: Entry to Play transition and apple-presence checks.
- `static-build-copy-kit`: static artifact copying.
- `pages-deploy-kit`: test, build, artifact upload, and Pages deployment from `main`.

## Session-control fidelity matrix

| Control | Current behavior | Session effect | Defect |
| --- | --- | --- | --- |
| Play | Entry -> Gameplay screen | none | prebuilt state was already ticking |
| New Game | Entry -> Run Setup -> Gameplay | none | no reset or new instance |
| Pause | Gameplay -> Interrupt screen | none | pressure and gameplay keep ticking |
| Resume | Interrupt -> Gameplay screen | none | not a lifecycle transition |
| Title | Interrupt/Outcome -> Entry | none | run remains live and mutable |
| Outcome routing | ended session -> Outcome | none | ended flag remains permanently true |
| Outcome -> Title | Outcome -> Entry | none | next composition tick can force Outcome again |
| Stop | absent | none | RAF continues |
| Dispose | absent | none | listener, RAF, renderers, and domains remain owned forever |

## Main finding

`createOrchardGame()` creates one mutable domain graph, and `src/start.js` starts ticking it before any user admission. Interface actions labeled Play, New Game, Pause, Resume, Title, and Run Summary only move the active screen. They do not create a session, assign an epoch, reset from the preset, stop ticking, retire a run, or dispose resources.

This is more than a pause bug. It means the product has no durable definition of which state belongs to which run. Resource balances, pressure, apples, built objects, roster entries, equipment, player damage, score, phase, pests, and the ended flag can survive route changes that imply a fresh or retired session.

## Ordered safe ledges

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

## What not to do next

Do not start with Market implementation, economy balancing, new orchard content, renderer replacement, visual polish, or broad domain rewrites. Define session ownership, reset semantics, lifecycle results, and proof fixtures first.