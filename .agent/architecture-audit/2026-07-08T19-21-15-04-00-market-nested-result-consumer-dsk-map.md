# Market Nested Result Consumer DSK Map

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T19-21-15-04-00`

## Current architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> game/interface domains
  -> world-canvas renderer
  -> html-interface-renderer
  -> window.GameHost
```

## Interaction loop

```txt
open route
  -> create engine
  -> tick engine every animation frame
  -> aggregate snapshots
  -> render world canvas from game snapshots
  -> render active screen from interface-composition snapshot
  -> data-action calls interface-composition.activate
  -> active interface domain returns action row
  -> optional action.command runs nested engine.command
  -> nested command result is currently discarded
```

## Domains in use

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime, engine-context, domain-registry, command-router, tick-dispatcher, snapshot-aggregator, subscription-bus, browser-animation-loop, GameHost

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas

market-authority-next:
  market-action-id-catalog, market-command-source-manifest, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-command-journal, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Services offered by kits

```txt
kit-runtime:
  install kits, register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers

interface-composition-kit:
  transition, back, activate, nested command dispatch, active screen snapshot

scoped-interface-domain-kit:
  screen metadata, action rows, activation, fields, snapshots

resource-ledger-kit:
  values, canPay, pay, add, add/pay commands, snapshots

pressure-field-kit:
  pressure channels, adjust api, tick pressure and curse, snapshots

orchard-world-kit:
  tree grid, apple seeding, nearby apple collection, bounds snapshot

construction-runtime-kit:
  catalog lookup, resource payment, built records, build messages

roster-runtime-kit:
  actors, role catalog, hire payment, roster messages

inventory-runtime-kit:
  item list, equipped item, equip command

active-session-domain-kit:
  movement, collect, clear, day/night, pest tick, score, ending, messages

html-interface-render-kit:
  active-session HUD, generic screen render, data-action/data-command routing

world-canvas-render-kit:
  tree, apple, pest, and player canvas draw from snapshot
```

## Kits identified

```txt
implemented:
  kit-runtime, scoped-interface-domain-kit, entry-domain-kit, session-select-domain-kit, run-setup-domain-kit, active-session-domain-kit, interrupt-domain-kit, construction-domain-kit, exchange-domain-kit, roster-domain-kit, inventory-domain-kit, knowledge-domain-kit, preferences-domain-kit, outcome-domain-kit, interface-composition-kit, resource-ledger-kit, pressure-field-kit, orchard-world-kit, construction-runtime-kit, roster-runtime-kit, inventory-runtime-kit, world-canvas-render-kit, html-interface-render-kit, game-host-diagnostics-kit, smoke-fixture-kit

next-cut:
  market-action-id-catalog-kit, market-command-source-manifest-kit, market-command-envelope-kit, market-source-snapshot-kit, market-price-source-kit, market-capacity-policy-kit, market-preflight-kit, market-command-result-kit, market-rejection-reason-catalog-kit, market-command-journal-kit, market-result-journal-kit, resource-transaction-history-kit, inventory-purchase-intake-kit, nested-command-result-propagation-kit, market-result-projection-kit, market-render-readback-kit, market-fixture-replay-kit
```

## Boundary rule

Do not replace the runtime or renderer. Add the Market source/result contracts beside the current kits, then splice nested result retention into `interface-composition` so the current renderer and GameHost can consume the same result records.
