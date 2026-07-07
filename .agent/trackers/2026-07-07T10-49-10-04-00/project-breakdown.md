# Zombie Orchard Project Breakdown

**Run timestamp:** `2026-07-07T10:49:10-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Selected after:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`ZombieOrchard` is still the correct next repo in the tracked Publish rotation because the central ledger most recently documented `HorrorCorridor`, and Cavalry remains excluded. This pass keeps the same visible priority, the Market must become playable, but narrows the first implementation seam further into **Market Action Dispatch + Ledger Snapshot Fixture**.

The immediate gap is not worker assignment yet. The exchange screen currently has no sell/buy actions, `resource-ledger-kit` still exposes only values plus a `last` marker, and `interface-composition-kit` dispatches action commands without returning or surfacing domain command results. The next implementation should make Market actions visible, route those actions through a deterministic market command facade, record each transaction, and expose ledger snapshots that current HUD code can still read.

## Selection reason

The tracked Publish rotation most recently completed `LuminaryLabs-Publish/HorrorCorridor`. The next eligible repo in the repeating Publish cycle is `LuminaryLabs-Publish/ZombieOrchard`. `LuminaryLabs-Publish/TheCavalryOfRome` was not considered because it is explicitly excluded.

## Current interaction loop

```txt
open index.html
-> src/start.js creates createOrchardGame(), world canvas renderer, and HTML interface renderer
-> src/game.js installs runtime, resource, pressure, orchard-world, construction, roster, inventory, interface, active-session, and composition kits
-> requestAnimationFrame calls engine.tick(1 / 60)
-> engine ticks all domains and snapshots all domains
-> world-canvas renders trees, apples, pests, and player from raw snapshots
-> html-interface-renderer renders active-session HUD or current interface screen
-> window.GameHost exposes engine, getState, and tick
-> entry screen routes Play to active-session
-> active-session quick commands move, collect, clear, and next-phase
-> collect removes nearest apple, adds apples and money, adjusts pressure, updates score, and sets a message
-> active-session routes to construction, exchange, roster, inventory, knowledge, pause, or outcome
-> construction can call construction-runtime build and spend resources
-> roster can hire an actor if money is available
-> inventory can equip an item
-> exchange screen currently only offers Back
-> night phase can randomly spawn pests
-> pests chase the player and damage condition
-> ended session routes to outcome through interface-composition
```

## Target interaction loop

```txt
entry-domain-kit starts static shell
-> active-session-domain-kit collects apples and moves player
-> market-action-ui-kit renders sell/buy actions on exchange-domain-kit
-> interface-composition-kit activates a Market action and captures the command result
-> orchard-command-contract-kit normalizes the action into SELL_APPLES, BUY_TOOL, BUY_SUPPLY, or GET_PRICE_SNAPSHOT
-> price-snapshot-kit supplies deterministic starter prices
-> capacity-policy-kit checks permissive starter capacity and rejected overflow states
-> orchard-economy-ledger-kit applies resource deltas and appends durable transaction records
-> transaction-history-kit exposes recent records for UI cards and smoke snapshots
-> inventory-market-unlock-kit routes purchased tool/supply records into inventory-runtime-kit
-> html-interface-renderer shows resources, prices, disabled reasons, and recent transaction cards
-> GameHost exposes state, diagnostics, command journal, price snapshot, and market smoke helpers
-> market-transaction-smoke-kit replays collect, sell, buy, insufficient-funds, and transaction-history cases
-> worker-assignment remains deferred until market transaction history is visible and stable
```

## Domains in use

### Runtime and host domains

```txt
kit-runtime
engine-context
event-log
command-router
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

### Market cutover domains

```txt
market-action-ui
market-command-dispatch
orchard-command-contract
orchard-economy-ledger
transaction-history
price-snapshot
capacity-policy
inventory-market-unlock
economy-command-replay
market-transaction-smoke
```

### Follow-on economy and survival domains

```txt
seeded-random
orchard-input
orchard-harvest-interaction
building-effects
worker-assignment
tool-effects
day-night-phase
pest-pressure
save-runtime
codex-progression
outcome-summary
render-plan
settlement-parity
```

## Services surfaced by kits

| Kit | Current services | Next services needed |
| --- | --- | --- |
| `kit-runtime` | installs kits, registers domains, routes commands, ticks domains, emits events, snapshots state, notifies subscribers | command metadata, replay helper, diagnostics, seeded reset, command journal hooks |
| `scoped-interface-domain-kit` | screen state, actions, selected index, fields, metadata, `select`, `set-field`, `activate`, action-request events, snapshots | market quantities, disabled reasons, command result summaries, transaction action metadata |
| `interface-composition-kit` | active screen, previous screen, transition, back, current-screen action activation, action command dispatch, outcome auto-routing | return nested command result, persist last action result, surface rejected reasons, route market command notifications |
| `resource-ledger-kit` | resource values, `canPay`, `pay`, `add`, pay/add commands, `last` marker, snapshots | transaction history, typed deltas, capacity checks, market buy/sell types, settlement deltas, immutable snapshot-friendly records |
| `pressure-field-kit` | pressure channels, `adjust`, row pressure ticking, curse ticking, adjust command, snapshots | deterministic threshold events, building/tool/worker modifiers, pest spawn requests |
| `orchard-world-kit` | tree grid, apple list, random apple seeding, nearest-apple collection, bounds snapshots | seeded apples, row IDs, placement anchors, tree condition records, worker target points |
| `construction-runtime-kit` | build catalog, payment through ledger, built records, build messages, snapshots | build transaction records, capacity effects, defense effects, production effects, placement policy |
| `roster-runtime-kit` | actor list, roles, hire payment, hire command, roster messages, snapshots | assignment commands, hire transaction records, role output ticks, morale/fatigue, defense/settlement contribution |
| `inventory-runtime-kit` | item list, equipped item, equip command, snapshots | market purchase intake, auto-equip first bought tool, tool stats, durability, harvest and clear modifiers |
| `active-session-domain-kit` | day/phase state, player movement, collect, clear, next-phase, random pest spawning, pest chase, condition damage, score/message, ended flag | split movement/harvest/phase/pest/outcome services, route collect through command contract, deterministic pest spawning, modifier consumption |
| `world-canvas-render-kit` | direct tree/apple/pest/player canvas draw pass | renderer-neutral render plan, buildings/workers, pressure overlays, tool radius, market alert projections |
| `html-interface-render-kit` | HUD stat strip, active-session quick commands, generic screen panels, cards for built/roster/items/outcome, click routing | exchange sell/buy controls, recent transaction cards, price labels, disabled reasons, diagnostics panel |
| `game-host-diagnostics-kit` | `engine`, `getState`, `tick` | `restart({ seed })`, `dispatch(command)`, `getDiagnostics()`, `getCommandJournal()`, `getPriceSnapshot()`, `runSmoke()` |
| `smoke-fixture-kit` | entry screen, Play transition, active-session presence, apple existence | deterministic collect, market sell, market buy, insufficient funds, transaction history, replay parity |

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

### Next cutover kits

```txt
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
settlement-parity-smoke-kit
orchard-save-runtime-kit
orchard-codex-progression-kit
orchard-outcome-summary-kit
orchard-render-plan-kit
orchard-economy-smoke-fixture-kit
```

## Key findings

- `src/game.js` is already thin and composes all active kits from the preset and runtime factory.
- `src/kits/runtime.js` has a simple `engine.command(domainId, type, payload)` contract that returns domain command results, but there is no central journal or command metadata yet.
- `src/kits/composition.js` dispatches `action.command` through `ctx.engine.command(...)` but discards the nested result, so Market sell/buy failures would not be visible without a composition upgrade.
- `src/presets/orchard-preset.js` defines `exchange` with only a Back action. This is the clearest player-visible gap.
- `resource-ledger-kit` currently stores only resource values and `last`, which is enough for the HUD but not enough for market history, replay, save, outcome, or worker/building economics.
- `orchard-world-kit` and `active-session-domain-kit` still use `Math.random`, so deterministic replay requires seeded streams soon, but market UI can start with deterministic fixed prices before fully replacing random apple/pest behavior.
- `html-interface-renderer.js` has generic card rendering and active screen panels, making transaction cards a low-risk visible addition once ledger snapshots expose `transactions`.
- `tests/smoke.mjs` only proves entry, Play, active-session, and apple existence. It should become the home for DOM-free market transaction smoke.

## Recommended next slice

### Zombie Orchard Market Action Dispatch + Ledger Snapshot Fixture Cutover

```txt
preserve static host and current playable loop
-> add price-snapshot-kit with fixed starter prices for apples, basic-tool, and row-supply
-> add capacity-policy-kit with starter capacities for apples, money, wood, scrap, tools, and supplies
-> upgrade resource-ledger-kit into orchard-economy-ledger-kit behavior without breaking snapshot.values reads
-> keep snapshot.values as the current HUD-compatible resource surface
-> add snapshot.transactions as newest-first or oldest-first durable records with id, type, time/frame, before, delta, after, itemId, quantity, price, accepted, and reason
-> add orchard-command-contract-kit for SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT
-> add market-command-dispatch-kit as the narrow action facade used by exchange actions
-> update orchard-preset exchange actions: sell-apples, buy-basic-tool, buy-row-supply, back
-> update interface-composition-kit so nested command results are returned and stored as lastResult
-> update html-interface-renderer exchange screen with prices, disabled reasons, and recent transaction cards
-> route bought basic tool and row supply into inventory-runtime-kit through inventory-market-unlock-kit
-> auto-equip the first bought tool only if the player still has the starter branch equipped
-> extend GameHost with dispatch, getDiagnostics, getCommandJournal, getPriceSnapshot, and runSmoke
-> extend tests/smoke.mjs with collect/sell/buy/insufficient-funds/transaction-history smoke
-> defer worker assignment until these market records are visible and deterministic
```

## Acceptance target

```txt
npm test passes
GameHost.getState() still returns resource-ledger.values for current HUD compatibility
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples rejects cleanly when apples are 0 and records or exposes a rejection reason
Collect then Sell Apples mutates apples and money through a market_sell transaction
Buy Basic Tool mutates money and inventory through a market_buy transaction
Buy Row Supply mutates money and inventory/supplies through a market_buy transaction
Resource snapshots expose transactions without breaking existing values reads
Composition stores and exposes the latest nested command result
Price snapshot is deterministic across equivalent fresh games
Market transaction smoke runs without DOM timing assumptions
Worker assignment remains out of this slice
```

## Product direction

The next visible product step should make the Market feel real in under three minutes:

```txt
collect apples
-> open Market
-> sell apples for money
-> buy a basic tool
-> see the tool in Inventory
-> see recent transaction cards
-> return to active session with the economy visibly changed
```

After that works, move into tool effects, storage capacity, then worker assignment.

## Files reviewed

```txt
src/game.js
src/kits/runtime.js
src/kits/game-domains.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/presets/orchard-preset.js
src/start.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
package.json
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo ledger
```

## Change scope

This was a documentation-only breakdown run. No runtime source code was changed and no local build/test run was executed.
