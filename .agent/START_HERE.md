# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-09T05-11-22-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected because central tracking still pointed to `2026-07-09T02-05-52-04-00` while repo-local `.agent` state had advanced to `2026-07-09T05-01-51-04-00`. This pass closes the central catch-up gap and keeps the next implementation focused on Market nested-result readback.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-38-39-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / central latest 2026-07-09T02-05-52-04-00 / repo-local latest 2026-07-09T05-01-51-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / not selected
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T02-11-07-04-00
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

The game has a playable baseline: Entry, Active Session, apple collection, pest clearing, day/night phase advance, Build, Market/Exchange shell, Roster, Inventory, Codex, Settings, and Outcome screens.

## Current interaction loop

```txt
open route
  -> src/boot.js imports src/start.js
  -> src/start.js creates engine, world-canvas renderer, HTML interface renderer, and frame loop
  -> src/game.js installs resource, pressure, orchard-world, construction, roster, inventory, generated interface, active-session, and interface-composition kits
  -> each animation frame calls engine.tick(1 / 60)
  -> tickable domains update pressure and active-session state
  -> engine.snapshot() aggregates every domain snapshot
  -> world-canvas renders trees, apples, pests, built objects, and player from snapshot
  -> html-interface-renderer renders active-session HUD or active interface screen
  -> data-action clicks route through interface-composition.activate
  -> data-command clicks route directly to active-session command handlers
  -> nested action.command can happen inside interface-composition
  -> nested command result is currently discarded
  -> interface-composition snapshot does not yet expose lastResult
  -> exchange screen currently renders as a generic interface screen
  -> window.GameHost exposes engine/getState/tick
```

## Target result/readback loop

```txt
exchange action row
  -> MarketActionCatalog
  -> MarketCommandSourceManifest
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> TransactionRecord if accepted
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> interface-composition snapshot.lastResult
  -> MarketResultProjection
  -> exchange renderer consumer
  -> MarketRenderReadback
  -> GameHost market diagnostics
  -> DOM-free fixture rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T05-11-22-04-00-market-central-catchup-dsk-map.md
.agent/render-audit/2026-07-09T05-11-22-04-00-exchange-render-consumer-readback.md
.agent/gameplay-audit/2026-07-09T05-11-22-04-00-market-nested-result-loop.md
.agent/market-authority-audit/2026-07-09T05-11-22-04-00-central-catchup-fixture-contract.md
.agent/deploy-audit/2026-07-09T05-11-22-04-00-market-fixture-validation-wire-map.md
.agent/trackers/2026-07-09T05-11-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T05-11-22-04-00.md
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
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/presets/orchard-preset.js
tests/smoke.mjs
```
