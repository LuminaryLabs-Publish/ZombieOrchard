# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T20-30-23-04-00`.

```txt
status: lifecycle-first-capability-reachability-second-gate-planned
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
Prior selected-repo root alignment: 2026-07-10T18-49-54-04-00
```

Current comparison:

```txt
ZombieOrchard        selected / 2026-07-10T18-49-54-04-00
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

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> createKitRuntime(...kits)
  -> instantiate resource, pressure, world, construction, roster,
     inventory, scoped interface, active-session, and composition domains
  -> create world canvas and HTML renderer
  -> attach one delegated root click listener
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tick every domain in insertion order
  -> notify subscribers with aggregate snapshot
  -> return a second aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next frame

DOM data-action
  -> interface-composition.activate
  -> active interface domain.activate
  -> action descriptor
  -> optional child engine.command
  -> child result discarded
  -> optional transition

DOM data-command
  -> active-session collect | clear | next-phase
  -> synchronous gameplay mutation
  -> next automatic frame projects aggregate state
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
session-clock-authority-missing
session-lifecycle-authority-missing
capability-registry-missing
interaction-binding-authority-missing
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

## Implemented kits and services

- `kit-runtime`: kit registration, domain construction, command routing, delta clamping, tick routing, ephemeral event emission, aggregate snapshots, and subscriber notification.
- `scoped-interface-domain-kit` plus 12 concrete screen kits: screen state, action catalogs, selection, field mutation, activation, and snapshots.
- `interface-composition-kit`: active/previous screen state, transition, back navigation, parent activation, child command dispatch, and automatic outcome routing.
- `resource-ledger-kit`: affordability, boolean payment, resource addition, and aggregate resource state.
- `pressure-field-kit`: bounded channel adjustment and unconditional per-tick pressure growth.
- `orchard-world-kit`: deterministic tree grid, nondeterministic apple seeding/replenishment, nearby collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, built-object creation, and status messages.
- `roster-runtime-kit`: actor/role state, hiring payment, actor creation, and status messages.
- `inventory-runtime-kit`: inventory snapshots and unrestricted equipment assignment.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, pest spawning, pursuit, damage, score, failure, and action descriptors.
- `world-canvas-render-kit`: canvas resize and orchard/player/pest projection.
- `html-interface-render-kit`: root click delegation, active-session HUD, hard-coded quick commands, generic screen cards, and full per-frame `innerHTML` replacement.
- `game-host-diagnostics-kit`: raw engine handle, aggregate snapshot readback, and unrestricted manual tick hook.
- `smoke-fixture-kit`: entry-to-play transition and apple-presence reachability.
- `static-build-copy-kit`: copy `index.html` and `src` to `dist`.
- `pages-deploy-kit`: test, build, artifact upload, and Pages deployment from `main`.

## Capability reachability matrix

| Capability | Implemented owner | Browser route | Browser binding | Current status |
| --- | --- | --- | --- | --- |
| Play | entry action | Entry | `data-action` | reachable, screen-only |
| New Game | entry/run-setup actions | Entry -> Run Setup | `data-action` | reachable, no reset |
| Pause/Resume | active-session/interrupt actions | Gameplay <-> Pause | `data-action` | reachable, simulation not paused |
| Collect | active-session command | Gameplay | hard-coded `data-command` | reachable |
| Clear | active-session command | Gameplay | hard-coded `data-command` | reachable |
| Next Phase | active-session command | Gameplay | hard-coded `data-command` | reachable |
| Move | active-session command | Gameplay | none | unreachable |
| Build shed | construction-runtime command | Build | nested preset action | reachable, nested result discarded |
| Hire worker | roster-runtime command | Roster | none | unreachable |
| Equip item | inventory-runtime command | Inventory | none | unreachable |
| Select action | scoped interface command | any screen | none | unreachable |
| Set field | scoped interface command | Run Setup/Settings | none | unreachable |
| Direct back/transition | composition command | any screen | none | unreachable except through action descriptors |
| Save selection | session-select domain | no incoming route | none | unreachable shell |
| Market transaction | no runtime market service | Market | Back only | not implemented |
| Codex content | knowledge screen state | Codex | Back only | shell only |
| Settings mutation | preferences screen state | Settings | none | shell only |

## Verified interaction and service-exposure gaps

1. `active-session.command("move")` exists, but the HTML renderer binds no keyboard, pointer, gamepad, or movement buttons.
2. The player starts at `{ x: 0, y: 180 }` and can collect only within radius `42`.
3. Apples are seeded globally with `Math.random()` across 63 trees, so no apple is guaranteed to spawn in collection range.
4. A run can therefore begin with no human-recoverable path to the core collection action.
5. `roster-runtime.command("hire")` exists but no action descriptor or renderer control invokes it.
6. `inventory-runtime.command("equip")` exists but inventory cards are non-interactive.
7. Scoped interface `select` and `set-field` commands exist but the renderer produces no corresponding controls.
8. `session-select` is instantiated but Entry has no action that routes to it.
9. Run Setup and Preferences support field state in the generic domain, but no fields are defined or rendered.
10. Exchange is presented as Market, but no market source, command, result, transaction, or projection service exists.
11. Roster, Inventory, Session Select, Codex, and Settings therefore overstate the operational surface available to the player.
12. Disabled action metadata is retained by the domain but the renderer does not emit the HTML `disabled` attribute.
13. The smoke test proves only Entry -> Play and non-empty apples; it never proves movement, successful collection, building, hiring, equipping, pause semantics, or service reachability.
14. Existing lifecycle and clock defects remain the first implementation blocker.

## Main finding

`ZombieOrchard` has no canonical capability exposure contract joining implemented domain services, preset-declared actions, interface routes, renderer affordances, command bindings, command results, and fixture coverage.

The immediate user-facing failure is movement admission. Movement is implemented inside the active-session kit but absent from every human input surface. Because apple placement is nondeterministic, the nominal collect-survive loop is not guaranteed to be startable by a player.

## Ordered safe ledges

```txt
1. ZombieOrchard Runtime Session Clock and Lifecycle Authority
   + Pause/Reset/Refresh-Rate Fixture Gate

2. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

## What not to do next

Do not begin with Market catalog expansion, economy balancing, new pest types, renderer replacement, visual polish, or broad runtime rewrites. Establish lifecycle ownership first. Then update existing interaction, preset, renderer, and domain owners so every intended public service is either reachable and proven or explicitly classified as dormant/internal.