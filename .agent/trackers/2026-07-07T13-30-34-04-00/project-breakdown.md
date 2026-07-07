# Zombie Orchard Project Breakdown

**Run timestamp:** `2026-07-07T13:30:34-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Default branch:** `main`

**Selected because:** the central Publish ledger most recently documented `LuminaryLabs-Publish/IntoTheMeadow` at `2026-07-07T13:21:30-04:00`. With `LuminaryLabs-Publish/TheCavalryOfRome` excluded, `LuminaryLabs-Publish/ZombieOrchard` was the oldest eligible tracked Publish repo by latest ledger timestamp among the reviewed non-Cavalry repos.

## Source files reviewed

```txt
README.md
src/start.js
src/game.js
src/kits/runtime.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
```

## Current read

`ZombieOrchard` is a standalone static browser orchard survival / economy shell. It already has the correct high-level shape for a Nexus-style game: a thin static host, a kit runtime, scoped interface domains, a composition kit, game-domain kits, a world-canvas renderer, an HTML interface renderer, a small `GameHost` surface, and a Node smoke test.

The product loop is visible, but the market loop is still incomplete. `exchange` exists as a screen, but the preset only defines Back. `resource-ledger-kit` supports `values`, `canPay`, `pay`, `add`, and `last`, but does not emit canonical transactions. `interface-composition-kit` can dispatch nested commands from screen actions, but it currently discards the nested command result and only returns a transition or generic accepted result. `html-interface-renderer` has no exchange-specific branch for prices, disabled reasons, result cards, or transaction history. `GameHost` exposes only `engine`, `getState`, and `tick`.

This pass keeps the visible Market as the next product cut, but tightens the first implementation seam into **Market Command Result Journal + Price / Capacity Snapshot Fixture**. The first source change should make Market commands explicit, fixture-readable, and replayable before worker assignment, save runtime, codex progression, seeded pest spawning, or broad renderer extraction.

## Interaction loop

### Current runtime loop

```txt
open index.html
-> src/boot.js imports src/start.js
-> src/start.js creates createOrchardGame()
-> createWorldCanvas(document.querySelector("#world"))
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> world.render(snapshot)
-> ui.render(snapshot)
-> window.GameHost exposes engine, getState, and tick
```

### Current game kit loop

```txt
createOrchardGame(orchardPreset)
-> createInterfaceDomainKits(preset.interface)
-> remove generated active-session interface kit
-> install resource-ledger-kit
-> install pressure-field-kit
-> install orchard-world-kit
-> install construction-runtime-kit
-> install roster-runtime-kit
-> install inventory-runtime-kit
-> install generated interface kits
-> install active-session-domain-kit
-> install interface-composition-kit
-> command/tick/snapshot through createKitRuntime
```

### Current player loop

```txt
entry screen
-> Play transitions to active-session
-> active-session HUD shows day, phase, money, apples, wood, pressure, condition
-> Collect attempts nearest apple collection
-> Clear attempts nearest pest clearing
-> Next Phase toggles day/night
-> Build opens construction
-> Market opens exchange
-> Roster opens roster
-> Inventory opens inventory
-> Codex opens knowledge
-> Pause opens interrupt
-> night phase can spawn random pests
-> pests chase and damage the player
-> ended session routes to outcome
```

### Target Market command loop

```txt
active-session
-> Market opens exchange
-> exchange shows price snapshot, capacity snapshot, current resources, last result, and recent transactions
-> Sell Apples normalizes to SELL_APPLES
-> Buy Basic Tool normalizes to BUY_TOOL basic-tool
-> Buy Row Supply normalizes to BUY_SUPPLY row-supply
-> market-command-dispatch-kit routes the typed command
-> price-snapshot-kit provides deterministic unit pricing
-> capacity-policy-kit validates resource/tool/supply limits
-> transaction-envelope-kit records accepted or rejected result
-> orchard-economy-ledger-kit mutates resource-ledger.values only when accepted
-> inventory-market-unlock-kit adds bought tool/supply records only when accepted
-> market-command-result-journal-kit stores accepted and rejected records
-> market-result-projection-kit exposes lastResult to interface-composition snapshots
-> html-interface-renderer projects latest result and transaction cards
-> tests/smoke.mjs verifies zero-inventory rejection, collect/sell, buy-tool, buy-supply, price/capacity snapshots, and replay parity
```

## Domains in use

### Runtime domains

```txt
static-browser-host
kit-runtime
engine-context
command-router
command-result
nested-command-result
event-log
tick-dispatcher
snapshot-aggregator
subscription-bus
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
exchange-action-surface
orchard-command-contract
market-command-dispatch
market-command-result
market-command-result-journal
transaction-envelope
transaction-history
price-snapshot
capacity-policy
orchard-economy-ledger
inventory-market-unlock
market-result-projection
market-fixture-replay
market-smoke-fixture
```

### Deferred follow-on domains

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

## Services the current kits offer

### `kit-runtime`

Source: `src/kits/runtime.js`

Provides:

```txt
createKitRuntime({ kits })
ctx.frame, ctx.elapsed, ctx.delta
ctx.events
ctx.emit(type, payload)
engine.addKit(kit)
engine.command(domainId, type, payload)
engine.tick(delta)
engine.snapshot()
engine.subscribe(listener)
per-domain tick dispatch
per-domain snapshot aggregation
```

Needs next:

```txt
command metadata
command journal hook
fixture command replay
reset/recreate helper
structured diagnostics
```

### `scoped-interface-domain-kit`

Source: `src/kits/scoped-interface-domains.js`

Provides:

```txt
screen identity
screen title / description
selected index
screen fields
screen metadata
action normalization
select command
set-field command
activate command
actionRequested event emission
screen snapshot
```

Needs next:

```txt
market quantity fields
market action metadata
price labels
disabled reason fields
lastResult projection support
transaction summary metadata
```

### `interface-composition-kit`

Source: `src/kits/composition.js`

Provides:

```txt
active screen state
previous screen state
transition command
back command
active screen action activation
nested command dispatch from action.command
automatic outcome routing when active-session ends
activeSnapshot projection
```

Needs next:

```txt
preserve nested command result
project lastResult
surface rejection reason
route market notification data
append command journal entries
```

### `resource-ledger-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
resource values
canPay(cost)
pay(cost)
add(values)
pay command
add command
last marker
HUD-compatible snapshot.values
```

Needs next:

```txt
transaction envelope
accepted transaction records
rejected transaction diagnostics
price-aware sell/buy operations
capacity checks
stable transaction ids
lastTransaction
transaction history snapshot
```

### `pressure-field-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
pressure channels
adjust(id, amount)
rowPressure tick increase
curse tick increase
adjust command
snapshot channels
```

Needs later:

```txt
seeded pest pressure events
row-local pressure
building modifiers
worker modifiers
tool modifiers
threshold event records
```

### `orchard-world-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
tree grid generation
apple list
random apple seeding
nearest apple collection
bounds snapshot
```

Needs later:

```txt
seeded random
row ids
tree condition records
worker target points
building placement anchors
fixture replay parity
```

### `construction-runtime-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
build catalog
build command
resource-ledger payment through pay(cost)
built item records
build messages
snapshot catalog and built list
```

Needs later:

```txt
build transaction records
placement policy
capacity effects
worker slots
production effects
defense effects
```

### `roster-runtime-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
actor list
role list
hire command
resource-ledger payment through pay({ money })
roster messages
snapshot actors and roles
```

Needs later:

```txt
hire transaction records
assignment commands
role outputs
fatigue
morale
settlement contribution
defense contribution
```

### `inventory-runtime-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
item list
equipped item
equip command
inventory snapshot
```

Needs next:

```txt
market purchase intake
tool purchase record
supply purchase record
first bought tool auto-equip when equipped item is branch
tool stats
supply stack counts
```

### `active-session-domain-kit`

Source: `src/kits/game-domains.js`

Provides:

```txt
day state
phase state
player state
move command
collect command
clear command
next-phase command
night pest spawning
pest chase
player condition damage
session ended flag
score and message state
snapshot actions
```

Needs later:

```txt
movement split
harvest split
phase split
pest split
outcome split
deterministic pest spawning
tool/building/worker modifiers
```

### `world-canvas-render-kit`

Source: `src/renderer/world-canvas.js`

Provides:

```txt
canvas resize
tree rendering
apple rendering
pest rendering
player rendering
```

Needs later:

```txt
render-plan input
building rendering
worker rendering
pressure overlays
tool radius draw
market alert draw
```

### `html-interface-render-kit`

Source: `src/renderer/html-interface-renderer.js`

Provides:

```txt
HUD stat strip
active-session command buttons
generic screen panels
built cards
roster cards
inventory cards
outcome cards
click-to-command routing
```

Needs next:

```txt
exchange sell/buy controls
price snapshot display
capacity snapshot display
latest result card
rejection reason card
recent transaction cards
```

### `game-host-diagnostics-kit`

Source: `src/start.js`

Provides:

```txt
window.GameHost.engine
window.GameHost.getState()
window.GameHost.tick(dt)
```

Needs next:

```txt
dispatch(domain, type, payload)
getDiagnostics()
getPriceSnapshot()
getCapacitySnapshot()
getTransactionHistory()
getCommandJournal()
runSmoke()
```

### `smoke-fixture-kit`

Source: `tests/smoke.mjs`

Provides:

```txt
entry screen smoke
play transition smoke
active-session smoke
apple existence smoke
```

Needs next:

```txt
zero apple sell rejection
collect then sell accepted transaction
buy tool accepted transaction
buy supply accepted transaction
insufficient funds rejection
capacity full rejection
price snapshot stability
capacity snapshot stability
transaction history fixture
command replay parity
```

## Kit inventory

### Implemented or source-backed kits

```txt
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
```

### Immediate target kits

```txt
market-command-contract-kit
market-command-dispatch-kit
market-command-result-kit
market-command-result-journal-kit
transaction-envelope-kit
transaction-history-kit
price-snapshot-kit
capacity-policy-kit
orchard-economy-ledger-kit
market-result-projection-kit
market-action-ui-kit
inventory-market-unlock-kit
market-fixture-replay-kit
market-command-smoke-kit
```

### Deferred kits

```txt
seeded-random-kit
orchard-input-kit
harvest-interaction-kit
building-effect-kit
worker-assignment-kit
worker-output-kit
tool-effect-kit
day-night-phase-kit
pest-pressure-kit
save-runtime-kit
codex-progression-kit
outcome-summary-kit
render-plan-kit
settlement-parity-smoke-kit
```

## Gaps and risks

```txt
exchange screen has no sell/buy actions yet
nested action.command results are discarded by interface-composition-kit
resource-ledger-kit cannot yet distinguish accepted/rejected economy outcomes as durable records
resource-ledger snapshot must preserve values for existing HUD compatibility
inventory-runtime-kit has no purchase intake command
html-interface-renderer has no market-specific renderer branch
tests/smoke.mjs does not exercise market, transactions, command replay, or result projection
active-session and orchard-world still use Math.random, so seeded pest/apple parity must stay out of the immediate Market slice
```

## Recommended next slice

```txt
Zombie Orchard Market Command Result Journal + Price / Capacity Snapshot Fixture Cutover
```

## Build order

```txt
preserve static host and current playable loop
-> keep resource-ledger.values intact for HUD compatibility
-> add market-command-contract-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, GET_PRICE_SNAPSHOT, and GET_CAPACITY_SNAPSHOT
-> add price-snapshot-kit with deterministic starter prices for apple-sell, basic-tool-buy, and row-supply-buy
-> add capacity-policy-kit with starter caps for apples, tools, supplies, money, wood, and scrap
-> add transaction-envelope-kit as the canonical accepted/rejected economy record
-> define TransactionEnvelope fields: id, type, command, itemId, quantity, unitPrice, delta, before, after, accepted, reason, frame, elapsed
-> add market-command-result-kit to wrap transaction, price, capacity, and inventory side effects
-> add market-command-result-journal-kit with accepted and rejected views
-> upgrade resource-ledger-kit or add orchard-economy-ledger-kit while preserving the old canPay/pay/add services
-> expose resource-ledger.transactions and resource-ledger.lastTransaction
-> add market-command-dispatch-kit for exchange action commands
-> update orchard-preset exchange actions to sell-apples, buy-basic-tool, buy-row-supply, and back
-> update interface-composition-kit so nested action.command results are returned and projected as lastResult
-> add market-result-projection-kit on the interface-composition snapshot
-> add inventory-market-unlock-kit by extending inventory-runtime-kit with add-purchase or intake-market-purchase
-> auto-equip basic-tool only when current equipped item is still branch
-> update html-interface-renderer exchange branch with price snapshot, capacity snapshot, latest result, disabled reasons, and recent transaction cards
-> extend window.GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> extend tests/smoke.mjs with zero-apple rejection, collect/sell, buy-tool, buy-supply, insufficient-funds rejection, capacity-full rejection, price snapshot, capacity snapshot, transaction history, and replay parity
-> defer worker assignment, save runtime, codex progression, seeded pest spawning, and broad render-plan extraction
```

## Acceptance target

```txt
npm test passes
existing active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false and reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds/equips the tool when equipped item is branch
Buy Row Supply appends accepted market_buy transaction and adds a supply/inventory record
Insufficient money returns accepted=false and reason=insufficient_funds
Capacity overflow returns accepted=false and reason=capacity_full
GET_PRICE_SNAPSHOT returns deterministic starter prices across equivalent fresh games
GET_CAPACITY_SNAPSHOT returns deterministic starter caps across equivalent fresh games
interface-composition snapshot exposes lastResult for accepted and rejected market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
GameHost exposes transaction history and command journal helper methods
market smoke fixtures run without DOM timing assumptions
worker assignment remains explicitly out of scope
```

## Notes for implementation agent

Do not start with worker assignment. The Market must first gain a stable command-result and transaction-result surface. That gives the later worker, building, save, codex, and outcome kits a durable economy journal instead of copying one-off resource mutations from screen code.

Do not remove existing `pay`, `add`, or `canPay` services when adding transactions. Construction and roster already depend on those legacy services, and the active-session HUD already depends on `snapshot["resource-ledger"].values`.
