# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T09-48-58-04-00`

## Goal

Refresh repo-local `.agent` docs for one selected `LuminaryLabs-Publish` repo and log the result centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared list against `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read repo-local `.agent` state.
- [x] Read source anchors for runtime, composition, game domains, preset, and package scripts.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified implemented and target-next kits.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped gameplay audit.
- [x] Added timestamped Market authority audit.
- [x] Updated root `.agent` docs.
- [x] Updated kit registry.
- [x] Added turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change log.
- [x] Pushed to `main` only.

## Selection reason

The full accessible `LuminaryLabs-Publish` repo list was compared against central tracking. No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as the oldest eligible fallback follow-up in the current central rotation because its Market implementation map existed, but the transaction replay and renderer readback boundary still needed to be made explicit before runtime source changes.

## Source files read

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/market-authority-audit/fixture-implementation-map.md
.agent/kit-registry.json
package.json
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
```

## Interaction loop

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> tickable domains update pressure and active-session
-> engine.snapshot()
-> world-canvas renders orchard snapshot
-> html-interface-renderer renders active HUD or screen panel
-> clicks route through interface-composition or active-session
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

market-next:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Kit services

```txt
current services:
  install kits
  register domains
  route commands
  tick domains
  emit events
  aggregate snapshots
  render orchard canvas from snapshots
  render active-session HUD and generic screens from snapshots
  transition interface screens
  dispatch nested screen actions
  store resource values and affordability helpers
  add/pay resources
  track pressure channels
  generate trees and random apples
  collect nearby apple
  build catalog items with resource payment
  hire roster actors with resource payment
  equip inventory items
  move player
  collect apples
  clear rows
  advance day/night phase
  expose engine/getState/tick through GameHost
  run minimal DOM-free entry/play/apple smoke

needed next services:
  define stable Market action ids
  normalize Market actions into command envelopes
  create Market source snapshots
  produce deterministic price rows
  produce deterministic capacity rows
  preflight accepted/rejected commands
  return accepted/rejected MarketCommandResult records
  catalogue stable rejection reasons
  append MarketResultJournal entries
  append transaction history entries
  sell apples with transaction provenance
  buy tools and supplies through inventory purchase intake
  return nested command results through interface-composition
  project Market result state for renderer use
  render exchange cards and transaction cards from snapshots only
  expose Market renderer readback
  expose Market diagnostics through GameHost
  prove accepted/rejected Market fixture parity in DOM-free smoke
```

## Kit inventory

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

target-next-cut:
  market-action-id-catalog-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  nested-command-result-propagation-kit
  market-result-projection-kit
  market-render-readback-kit
  market-fixture-replay-kit
```

## Findings

`engine.command()` already returns result objects, so the next implementation should not rewrite `createKitRuntime()`.

`interface-composition` dispatches nested `action.command` through `ctx.engine.command()`, but it discards the nested result. That is the main handoff gap for Market result projection.

`resource-ledger` and `inventory-runtime` are the right mutation owners, but they lack transaction history and purchase intake.

`exchange` currently only exposes Back, so the Market screen needs source-owned action rows before renderer work.

## Changed files

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T09-48-58-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T09-48-58-04-00-market-render-readback-boundary.md
.agent/gameplay-audit/2026-07-08T09-48-58-04-00-economy-loop-command-boundary.md
.agent/market-authority-audit/2026-07-08T09-48-58-04-00-transaction-replay-boundary.md
.agent/trackers/2026-07-08T09-48-58-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T09-48-58-04-00.md
```

## Validation

No runtime source files changed.

No local `npm test`, `npm run build`, browser smoke, Playwright smoke, or Pages validation was run in this connector-only documentation pass.
