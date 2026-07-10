# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T18-49-54-04-00`.

```txt
status: runtime-session-clock-lifecycle-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local docs commit sequence completes
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
Prior selected-repo timestamp: 2026-07-10T17-18-47-04-00
```

Current comparison:

```txt
ZombieOrchard        selected / 2026-07-10T17-18-47-04-00
TheUnmappedHouse     tracked  / 2026-07-10T17-29-23-04-00
MyCozyIsland         tracked  / 2026-07-10T17-38-35-04-00
TheOpenAbove         tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush      tracked  / 2026-07-10T18-01-03-04-00
AetherVale           tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow        tracked  / 2026-07-10T18-22-01-04-00
HorrorCorridor       tracked  / 2026-07-10T18-31-21-04-00
PhantomCommand       tracked  / repo-local 2026-07-10T18-40-13-04-00
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
  -> attach one root click listener
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tick every domain in insertion order
  -> notify subscribers with aggregate snapshot
  -> return another aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next frame

DOM data-action
  -> interface-composition.activate
  -> active interface domain.activate
  -> action descriptor
  -> optional child engine.command
  -> child result discarded
  -> optional transition or generic accepted result

DOM data-command
  -> active-session command
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
- `scoped-interface-domain-kit` plus 12 concrete screen kits: screen state, actions, selection, field mutation, activation, and snapshots.
- `interface-composition-kit`: active/previous screen state, transition, back navigation, parent activation, child command dispatch, and automatic outcome routing.
- `resource-ledger-kit`: affordability, boolean payment, resource addition, and aggregate values.
- `pressure-field-kit`: bounded channel adjustment and unconditional per-tick pressure growth.
- `orchard-world-kit`: deterministic tree grid plus nondeterministic apple seeding, replenishment, collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, resource payment, built-object creation, and status messages.
- `roster-runtime-kit`: actor/role state, hiring payment, actor creation, and status messages.
- `inventory-runtime-kit`: inventory snapshot and unrestricted equipment assignment.
- `active-session-domain-kit`: action descriptors, movement, collection, clearing, phase changes, pest spawning, pursuit, damage, score, and failure.
- `world-canvas-render-kit`: canvas resize and orchard/player/pest projection.
- `html-interface-render-kit`: root click delegation, active-session HUD, generic screen cards, and full per-frame `innerHTML` replacement.
- `game-host-diagnostics-kit`: raw engine handle, aggregate snapshot readback, and manual tick hook.
- `smoke-fixture-kit`: entry-to-play transition and apple-presence reachability.
- `static-build-copy-kit`: copy `index.html` and `src` to `dist`.
- `pages-deploy-kit`: test, build, artifact upload, and Pages deployment from `main`.

## Verified session and time-authority gaps

1. `createOrchardGame()` constructs `active-session` before the user starts a run.
2. `src/start.js` begins ticking immediately on page load.
3. The host calls `engine.tick(1 / 60)` once per RAF callback instead of deriving steps from elapsed time.
4. A 120 Hz display advances roughly twice as many simulation seconds per wall-clock second as a 60 Hz display.
5. A throttled or 30 Hz display advances fewer simulation seconds per wall-clock second.
6. Every domain ticks regardless of the active interface screen.
7. `pressure-field.tick()` continues on Entry, Settings, Pause, Build, Market, Roster, Inventory, Codex, and Outcome screens.
8. `active-session.tick()` continues pest spawn, pursuit, and damage while the Pause/interrupt screen is active.
9. Play and New Game only transition screens; neither creates a new session nor resets existing gameplay state.
10. Outcome -> Title cannot persist after failure because the next composition tick sees `ended` and routes back to Outcome.
11. `GameHost.tick(dt)` can inject extra live ticks while the automatic RAF loop is still active.
12. The RAF request ID is not retained, so the loop cannot be cancelled.
13. The root click listener has no removal/dispose path.
14. Engine, renderers, and domains expose no coordinated `start`, `pause`, `resume`, `reset`, `stop`, or `dispose` contract.
15. Existing deterministic scenario gaps remain: global `Math.random`, no durable command journal, dropped nested results, no committed frame fingerprint, and no render-consumption proof.
16. The smoke test cannot detect pause leakage, refresh-rate drift, reset failure, outcome re-entry, duplicate loops, or listener accumulation.

## Main finding

The immediate blocker is not content, Market breadth, or rendering. It is the absence of one authoritative runtime-session and simulation-clock boundary.

Screen state currently masquerades as lifecycle state. A session is always alive, all gameplay domains always tick, and the browser refresh cadence controls game speed. That makes pause, new game, title return, deterministic replay, GameHost automation, and future save/resume semantics unreliable.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```

## What not to do next

Do not begin with Market expansion, economy tuning, new pest types, renderer replacement, visual polish, or broad runtime rewrites. Add lifecycle and clock authority by updating existing host/runtime/domain owners first, then place deterministic scenario proof beneath the new session boundary.