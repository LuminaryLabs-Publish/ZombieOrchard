# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T21-18-39-04-00`

## Plan ledger

**Goal:** Compare `LuminaryLabs-Publish` against central tracking, select one eligible repo, update root `.agent/` docs, identify loop/domains/services/kits, and log the result centrally.

**Checklist**

- [x] Compared accessible `LuminaryLabs-Publish` repos against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read repo-local `.agent` state.
- [x] Read runtime, composition, game-domain, preset, start, and renderer source.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, gameplay, and Market authority audits.
- [x] Added timestamped tracker and turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local npm/browser validation.
- [ ] Did not edit runtime/source files.

## Repo selected

```txt
LuminaryLabs-Publish/ZombieOrchard
```

Reason: all checked non-Cavalry Publish repos were already tracked and had sampled root `.agent` state. `ZombieOrchard` was selected as the oldest sampled eligible fallback after the latest `AetherVale` catch-up, with Market transaction/result authority still unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / latest sampled alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / latest sampled alignment 2026-07-08T21-08-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / latest sampled alignment 2026-07-08T20-10-32-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / latest sampled alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / latest sampled alignment 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest sampled alignment 2026-07-08T19-21-15-04-00 / Market fixture unresolved
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / latest sampled alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / latest sampled alignment 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / latest sampled alignment 2026-07-08T21-00-12-04-00
```

## Files changed in `LuminaryLabs-Publish/ZombieOrchard`

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T21-18-39-04-00-market-transaction-fixture-dsk-map.md
.agent/render-audit/2026-07-08T21-18-39-04-00-exchange-result-projection-readback.md
.agent/gameplay-audit/2026-07-08T21-18-39-04-00-market-transaction-result-loop.md
.agent/market-authority-audit/2026-07-08T21-18-39-04-00-nested-result-transaction-contract.md
.agent/trackers/2026-07-08T21-18-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T21-18-39-04-00.md
```

## Interaction loop

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
  -> nested action.command calls can happen inside interface-composition
  -> nested command result is currently discarded
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
  market-action-id-catalog, market-command-source-manifest, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-command-journal, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Services the kits offer

```txt
kit-runtime:
  install kits, register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  screen state, action rows, fields, metadata, action activation, snapshots

interface-composition-kit:
  active screen, previous screen, transition/back, action activation, nested command dispatch, active screen snapshot

resource-ledger-kit:
  resource values, canPay, pay, add, command add/pay, snapshots

pressure-field-kit:
  pressure channels, adjust api, pressure tick, curse tick, snapshots

orchard-world-kit:
  tree grid, random apple seed, nearest-apple collection, apple reseed, bounds snapshot

construction-runtime-kit:
  catalog, resource payment, built item records, build messages

roster-runtime-kit:
  actor list, hire command, payment, roster messages

inventory-runtime-kit:
  item list, equipped item, equip command

active-session-domain-kit:
  day/phase/player/pest/score/message state, move, collect, clear, next-phase, session tick

world-canvas-render-kit:
  canvas resize and simple tree/apple/pest/player drawing

html-interface-render-kit:
  active-session HUD, generic screen rendering, click-to-command routing

smoke-fixture-kit:
  entry/play/apple smoke through tests/smoke.mjs
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
  market-command-source-manifest-kit
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

`ZombieOrchard` already has a good command seam because `engine.command()` returns results and `interface-composition` owns screen activation. The next implementation should preserve that shape and add Market transaction/result contracts plus nested result propagation instead of rewriting the app.

## Next safe ledge

```txt
ZombieOrchard Market Transaction Result + Nested Result Projection Fixture Gate
```

## Validation

```txt
repo-list comparison: performed
central-ledger comparison: performed
source readback: performed
repo-local .agent write: performed
central ledger write: performed
central internal change-log write: performed
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
GitHub Pages smoke: not run
```
