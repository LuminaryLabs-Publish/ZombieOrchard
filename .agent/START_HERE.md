# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-10T04-11-36-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was checked against the central repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No checked public non-Cavalry repo was new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest eligible public documented fallback after `PhantomCommand` advanced to `2026-07-10T03-59-57-04-00`.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T03-01-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T02-51-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T02-38-56-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T02-31-58-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T02-19-14-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible fallback / prior central latest 2026-07-10T02-10-16-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T03-49-48-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T03-59-57-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
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

## Current interaction loop

```txt
index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame()
  -> createKitRuntime installs game and interface kits
  -> createWorldCanvas(canvas) renders orchard snapshot
  -> createHtmlInterfaceRenderer({ root, engine }) renders active-session HUD or generic screen panel
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active screen
  -> [data-action] routes through interface-composition.activate
  -> active screen domain returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> action.to or transition table moves active screen
  -> [data-command] routes directly to active-session
  -> Exchange/Market remains generic Back-only screen
  -> window.GameHost exposes engine, getState, and tick
```

## Target Market nested-result loop

```txt
exchange action row
  -> MarketActionCatalog
  -> MarketCommandSourceManifest
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> transaction/intake rows
  -> MarketCommandJournal + MarketResultJournal
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> Exchange renderer branch
  -> MarketRenderReadback
  -> GameHost market diagnostics
  -> DOM-free fixture replay
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T04-11-36-04-00-market-nested-result-ledger-dsk-map.md
.agent/render-audit/2026-07-10T04-11-36-04-00-exchange-market-projection-readback.md
.agent/gameplay-audit/2026-07-10T04-11-36-04-00-market-command-result-loop.md
.agent/interaction-audit/2026-07-10T04-11-36-04-00-nested-command-result-retention.md
.agent/market-authority-audit/2026-07-10T04-11-36-04-00-market-ledger-fixture-contract.md
.agent/deploy-audit/2026-07-10T04-11-36-04-00-market-fixture-test-build-gate.md
.agent/trackers/2026-07-10T04-11-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T04-11-36-04-00.md
.agent/kit-registry.json
```
