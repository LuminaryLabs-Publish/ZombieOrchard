# ZombieOrchard Agent Start

**Repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T08-02-32-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` ledger state.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`TheUnmappedHouse` has the oldest visible alignment time, but its local start file explicitly records that the closed central rollup gap should no longer be used as a reason to repeatedly select that repo.

`ZombieOrchard` was selected as the oldest eligible fallback follow-up with unresolved `.agent` implementation planning. The existing Market acceptance ledger is now narrowed into a concrete implementation map for the first runtime slice.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    ledgered; central rollup closure note says do not repeatedly select for that old gap
LuminaryLabs-Publish/ZombieOrchard       selected follow-up: Market fixture implementation map
```

## Current state

`ZombieOrchard` is a compact static browser orchard survival/economy shell with a kit runtime, scoped interface domains, game-domain kits, a canvas world renderer, and an HTML interface renderer.

The current route is:

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> world.render(snapshot)
-> ui.render(snapshot)
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/dsk-domain-breakdown.md
.agent/render-audit/canvas-render-audit.md
.agent/gameplay-audit/economy-market-audit.md
.agent/market-authority-audit/acceptance-ledger.md
.agent/market-authority-audit/fixture-implementation-map.md
.agent/trackers/2026-07-08T08-02-32-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-02-32-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
index.html
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/smoke.mjs
```

## Main rule

Do not move economy authority into the HTML renderer.

Do not rewrite the whole loop.

The next runtime change should add Market command/result authority as an additive kit seam:

```txt
exchange action
-> MarketCommandEnvelope
-> MarketSourceSnapshot
-> MarketPreflight
-> MarketCommandResult
-> resource/inventory mutation only on accepted result
-> TransactionRecord
-> MarketResultProjection
-> DOM-free market fixture replay
```

## Current next safe ledge

```txt
ZombieOrchard Market Fixture Implementation Map
```

Stop that ledge when a source-level implementation plan exists for the exact files, exports, result records, smoke cases, and renderer projection boundary needed to implement Market sell/buy behavior without changing the static route or hiding source authority inside DOM code.
