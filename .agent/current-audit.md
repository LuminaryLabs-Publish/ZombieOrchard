# Current audit — ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T06-02-00-04-00
status: runtime-session-instance-authority-first
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Selection audit

All ten accessible `LuminaryLabs-Publish` repositories were compared. All nine eligible non-Cavalry repositories had central ledger and root `.agent` state, so the oldest documented-selection rule applied.

```txt
ZombieOrchard        selected / 2026-07-11T03-48-31-04-00
TheUnmappedHouse     tracked  / 2026-07-11T04-00-07-04-00
AetherVale           tracked  / 2026-07-11T04-28-33-04-00
IntoTheMeadow        tracked  / 2026-07-11T04-49-30-04-00
MyCozyIsland         tracked  / 2026-07-11T05-10-36-04-00
TheOpenAbove         tracked  / 2026-07-11T05-25-29-04-00
HorrorCorridor       tracked  / 2026-07-11T05-28-29-04-00
PrehistoricRush      tracked  / 2026-07-11T05-39-11-04-00
PhantomCommand       tracked  / 2026-07-11T05-50-43-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
module boot
  -> construct one engine and all domain closures
  -> construct canvas and HTML renderers
  -> install delegated click listener
  -> expose raw engine and unrestricted manual tick
  -> start recursive RAF

RAF callback
  -> engine.tick(1 / 60)
  -> advance frame and elapsed counters
  -> tick every domain
  -> auto-route ended sessions to Outcome
  -> aggregate all snapshots
  -> render canvas and HTML

interface action
  -> interface-composition.activate
  -> active screen activate
  -> optional nested child command
  -> optional route move

lifecycle-looking action
  -> Play / New Game / Start / Pause / Resume / Title / Outcome
  -> route mutation only
  -> no session construction, freeze, finalization, reset, retirement, or disposal
```

## Domains in use

```txt
static browser route and ESM boot
browser runtime host
runtime graph construction
runtime frame, elapsed, delta, event, command, tick, snapshot, and subscription state
12 scoped interface screen domains
interface route composition and automatic Outcome routing
resource ledger
pressure field
orchard world and apple lifecycle
construction runtime
roster runtime
inventory runtime
active-session movement, collection, phase, pests, damage, score, and failure
world canvas rendering
HTML interface rendering and delegated input
GameHost diagnostics
Node smoke fixture
static build copy
Pages deployment
missing session identity, lifecycle, tick admission, teardown, and re-entry authority
```

## Implemented kits and services

- `kit-runtime`: kit registration, domain creation, command lookup/invocation, delta clamping, all-domain ticking, events, aggregate snapshots, subscriptions, and notification.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, disabled-action rejection, activation, metadata, and snapshots.
- `interface-composition-kit`: active/previous route state, transition, back navigation, nested child dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability, boolean payment, addition, and resource snapshots.
- `pressure-field-kit`: bounded adjustment, passive growth, and channel snapshots.
- `orchard-world-kit`: fixed tree generation, global-random apple generation/replenishment, nearby collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, built-object creation, and status messages.
- `roster-runtime-kit`: actor and role state, hiring payment, actor creation, and messages.
- `inventory-runtime-kit`: item state and equipment mutation.
- `active-session-domain-kit`: movement, collection, pest clearing, phase changes, random pest generation, pursuit, damage, score, failure, and actions.
- `world-canvas-render-kit`: canvas sizing and orchard/player/pest projection.
- `html-interface-render-kit`: HUD/screen/slot projection, delegated DOM input, and per-frame HTML replacement.
- `game-host-diagnostics-kit`: raw engine access, aggregate snapshot readback, and unrestricted manual ticking.
- `smoke-fixture-kit`, `static-build-copy-kit`, and `pages-deploy-kit`: minimal proof, static artifact assembly, and deployment.

## Main session finding

The product has interface screens but no runtime session instance.

```txt
engine graph lifetime: module lifetime
session identity: absent
session epoch: absent
start transaction: absent
pause admission: absent
terminal result: absent
reset transaction: absent
run retirement: absent
RAF ownership: absent
listener lease: absent
renderer disposal: absent
stale command/callback rejection: absent
```

### New Game does not create a new run

`createOrchardGame()` is called once during module startup. Entry Play, Entry New Game, Run Setup Start, and future re-entry all reference the same mutable closures.

### Pause does not pause simulation

`kit-runtime.tick()` ticks every domain on every frame. `pressure-field` always advances. `active-session` continues pest admission, pursuit, and damage when at night even while the interface route is Interrupt, Entry, or another screen.

### Outcome cannot return stably to title

`interface-composition.tick()` routes any ended active session to Outcome. The Outcome Title action changes the route to Entry, but the next tick sees the same ended closure and moves back to Outcome.

### Post-outcome Play cannot recover

Play routes to the same ended active session. The next tick routes back to Outcome. There is no fresh graph or `ended = false` reset.

## Required session authority DSK map

```txt
runtime-session-authority-domain
  -> runtime-session-id-kit
  -> session-instance-factory-kit
  -> session-lifecycle-state-kit
  -> session-command-kit
  -> session-command-result-kit
  -> session-epoch-kit
  -> session-tick-admission-kit
  -> session-reset-plan-kit
  -> raf-ownership-kit
  -> input-listener-lease-kit
  -> renderer-session-projection-kit
  -> outcome-finalization-kit
  -> session-graph-disposal-kit
  -> GameHost-session-observation-kit
  -> session-lifecycle-journal-kit
  -> session-lifecycle-fixture-kit
```

## Required lifecycle states

```txt
idle
starting
running
paused
ending
ended
returning_to_title
resetting
disposing
disposed
failed
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Interaction Capability Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## What not to do next

Do not add localStorage, expose Save Select as operational, expand gameplay, or tune rendering. First prove that one fresh run can start, pause, resume, end, return to title, reset, reject stale work, and dispose without retaining process-lifetime state.
