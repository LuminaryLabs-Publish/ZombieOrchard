# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T12-51-50-04-00`

## Goal

Refresh repo-local `.agent` state for one selected `LuminaryLabs-Publish` repo, identify its interaction loop, domains, services, and kits, and log the updated state centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read root `.agent` state.
- [x] Read source anchors.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented and next-cut kits.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added gameplay audit.
- [x] Added Market authority audit.
- [x] Updated required root `.agent` files.
- [x] Updated kit registry.
- [x] Added turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change log.
- [x] Pushed to `main`.

## Selection result

`LuminaryLabs-Publish/ZombieOrchard` was selected as the oldest observed eligible fallback after checked non-Cavalry repos were found represented in the central ledger with root `.agent` state.

## Repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed
LuminaryLabs-Publish/ZombieOrchard       selected
```

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
src/kits/scoped-interface-domains.js
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
-> engine.tick(1 / 60)
-> engine.snapshot()
-> world-canvas render
-> html-interface-renderer render
-> player clicks data-action or data-command
-> interface-composition or active-session command
-> repeated frame loop
```

## Domains in use

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime, engine-context, command-router, tick-dispatcher, snapshot-aggregator, GameHost

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas

market-next:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-command-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Kit services

```txt
current:
  install and register kits
  route commands
  tick domains
  aggregate snapshots
  create interface screens
  activate screen actions
  transition/back between screens
  dispatch nested screen actions
  track resource values and affordability
  mutate resources via add/pay
  tick pressure channels
  generate orchard trees and apples
  collect nearest apples
  build catalog items
  hire roster actors
  equip inventory items
  move/collect/clear/phase active session
  render canvas orchard state
  render HTML HUD and screens
  expose GameHost engine/getState/tick
  run baseline smoke fixture

needed next:
  normalize Market commands
  create source snapshots
  preflight commands
  emit accepted/rejected command results
  append MarketCommandJournal rows
  append TransactionRecord rows
  retain nested command results
  project Market rows for renderer
  report renderer readback
  run DOM-free Market fixture replay
```

## Kits

```txt
implemented:
  kit-runtime
  scoped-interface-domain-kit
  interface-composition-kit
  resource-ledger-kit
  pressure-field-kit
  orchard-world-kit
  construction-runtime-kit
  roster-runtime-kit
  inventory-runtime-kit
  active-session-domain-kit
  world-canvas-render-kit
  html-interface-render-kit
  smoke-fixture-kit

next-cut:
  market-action-id-catalog-kit
  market-source-snapshot-kit
  market-command-envelope-kit
  market-preflight-kit
  market-command-result-kit
  market-command-journal-kit
  market-transaction-record-kit
  market-result-projection-kit
  market-render-readback-kit
  nested-command-result-propagation-kit
  market-dom-free-fixture-kit
```

## Files changed in selected repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T12-51-50-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T12-51-50-04-00-market-projection-readback-handoff.md
.agent/gameplay-audit/2026-07-08T12-51-50-04-00-market-command-journal-loop.md
.agent/market-authority-audit/2026-07-08T12-51-50-04-00-command-journal-fixture-boundary.md
.agent/trackers/2026-07-08T12-51-50-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-51-50-04-00.md
```

## Files changed centrally

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T12-51-50-04-00-zombie-orchard-market-command-journal-boundary.md
```

## Next safe ledge

```txt
ZombieOrchard Market Command Journal + Exchange Projection Fixture Boundary
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm test: no
local npm run build: no
browser smoke: no
connector write validation: yes
pushed to main: yes
```
