# ZombieOrchard Current Audit

**Timestamp:** `2026-07-08T09-48-58-04-00`

## Summary

`ZombieOrchard` is a standalone static orchard survival/economy shell. The architecture already uses composable kits for runtime, interface domains, composition, resources, pressure, orchard world, construction, roster, inventory, active-session behavior, world rendering, and HTML rendering.

The repo is not missing a route or a game loop. It is missing a source-owned Market authority seam that turns the existing `exchange` shell into replayable sell/buy command results with transaction provenance and renderer projections.

This pass keeps runtime code unchanged and tightens the internal docs around the exact transaction replay boundary that should be implemented next.

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

## Source-backed facts

```txt
src/game.js:
  installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition.

src/kits/runtime.js:
  engine.command(domainId, type, payload) returns command result records from domain.command.
  no command journal or replay helper exists.

src/kits/composition.js:
  action.command dispatch happens through ctx.engine.command.
  nested command result is dropped.
  snapshot exposes active/previous/activeSnapshot only.

src/presets/orchard-preset.js:
  exchange currently exposes only Back.

src/kits/game-domains.js:
  resource-ledger owns values/canPay/pay/add but no transaction history.
  inventory-runtime owns equip only, no purchase intake.
  active-session owns move, collect, clear, next-phase, pest tick, score, and ending.

package.json:
  npm test runs node tests/smoke.mjs.
  npm run build copies static files to dist.
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
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
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
  entry/play/apple smoke through tests/smoke.mjs
```

## Main finding

The Market route is present, but the exchange domain is not yet an economy authority.

The next source change should not start with visual polish. It should start with deterministic command authority and fixture replay:

```txt
market action ids
-> command envelope
-> source snapshot
-> preflight
-> accepted/rejected result
-> mutation only on accepted result
-> transaction history
-> nested result propagation
-> projection snapshot
-> renderer readback boundary
-> DOM-free smoke fixture
```

## Current next safe ledge

```txt
ZombieOrchard Market Transaction Replay Boundary
```

The implementation should preserve `index.html`, `src/start.js`, `createOrchardGame()`, `world-canvas`, active-session HUD, and `window.GameHost.engine/getState/tick` while adding source-owned Market transaction replay and renderer-readable projection snapshots.
