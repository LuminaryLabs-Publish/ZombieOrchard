# Zombie Orchard Project Breakdown — Market Smoke Authority + Purchase Intake Contract Lock

**Timestamp:** `2026-07-07T18:28:54-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Selected because:** `ZombieOrchard` was the oldest eligible tracked `LuminaryLabs-Publish` repo by latest central ledger timestamp. `LuminaryLabs-Publish/TheCavalryOfRome` remained excluded.

## Plan Ledger

**Goal:** Re-read the current static orchard runtime, identify the active interaction loop, domains, services, and kits, then update the repo-local `.agent` docs around the next safest implementation seam: Market command smoke authority and purchase-intake contract locking.

**Checklist:**

- [x] Checked the `LuminaryLabs-Publish` repo set.
- [x] Checked central tracked repo timestamps in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Selected only one repo: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` out of scope.
- [x] Re-read the current runtime loop from `index.html`, `src/start.js`, `src/game.js`, kit modules, renderer modules, preset config, and smoke test.
- [x] Re-identified the interaction loop.
- [x] Re-identified domains in use.
- [x] Re-identified services that current and target kits offer.
- [x] Re-identified implemented and target kits.
- [x] Added this timestamped tracker entry under `.agent/trackers/`.
- [x] Prepared `.agent/README.md` and `.agent/kit-registry.json` updates.
- [x] Prepared central ledger and change-log updates.

## Selection Check

Latest eligible tracked timestamps checked:

```txt
ZombieOrchard    2026-07-07T17:10:21-04:00
HorrorCorridor   2026-07-07T17:20:57-04:00
TheOpenAbove     2026-07-07T17:29:51-04:00
AetherVale       2026-07-07T17:38:46-04:00
PhantomCommand   2026-07-07T17:49:34-04:00
PrehistoricRush  2026-07-07T18:00:19-04:00
MyCozyIsland     2026-07-07T18:10:03-04:00
IntoTheMeadow    2026-07-07T18:19:15-04:00
```

## Current Read

`ZombieOrchard` is a compact static browser orchard survival/economy shell. It is already kit-composed enough to support a clean Market cutover without replacing the render loop or broad game state.

The current blocker is still the Market seam, but this pass tightens it into a **smoke-authority lock** rather than a broad economy rewrite. The repo should first prove that Market commands can be dispatched, journaled, projected, purchased, and replayed from source snapshots before touching workers, saves, codex progression, pest determinism, or render extraction.

Important source facts:

```txt
src/presets/orchard-preset.js
  exchange screen has only Back
  resources start at money=40, apples=0, wood=12, scrap=3
  inventory starts with equipped=branch and item branch

src/kits/composition.js
  activate dispatches nested action.command but discards the nested command result
  snapshot exposes active, previous, activeSnapshot only

src/kits/game-domains.js
  resource-ledger exposes values, last, canPay, pay, add, add command, pay command
  resource-ledger has no transaction history
  inventory-runtime exposes items, equipped, equip command
  inventory-runtime has no purchase intake
  active-session collect mutates ledger directly by adding apples and money

src/renderer/html-interface-renderer.js
  active-session has a custom HUD
  construction, roster, inventory, outcome have minimal card branches
  exchange has no renderer-specific branch

src/start.js
  window.GameHost exposes engine, getState, tick
  no dispatch helper, diagnostics helper, price snapshot, capacity snapshot, transaction history, command journal, or runSmoke helper

tests/smoke.mjs
  only covers entry, play transition, active-session, and orchard apples
```

## Interaction Loop

### Current browser loop

```txt
index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame()
  -> src/start.js creates createWorldCanvas(document.querySelector("#world"))
  -> src/start.js creates createHtmlInterfaceRenderer({ root, engine })
  -> draw() calls engine.tick(1 / 60)
  -> engine snapshot is rendered into world canvas and HTML UI
  -> requestAnimationFrame(draw) repeats
  -> window.GameHost exposes engine, getState, tick
```

### Current game/domain loop

```txt
createOrchardGame(orchardPreset)
  -> createKitRuntime installs resource-ledger
  -> installs pressure-field
  -> installs orchard-world
  -> installs construction-runtime
  -> installs roster-runtime
  -> installs inventory-runtime
  -> installs generated scoped interface domains except active-session
  -> installs active-session-domain-kit
  -> installs interface-composition-kit
  -> runtime ticks tickable domains
  -> runtime aggregates snapshots by domain id
```

### Current player loop

```txt
entry screen
  -> Play routes to active-session
  -> active-session HUD shows day, phase, money, apples, wood, pressure, condition
  -> player clicks Collect, Clear, Next Phase, Pause, Build, Market, Roster, Inventory, Codex
  -> Collect directly adds apples and money through resource-ledger api.add
  -> Clear directly mutates pest state and adds scrap when a pest is removed
  -> Next Phase directly swaps day/night and increments day on morning
  -> Market routes to exchange
  -> exchange currently shows only Back
```

### Target Market authority loop

```txt
active-session Market action
  -> exchange screen exposes Sell Apples, Buy Basic Tool, Buy Row Supply, Back
  -> exchange action builds a MarketCommandEnvelope
  -> MarketSourceSnapshot captures resource values, inventory items/equipped, prices, capacity, frame, elapsed
  -> market-preflight returns accepted/rejected with stable reason and source facts
  -> accepted sell mutates resource-ledger and appends market_sell transaction
  -> accepted buy mutates resource-ledger and inventory-runtime purchase intake, then appends market_buy transaction
  -> rejected command appends command result with no resource/inventory mutation
  -> interface-composition stores lastResult from nested command dispatch
  -> MarketResultProjection exposes price rows, capacity rows, latest result, latest transaction, disabled reasons, command journal
  -> html-interface-renderer renders exchange cards from snapshots only
  -> GameHost exposes dispatch, diagnostics, price/capacity snapshots, transaction history, command journal, and runSmoke
  -> tests/smoke.mjs proves accepted/rejected Market replay without DOM timing assumptions
```

## Domains In Use

### Runtime and host domains

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
event-emitter
tick-dispatcher
snapshot-aggregator
subscription-bus
browser-animation-loop
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

### Current game domains

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

### Market authority domains needed next

```txt
exchange-action-surface
market-command-envelope
market-command-contract
market-source-snapshot
market-preflight
market-command-dispatch
market-command-result
market-command-result-journal
transaction-envelope
transaction-history
price-snapshot
capacity-policy
orchard-economy-ledger
inventory-market-unlock
purchase-intake-contract
market-result-projection
exchange-renderer-authority
gamehost-market-diagnostics
market-smoke-contract
market-fixture-replay
```

### Deferred domains

```txt
seeded-random
orchard-input
harvest-interaction
building-effects
worker-assignment
tool-effects
phase-authority
pest-pressure
save-runtime
codex-progression
outcome-summary
render-plan
settlement-parity
```

## Kit Inventory

### Implemented kits

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

### Target next-cut kits

```txt
market-command-envelope-kit
market-command-contract-kit
market-source-snapshot-kit
market-preflight-kit
market-command-dispatch-kit
market-command-result-kit
market-command-result-journal-kit
transaction-envelope-kit
transaction-history-kit
price-snapshot-kit
capacity-policy-kit
orchard-economy-ledger-kit
inventory-market-unlock-kit
purchase-intake-contract-kit
market-result-projection-kit
exchange-renderer-authority-kit
gamehost-market-diagnostics-kit
market-smoke-contract-kit
market-fixture-replay-kit
```

### Deferred kits

```txt
seeded-random-kit
orchard-input-kit
harvest-interaction-kit
building-effect-kit
worker-assignment-kit
tool-effect-kit
phase-authority-kit
pest-pressure-kit
save-runtime-kit
codex-progression-kit
outcome-summary-kit
render-plan-kit
settlement-parity-kit
```

## Services Offered By Current Kits

### `kit-runtime`

```txt
installs kits
creates domain instances
stores domains by id
routes commands to domains
runs tick across tickable domains
emits events
subscribes listeners
aggregates snapshots
returns tick snapshots
```

### `scoped-interface-domain-kit`

```txt
creates reusable interface domains from config
stores screen title, description, selected index, fields, metadata
normalizes configured actions
selects actions by index
sets fields
activates selected or requested action
emits selected, fieldChanged, and actionRequested events
exports screen snapshots with actions
```

### `interface-composition-kit`

```txt
tracks active screen
tracks previous screen
transitions screens
routes back actions
activates current screen action
runs nested action.command dispatch through the engine
routes table-driven or action-owned destinations
auto-routes ended active sessions to outcome
exports active, previous, and activeSnapshot
```

### `resource-ledger-kit`

```txt
stores resource values
checks affordability through canPay
subtracts resources through pay
adds resources through add
handles add/pay commands
exports values and last marker
```

### `pressure-field-kit`

```txt
stores pressure channels
clamps pressure changes
increases rowPressure and curse over time
accepts adjust commands
exports pressure channel snapshot
```

### `orchard-world-kit`

```txt
generates tree grid
generates apple list
replenishes apples randomly
finds nearest collectable apple
removes collected apple
exports tree, apple, and bounds snapshots
```

### `construction-runtime-kit`

```txt
stores build catalog
charges resource-ledger through pay
creates built records
stores build messages
exports catalog, built items, and message
```

### `roster-runtime-kit`

```txt
stores actors and roles
charges resource-ledger for hire
creates field-hand actor records
stores roster messages
exports actor, role, and message snapshot
```

### `inventory-runtime-kit`

```txt
stores inventory item records
stores equipped item id
handles equip command
exports items and equipped snapshot
```

### `active-session-domain-kit`

```txt
stores day and phase
stores player position, condition, stamina
stores pests, score, message, ended state
activates active-session interface actions
moves player
collects nearby apples
adds apple rewards to resource-ledger
adjusts pressure after apple collection
clears nearby pests
adds scrap after pest removal
advances day/night phase
spawns and moves pests during night tick
ends the run when condition reaches zero
exports active-session state and actions
```

### `world-canvas-render-kit`

```txt
resizes canvas
renders orchard trees
renders apples
renders pests
renders player
consumes snapshots only
```

### `html-interface-render-kit`

```txt
routes click[data-action] to interface-composition activate
routes click[data-command] to active-session commands
renders active-session HUD
renders generic screen panels
renders construction, roster, inventory, and outcome cards
renders configured actions
```

### `game-host-diagnostics-kit`

```txt
exposes engine reference
exposes getState snapshot helper
exposes tick helper
```

### `smoke-fixture-kit`

```txt
creates orchard game without DOM
asserts entry screen
activates Play
asserts active-session transition
asserts orchard apples exist
```

## Services Needed Next

```txt
create stable MarketCommandEnvelope records
normalize market action ids into command types
build deterministic MarketSourceSnapshot records
return accepted/rejected MarketCommandResult records
catalog stable rejection reasons
append command results to a command journal
append accepted transaction envelopes to resource-ledger history
store rejected command records without mutating resources or inventory
sell apples through resource-ledger with transaction provenance
buy basic tool through resource-ledger plus inventory purchase intake
buy row supply through resource-ledger plus inventory purchase intake
auto-equip first purchased basic tool only when equipped is branch
expose deterministic price rows
expose deterministic capacity rows
project latest result and recent transactions for renderer use
render exchange cards and transaction cards from snapshot only
surface Market diagnostics through GameHost
prove Market replay through DOM-free smoke fixtures
```

## Main Gaps

```txt
exchange UI only has Back
nested command dispatch loses command result
resource-ledger has no transactions or lastTransaction
inventory-runtime cannot accept purchased tools or supplies
Market prices and capacities are not source-owned
rejected Market commands cannot be inspected through snapshots
exchange renderer has no branch for price/result/transaction cards
GameHost cannot dispatch by helper or expose Market diagnostics
smoke tests do not cover Market commands or replay parity
```

## Recommended Next Slice

```txt
Zombie Orchard Market Smoke Authority + Purchase Intake Contract Lock
```

Build order:

```txt
preserve current static host, HUD, canvas, and existing snapshot shape
-> keep resource-ledger.values compatible for active-session HUD
-> add MarketCommandEnvelope and Market command contract constants
-> add deterministic price snapshot and capacity snapshot source data
-> add MarketSourceSnapshot from ledger and inventory snapshots
-> add stable preflight decision reasons
-> add MarketCommandResult records for accepted and rejected commands
-> add command result journal
-> add transaction envelope and transaction history to resource-ledger
-> add inventory purchase intake for basic tool and row supply
-> keep first-tool auto-equip conditional on equipped === branch
-> update exchange preset actions to sell/buy/back
-> update interface-composition to return nested result and expose lastResult
-> add MarketResultProjection
-> add exchange renderer authority branch
-> add GameHost diagnostics helpers
-> add DOM-free Market smoke fixtures
-> defer workers, saves, codex, seeded pests, render-plan extraction, and settlement parity
```

## Acceptance Gate

```txt
npm test passes
entry -> play smoke still passes
active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, Back
sell with zero apples returns accepted=false and reason=insufficient_inventory
collect then sell appends accepted market_sell transaction
buy basic tool appends accepted market_buy transaction
basic tool purchase adds inventory tool record
first purchased tool auto-equips only if equipped was branch
buy row supply appends accepted market_buy transaction
row supply purchase adds inventory supply record
insufficient money returns accepted=false and reason=insufficient_funds
capacity overflow returns accepted=false and reason=capacity_full
unknown market command returns accepted=false and reason=unknown_market_command
GET_PRICE_SNAPSHOT is deterministic across fresh games
GET_CAPACITY_SNAPSHOT is deterministic across fresh games
interface-composition snapshot exposes latest nested Market result
resource-ledger snapshot exposes transactions and lastTransaction while preserving values
exchange renderer renders only from snapshot data
GameHost exposes dispatch, diagnostics, price snapshot, capacity snapshot, transaction history, command journal, and runSmoke
DOM-free Market replay smoke requires no browser timing
```

## Notes

No runtime source code was changed in this breakdown pass. No local build or smoke test was run in this documentation-only pass.
