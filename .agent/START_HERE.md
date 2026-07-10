# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-10T02-10-16-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was checked against the central repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No checked public non-Cavalry repo was new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest eligible public documented fallback, with central tracking at `2026-07-10T00-38-44-04-00` before this refresh.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T01-31-29-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T01-20-47-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T01-11-51-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T00-51-03-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible fallback / central latest 2026-07-10T00-38-44-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T01-38-16-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T02-02-24-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T01-49-13-04-00
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
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
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
  -> transaction/intake rows
  -> MarketCommandJournal + MarketResultJournal
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> Exchange renderer branch
  -> MarketRenderReadback
  -> GameHost market diagnostics
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T02-10-16-04-00-market-result-readback-dsk-map.md
.agent/render-audit/2026-07-10T02-10-16-04-00-exchange-render-readback-gap.md
.agent/gameplay-audit/2026-07-10T02-10-16-04-00-market-command-result-loop.md
.agent/interaction-audit/2026-07-10T02-10-16-04-00-nested-result-retention-contract.md
.agent/market-authority-audit/2026-07-10T02-10-16-04-00-market-result-readback-contract.md
.agent/deploy-audit/2026-07-10T02-10-16-04-00-market-fixture-build-gate.md
.agent/trackers/2026-07-10T02-10-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T02-10-16-04-00.md
.agent/kit-registry.json
```
