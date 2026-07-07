# Zombie Orchard Project Breakdown — 2026-07-07T17:10:21-04:00

## Selection

Repository: `LuminaryLabs-Publish/ZombieOrchard`

Reason selected: the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed `ZombieOrchard` as the oldest eligible tracked non-Cavalry repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by rule.

Latest eligible timestamps checked:

```txt
ZombieOrchard    2026-07-07T15:59:24-04:00
HorrorCorridor   2026-07-07T16:09:54-04:00
TheOpenAbove     2026-07-07T16:21:09-04:00
AetherVale       2026-07-07T16:29:18-04:00
PhantomCommand   2026-07-07T16:30:00-04:00
PrehistoricRush  2026-07-07T16:40:29-04:00
MyCozyIsland     2026-07-07T16:49:08-04:00
IntoTheMeadow    2026-07-07T16:58:09-04:00
```

## Current read

`ZombieOrchard` is a static browser orchard survival/economy shell. The repo already has a kit runtime, generated scoped interface domains, a composition domain, game-domain kits, a canvas world renderer, an HTML interface renderer, and a minimal `window.GameHost` surface.

The next useful boundary is **Exchange Renderer Authority + Host Smoke Contract Cutover**. The Market route exists, but the `exchange` screen still only has `Back`, nested command results are discarded, the ledger has no transaction history, inventory has no purchase-intake command, the renderer has no exchange branch, and `GameHost` has no Market diagnostics helpers.

## Interaction loop

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> install resource, pressure, world, construction, roster, inventory, interface, active-session, and composition kits
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> tickable domains update pressure and session state
-> engine.snapshot()
-> world-canvas renders orchard state
-> html-interface-renderer renders HUD or active screen
-> click[data-action] routes through interface-composition.activate
-> click[data-command] routes directly to active-session
-> window.GameHost exposes engine, getState, and tick
```

Target Market loop:

```txt
active-session Market
-> exchange screen renders sell/buy/back actions
-> action creates MarketCommandEnvelope
-> MarketSourceSnapshot captures resources, inventory, prices, capacity, frame, elapsed
-> Market preflight accepts or rejects with stable reason
-> accepted command mutates ledger/inventory and appends transaction
-> rejected command records result without mutating values
-> interface-composition stores lastResult
-> MarketResultProjection feeds exchange renderer
-> GameHost exposes diagnostics and replay helpers
-> smoke fixture verifies replay without DOM timing assumptions
```

## Domains in use

Runtime: static-browser-host, boot-module, game-factory, kit-runtime, engine-context, domain-registry, command-router, event-emitter, tick-dispatcher, snapshot-aggregator, subscription-bus, GameHost, smoke-harness.

Interface: entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer.

Game: resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas.

Market authority needed next: exchange-action-surface, market-command-envelope, market-source-snapshot, market-preflight, market-command-dispatch, market-command-result, market-command-result-journal, transaction-envelope, transaction-history, price-snapshot, capacity-policy, orchard-economy-ledger, inventory-market-unlock, market-result-projection, exchange-renderer-authority, gamehost-market-diagnostics, market-smoke-contract.

Deferred: seeded-random, orchard-input, harvest-interaction, building-effects, worker-assignment, tool-effects, phase-authority, save-runtime, codex-progression, outcome-summary, render-plan, settlement-parity.

## Services and kits

| Kit | Services now | Gap |
| --- | --- | --- |
| kit-runtime | install kits, register domains, route commands, tick, events, snapshots, subscriptions | command metadata, diagnostics, replay helper |
| scoped-interface-domain-kit | screen state, actions, fields, metadata, select, set-field, activate, snapshots | exchange payloads, disabled reasons, result summaries |
| interface-composition-kit | active screen, previous screen, transition/back, nested dispatch, outcome routing | return/store nested result as lastResult |
| resource-ledger-kit | values, canPay, pay, add, commands, last marker, snapshots | transactions and lastTransaction |
| pressure-field-kit | pressure channels, adjust API, rowPressure tick, curse tick | deterministic thresholds |
| orchard-world-kit | tree grid, apples, collection, bounds | seeded positions and row ids |
| construction-runtime-kit | catalog, payment, built records, messages | build transaction records and effects |
| roster-runtime-kit | actors, roles, hire command, messages | assignment/output later |
| inventory-runtime-kit | items, equipped, equip, snapshots | purchase intake and supply records |
| active-session-domain-kit | day, phase, player, move, collect, clear, next-phase, messages | split later after Market authority |
| world-canvas-render-kit | canvas resize and orchard drawing | render-plan later |
| html-interface-render-kit | HUD, buttons, generic panels, cards | exchange branch and transaction cards |
| GameHost | engine, getState, tick | dispatch, diagnostics, Market snapshots, runSmoke |
| smoke-fixture-kit | entry/play/apple checks | Market replay and result checks |

Implemented kits: kit-runtime, scoped-interface-domain-kit, entry-domain-kit, session-select-domain-kit, run-setup-domain-kit, active-session-domain-kit, interrupt-domain-kit, construction-domain-kit, exchange-domain-kit, roster-domain-kit, inventory-domain-kit, knowledge-domain-kit, preferences-domain-kit, outcome-domain-kit, interface-composition-kit, resource-ledger-kit, pressure-field-kit, orchard-world-kit, construction-runtime-kit, roster-runtime-kit, inventory-runtime-kit, world-canvas-render-kit, html-interface-render-kit, game-host-diagnostics-surface, smoke-fixture-kit.

Next-cut kits: market-command-envelope-kit, market-command-contract-kit, market-source-snapshot-kit, market-preflight-kit, market-command-dispatch-kit, market-command-result-kit, market-command-result-journal-kit, transaction-envelope-kit, transaction-history-kit, price-snapshot-kit, capacity-policy-kit, orchard-economy-ledger-kit, inventory-market-unlock-kit, market-result-projection-kit, exchange-renderer-authority-kit, game-host-market-diagnostics-kit, market-smoke-contract-kit, market-fixture-replay-kit.

## Source facts

- `src/start.js` owns the browser loop and host surface.
- `src/game.js` installs all current kits.
- `src/kits/runtime.js` routes commands and snapshots domains.
- `src/kits/composition.js` dispatches nested commands but does not expose their result.
- `src/presets/orchard-preset.js` defines `exchange` with only `Back`.
- `src/kits/game-domains.js` keeps `resource-ledger` as values plus `last` only.
- `src/kits/game-domains.js` keeps `inventory-runtime` as items plus equipped only.
- `src/renderer/html-interface-renderer.js` has no exchange-specific branch.
- `tests/smoke.mjs` only validates entry, play transition, and apple existence.

## Next slice

```txt
Zombie Orchard Exchange Renderer Authority + Host Smoke Contract Cutover
```

Build order:

```txt
preserve current host, HUD, and canvas behavior
-> keep snapshot["resource-ledger"].values backward compatible
-> add MarketCommandEnvelope
-> add MarketSourceSnapshot
-> add SELL_APPLES, BUY_BASIC_TOOL, BUY_ROW_SUPPLY, GET_PRICE_SNAPSHOT, GET_CAPACITY_SNAPSHOT
-> add stable rejection reasons: insufficient_inventory, insufficient_funds, capacity_full, unknown_market_command
-> add deterministic price and capacity rows
-> extend resource-ledger with transactions and lastTransaction
-> extend inventory-runtime with tool and supply purchase intake
-> auto-equip first purchased tool only when equipped is branch
-> update exchange preset with sell, buy tool, buy supply, and back actions
-> update interface-composition to return/store nested result
-> add MarketResultProjection
-> add exchange renderer cards
-> expand GameHost diagnostics and runSmoke helpers
-> extend smoke fixture with DOM-free Market replay
-> keep worker assignment, save runtime, codex progression, seeded spawning, render-plan extraction, and settlement parity deferred
```

Acceptance targets:

```txt
npm test passes
HUD still reads resource-ledger.values
Market screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
zero-apple sell returns insufficient_inventory
collect then sell appends accepted market_sell transaction
buy tool appends accepted market_buy transaction and adds inventory item
first purchased tool auto-equips only from branch
buy row supply appends accepted market_buy transaction and adds supply record
insufficient money returns insufficient_funds
capacity overflow returns capacity_full
price snapshot is deterministic across fresh games
capacity snapshot is deterministic across fresh games
interface-composition snapshot exposes lastResult
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
exchange renderer uses snapshot only
GameHost exposes Market diagnostics and replay helpers
Market fixture runs without DOM timing assumptions
```

## Validation status

```txt
runtime source changed: no
local build run: no
local smoke run: no
reason: documentation-only breakdown run
```
