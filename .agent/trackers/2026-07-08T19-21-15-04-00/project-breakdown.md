# Project Breakdown: ZombieOrchard

**Timestamp:** `2026-07-08T19-21-15-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Branch target:** `main`

## Summary

This was a documentation-only breakdown pass.

The full accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` central repo-ledger state. No non-Cavalry repo was fully new, missing from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`ZombieOrchard` was selected because its repo-local `.agent` state was ahead of the central ledger and its Market command authority remains the highest-value unresolved seam.

## Repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/ZombieOrchard       selected / central catch-up + Market nested-result fixture gate
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / recently refreshed
```

## Interaction loop

```txt
open route
  -> src/boot.js imports src/start.js
  -> src/start.js creates engine, world renderer, UI renderer, and frame loop
  -> src/game.js installs runtime and domain kits
  -> engine.tick(1 / 60)
  -> tickable domains update state
  -> engine.snapshot()
  -> world-canvas renders game state
  -> html-interface-renderer renders active screen
  -> data-action clicks route through interface-composition.activate
  -> nested action.command calls can happen
  -> nested result is currently discarded
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

## Services kits offer

```txt
kit-runtime:
  install, register, route commands, return command results, tick domains, emit events, snapshot, subscribe

interface-composition-kit:
  active screen, previous screen, transition/back, activate, nested command dispatch, activeSnapshot

resource-ledger-kit:
  values, canPay, pay, add, command add/pay, snapshot

pressure-field-kit:
  channels, adjust, tick, snapshot

orchard-world-kit:
  trees, apples, nearest collection, reseed, bounds snapshot

construction-runtime-kit:
  build catalog, resource payment, built records, messages

roster-runtime-kit:
  actors, hire command, payment, messages

inventory-runtime-kit:
  items, equipped, equip command

active-session-domain-kit:
  player/day/phase/pests/score, move, collect, clear, next-phase, tick, end condition

world-canvas-render-kit:
  canvas render from snapshot

html-interface-render-kit:
  active-session HUD, generic screens, click command routing
```

## Kits identified

```txt
implemented:
  kit-runtime, scoped-interface-domain-kit, entry-domain-kit, session-select-domain-kit, run-setup-domain-kit, active-session-domain-kit, interrupt-domain-kit, construction-domain-kit, exchange-domain-kit, roster-domain-kit, inventory-domain-kit, knowledge-domain-kit, preferences-domain-kit, outcome-domain-kit, interface-composition-kit, resource-ledger-kit, pressure-field-kit, orchard-world-kit, construction-runtime-kit, roster-runtime-kit, inventory-runtime-kit, world-canvas-render-kit, html-interface-render-kit, game-host-diagnostics-kit, smoke-fixture-kit

next-cut:
  market-action-id-catalog-kit, market-command-source-manifest-kit, market-command-envelope-kit, market-source-snapshot-kit, market-price-source-kit, market-capacity-policy-kit, market-preflight-kit, market-command-result-kit, market-rejection-reason-catalog-kit, market-command-journal-kit, market-result-journal-kit, resource-transaction-history-kit, inventory-purchase-intake-kit, nested-command-result-propagation-kit, market-result-projection-kit, market-render-readback-kit, market-fixture-replay-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T19-21-15-04-00-market-nested-result-consumer-dsk-map.md
.agent/render-audit/2026-07-08T19-21-15-04-00-exchange-projection-readback-fixture.md
.agent/gameplay-audit/2026-07-08T19-21-15-04-00-market-command-result-loop.md
.agent/market-authority-audit/2026-07-08T19-21-15-04-00-source-manifest-nested-result-contract.md
.agent/trackers/2026-07-08T19-21-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T19-21-15-04-00.md
```

## Central files changed

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T19-21-15-04-00-zombie-orchard-market-source-manifest-nested-result-sync.md
```

## Main finding

`ZombieOrchard` should not be rewritten. The existing runtime already routes commands and aggregates snapshots. The next implementation must add Market source/result contracts and preserve nested command results through `interface-composition` so exchange rendering, GameHost diagnostics, and fixtures all consume the same accepted/rejected result records.

## Next safe ledge

```txt
ZombieOrchard Market Source Manifest + Nested Result Consumer / Exchange Readback Fixture Gate
```

## Validation

```txt
Runtime source changed: no
Agent docs changed: yes
Central ledger changed: yes
Branch created: no
Pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
```
