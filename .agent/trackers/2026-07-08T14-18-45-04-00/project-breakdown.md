# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T14-18-45-04-00`

## Goal

Compare the current `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, update root `.agent` docs, identify the interaction loop/domains/services/kits, and log the result centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` tracking.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read README, package scripts, boot, start, game factory, runtime, composition, game-domain, preset, renderer, and smoke-test files.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, gameplay, and Market authority audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local npm validation.
- [ ] Did not edit runtime/source implementation files.

## Repo selected

```txt
LuminaryLabs-Publish/ZombieOrchard
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as the oldest observed eligible fallback because its latest sampled root alignment was `2026-07-08T12-51-50-04-00`, older than the other sampled non-excluded roots, and its Market command/result fixture boundary still needs a concrete acceptance-ledger + exchange renderer readback map before runtime implementation.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T13-39-15-04-00
LuminaryLabs-Publish/ZombieOrchard       selected fallback / latest sampled alignment 2026-07-08T12-51-50-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T12-59-11-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T13-11-07-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T13-31-29-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T13:18:13-04:00
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T14-18-45-04-00-market-acceptance-dsk-map.md
.agent/render-audit/2026-07-08T14-18-45-04-00-exchange-render-readback-map.md
.agent/gameplay-audit/2026-07-08T14-18-45-04-00-market-command-result-loop.md
.agent/market-authority-audit/2026-07-08T14-18-45-04-00-acceptance-ledger-fixture-map.md
.agent/trackers/2026-07-08T14-18-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T14-18-45-04-00.md
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
-> world-canvas renders trees/apples/pests/player
-> html-interface-renderer renders HUD or current screen
-> click[data-action] routes through interface-composition.activate
-> click[data-command] routes directly to active-session
-> window.GameHost.engine/getState/tick
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

## Services identified

```txt
current services:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, render orchard canvas, render active-session HUD and generic screens, transition screens, dispatch nested screen actions, track resource values, add/pay resources, tick pressure channels, generate trees/apples, collect apples, build catalog items, hire roster actors, equip inventory items, move/collect/clear/phase active session, expose GameHost engine/getState/tick, run baseline smoke fixture.

needed next services:
  stable Market action ids, Market command envelopes, source snapshots, preflight results, accepted/rejected command results, no-mutation rejection checks, command journal rows, result journal rows, transaction history, purchase intake, nested result propagation, exchange projection, renderer readback, DOM-free fixture replay.
```

## Kits identified

```txt
implemented:
  kit-runtime, scoped-interface-domain-kit, entry-domain-kit, session-select-domain-kit, run-setup-domain-kit, active-session-domain-kit, interrupt-domain-kit, construction-domain-kit, exchange-domain-kit, roster-domain-kit, inventory-domain-kit, knowledge-domain-kit, preferences-domain-kit, outcome-domain-kit, interface-composition-kit, resource-ledger-kit, pressure-field-kit, orchard-world-kit, construction-runtime-kit, roster-runtime-kit, inventory-runtime-kit, world-canvas-render-kit, html-interface-render-kit, game-host-diagnostics-kit, smoke-fixture-kit

next-cut:
  market-action-id-catalog-kit, market-command-envelope-kit, market-source-snapshot-kit, market-price-source-kit, market-capacity-policy-kit, market-preflight-kit, market-command-result-kit, market-rejection-reason-catalog-kit, market-command-journal-kit, market-result-journal-kit, resource-transaction-history-kit, inventory-purchase-intake-kit, nested-command-result-propagation-kit, market-result-projection-kit, market-render-readback-kit, market-fixture-replay-kit
```

## Main finding

`ZombieOrchard` already has a working kit runtime and a baseline command-returning engine. The important gap is not general architecture; it is Market authority proof. The exchange screen needs source-owned action IDs, command envelopes, source snapshots, accepted/rejected results, no-mutation rejection rows, transaction history, result journals, nested result propagation, projection rows, renderer readback, and fixture replay.

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Ledger + Exchange Renderer Readback Fixture Gate
```

## Validation

```txt
GitHub repo-list read: yes
central ledger readback: yes
repo-local .agent readback: yes
repo-local source readback: yes
repo-local .agent write: yes
central ledger write: yes
central internal change-log write: yes
runtime source edit: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
GitHub Pages smoke: not run
```
