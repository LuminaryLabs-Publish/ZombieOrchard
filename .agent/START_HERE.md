# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T14-18-45-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest observed eligible fallback because its last root alignment was `2026-07-08T12-51-50-04-00`, older than the other sampled non-excluded roots, and the Market command/result fixture boundary still needs a concrete acceptance-ledger + renderer-readback map before runtime source work.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T13-39-15-04-00
LuminaryLabs-Publish/ZombieOrchard       selected fallback / latest sampled alignment 2026-07-08T12-51-50-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T12-59-11-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T13-11-07-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T13-31-29-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T13:18:13-04:00
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
  -> createHtmlInterfaceRenderer({ root, engine })
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

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T14-18-45-04-00-market-acceptance-dsk-map.md
.agent/render-audit/2026-07-08T14-18-45-04-00-exchange-render-readback-map.md
.agent/gameplay-audit/2026-07-08T14-18-45-04-00-market-command-result-loop.md
.agent/market-authority-audit/2026-07-08T14-18-45-04-00-acceptance-ledger-fixture-map.md
.agent/trackers/2026-07-08T14-18-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T14-18-45-04-00.md
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

## Main rule

Keep the current static route, active-session loop, `window.GameHost.engine/getState/tick`, and snapshot shape stable.

Do not expand economy behavior until Market acceptance rows prove accepted mutation, rejected no-mutation, nested result propagation, transaction history, exchange projection, renderer readback, and DOM-free fixture replay.

## Current next safe ledge

```txt
ZombieOrchard Market Acceptance Ledger + Exchange Renderer Readback Fixture Gate
```

Stop that ledge when fixture rows prove exchange actions, accepted sell/buy, rejected sell/buy, stable rejection reasons, no-mutation before/after snapshots, transaction history, Market command/result journal shape, nested result propagation through `interface-composition`, renderer consumption of Market projection rows, and unchanged GameHost baseline compatibility.
