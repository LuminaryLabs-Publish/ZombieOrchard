# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T16-10-36-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest observed eligible fallback because its last central/root alignment was `2026-07-08T14-18-45-04-00`, older than the other sampled non-excluded repos, and the Market transaction ledger source splice remains unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T15:49:18-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/ZombieOrchard       selected fallback / previous alignment 2026-07-08T14-18-45-04-00
```

## Current product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The current route is:

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
```

The game already has a playable baseline: entry, active-session, collect apples, clear pests, day/night phase advance, Build, Market, Roster, Inventory, Codex, Settings, and Outcome screens.

## Current interaction loop

```txt
open route
  -> src/boot.js imports src/start.js
  -> src/start.js creates engine, world canvas renderer, HTML interface renderer, and frame loop
  -> src/game.js installs runtime, interface, composition, resource, pressure, world, construction, roster, inventory, and active-session kits
  -> each animation frame calls engine.tick(1 / 60)
  -> tickable domains update pressure and active-session state
  -> engine.snapshot() aggregates every domain snapshot
  -> world-canvas renders trees, apples, pests, and player from snapshot
  -> html-interface-renderer renders active-session HUD or active interface screen
  -> data-action clicks route through interface-composition.activate
  -> data-command clicks route directly to active-session command handlers
  -> window.GameHost exposes engine/getState/tick
```

## Target proof loop

```txt
exchange action row
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> TransactionRecord if accepted
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> MarketSourceSnapshot after
  -> nested result propagated through interface-composition
  -> MarketResultProjection
  -> exchange renderer readback
  -> optional GameHost market diagnostics
  -> DOM-free fixture rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T16-10-36-04-00-market-transaction-ledger-dsk-map.md
.agent/render-audit/2026-07-08T16-10-36-04-00-exchange-projection-consumption-map.md
.agent/gameplay-audit/2026-07-08T16-10-36-04-00-market-transaction-loop.md
.agent/market-authority-audit/2026-07-08T16-10-36-04-00-transaction-ledger-source-splice-map.md
.agent/trackers/2026-07-08T16-10-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T16-10-36-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/scoped-interface-domains.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/smoke.mjs
```

## Source files to add next

```txt
src/market/market-ids.js
src/market/market-source-snapshot.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-result.js
src/market/market-transaction-ledger.js
src/market/market-projection.js
src/market/market-render-readback.js
tests/market-transaction-fixture.mjs
```

## Main rule

Keep the current static route, `createOrchardGame()`, `world-canvas`, active-session HUD, and `window.GameHost.engine/getState/tick` stable.

Do not expand economy behavior until Market transaction ledger rows prove accepted mutation, rejected no-mutation, transaction history, nested result propagation, exchange projection, renderer readback, and DOM-free fixture replay.

## Current next safe ledge

```txt
ZombieOrchard Market Transaction Ledger + Nested Result Source Splice Gate
```

Stop that ledge when fixture rows prove exchange action catalog, accepted sell/buy, rejected sell/buy, stable rejection reasons, no-mutation before/after snapshots, transaction history, Market command/result journal shape, nested result propagation through `interface-composition`, renderer consumption of exchange projection rows, and unchanged GameHost baseline compatibility.