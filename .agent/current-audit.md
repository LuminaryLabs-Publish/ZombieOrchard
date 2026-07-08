# ZombieOrchard Current Audit

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Summary

`ZombieOrchard` is a standalone static orchard survival/economy shell. The current runtime is already kit-composed and playable at the prototype level.

The repo is not missing a route, runtime, command router, renderer, or smoke harness. The current blocker is narrower: the Market screen exists as an exchange shell, but sell/buy behavior still lacks stable source-owned command envelopes, before/after snapshots, transaction records, nested command result propagation, projection rows, renderer readback, and a DOM-free fixture matrix.

This pass keeps runtime code unchanged and updates the `.agent` docs around the exact nested Market result source contract needed before implementation.

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
-> html-interface-renderer renders active HUD or active screen panel
-> data-action clicks route through interface-composition.activate
-> data-command clicks route directly to active-session
-> nested action.command can call ctx.engine.command(...)
-> nested result is currently not retained
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
-> Market reaches exchange shell
-> exchange currently only exposes Back
-> session ends when condition reaches zero
-> outcome screen
```

## Source-backed facts

```txt
README.md:
  describes a standalone kit-composed orchard survival/economy game shell.

package.json:
  npm run dev starts a static Python server.
  npm test runs node tests/smoke.mjs.
  npm run build copies index.html and src/ into dist.

src/start.js:
  creates createOrchardGame(), world-canvas, html-interface-renderer, animation loop, and window.GameHost.

src/game.js:
  installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition.

src/kits/runtime.js:
  engine.command(domainId, type, payload) already returns domain command results.
  snapshot aggregation is centralized.
  no command/result journal or replay helper exists.

src/kits/composition.js:
  transition/back/activate are centralized.
  action.command dispatch happens through ctx.engine.command.
  nested command result is currently dropped.
  snapshot exposes active/previous/activeSnapshot only.

src/presets/orchard-preset.js:
  exchange currently exposes only Back.

src/kits/game-domains.js:
  resource-ledger owns values/canPay/pay/add but no transaction history.
  inventory-runtime owns equip only, no purchase intake.
  active-session owns move, collect, clear, next-phase, pest tick, score, and ending.

src/renderer/html-interface-renderer.js:
  data-action clicks route to interface-composition.activate.
  data-command clicks route directly to active-session.
  active-session has a dedicated HUD branch.
  exchange has no projection/readback branch.

src/renderer/world-canvas.js:
  draws trees, apples, pests, and player directly from snapshots.

tests/smoke.mjs:
  proves entry, Play transition, active-session, and orchard apples only.
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
kit-runtime:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  screen state, action rows, fields, metadata, action activation, snapshots

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

The runtime already has the right central seam: `engine.command()` returns command results. The next implementation should not rewrite the app; it should add source-owned Market transaction helpers and preserve/return nested Market results through `interface-composition` so renderer projections, GameHost diagnostics, and fixture replay can consume the same accepted/rejected output.

The exact seam is:

```txt
exchange action ids
-> MarketCommandEnvelope
-> MarketSourceSnapshot before
-> MarketPreflight
-> MarketCommandResult
-> accepted mutation only
-> rejected no-mutation proof
-> transaction record when accepted
-> command/result journals
-> interface-composition nestedResult
-> snapshot.lastResult
-> projection rows
-> renderer readback
-> fixture replay
```

## Current priority

```txt
ZombieOrchard Nested Market Result Source Contract + Exchange Projection Readback Fixture Gate
```
