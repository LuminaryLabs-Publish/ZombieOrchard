# Project breakdown — ZombieOrchard

## Run

```txt
2026-07-11T06-02-00-04-00
```

## Plan ledger

**Goal:** Define one authoritative orchard run boundary so Play, New Game, Start, Pause, Resume, Title, Outcome, ticking, rendering, and teardown all operate on one identified session instance instead of one process-lifetime mutable graph.

- [x] Compare the ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `ZombieOrchard` under the oldest documented-selection rule.
- [x] Re-read boot, runtime, interface, gameplay, render, preset, test, build, and deploy surfaces.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and the services they offer.
- [x] Trace Play, New Game, Start, Pause, Resume, Title, Outcome, and post-outcome re-entry.
- [x] Add timestamped architecture, render, gameplay, interaction, session-authority, and deploy audits.
- [x] Update the required root `.agent` files.
- [x] Change no runtime source.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable lifecycle fixtures remain future work.

## Selection

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

All nine eligible repositories were tracked and had root `.agent` state. `ZombieOrchard` remained the oldest timestamped selection.

## Product interaction loop

```txt
module boot
  -> construct one engine and all mutable domains immediately
  -> construct world and HTML renderers
  -> install one delegated click listener
  -> expose raw engine and unrestricted manual tick on GameHost
  -> start an unretained recursive RAF

RAF callback
  -> engine.tick(1 / 60)
  -> tick every domain regardless of current screen
  -> interface-composition may auto-route an ended run to Outcome
  -> aggregate every domain snapshot
  -> render the world canvas
  -> replace the HTML interface

Play / New Game / Start
  -> route to active-session
  -> reuse the same process-lifetime mutable graph

Pause / Title / Outcome
  -> route only
  -> gameplay domains keep ticking
  -> no stop, reset, fresh graph, epoch, or disposal transaction
```

## Domains in use

```txt
static browser route and ESM boot
runtime graph construction
runtime command, tick, event, snapshot, and subscription services
12 scoped interface screens
interface route composition and automatic outcome routing
resource ledger
pressure field
orchard world and apple lifecycle
construction runtime
roster runtime
inventory runtime
active-session movement, collection, phase, pests, damage, score, and failure
world canvas projection
HTML interface projection and delegated input
GameHost diagnostics
Node smoke
static build copy
Pages deployment
missing runtime session identity, lifecycle, tick admission, teardown, and re-entry authority
```

## Implemented kits and offered services

- `kit-runtime`: registration, domain creation, command dispatch, delta clamping, all-domain ticking, events, aggregate snapshots, subscriptions, and publication.
- `scoped-interface-domain-kit` and 12 screen kits: screen state, actions, selection, fields, metadata, activation, disabled rejection, and snapshots.
- `interface-composition-kit`: active/previous route state, transition, back, child command dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability, payment, addition, and resource snapshots.
- `pressure-field-kit`: bounded adjustment, passive growth, and channel snapshots.
- `orchard-world-kit`: tree generation, apple generation/replenishment, collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, construction creation, and messages.
- `roster-runtime-kit`: actors, roles, hiring, payment, and messages.
- `inventory-runtime-kit`: item state and equipment mutation.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, pest simulation, damage, score, failure, and actions.
- `world-canvas-render-kit`: canvas sizing and world projection.
- `html-interface-render-kit`: HUD/screen/slot projection, DOM action routing, and HTML replacement.
- `game-host-diagnostics-kit`: raw engine access, aggregate readback, and unrestricted manual ticking.
- `smoke-fixture-kit`, `static-build-copy-kit`, and `pages-deploy-kit`: minimal test, artifact assembly, and deployment.

## Main finding

The product has no runtime session instance. The complete mutable graph is constructed before the player presses Play, and every lifecycle-looking action is only a route change.

Consequences:

```txt
New Game does not create a new game
Start does not reset state
Pause does not stop simulation
Title does not retire the run
Outcome does not finalize a run
Play after Outcome reuses ended state
Title after Outcome is pulled back to Outcome on the next tick
world and pressure state continue changing outside active gameplay
old listeners, RAF work, globals, and renderers have no owner or disposal result
```

The immediate implementation boundary is therefore not persistence. It is a typed runtime session authority with fresh graph construction, lifecycle admission, session epochs, tick gating, retained RAF ownership, terminal results, and idempotent disposal.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

## Validation scope

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
session lifecycle fixtures: unavailable
```
