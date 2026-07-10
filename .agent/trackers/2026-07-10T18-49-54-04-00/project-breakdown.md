# Project breakdown — ZombieOrchard

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Goal

Document the current product loop, every active domain, all implemented kits and services, then identify the smallest implementation boundary that makes session start, pause, reset, timing, stop, disposal, and proof reliable.

## Checklist

- [x] Compared the complete accessible `LuminaryLabs-Publish` inventory.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed central ledger coverage for all nine eligible repositories.
- [x] Confirmed root `.agent` state for all nine eligible repositories.
- [x] Selected only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible documented fallback.
- [x] Read the browser boot, host, factory, runtime, interface, gameplay, renderer, fixture, package, and deploy sources.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified all implemented kits.
- [x] Identified every service those kits currently offer.
- [x] Traced session creation and screen-transition ownership.
- [x] Traced RAF, fixed-delta, and GameHost manual-tick ownership.
- [x] Traced pause, New Game, Outcome, Title, stop, and disposal behavior.
- [x] Refreshed required root `.agent` files.
- [x] Added architecture, render, gameplay, interaction, lifecycle, time-authority, and deploy audits.
- [x] Prepared central ledger and internal change-log updates.
- [x] Used only `main`.
- [x] Created no branch or pull request.

## Selection comparison

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

## Product surface

```txt
index.html                 static browser shell
src/boot.js                boot import
src/start.js               engine/render creation, RAF loop, GameHost
src/game.js                kit composition
src/kits/runtime.js        domain registry, commands, ticks, snapshots, subscriptions
src/kits/composition.js    screen transitions and nested command dispatch
src/kits/scoped-interface-domains.js
                           reusable screen-domain factory
src/kits/game-domains.js   resources, pressure, orchard, build, roster, inventory, session
src/presets/orchard-preset.js
                           interface and gameplay source values
src/renderer/world-canvas.js
                           canvas projection
src/renderer/html-interface-renderer.js
                           HUD/screens and delegated clicks
tests/smoke.mjs            reachability proof
.github/workflows/deploy-pages.yml
                           test/build/Pages chain
```

## Interaction loop

```txt
page load
  -> create all domains, including active-session
  -> attach delegated click listener
  -> start uncancelled RAF
  -> tick every domain by fixed 1/60
  -> snapshot all domains
  -> render canvas
  -> replace HTML interface
  -> repeat
```

User actions:

```txt
data-action
  -> active screen activation
  -> optional child command
  -> optional transition

data-command
  -> direct active-session mutation
```

## Domain inventory

```txt
host/runtime:
  static-browser-host
  boot-module
  runtime-entrypoint
  game-factory
  kit-runtime
  engine-context
  domain-registry
  command-router
  event-emitter
  tick-dispatcher
  snapshot-aggregator
  subscription-notifier
  browser-animation-loop
  gamehost-diagnostics

interface:
  interface-screen-state
  interface-composition
  entry
  session-select
  run-setup
  active-session
  interrupt
  construction
  exchange
  roster
  inventory
  knowledge
  preferences
  outcome
  data-action-routing
  data-command-routing

gameplay:
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

render/proof/deploy:
  world-canvas-renderer
  html-interface-renderer
  smoke-fixture
  static-build-copy
  pages-deploy
  central-ledger-sync

missing authority:
  runtime-session-authority
  simulation-clock-authority
  lifecycle-result-journal
  reset/dispose authority
```

## Kit inventory and services

```txt
kit-runtime
  registration, creation, commands, delta clamp, ticks, events, snapshots, subscriptions

scoped-interface-domain-kit + 12 concrete screen kits
  screen state, actions, selection, fields, activation, snapshots

interface-composition-kit
  active/previous screen, transition, back, nested dispatch, outcome routing

resource-ledger-kit
  affordability, boolean payment, additions, values

pressure-field-kit
  bounded adjustment, passive tick, channel snapshot

orchard-world-kit
  tree grid, random apple seed/replenish, collection, world snapshot

construction-runtime-kit
  catalog, payment, object creation, message

roster-runtime-kit
  actor/role state, payment, actor creation, message

inventory-runtime-kit
  items, equipment, equip command

active-session-domain-kit
  movement, collection, clearing, phases, pests, pursuit, damage, score, failure

world-canvas-render-kit
  resize and orchard/player/pest canvas projection

html-interface-render-kit
  delegated clicks, HUD, generic screens, per-frame HTML replacement

game-host-diagnostics-kit
  raw engine, snapshot, unrestricted manual tick

smoke-fixture-kit
  entry-to-play and apple-presence reachability

static-build-copy-kit
  static dist assembly

pages-deploy-kit
  npm test, build, artifact, Pages deploy
```

## Main finding

The system has screen navigation but no authoritative session lifecycle. Gameplay exists and ticks before Play, continues while paused or browsing non-gameplay screens, and advances one fixed simulation step per display frame. That makes game speed refresh-rate dependent and causes manual GameHost ticks to race with the automatic loop.

Play and New Game do not create or reset state. Outcome -> Title rebounds to Outcome because the ended session remains active. RAF and click-listener ownership cannot be released.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```

## Validation boundary

Documentation only. Runtime, dependencies, scripts, rendering, tests, and deployment were unchanged. Repository-local execution was not available through the connector, so existing and proposed fixtures were not run.