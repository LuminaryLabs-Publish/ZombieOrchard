# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-09T16-34-14-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was checked against the central repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest eligible documented fallback by central ledger recency. This pass refreshes repo-local docs and updates the central ledger to `2026-07-09T16-34-14-04-00`.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T16-20-45-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central-ledger fallback / central latest observed 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T13-38-15-04-00
```

## Current product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The game has a playable baseline: Entry, Active Session, apple collection, pest clearing, day/night phase advance, Build, Exchange/Market shell, Roster, Inventory, Codex, Settings, and Outcome screens.

## Current interaction loop

```txt
open route
  -> src/boot.js imports src/start.js
  -> src/start.js creates engine, world-canvas renderer, HTML interface renderer, and frame loop
  -> src/game.js installs resource, pressure, orchard-world, construction, roster, inventory, generated interface, active-session, and interface-composition kits
  -> each animation frame calls engine.tick(1 / 60)
  -> tickable domains update pressure and active-session state
  -> engine.snapshot() aggregates every domain snapshot
  -> world-canvas renders trees, apples, pests, and player from snapshot
  -> html-interface-renderer renders active-session HUD or active interface screen
  -> data-action clicks route through interface-composition.activate
  -> data-command clicks route directly to active-session command handlers
  -> scoped interface domains return action descriptors for selected screen actions
  -> interface-composition may execute nested action.command through ctx.engine.command(...)
  -> nested command result is still discarded
  -> interface-composition snapshot still does not expose lastResult
  -> exchange screen still renders as a generic interface screen and only exposes Back
  -> window.GameHost exposes engine/getState/tick
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
.agent/architecture-audit/2026-07-09T16-34-14-04-00-market-result-readback-ledger-refresh-dsk-map.md
.agent/render-audit/2026-07-09T16-34-14-04-00-exchange-render-result-readback-map.md
.agent/gameplay-audit/2026-07-09T16-34-14-04-00-market-command-result-loop.md
.agent/interaction-audit/2026-07-09T16-34-14-04-00-data-action-nested-result-contract.md
.agent/market-authority-audit/2026-07-09T16-34-14-04-00-source-result-fixture-contract.md
.agent/deploy-audit/2026-07-09T16-34-14-04-00-market-fixture-check-build-wire.md
.agent/trackers/2026-07-09T16-34-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T16-34-14-04-00.md
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
