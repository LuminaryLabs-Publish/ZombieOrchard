# Zombie Orchard Project Breakdown — 2026-07-07T19:51:43-04:00

## Plan ledger

**Goal:** Refresh the internal docs for `LuminaryLabs-Publish/ZombieOrchard`, the oldest eligible non-Cavalry Publish repo in the central rotation, and define the next implementation slice for the Nexus Engine / Realtime project.

**Checklist**

- [x] Read the central Publish ledger before selecting the repo.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Worked on exactly one repo: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read README, package scripts, runtime entrypoint, game factory, runtime kit, composition kit, scoped interface kit, game-domain kits, preset, renderers, and smoke test.
- [x] Identified the current interaction loop.
- [x] Identified all domains in use.
- [x] Identified all services the kits offer.
- [x] Identified implemented, next-cut, and deferred kits.
- [x] Updated `.agent/README.md`.
- [x] Updated `.agent/kit-registry.json`.
- [x] Added this timestamped tracker.
- [x] Logged findings in `LuminaryLabs-Dev/LuminaryLabs`.

## Selection

`ZombieOrchard` was selected because its central Publish ledger timestamp was the oldest eligible non-Cavalry timestamp in the current rotation.

```txt
ZombieOrchard    2026-07-07T18:28:54-04:00
HorrorCorridor   2026-07-07T18:41:07-04:00
TheOpenAbove     2026-07-07T18:49:32-04:00
AetherVale       2026-07-07T19:01:37-04:00
PhantomCommand   2026-07-07T19:08:52-04:00
PrehistoricRush  2026-07-07T19:18:58-04:00
MyCozyIsland     2026-07-07T19:29:28-04:00
IntoTheMeadow    2026-07-07T19:42:05-04:00
```

## Current read

`ZombieOrchard` is a static browser orchard survival/economy shell. It already composes a kit runtime, scoped interface domains, interface composition, game-domain kits, a canvas world renderer, an HTML interface renderer, and a tiny `window.GameHost`.

The active seam remains Market authority. The `exchange` screen exists, but it only exposes `Back`. Nested command dispatch in `interface-composition` calls the target domain but drops the nested result. `resource-ledger` has no transaction history. `inventory-runtime` only supports `equip`. The HTML renderer has no `exchange` branch. `GameHost` exposes only `engine`, `getState`, and `tick`. The smoke test proves entry/play/apple presence only.

## Interaction loop

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(document.querySelector("#world"))
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> kit-runtime clamps dt, increments elapsed/frame, clears events
-> tickable domains update pressure and active-session state
-> engine.snapshot() aggregates every domain snapshot
-> world-canvas renders orchard-world and active-session from snapshot
-> html-interface-renderer renders active-session HUD or a generic screen panel
-> click[data-action] routes through interface-composition.activate
-> click[data-command] routes directly to active-session
-> window.GameHost exposes engine/getState/tick
```

## Gameplay loop

```txt
entry
-> Play transitions to active-session
-> active-session HUD shows day, phase, money, apples, wood, pressure, condition
-> Collect calls orchard-world.collectNear and resource-ledger.add
-> Clear resolves nearby row cleanup
-> Next Phase toggles day/night and advances day on morning
-> session end routes to outcome
-> Market opens exchange screen, but exchange has only Back
```

## Target Market loop

```txt
active-session Market action
-> exchange screen exposes Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
-> exchange action creates MarketCommandEnvelope
-> MarketSourceSnapshot captures resources, inventory, prices, capacity, frame, elapsed
-> market preflight returns accepted/rejected with stable reason
-> accepted sell appends market_sell transaction and mutates resource-ledger
-> accepted buy appends market_buy transaction and routes purchase intake into inventory-runtime
-> rejected command appends command result without mutating resources or inventory
-> interface-composition stores and returns nested command result
-> MarketProjection exposes latest result, price rows, capacity rows, recent transactions, and disabled reasons
-> exchange renderer renders from snapshots only
-> GameHost exposes dispatch, diagnostics, price/capacity snapshots, transactions, command journal, and runSmoke
-> DOM-free Market replay smoke proves accepted/rejected parity
```

## Domains in use

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime,
  engine-context, domain-registry, command-router, event-emitter, tick-dispatcher,
  snapshot-aggregator, subscription-bus, browser-animation-loop, GameHost, smoke-harness

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange,
  roster, inventory, knowledge, preferences, outcome, interface-composition,
  html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime,
  inventory-runtime, active-session, world-canvas

market-authority-next:
  exchange-action-surface, market-command-envelope, market-command-contract,
  market-source-snapshot, market-price-source, market-capacity-policy, market-preflight,
  market-command-dispatch, market-command-result, market-command-result-journal,
  transaction-envelope, transaction-history, orchard-economy-ledger,
  inventory-purchase-intake, market-result-projection, exchange-renderer-authority,
  gamehost-market-diagnostics, market-smoke-contract, market-fixture-replay

deferred:
  seeded-random, orchard-input, harvest-interaction, building-effects, worker-assignment,
  tool-effects, phase-authority, save-runtime, codex-progression, outcome-summary,
  render-plan, settlement-parity
```

## Services that kits offer

```txt
kit-runtime:
  install kits; create domains; route commands; tick domains; emit events; aggregate snapshots; notify subscribers

scoped-interface-domain-kit:
  create screen domains; normalize preset actions; store selectedIndex/fields/meta; handle select/set-field/activate; snapshot screen state

interface-composition-kit:
  track active/previous screen; transition/back; activate current screen actions; dispatch nested commands; route ended sessions to outcome

resource-ledger-kit:
  store resource values; canPay/pay/add resources; expose pay/add commands; snapshot values and last marker

pressure-field-kit:
  store pressure channels; adjust channels; tick row pressure and curse; expose adjust command; snapshot channels

orchard-world-kit:
  generate tree grid; seed apples; collect nearest apple; reseed apples; snapshot trees/apples/bounds

construction-runtime-kit:
  expose build catalog; pay resource costs; append built item records; store build messages; snapshot catalog/built/message

roster-runtime-kit:
  expose actors and roles; pay hire cost; append hired actors; store roster messages; snapshot actors/roles/message

inventory-runtime-kit:
  store inventory items; equip item id; expose equip command; snapshot items/equipped

active-session-domain-kit:
  store day, phase, player, row threats, score, message, ended; activate session actions; move player; collect; clear; advance phase; tick session state; snapshot session state/actions

world-canvas-render-kit:
  resize canvas; render background; render trees; render apples; render row threats; render player

html-interface-render-kit:
  route action clicks; route direct session commands; render HUD stats; render active-session controls; render generic panels; render built/roster/inventory/outcome cards

smoke-fixture-kit:
  instantiate game without DOM; assert entry screen; assert Play transition; assert active-session route; assert orchard apples exist
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
  market-command-contract-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-source-snapshot-kit
  market-preflight-kit
  market-command-dispatch-kit
  market-command-result-kit
  market-command-result-journal-kit
  transaction-envelope-kit
  transaction-history-kit
  orchard-economy-ledger-kit
  inventory-purchase-intake-kit
  purchase-intake-contract-kit
  market-result-projection-kit
  exchange-renderer-authority-kit
  interface-nested-result-kit
  gamehost-market-diagnostics-kit
  market-smoke-contract-kit
  market-fixture-replay-kit

deferred:
  seeded-random-kit
  orchard-input-kit
  harvest-interaction-kit
  building-effect-kit
  worker-assignment-kit
  tool-effect-kit
  phase-authority-kit
  save-runtime-kit
  codex-progression-kit
  outcome-summary-kit
  render-plan-kit
  settlement-parity-kit
```

## Source-backed blockers

```txt
src/presets/orchard-preset.js:
  exchange actions only include Back.
  no sell/buy action IDs exist yet.

src/kits/composition.js:
  nested action.command result is discarded.
  snapshot has no lastResult.

src/kits/game-domains.js:
  resource-ledger has no transactions or lastTransaction.
  inventory-runtime has no purchase intake.
  active-session owns collect/clear/phase/session behaviors inline.
  orchard-world uses Math.random, so economy replay is not deterministic yet.

src/renderer/html-interface-renderer.js:
  exchange has no custom Market projection branch.

src/start.js:
  GameHost only exposes engine/getState/tick.

tests/smoke.mjs:
  only proves entry/play/apple presence.
```

## Recommended next slice

```txt
Zombie Orchard Market Runtime Command Gate + Transaction Projection Fixture Lock
```

## Build order

```txt
1. Preserve current static host, HUD, canvas render, active-session commands, and snapshot["resource-ledger"].values compatibility.
2. Add stable Market action IDs: sell-apples, buy-basic-tool, buy-row-supply, back.
3. Add market command constants: SELL_APPLES, BUY_BASIC_TOOL, BUY_ROW_SUPPLY, GET_PRICE_SNAPSHOT, GET_CAPACITY_SNAPSHOT.
4. Add deterministic price rows and capacity rows.
5. Add MarketCommandEnvelope factory with id/type/source/itemId/quantity/frame/elapsed/rawActionId.
6. Add MarketSourceSnapshot from resource-ledger, inventory-runtime, price rows, capacity rows, frame, and elapsed.
7. Add preflight reasons: insufficient_inventory, insufficient_funds, capacity_full, unknown_market_command.
8. Add MarketCommandResult records with accepted, reason, message, before, after, and transactionId.
9. Extend resource-ledger with appendTransaction, transactions, lastTransaction, and sell/buy helper services.
10. Extend inventory-runtime with purchase intake for basic tool and row supply.
11. Auto-equip first purchased basic tool only when currently equipped item is branch.
12. Return nested command results from interface-composition.activate and expose lastResult in its snapshot.
13. Add MarketResultProjection with price rows, capacity rows, latest result, latest transaction, recent transactions, and disabled reasons.
14. Add an exchange renderer branch driven only by snapshots.
15. Extend GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke.
16. Extend smoke tests with zero-apple rejection, collect-then-sell, buy-tool, buy-supply, insufficient funds, capacity full, deterministic price/capacity, and replay parity.
```

## Validation

```txt
Performed:
  read central ledger, repo metadata, README, package.json, start/game modules, runtime/composition/scoped interface/game-domain kits, preset, renderers, smoke test, and existing .agent docs.

Not performed:
  local checkout, npm install, npm test, browser route test, GitHub Actions rerun, runtime source edit.
```
