# ZombieOrchard Agent Start

**Repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T09-48-58-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` ledger state.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as the oldest eligible fallback follow-up in the current ledger rotation because its Market implementation plan was present, but the transaction replay and renderer readback boundary still needed to be separated from the HTML renderer before runtime source changes.

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
LuminaryLabs-Publish/TheUnmappedHouse    ledgered; closed rollup-gap note is not reused
LuminaryLabs-Publish/ZombieOrchard       selected follow-up: Market transaction replay boundary
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
.agent/architecture-audit/2026-07-08T09-48-58-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T09-48-58-04-00-market-render-readback-boundary.md
.agent/gameplay-audit/2026-07-08T09-48-58-04-00-economy-loop-command-boundary.md
.agent/market-authority-audit/2026-07-08T09-48-58-04-00-transaction-replay-boundary.md
.agent/market-authority-audit/fixture-implementation-map.md
.agent/trackers/2026-07-08T09-48-58-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T09-48-58-04-00.md
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
-> TransactionRecord
-> MarketResultJournal
-> MarketResultProjection
-> renderer readback snapshot
-> DOM-free market replay fixture
```

## Current next safe ledge

```txt
ZombieOrchard Market Transaction Replay Boundary
```

Stop that ledge when the next coder can implement Market sell/buy behavior with source-owned transaction replay, projection readback, nested command result propagation, and DOM-free fixtures without hiding price, capacity, transaction, or result authority in `html-interface-renderer.js`.
