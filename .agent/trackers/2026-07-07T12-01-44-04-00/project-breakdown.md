# Zombie Orchard Project Breakdown

Run timestamp: 2026-07-07T12:01:44-04:00

Repo: `LuminaryLabs-Publish/ZombieOrchard`

Selected after checking the central `LuminaryLabs-Dev/LuminaryLabs` ledger and recent change history. The previous eligible Publish breakdown was `LuminaryLabs-Publish/HorrorCorridor`, so `ZombieOrchard` is the next repo in the active tracked cycle. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Summary

`ZombieOrchard` is a compact static browser orchard survival/economy shell. It already has the right kit-composed skeleton: a runtime, generated scoped interface domains, a project preset, game-domain kits, a canvas renderer, an HTML renderer, a minimal GameHost, and a Node smoke test.

The current blocker is still the Market path, but this pass narrows the next slice further than broad Market UI. The next cut should define the transaction envelope first, then project exchange command results into UI and smoke fixtures. This gives every sell, buy, and rejected market operation a stable result shape before worker assignment, save/outcome, or deterministic seed work expands the economy.

## Source shape inspected

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas()
-> createHtmlInterfaceRenderer()
-> requestAnimationFrame draw loop
-> engine.tick(1 / 60)
-> world.render(snapshot)
-> ui.render(snapshot)
-> window.GameHost
```

Relevant source files:

```txt
README.md
index.html
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/game-domains.js
src/kits/scoped-interface-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
```

## Current interaction loop

```txt
open index.html
-> src/boot.js imports src/start.js
-> src/start.js creates the game engine, world canvas renderer, and HTML interface renderer
-> createOrchardGame installs resource, pressure, orchard-world, construction, roster, inventory, generated interface, active-session, and composition kits
-> requestAnimationFrame calls engine.tick(1 / 60)
-> runtime advances frame/elapsed and ticks every domain
-> runtime snapshots every domain by id
-> world-canvas renders trees, apples, pests, and player from raw game snapshots
-> html-interface-renderer renders either active-session HUD or the active interface panel
-> GameHost exposes engine, getState, and tick
-> entry screen activates Play into active-session
-> active-session quick buttons run collect, clear, and next-phase commands
-> collect finds nearest apple, removes it, adds apples/money, adjusts pressure, updates score/message
-> construction can build by paying resource-ledger costs
-> roster can hire by paying money
-> inventory can equip an item
-> exchange screen is routed from active-session but only contains Back
-> pressure-field increments rowPressure and curse each tick
-> night phase can randomly spawn pests
-> pests chase the player and damage condition
-> ended active-session routes to outcome
```

## Target interaction loop

```txt
entry-domain-kit starts static shell
-> active-session-domain-kit remains the first playable collection loop
-> exchange-domain-kit exposes sell-apples, buy-basic-tool, buy-row-supply, and back
-> market-action-ui-kit projects prices, disabled reasons, and transaction cards
-> interface-composition-kit activates exchange actions and preserves nested command results
-> orchard-command-contract-kit normalizes exchange actions into typed commands
-> market-command-dispatch-kit routes typed commands to the economy layer
-> transaction-envelope-kit creates one canonical result record for accepted and rejected operations
-> price-snapshot-kit returns fixed starter price metadata
-> capacity-policy-kit validates starter resource, tool, and supply limits
-> orchard-economy-ledger-kit mutates resource-ledger values and appends transactions
-> transaction-history-kit exposes recent records for UI, outcome, save, and smoke
-> inventory-market-unlock-kit adds bought tools and supplies to inventory-runtime
-> economy-command-replay-kit records accepted commands and rejected diagnostics separately
-> market-result-projection-kit exposes latest result on composition and renderer snapshots
-> market-transaction-smoke-kit verifies zero-apple rejection, collect/sell, buy-tool, buy-supply, transaction history, and replay parity
-> worker-assignment remains deferred until Market result records are deterministic
```

## Recommended service loop

```txt
command request
-> normalize action id and payload
-> resolve current resource snapshot
-> resolve deterministic price snapshot
-> check capacity policy
-> check canPay or canSell policy
-> create transaction envelope with before snapshot
-> apply resource delta only when accepted
-> route purchase side effect into inventory when accepted
-> append accepted transaction or rejected transaction diagnostic
-> expose lastResult through interface-composition snapshot
-> expose transactionHistory through resource/economy snapshot
-> render exchange result and recent transaction cards
-> replay fixture consumes the same command envelopes
```

## Domains in use

### Runtime and host domains

```txt
kit-runtime
engine-context
event-log
command-router
command-result
nested-command-result
tick-dispatcher
snapshot-aggregator
subscription-bus
browser-host
GameHost
smoke-harness
```

### Interface domains

```txt
entry
session-select
run-setup
active-session
interrupt
construction
exchange
roster
inventory
knowledge
preferences
outcome
interface-composition
html-interface-renderer
```

### Game domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
world-canvas
```

### Market transaction cutover domains

```txt
exchange-action-surface
market-command-dispatch
orchard-command-contract
transaction-envelope
orchard-economy-ledger
transaction-history
price-snapshot
capacity-policy
inventory-market-unlock
market-result-projection
economy-command-replay
market-transaction-smoke
```

### Follow-on domains

```txt
seeded-random
orchard-input
orchard-harvest-interaction
orchard-building-effects
orchard-worker-assignment
worker-assignment-policy
orchard-tool-effects
orchard-day-night-phase
orchard-pest-pressure
orchard-save-runtime
orchard-codex-progression
orchard-outcome-summary
orchard-render-plan
settlement-parity
```

## Services surfaced by kits

| Kit | Services | Next gap |
| --- | --- | --- |
| `kit-runtime` | kit installation, domain registry, command routing, tick dispatch, event emission, snapshot aggregation, subscriptions | command metadata, command journal hooks, replay helpers, diagnostics, seeded reset |
| `scoped-interface-domain-kit` | screen state, action list normalization, selected index, field mutation, action activation, action-request events, snapshots | market action fields, disabled reasons, command result summary metadata |
| `interface-composition-kit` | active screen state, previous screen, transition, back, active-screen action activation, nested command dispatch, outcome auto-route | preserve nested command result, expose lastResult, expose rejected reasons, route market notifications |
| `resource-ledger-kit` | resource values, `canPay`, `pay`, `add`, pay/add commands, last marker, snapshots | transaction envelope, accepted/rejected records, capacity checks, typed market deltas, price snapshots |
| `pressure-field-kit` | channel state, pressure adjustment, rowPressure tick, curse tick, adjust command, snapshots | deterministic pressure thresholds, building/worker/tool modifiers, pest spawn requests |
| `orchard-world-kit` | tree grid generation, apple list, random apple seeding, nearest apple collection, apple reseeding, bounds snapshot | seeded apple positions, row ids, tree condition records, worker/building anchors |
| `construction-runtime-kit` | build catalog, resource payment, built records, build messages, snapshots | build transaction records, building effects, capacity/defense/production modifiers |
| `roster-runtime-kit` | actor list, role list, hire command, hire payment, roster messages, snapshots | hire transaction records, assignment commands, role output ticks, fatigue, morale, contribution |
| `inventory-runtime-kit` | item list, equipped item, equip command, snapshots | market purchase intake, first-tool auto-equip, tool stats, durability, harvest/clear modifiers |
| `active-session-domain-kit` | day/phase state, player movement, collect, clear, next-phase, pest spawn/chase, condition damage, score, messages, failure, snapshots | movement split, harvest split, phase split, pest split, outcome split, seeded spawning |
| `world-canvas-render-kit` | canvas resize and direct draw pass for trees, apples, pests, and player | render-plan input, buildings, workers, pressure overlays, tool radius, market alerts |
| `html-interface-render-kit` | DOM/HUD rendering, stat strip, quick commands, action buttons, generic cards, outcome summary | exchange branch, sell/buy controls, price labels, disabled reasons, result cards, transaction cards |
| `game-host-diagnostics-kit` | engine reference, getState, tick | restart, dispatch, getDiagnostics, getCommandJournal, getPriceSnapshot, getTransactionHistory, runSmoke |
| `smoke-fixture-kit` | entry screen, Play transition, active-session route, apple existence | zero-apple rejection, market sell, buy tool, buy supply, transaction history, replay parity |

## Kits identified

### Existing explicit kits

```txt
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
game-host-diagnostics-kit
smoke-fixture-kit
```

### Generated interface kits

```txt
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
```

### Next-cut kits

```txt
transaction-envelope-kit
market-result-projection-kit
market-action-ui-kit
market-command-dispatch-kit
orchard-command-contract-kit
orchard-economy-ledger-kit
transaction-history-kit
price-snapshot-kit
capacity-policy-kit
inventory-market-unlock-kit
economy-command-replay-kit
market-transaction-smoke-kit
```

### Follow-on kits

```txt
seeded-random-kit
orchard-input-kit
orchard-harvest-interaction-kit
orchard-building-effects-kit
orchard-worker-assignment-kit
worker-assignment-smoke-kit
orchard-tool-effects-kit
orchard-day-night-phase-kit
orchard-pest-pressure-kit
orchard-save-runtime-kit
orchard-codex-progression-kit
orchard-outcome-summary-kit
orchard-render-plan-kit
settlement-parity-smoke-kit
orchard-economy-smoke-fixture-kit
```

## Current gaps

- `exchange` exists as a screen, but the preset still only defines Back.
- `interface-composition-kit` dispatches nested commands without returning or snapshotting the nested result.
- `resource-ledger-kit` only exposes `values` and `last`; it has no durable transactions.
- `inventory-runtime-kit` can equip items, but it cannot accept market purchases.
- `html-interface-renderer` has generic panel/cards, but no exchange branch for prices, disabled reasons, results, or transactions.
- `GameHost` exposes only `engine`, `getState`, and `tick`.
- Smoke coverage only checks entry, Play transition, active-session, and apple existence.
- `Math.random` still drives apples and pests, so full replay remains nondeterministic.

## Recommended next slice

### Zombie Orchard Transaction Envelope + Exchange Result Projection Fixture Cutover

```txt
preserve static host and current playable loop
-> add transaction-envelope-kit as the first economy contract
-> define transaction fields: id, type, command, itemId, quantity, unitPrice, delta, before, after, accepted, reason, frame, elapsed
-> add rejected transaction diagnostics for zero inventory, insufficient funds, capacity overflow, unknown item, and unknown command
-> add price-snapshot-kit with deterministic starter prices: apple-sell, basic-tool-buy, row-supply-buy
-> add capacity-policy-kit with starter caps for apples, money, wood, scrap, tools, and supplies
-> upgrade resource-ledger-kit into orchard-economy-ledger behavior while preserving snapshot.values
-> expose snapshot.transactions and snapshot.lastTransaction
-> add market-command-dispatch-kit for SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT
-> add market-result-projection-kit so interface-composition snapshot includes lastResult
-> update exchange actions in orchard-preset to sell-apples, buy-basic-tool, buy-row-supply, and back
-> update html-interface-renderer exchange branch with prices, latest result, disabled reasons, and recent transaction cards
-> add inventory-market-unlock-kit for bought tools and supplies
-> auto-equip basic-tool only when current equipped item is still branch
-> extend GameHost with dispatch, getDiagnostics, getPriceSnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> extend tests/smoke.mjs with zero-apple rejection, collect/sell, buy-tool, buy-supply, transaction-history, and replay parity cases
-> defer worker assignment, save runtime, codex progression, and seeded pest spawning
```

## Acceptance targets

```txt
npm test passes
GameHost.getState() keeps resource-ledger.values intact for HUD compatibility
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false and reason=insufficient_inventory
Collect then Sell Apples appends an accepted market_sell transaction
Buy Basic Tool appends an accepted market_buy transaction and adds/equips the tool when branch is equipped
Buy Row Supply appends an accepted market_buy transaction and adds a supply/inventory record
Insufficient money returns accepted=false and reason=insufficient_funds
Capacity overflow returns accepted=false and reason=capacity_full
snapshot.transactions is fixture-readable without DOM timing assumptions
interface-composition snapshot exposes lastResult for accepted and rejected market actions
price snapshots are deterministic across equivalent fresh games
worker assignment remains explicitly out of scope
```

## Implementation notes

- Keep `resource-ledger.values` as the stable HUD surface. Add transaction records alongside it, not instead of it.
- Prefer one transaction envelope for accepted and rejected operations. Rejections should be testable records, not only UI strings.
- Keep market commands DOM-free. The HTML renderer should project snapshot state only.
- Do not split `active-session-domain-kit` yet. The market path is smaller and more visible.
- Do not start worker assignment until buy/sell/rejection history is deterministic.

## Validation notes

No runtime source code changed in this documentation run.

No local build or test was executed in this documentation run.
