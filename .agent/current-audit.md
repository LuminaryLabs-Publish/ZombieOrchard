# ZombieOrchard Current Audit

**Timestamp:** `2026-07-08T06-39-20-04-00`

## Summary

`ZombieOrchard` is a standalone static orchard survival/economy shell. The architecture already uses composable kits for runtime, interface domains, composition, resources, pressure, orchard world, construction, roster, inventory, and active session behavior.

The repo is not missing a game loop. It is missing stronger result authority around Market actions, transaction records, nested result propagation, renderer projection, and replayable DOM-free fixtures.

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
-> runtime ticks pressure-field and active-session
-> engine.snapshot()
-> world-canvas renders orchard snapshot
-> html-interface-renderer renders active HUD or screen panel
-> clicks route through interface-composition or active-session
-> window.GameHost exposes engine/getState/tick
```

## Current gameplay loop

```txt
Entry
-> Play
-> Active Session
-> collect apples
-> clear pests
-> advance day/night phase
-> build storage shed
-> open Market/Roster/Inventory/Codex/Settings screens
-> Market currently reaches exchange shell
-> exchange currently only exposes Back
-> session ends when condition reaches zero
-> outcome screen
```

## Implemented domains

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime, engine-context, domain-registry, command-router, event-emitter, tick-dispatcher, snapshot-aggregator, subscription-bus, browser-animation-loop, GameHost, smoke-harness

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas

market-next:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-fixture-replay
```

## Current kit services

```txt
kit-runtime:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, subscriptions

scoped-interface-domain-kit:
  screen state, action rows, selection state, fields, metadata, action activation, snapshots

interface-composition-kit:
  active screen, previous screen, transition/back, action activation, nested command dispatch, active screen snapshot

resource-ledger-kit:
  resource values, canPay, pay, add, snapshots

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
  HUD, generic screen rendering, click-to-command routing

smoke-fixture-kit:
  entry/play/apple smoke through `tests/smoke.mjs`
```

## Main finding

The Market route exists, but `exchange` currently behaves as a shell route instead of an economy authority.

Source inspection confirms:

```txt
- exchange has only Back in orchard-preset.js.
- interface-composition dispatches nested action.command but drops the nested result.
- resource-ledger has no transaction history.
- inventory-runtime has no purchase-intake service.
- tests/smoke.mjs has no Market fixture coverage.
```

## Follow-up audit added

```txt
.agent/market-authority-audit/acceptance-ledger.md
```

That file defines source-backed current facts, required Market action IDs, command envelope shape, source snapshot shape, stable result record shape, rejection reasons, transaction record shape, exchange projection shape, and the acceptance matrix for the next implementation pass.

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Fixture Implementation
```

The next implementation pass should turn Market actions into stable command envelopes with deterministic prices, capacity checks, accepted/rejected results, transaction history, nested result propagation, renderer-ready projections, and DOM-free fixtures.
