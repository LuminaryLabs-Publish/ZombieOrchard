# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-10T20-30-23-04-00
```

## Current implementation queue

```txt
1. ZombieOrchard Runtime Session Clock and Lifecycle Authority
   + Pause/Reset/Refresh-Rate Fixture Gate

2. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

The lifecycle boundary remains first because every gameplay domain currently ticks before Play and through Pause. This pass adds the next bounded product-correctness gate: the browser UI exposes only a small subset of the services already implemented by the kits.

## Read this first

```txt
.agent/trackers/2026-07-10T20-30-23-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T20-30-23-04-00-interaction-capability-reachability-dsk-map.md
.agent/render-audit/2026-07-10T20-30-23-04-00-render-affordance-command-binding-gap.md
.agent/gameplay-audit/2026-07-10T20-30-23-04-00-core-loop-movement-admission-gap.md
.agent/interaction-audit/2026-07-10T20-30-23-04-00-capability-route-binding-result-map.md
.agent/capability-reachability-audit/2026-07-10T20-30-23-04-00-command-service-exposure-contract.md
.agent/deploy-audit/2026-07-10T20-30-23-04-00-interaction-capability-fixture-gate.md
.agent/turn-ledger/2026-07-10T20-30-23-04-00.md
.agent/kit-registry.json
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory still contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

```txt
ZombieOrchard        selected / prior root alignment 2026-07-10T18-49-54-04-00
TheUnmappedHouse     tracked  / 2026-07-10T19-00-19-04-00
MyCozyIsland         tracked  / 2026-07-10T19-11-19-04-00
PrehistoricRush      tracked  / 2026-07-10T19-30-36-04-00
AetherVale           tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow        tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove         tracked  / 2026-07-10T19-58-34-04-00
HorrorCorridor       tracked  / 2026-07-10T20-08-46-04-00
PhantomCommand       tracked  / 2026-07-10T20-19-35-04-00
TheCavalryOfRome     excluded by rule
```

`ZombieOrchard` was therefore the oldest eligible documented fallback and the only product repository changed in this run.

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival/economy shell composed from a kit runtime, 12 scoped interface domains, six gameplay/runtime domains, two render surfaces, a diagnostic host, a Node smoke test, and a Pages deployment workflow.

## Actual interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> instantiate every gameplay and interface domain immediately
  -> attach one delegated root click listener
  -> start one uncancelled requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate snapshot
  -> canvas render
  -> full HTML replacement

[data-action]
  -> interface-composition.activate
  -> active screen action descriptor
  -> optional nested child command
  -> optional screen transition

[data-command]
  -> active-session collect | clear | next-phase
  -> synchronous gameplay mutation
  -> next automatic frame projects the result
```

## New main finding

The implementation contains more services than the human interaction surface can reach.

```txt
implemented but not browser-bound:
- active-session.move
- roster-runtime.hire
- inventory-runtime.equip
- scoped interface select
- scoped interface set-field
- direct composition back/transition

route or product shell without an operational service:
- session-select is not linked from Entry
- exchange has Back only and no market command
- run-setup fields are not rendered or editable
- preferences fields are not rendered or editable
```

The most immediate gameplay consequence is that the player cannot move through the browser UI. Apple collection therefore depends on whether nondeterministic initial seeding places an apple within the fixed 42-unit collection radius of the starting position. The core collect loop can begin in a state the player cannot recover from.

## Next safe ledges

```txt
First:
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate

Then:
ZombieOrchard Interaction Capability Reachability
+ Movement/Service-Binding Fixture Gate
```

Do not begin with Market expansion, economy tuning, new orchard content, renderer replacement, or visual polish. Establish lifecycle ownership first, then prove that every declared public capability has a route, affordance, command binding, typed result, and observable effect.