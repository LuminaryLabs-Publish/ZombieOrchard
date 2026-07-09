# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-09T16-38-14-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was checked against the central repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected because repo-local docs had advanced to `2026-07-09T16-34-14-04-00` while the central ledger still pointed at `2026-07-09T13-18-48-04-00`. This pass refreshes repo-local docs and central tracking to `2026-07-09T16-38-14-04-00`.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T16-20-45-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / repo-local latest 2026-07-09T16-34-14-04-00 / central ledger still 2026-07-09T13-18-48-04-00 before this run
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T13-38-15-04-00
```

## Current product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The route is:

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
```

The playable baseline includes Entry, Active Session, apple collection, pest clearing, day/night phase advance, Build, Exchange/Market shell, Roster, Inventory, Codex, Settings, and Outcome screens.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> [data-action] routes through interface-composition.activate
  -> scoped interface domain returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> next action.to or transition table moves active screen
  -> [data-command] routes directly to active-session
  -> Exchange/Market remains a generic screen with Back only
  -> window.GameHost exposes engine, getState, and tick
```

## Target Market result/readback loop

```txt
exchange action row
  -> MarketActionCatalog
  -> MarketCommandSourceManifest
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> resource transaction / inventory intake rows
  -> MarketCommandJournal + MarketResultJournal
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> Exchange renderer branch
  -> MarketRenderReadback
  -> GameHost market diagnostics
  -> DOM-free fixture rows
  -> central ledger parity row
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T16-38-14-04-00-market-readback-ledger-catchup-dsk-map.md
.agent/render-audit/2026-07-09T16-38-14-04-00-exchange-result-render-readback-catchup.md
.agent/gameplay-audit/2026-07-09T16-38-14-04-00-market-command-result-consumer-loop.md
.agent/interaction-audit/2026-07-09T16-38-14-04-00-data-action-nested-result-retention-map.md
.agent/market-authority-audit/2026-07-09T16-38-14-04-00-market-readback-fixture-ledger-contract.md
.agent/deploy-audit/2026-07-09T16-38-14-04-00-market-fixture-test-build-map.md
.agent/trackers/2026-07-09T16-38-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T16-38-14-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
src/kits/composition.js
src/kits/runtime.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/kits/game-domains.js
tests/smoke.mjs
```
