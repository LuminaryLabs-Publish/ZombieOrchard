# ZombieOrchard Agent Start

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T19-10-54-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected for this pass as the oldest eligible fallback from central ledger readback. Its unresolved seam is still Market command authority, but the next cut is now narrowed to a source manifest plus nested result consumer fixture gate.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/ZombieOrchard       selected / oldest eligible fallback / Market command source manifest unresolved
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / recently refreshed
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
  -> src/start.js creates engine, world-canvas renderer, HTML interface renderer, and frame loop
  -> src/game.js installs runtime, interface, composition, resource, pressure, world, construction, roster, inventory, and active-session kits
  -> each animation frame calls engine.tick(1 / 60)
  -> tickable domains update pressure and active-session state
  -> engine.snapshot() aggregates every domain snapshot
  -> world-canvas renders trees, apples, pests, and player from snapshot
  -> html-interface-renderer renders active-session HUD or active interface screen
  -> data-action clicks route through interface-composition.activate
  -> data-command clicks route directly to active-session command handlers
  -> nested action.command calls can happen inside interface-composition
  -> nested command result is currently discarded
  -> window.GameHost exposes engine/getState/tick
```

## Target proof loop

```txt
exchange action row
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
  -> nested result propagated through interface-composition
  -> interface-composition snapshot.lastResult
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
.agent/architecture-audit/2026-07-08T19-10-54-04-00-market-command-source-manifest-dsk-map.md
.agent/render-audit/2026-07-08T19-10-54-04-00-exchange-renderer-consumer-splice.md
.agent/gameplay-audit/2026-07-08T19-10-54-04-00-market-command-result-propagation-loop.md
.agent/market-authority-audit/2026-07-08T19-10-54-04-00-command-source-manifest-fixture-gate.md
.agent/trackers/2026-07-08T19-10-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T19-10-54-04-00.md
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
src/market/market-command-source-manifest.js
src/market/market-source-snapshot.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-result.js
src/market/market-transaction-ledger.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-fixture-rows.js
tests/market-transaction-fixture.mjs
```

## Main rule

Keep the current static route, `createOrchardGame()`, `world-canvas`, active-session HUD, and `window.GameHost.engine/getState/tick` stable.

Do not expand economy behavior until the Market fixture proves source manifest rows, accepted mutation, rejected no-mutation, transaction history, nested result propagation, exchange projection, renderer readback, and DOM-free replay.

## Current next safe ledge

```txt
ZombieOrchard Market Command Source Manifest + Nested Result Consumer Fixture Gate
```
