# Project Breakdown — ZombieOrchard

**Timestamp:** `2026-07-08T16-10-36-04-00`

## Goal

Refresh the repo-local `.agent` state for `LuminaryLabs-Publish/ZombieOrchard` after comparing the full accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

## Selection result

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest eligible fallback because its latest central/root alignment was `2026-07-08T14-18-45-04-00`, older than the other sampled non-excluded Publish repos, and its Market transaction/result authority remains the highest-value unresolved proof seam.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T15:49:18-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/ZombieOrchard       selected fallback / previous alignment 2026-07-08T14-18-45-04-00
```

## Product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The repo currently has:

```txt
- no npm dependency requirement for the static server
- static build command that copies index.html and src into dist
- kit runtime for domain registration, command routing, ticking, events, and snapshots
- scoped interface domain kits for the screen model
- game-domain kits for resources, pressure, orchard world, construction, roster, inventory, and active session
- HTML interface renderer for active HUD and generic screen panels
- canvas world renderer for trees, apples, pests, and player
- baseline smoke test for entry -> Play -> active-session -> apples
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tickable domains update pressure and active-session state
  -> engine.snapshot() aggregates every domain snapshot
  -> world.render(snapshot) draws orchard world
  -> ui.render(snapshot) draws active HUD or active screen panel
  -> data-action clicks route through interface-composition.activate
  -> data-command clicks route directly to active-session commands
  -> window.GameHost exposes engine/getState/tick
```

## Domains in use

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime, engine-context, domain-registry, command-router, event-emitter, tick-dispatcher, snapshot-aggregator, subscription-bus, browser-animation-loop, GameHost, smoke-harness

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas

market-authority-next:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-command-journal, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Services that current kits offer

```txt
kit-runtime:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  screen state, action rows, fields, metadata, select, set-field, activate, action request events, snapshots

interface-composition-kit:
  active screen, previous screen, transition, back, action activation, nested command dispatch, ended-session auto-outcome, active screen snapshot

resource-ledger-kit:
  resource values, canPay, pay, add, basic accepted/rejected command results, snapshots

pressure-field-kit:
  pressure channels, adjust api, row pressure tick, curse tick, snapshots

orchard-world-kit:
  tree grid, random apple seed, nearest apple collection, apple reseed, bounds snapshots

construction-runtime-kit:
  catalog, build command, resource payment, built records, build messages

roster-runtime-kit:
  actors, role catalog, hire command, payment, roster messages

inventory-runtime-kit:
  item list, equipped item, equip command

active-session-domain-kit:
  day, phase, player, pests, score, message, move, collect, clear, next-phase, pest tick, ending

world-canvas-render-kit:
  canvas resize, tree/apple/pest/player draw from snapshots

html-interface-render-kit:
  active-session HUD, generic screen rendering, click-to-action routing, direct active-session command routing

smoke-fixture-kit:
  create game, verify entry, activate Play, tick, verify active-session and apple seed
```

## Kits identified

```txt
implemented:
  kit-runtime
  scoped-interface-domain-kit
  entry-domain-kit
  session-select-domain-kit
  run-setup-domain-kit
  active-session-domain-kit
  interrupt-domain-kit
  construction-domain-kit
  exchange-domain-kit
  roster-domain-kit
  inventory-domain-kit
  knowledge-domain-kit
  preferences-domain-kit
  outcome-domain-kit
  interface-composition-kit
  resource-ledger-kit
  pressure-field-kit
  orchard-world-kit
  construction-runtime-kit
  roster-runtime-kit
  inventory-runtime-kit
  world-canvas-render-kit
  html-interface-render-kit
  game-host-diagnostics-kit
  smoke-fixture-kit

target next-cut:
  market-action-id-catalog-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-command-journal-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  nested-command-result-propagation-kit
  market-result-projection-kit
  market-render-readback-kit
  market-fixture-replay-kit
```

## Main finding

`ZombieOrchard` does not need a new visual pass yet.

The runtime already has an excellent authority seam because `engine.command(domainId, type, payload)` returns a command result, but the exchange/Market path does not yet retain nested command results, does not produce transaction history, and does not expose renderer-readable Market projections.

The next cut should turn Market into a fixture-readable transaction authority without changing the static route, active-session loop, world canvas, or `window.GameHost.engine/getState/tick` compatibility.

## Next safe ledge

```txt
ZombieOrchard Market Transaction Ledger + Nested Result Source Splice Gate
```

## Required source-order map

```txt
src/market/market-ids.js
src/market/market-source-snapshot.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-result.js
src/market/market-transaction-ledger.js
src/market/market-projection.js
src/market/market-render-readback.js
src/presets/orchard-preset.js exchange actions
src/kits/game-domains.js resource/inventory/market additions
src/kits/composition.js nested result retention
src/renderer/html-interface-renderer.js exchange projection branch
src/start.js optional GameHost market diagnostics
scripts or tests/market-transaction-fixture.mjs
package.json test command update
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm test: no
local npm run build: no
browser smoke: no
GitHub Pages smoke: no
```