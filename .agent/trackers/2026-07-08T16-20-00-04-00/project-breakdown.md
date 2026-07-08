# Project Breakdown Tracker — ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Goal

Refresh repo-local `.agent` operating memory for one eligible Publish repo, keep work limited to one project, and log the result centrally in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

- [x] Listed the accessible `LuminaryLabs-Publish` repo set.
- [x] Compared Publish repos against central repo-ledger state.
- [x] Sampled repo-local root `.agent/START_HERE.md` state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read repo-local `.agent` state.
- [x] Read runtime/source anchors.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented and next-cut kits.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added gameplay audit.
- [x] Added Market authority audit.
- [x] Added timestamped turn-ledger entry.
- [x] Updated required root `.agent` files.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed to `main`.

## Publish repositories observed

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central last updated 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest reviewed 2026-07-08T15:39:43-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central last updated 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central last updated 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central last updated 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central last updated 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central last updated 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest reviewed 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/ZombieOrchard       selected / central catch-up + Market nested-result source contract
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected because it had repo-local `.agent` state newer than the central ledger, and the Market transaction ledger / nested result source splice remains the clearest unresolved next implementation seam.

## Source files read

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
src/start.js
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
```

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tickable domains update pressure and active-session
  -> engine.snapshot()
  -> world-canvas renders orchard world from snapshot
  -> html-interface-renderer renders active screen from snapshot
  -> data-action routes through interface-composition.activate
  -> nested action.command may call engine.command(...)
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
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-command-journal, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Kit services

```txt
current:
  install kits
  register domains
  route commands
  tick domains
  aggregate snapshots
  render world canvas from snapshots
  render HTML interface from snapshots
  transition screens
  dispatch nested screen actions
  mutate resources through add/pay/canPay helpers
  collect apples
  build catalog items
  hire roster actors
  equip inventory items
  move/collect/clear/next-phase active session
  expose engine/getState/tick through GameHost
  run entry/play/apple smoke

needed next:
  define stable Market action ids
  normalize MarketCommandEnvelope records
  collect MarketSourceSnapshot before/after pairs
  run MarketPreflight with stable reasons
  produce accepted/rejected MarketCommandResult rows
  prove rejected no-mutation
  append TransactionRecord rows for accepted commands
  append MarketCommandJournal rows
  append MarketResultJournal rows
  propagate nested results through interface-composition
  project MarketResultProjection rows
  report MarketRenderReadback rows
  smoke all Market cases without DOM ownership
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

next-cut:
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

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T16-20-00-04-00-market-source-splice-dsk-boundary.md
.agent/render-audit/2026-07-08T16-20-00-04-00-exchange-projection-readback-contract.md
.agent/gameplay-audit/2026-07-08T16-20-00-04-00-market-transaction-action-loop.md
.agent/market-authority-audit/2026-07-08T16-20-00-04-00-nested-result-source-contract.md
.agent/trackers/2026-07-08T16-20-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T16-20-00-04-00.md
```

## Central files changed

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T16-20-00-04-00-zombie-orchard-nested-market-result-source-contract.md
```

## Next safe ledge

```txt
ZombieOrchard Nested Market Result Source Contract + Exchange Projection Readback Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm test: no
local npm run build: no
browser smoke: no
connector read/write validation: yes
pushed to main: yes
```
