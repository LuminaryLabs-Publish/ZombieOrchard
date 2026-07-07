# Zombie Orchard Project Breakdown

**Run timestamp:** `2026-07-07T14-40-17-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Branch:** `main`

**Scope:** internal docs only. No runtime source changes.

## Selection reason

`LuminaryLabs-Publish/ZombieOrchard` was selected from the tracked Publish rotation because the central ledger showed it as the oldest eligible non-Cavalry repo by latest review timestamp among accessible Publish repos.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked from the central ledger during this pass:

```txt
ZombieOrchard    2026-07-07T13:30:34-04:00
HorrorCorridor   2026-07-07T13:41:22-04:00
TheOpenAbove     2026-07-07T13:50:54-04:00
PhantomCommand   2026-07-07T14:00:18-04:00
PrehistoricRush  2026-07-07T14:11:48-04:00
MyCozyIsland     2026-07-07T14:21:20-04:00
IntoTheMeadow    2026-07-07T14:28:17-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

## Source files reviewed

```txt
README.md
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/game-domains.js
src/kits/scoped-interface-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
```

## Current read

`ZombieOrchard` is a standalone static orchard survival / economy shell built from small kit domains.

The host is intentionally thin: `src/boot.js` imports `src/start.js`; `src/start.js` creates `createOrchardGame()`, `createWorldCanvas()`, and `createHtmlInterfaceRenderer()`; then a browser frame loop ticks the engine and renders world/UI snapshots.

The game has a clean kit registry and scoped screen model, but Market is still a placeholder. The `exchange` screen only has Back. The `resource-ledger-kit` exposes `values`, `canPay`, `pay`, and `add`, but it does not emit price snapshots, capacity results, accepted/rejected transaction envelopes, command journals, or replayable Market outcomes.

The most important next slice should turn the Market from a static screen into a deterministic command-result surface without breaking the existing HUD compatibility path at `snapshot["resource-ledger"].values`.

## Current interaction loop

```txt
open index.html
-> src/boot.js imports src/start.js
-> src/start.js creates createOrchardGame()
-> src/start.js creates createWorldCanvas(canvas)
-> src/start.js creates createHtmlInterfaceRenderer({ root, engine })
-> createOrchardGame installs kit runtime
-> kit runtime installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, scoped interface domains, active-session, and interface-composition
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> kit runtime advances frame, elapsed, delta, and each domain tick
-> engine.snapshot aggregates all domain snapshots
-> world-canvas renders orchard trees, apples, pests, and player
-> html-interface-renderer renders active-session HUD or generic screen panel
-> UI clicks call interface-composition activate or active-session commands
-> active-session handles collect, clear, move, and next-phase
-> construction-runtime can build by spending resource-ledger values
-> roster-runtime can hire by spending resource-ledger money
-> inventory-runtime can equip items
-> exchange screen currently exposes only Back
-> window.GameHost exposes engine, getState, and tick
```

## Intended player loop

```txt
start orchard run
-> collect apples for money
-> manage day/night pressure
-> clear pests and survive condition loss
-> open Market from active session
-> sell apples for money
-> buy starter tool and row supply
-> see accepted/rejected market result immediately
-> inspect recent transactions
-> return to active-session with resource and inventory changes visible
-> later use worker/building/save/codex systems after Market authority is stable
```

## Target service loop

```txt
active-session action routes to exchange
-> exchange actions dispatch typed market commands
-> market-command-contract normalizes SELL_APPLES, BUY_TOOL, BUY_SUPPLY, GET_PRICE_SNAPSHOT, and GET_CAPACITY_SNAPSHOT
-> price-snapshot service resolves deterministic starter price table
-> capacity-policy service resolves inventory/resource caps before mutation
-> market-command-dispatch executes command through economy ledger and inventory intake
-> transaction-envelope service creates accepted/rejected result records
-> market-command-result service wraps transaction, price, capacity, and inventory effects
-> market-command-result-journal appends accepted and rejected outcomes
-> interface-composition preserves nested command results as lastResult
-> market-result-projection exposes latest result to exchange screen and GameHost
-> html-interface-renderer renders prices, capacities, result card, and recent transactions
-> smoke fixtures replay Market actions without DOM timing assumptions
```

## Domains in use

### Runtime domains

```txt
static-browser-host
kit-runtime
engine-context
domain-registry
command-router
command-result-contract-current-lightweight
nested-command-result-current-missing
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

### Market authority domains needed next

```txt
exchange-action-surface
market-command-contract
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
market-command-smoke
```

### Deferred domains

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

## Services offered by current kits

### `kit-runtime`

```txt
install kits
create domains
store ctx.frame / ctx.elapsed / ctx.delta
emit frame-scoped events
route commands by domain id
return lightweight accepted/rejected command results
advance tickable domains
aggregate snapshots
notify subscribers
```

### `scoped-interface-domain-kit`

```txt
create screen domain state
normalize action list
track selected action index
store screen fields and metadata
select actions
set fields
activate actions
emit actionRequested events
return action descriptors
snapshot screen state
```

### `interface-composition-kit`

```txt
track active and previous screen
transition between screen domains
back navigation
activate current screen action
execute nested action.command calls
route ended sessions to outcome
snapshot active screen and activeSnapshot
```

Current issue: nested `action.command` results are executed but discarded, so Market cannot show a stable accepted/rejected result card yet.

### `resource-ledger-kit`

```txt
store resource values
canPay(cost)
pay(cost)
add(values)
command add
command pay
snapshot values and last marker
```

Current issue: it has no transaction envelopes, price snapshots, capacity policy, lastTransaction, or replayable history.

### `pressure-field-kit`

```txt
store pressure channels
adjust channel values
raise rowPressure over time
raise curse over time
command adjust
snapshot channels
```

### `orchard-world-kit`

```txt
create fixed tree grid
seed apple list with random positions
collect nearest apple
reseed apples after collection
snapshot trees, apples, and bounds
```

### `construction-runtime-kit`

```txt
store construction catalog
build selected item
pay costs through resource-ledger
append built record
set build message
snapshot catalog, built items, and message
```

### `roster-runtime-kit`

```txt
store actors and roles
hire field hands
pay hiring cost through resource-ledger
append actor record
set roster message
snapshot actors, roles, and message
```

### `inventory-runtime-kit`

```txt
store items
equip selected item
snapshot items and equipped id
```

### `active-session-domain-kit`

```txt
store day, phase, player, pests, score, message, and ended state
activate active-session interface actions
move player within bounds
collect nearby apples through orchard-world
clear reachable pests
advance day/night phase
spawn pests at night
move pests toward player
damage player condition
route fallen orchard to ended state
snapshot session state and actions
```

### `world-canvas-render-kit`

```txt
resize canvas
render background
render trees
render apples
render pests
render player
```

### `html-interface-render-kit`

```txt
listen for UI clicks
route action buttons to interface-composition activate
route command buttons to active-session commands
render active-session HUD
render generic screen panels
render construction, roster, inventory, and outcome cards
```

### `smoke-fixture-kit`

```txt
create orchard game
assert entry screen
activate play
advance one tick
assert active-session
assert orchard apples exist
```

## Kit inventory

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
smoke-fixture-kit
game-host-diagnostics-kit-current-lightweight
```

### Next-cut kits

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
game-host-market-diagnostics-kit
```

### Deferred kits

```txt
seeded-random-kit
orchard-input-kit
orchard-harvest-interaction-kit
orchard-building-effect-kit
orchard-worker-assignment-kit
worker-assignment-policy-kit
orchard-tool-effect-kit
orchard-day-night-phase-kit
orchard-pest-pressure-kit
orchard-save-runtime-kit
orchard-codex-progression-kit
orchard-outcome-summary-kit
orchard-render-plan-kit
settlement-parity-kit
```

## Key findings

- The repo structure is already simple and kit-oriented.
- `src/start.js` is an intentionally thin host and should remain thin.
- `src/kits/runtime.js` has a good command-router seam, but command results are too lightweight for Market diagnostics and replay.
- `src/kits/composition.js` is the correct seam for surfacing nested command results, because screen actions can already dispatch domain commands.
- `src/kits/game-domains.js` has the current economy base, but `resource-ledger-kit` must preserve `values` while adding transactions and capacity/price metadata.
- `src/presets/orchard-preset.js` proves the Market gap directly: `exchange` only has Back.
- `src/renderer/html-interface-renderer.js` already has generic card rendering, but needs an exchange-specific branch for price, capacity, latest result, disabled reason, and transaction cards.
- `tests/smoke.mjs` is minimal and should become the DOM-free Market fixture base before worker assignment or save/codex work.

## Recommended next work

Next slice:

```txt
Zombie Orchard Market Price / Inventory Action Fixture + GameHost Diagnostics Cutover
```

Build order:

```txt
preserve the current static host and playable active-session loop
-> keep snapshot["resource-ledger"].values stable for HUD compatibility
-> add market-command-contract-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, GET_PRICE_SNAPSHOT, and GET_CAPACITY_SNAPSHOT
-> add price-snapshot-kit with deterministic starter price rows for apple-sell, basic-tool-buy, and row-supply-buy
-> add capacity-policy-kit with deterministic caps for apples, tools, supplies, money, wood, and scrap
-> add transaction-envelope-kit for accepted and rejected economy records
-> add market-command-result-kit for transaction, price, capacity, inventory, and diagnostics payloads
-> add market-command-result-journal-kit with accepted and rejected views
-> upgrade resource-ledger-kit into an economy-ledger surface while preserving canPay, pay, add, and values
-> expose resource-ledger.transactions and resource-ledger.lastTransaction
-> add market-command-dispatch-kit and route exchange actions into it
-> update orchard-preset exchange actions to sell-apples, buy-basic-tool, buy-row-supply, and back
-> update interface-composition-kit to preserve nested command results as lastResult
-> add market-result-projection-kit for active screen snapshots and host diagnostics
-> extend inventory-runtime-kit with market purchase intake
-> auto-equip basic-tool only when currently equipped item is branch
-> update html-interface-renderer exchange branch with price rows, capacity rows, latest result, disabled reasons, and recent transactions
-> extend window.GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> extend tests/smoke.mjs with zero-apple rejection, collect/sell, buy-tool, buy-supply, insufficient-funds rejection, capacity-full rejection, price snapshot, capacity snapshot, transaction history, and replay parity
-> defer worker assignment, save runtime, codex progression, seeded pest spawning, and broad render-plan extraction
```

## Acceptance target

```txt
npm test passes
active-session HUD still reads snapshot["resource-ledger"].values
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
GameHost exposes transaction history and command journal helpers
Market smoke fixtures run without DOM timing assumptions
worker assignment remains explicitly out of scope
```

## Validation status

No runtime source code changed in this documentation run.

No local build or smoke test was executed.
