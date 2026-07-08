# ZombieOrchard Agent Start

**Repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T11-19-53-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` ledger state.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as the oldest eligible fallback follow-up in this rotation because its Market plan exists, but the exact command-result propagation seam is still the next blocker: `interface-composition` dispatches nested commands and drops their results, while `exchange` has no source-owned sell/buy commands or renderer-readable projection.

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
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent
LuminaryLabs-Publish/ZombieOrchard       selected follow-up: Market result propagation gate
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

The Market route is present through the `exchange` interface domain, but the exchange screen currently only offers Back. The runtime command surface can already return command results, but nested command results from interface actions are not retained, projected, or exposed for fixtures.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T11-19-53-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T11-19-53-04-00-exchange-render-projection-readback.md
.agent/gameplay-audit/2026-07-08T11-19-53-04-00-market-command-result-loop.md
.agent/market-authority-audit/2026-07-08T11-19-53-04-00-result-propagation-fixture-gate.md
.agent/market-authority-audit/fixture-implementation-map.md
.agent/trackers/2026-07-08T11-19-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-19-53-04-00.md
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
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/smoke.mjs
```

## Main rule

Do not move economy authority into `html-interface-renderer.js`.

Do not rewrite the whole loop.

The next runtime change should add a Market command/result seam as an additive kit boundary:

```txt
exchange action
-> MarketCommandEnvelope
-> MarketSourceSnapshot
-> MarketPreflight
-> MarketCommandResult
-> TransactionRecord
-> MarketResultJournal
-> nested command result propagation through interface-composition
-> MarketResultProjection
-> renderer readback snapshot
-> DOM-free market replay fixture
```

## Current next safe ledge

```txt
ZombieOrchard Market Result Propagation + Exchange Projection Fixture Gate
```

Stop that ledge when the next coder can implement Market sell/buy behavior with source-owned transaction replay, stable accepted/rejected results, projection readback, nested command result propagation, and DOM-free fixtures without hiding price, capacity, transaction, or result authority in `html-interface-renderer.js`.
