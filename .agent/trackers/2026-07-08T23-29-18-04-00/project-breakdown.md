# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T23-29-18-04-00`

## Selection

```txt
Selected repo: LuminaryLabs-Publish/ZombieOrchard
Excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
Reason: No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root .agent state. ZombieOrchard had the oldest eligible tracked alignment at 2026-07-08T21-18-39-04-00.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / latest sampled alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / latest sampled alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / latest sampled alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / latest sampled alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / latest central alignment 2026-07-08T21-50-56-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / latest sampled alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / latest sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / latest sampled alignment 2026-07-08T23-08-29-04-00
```

## Interaction loop

```txt
open route
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame, world-canvas, html-interface-renderer, and frame loop
  -> src/game.js installs runtime, game, interface, active-session, and interface-composition kits
  -> engine.tick(1 / 60)
  -> pressure and active-session tick
  -> engine.snapshot aggregates domain snapshots
  -> world-canvas renders orchard state
  -> html-interface-renderer renders HUD or active screen
  -> data-action clicks route to interface-composition.activate
  -> optional nested action.command runs through ctx.engine.command
  -> nested command result is discarded
  -> direct data-command clicks route to active-session
  -> GameHost exposes engine/getState/tick
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
  market-action-id-catalog, market-command-source-manifest, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-command-journal, market-result-journal, resource-transaction-history, inventory-purchase-intake, interface-nested-result-adapter, market-result-projection, market-render-readback, market-fixture-replay
```

## Services offered by kits

```txt
kit-runtime:
  install kits, register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  create UI screen domains, hold title/description/fields/meta/actions, select actions, set fields, activate actions, snapshot screen state

interface-composition-kit:
  transition, back, active-screen activation, nested command dispatch, active screen snapshot

resource-ledger-kit:
  hold resources, canPay, pay, add, command add/pay, snapshot values

pressure-field-kit:
  update pressure/curse channels, adjust pressure, tick over time, snapshot channels

orchard-world-kit:
  generate trees, seed apples, collect nearest apple, reseed apples, snapshot trees/apples/bounds

construction-runtime-kit:
  build items from catalog, pay resources, append built records, expose build message

roster-runtime-kit:
  hire actors, pay money, append actors, expose roster message

inventory-runtime-kit:
  hold items, equip item, snapshot inventory

active-session-domain-kit:
  active session state, move, collect, clear, next-phase, pest tick, score, end state

world-canvas-render-kit:
  draw orchard state from snapshots

html-interface-render-kit:
  render active-session HUD, generic screen panels, action buttons, and direct active-session command buttons

smoke-fixture-kit:
  prove entry/play/active-session/apple baseline
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
  interface-nested-result-adapter-kit
  market-result-projection-kit
  market-render-readback-kit
  market-fixture-replay-kit
```

## Findings

```txt
- createKitRuntime already provides the command return seam needed for Market results.
- interface-composition currently drops nested command results.
- active-session direct data-command behavior should stay intact for Collect/Clear/Next Phase.
- exchange currently lacks source-owned Market action rows.
- resource-ledger lacks transaction provenance.
- inventory-runtime lacks purchase intake and capacity checks.
- html-interface-renderer lacks an exchange projection branch and renderer readback.
- GameHost lacks optional market diagnostics.
- tests/smoke.mjs does not cover Market.
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T23-29-18-04-00-market-adapter-consumer-dsk-map.md
.agent/render-audit/2026-07-08T23-29-18-04-00-exchange-projection-consumer-readback.md
.agent/gameplay-audit/2026-07-08T23-29-18-04-00-market-command-to-transaction-consumer-loop.md
.agent/market-authority-audit/2026-07-08T23-29-18-04-00-source-manifest-adapter-consumer-contract.md
.agent/deploy-audit/2026-07-08T23-29-18-04-00-market-fixture-check-integration.md
.agent/trackers/2026-07-08T23-29-18-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T23-29-18-04-00.md
```

## Next safe ledge

```txt
ZombieOrchard Market Source Manifest Adapter + Consumer Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
```
