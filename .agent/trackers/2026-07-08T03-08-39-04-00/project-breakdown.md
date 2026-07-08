# Project Breakdown: ZombieOrchard

**Timestamp:** `2026-07-08T03-08-39-04-00`

## Selection

Selected `LuminaryLabs-Publish/ZombieOrchard` because it was centrally tracked but still missing the required root `.agent/START_HERE.md`, `.agent/current-audit.md`, `.agent/next-steps.md`, `.agent/known-gaps.md`, `.agent/validation.md`, and top-level required audit documents.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

## Interaction loop

```txt
index.html
-> canvas#world + section#ui-root
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> tickable domains update state
-> engine.snapshot()
-> canvas renderer draws orchard entities
-> HTML renderer draws HUD or screen panels
-> data-action clicks route through interface-composition
-> data-command clicks route directly to active-session
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

next market authority:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-dispatch, market-command-result, market-command-result-journal, transaction-history, inventory-purchase-intake, market-result-projection, exchange-renderer-authority, gamehost-market-diagnostics, market-fixture-replay
```

## Services that kits offer

```txt
kit-runtime:
  install, register, command, tick, emit, snapshot, subscribe

scoped-interface-domain-kit:
  screen metadata, actions, selected index, fields, activate/select/set-field, snapshot

interface-composition-kit:
  active screen, transition, back, nested action dispatch, outcome routing

resource-ledger-kit:
  values, canPay, pay, add, add/pay commands, snapshot

pressure-field-kit:
  channels, adjust, pressure tick, snapshot

orchard-world-kit:
  tree generation, apple seeding, nearest collect, bounds snapshot

construction-runtime-kit:
  catalog, build command, resource payment, built records

roster-runtime-kit:
  actors, roles, hire command, resource payment

inventory-runtime-kit:
  item list, equipped item, equip command

active-session-domain-kit:
  day, phase, player, pests, score, message, move, collect, clear, next-phase, session tick

world-canvas-render-kit:
  draw trees, apples, pests, player

html-interface-render-kit:
  draw HUD, draw generic screens, route clicks

smoke-fixture-kit:
  entry/play/apple proof
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
  market-command-dispatch-kit
  market-command-result-kit
  market-command-result-journal-kit
  transaction-history-kit
  inventory-purchase-intake-kit
  market-result-projection-kit
  exchange-renderer-authority-kit
  gamehost-market-diagnostics-kit
  market-fixture-replay-kit
```

## Files added this run

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/canvas-html-render-audit.md
.agent/gameplay-audit/market-command-replay-fixture.md
.agent/interaction-audit/screen-command-routing.md
.agent/trackers/2026-07-08T03-08-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-08-39-04-00.md
```

## Next safe ledge

Implement the Market Command Replay Fixture + Transaction Projection Gate as an additive, fixture-first slice.
