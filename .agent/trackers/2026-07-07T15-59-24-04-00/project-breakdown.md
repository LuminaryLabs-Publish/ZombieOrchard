# Zombie Orchard Market Command Envelope Source Authority Breakdown

**Run timestamp:** `2026-07-07T15:59:24-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Branch:** `main`

**Selected because:** the central Publish repo ledger still showed `ZombieOrchard` as the oldest eligible non-Cavalry repo by latest review timestamp among the accessible tracked repos.

## Plan ledger

**Goal:** Re-read the current `ZombieOrchard` runtime, identify its interaction loop, domains, services, and kit surfaces, then tighten the next implementation slice around Market command source authority and fixture-readable result envelopes.

**Checklist**

- [x] Confirmed accessible Publish repos.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Re-read the central repo ledger before selecting the repo.
- [x] Re-read current repo source files.
- [x] Identified the interaction loop.
- [x] Identified all current and target domains.
- [x] Identified services exposed by current and target kits.
- [x] Identified current, next-cut, and deferred kits.
- [x] Added this timestamped tracker under root `.agent`.
- [x] Prepared updates for `.agent/README.md` and `.agent/kit-registry.json`.
- [x] Prepared central ledger and internal change-log updates for `LuminaryLabs-Dev/LuminaryLabs`.

## Selection check

Accessible `LuminaryLabs-Publish` repositories observed during this pass:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
```

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible central timestamps checked:

```txt
ZombieOrchard    2026-07-07T14:40:17-04:00
HorrorCorridor   2026-07-07T14:51:44-04:00
TheOpenAbove     2026-07-07T15:11:23-04:00
PhantomCommand   2026-07-07T15:19:05-04:00
PrehistoricRush  2026-07-07T15:29:27-04:00
MyCozyIsland     2026-07-07T15:40:06-04:00
IntoTheMeadow    2026-07-07T15:49:14-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

## Source files reviewed

```txt
README.md
package.json
src/game.js
src/start.js
src/kits/runtime.js
src/kits/composition.js
src/kits/scoped-interface-domains.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
```

## Current read

`ZombieOrchard` remains a compact static browser orchard survival and economy shell. It has no npm runtime dependency requirement beyond the static server and test script. The application is organized around a thin browser host, a kit runtime, generated scoped interface domains, a composition domain, game-domain kits, a canvas world renderer, an HTML interface renderer, and a small `window.GameHost` surface.

The repo is structurally ready for Market implementation. The blocker is not layout or route discovery; the blocker is missing command authority. Market actions need canonical command envelopes, deterministic price/capacity source data, accepted/rejected result records, transaction history, nested result projection, and test-readable host diagnostics before the repo should move into worker assignment, save runtime, pest seeding, codex progression, or renderer extraction.

## Current interaction loop

```txt
index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame()
  -> src/start.js creates createWorldCanvas(document.querySelector("#world"))
  -> src/start.js creates createHtmlInterfaceRenderer({ root, engine })
  -> createOrchardGame installs kits into createKitRuntime
  -> runtime registers resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition
  -> draw() calls engine.tick(1 / 60)
  -> runtime advances ctx.delta, ctx.elapsed, ctx.frame
  -> tickable domains update pressure and active-session pest/condition state
  -> engine.snapshot() aggregates domain snapshots
  -> world-canvas renders trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> clicks with data-action route to interface-composition activate
  -> active screen action can transition to another screen or dispatch a nested command
  -> clicks with data-command route directly to active-session commands
  -> window.GameHost exposes engine, getState, and tick
```

## Current gameplay loop

```txt
entry screen
  -> Play transitions to active-session
  -> active-session HUD shows day, phase, money, apples, wood, pressure, condition
  -> player can Collect, Clear, Next Phase, Pause, Build, Market, Roster, Inventory, Codex
  -> Collect finds nearest apple and adds apples/money
  -> Clear damages nearby pests and can add scrap
  -> Next Phase swaps day/night and increments day on morning
  -> night phase can spawn pests randomly
  -> pests chase the player and reduce condition on contact
  -> condition <= 0 marks the run ended and composition routes to outcome
```

## Current Market gap

```txt
active-session Market action
  -> transitions to exchange
  -> exchange preset only exposes Back
  -> no sell-apples action exists
  -> no buy-basic-tool action exists
  -> no buy-row-supply action exists
  -> no price snapshot exists
  -> no capacity snapshot exists
  -> no transaction envelope exists
  -> no accepted/rejected Market result exists
  -> resource-ledger values are mutable but not journaled
  -> inventory cannot receive a Market purchase
  -> interface-composition discards nested command return values
  -> html-interface-renderer has no exchange-specific projection branch
  -> GameHost cannot dispatch or inspect Market diagnostics directly
  -> smoke test only covers entry, play transition, and apples present
```

## Target Market loop

```txt
active-session Market action
  -> exchange screen exposes Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
  -> exchange action creates a MarketCommandEnvelope
  -> MarketCommandEnvelope carries id, type, source, itemId, quantity, frame, elapsed, and raw action id
  -> market-command-contract validates command type and payload
  -> price-snapshot returns deterministic starter price rows
  -> capacity-policy returns deterministic cap/remaining rows
  -> market-command-dispatch sends accepted commands to economy and inventory services
  -> transaction-envelope records accepted or rejected outcome
  -> market-command-result wraps transaction, price, capacity, inventoryEffect, diagnostics, accepted, and reason
  -> result journal stores accepted and rejected records
  -> resource-ledger snapshot keeps values stable and adds transactions / lastTransaction
  -> inventory-runtime accepts purchased tools and row supplies
  -> interface-composition stores nested result as lastResult
  -> html-interface-renderer exchange branch renders price rows, capacity rows, latest result, disabled reasons, and recent transaction cards
  -> GameHost exposes dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
  -> DOM-free smoke fixtures replay Market commands and assert parity
```

## Domains in use

### Runtime domains

- Static browser host
- Boot module
- Game factory
- Kit runtime
- Engine context
- Domain registry
- Command router
- Event emitter
- Tick dispatcher
- Snapshot aggregator
- Subscription bus
- Global GameHost diagnostics surface
- Node smoke harness

### Interface domains

- `entry`
- `session-select`
- `run-setup`
- `active-session`
- `interrupt`
- `construction`
- `exchange`
- `roster`
- `inventory`
- `knowledge`
- `preferences`
- `outcome`
- `interface-composition`
- HTML interface rendering

### Game domains

- `resource-ledger`
- `pressure-field`
- `orchard-world`
- `construction-runtime`
- `roster-runtime`
- `inventory-runtime`
- `active-session`
- Canvas world rendering

### Market authority domains needed next

- Exchange action surface
- Market command envelope
- Market command contract
- Market command dispatch
- Price snapshot
- Capacity policy
- Transaction envelope
- Transaction history
- Market command result
- Market command result journal
- Orchard economy ledger extension
- Inventory purchase intake
- Market result projection
- GameHost Market diagnostics
- Market fixture replay
- Market smoke testing

### Deferred domains

- Seeded random authority
- Input frame authority
- Harvest interaction extraction
- Building effects
- Worker assignment
- Worker role policy
- Tool effects
- Day/night phase authority
- Pest pressure authority
- Save/load runtime
- Codex progression
- Outcome summaries
- Render-plan projection
- Settlement parity

## Services that current kits offer

### `kit-runtime`

- Installs kit definitions.
- Registers domains by id.
- Provides `ctx.frame`, `ctx.elapsed`, `ctx.delta`, `ctx.events`, and `ctx.domains`.
- Emits frame-stamped events.
- Routes `engine.command(domainId, type, payload)`.
- Advances tickable domains.
- Aggregates snapshots.
- Notifies subscribers after command and tick.

### `scoped-interface-domain-kit`

- Generates screen/domain kits from preset config.
- Stores title, description, selected index, fields, and metadata.
- Normalizes actions from config.
- Handles `select`, `set-field`, and `activate`.
- Emits selected, fieldChanged, and actionRequested events.
- Exposes screen snapshots with actions.

### `interface-composition-kit`

- Owns active screen and previous screen.
- Handles direct transitions.
- Handles back routing.
- Activates current screen action.
- Dispatches nested action commands.
- Auto-routes ended sessions to outcome.
- Projects active screen snapshot.

Current limitation: nested command results are not preserved or returned, which blocks fixture-readable Market action results.

### `resource-ledger-kit`

- Stores resource values.
- Exposes `canPay(cost)`, `pay(cost)`, and `add(values)`.
- Handles `add` and `pay` commands.
- Emits a lightweight `last` marker.
- Exposes snapshots.

Current limitation: no transaction envelope, price snapshot, capacity snapshot, accepted/rejected reason, lastTransaction, or transaction history.

### `pressure-field-kit`

- Stores pressure channels.
- Adjusts channels with clamped values.
- Ticks row pressure and curse pressure.
- Handles `adjust` commands.
- Exposes snapshots.

### `orchard-world-kit`

- Builds a tree grid.
- Seeds apples randomly.
- Collects nearest apple within radius.
- Re-seeds apples after collection.
- Exposes trees, apples, and bounds.

### `construction-runtime-kit`

- Stores construction catalog and built records.
- Spends resources through `resource-ledger`.
- Builds item records.
- Stores build messages.
- Exposes snapshots.

### `roster-runtime-kit`

- Stores actors and roles.
- Hires field hands by spending money through `resource-ledger`.
- Stores roster messages.
- Exposes snapshots.

### `inventory-runtime-kit`

- Stores item list and equipped item.
- Handles `equip` commands.
- Exposes snapshots.

Current limitation: no purchase intake for Market-bought tools or supplies.

### `active-session-domain-kit`

- Stores day, phase, player state, pests, score, message, and ended state.
- Handles active-session action activation.
- Handles move, collect, clear, and next-phase commands.
- Spawns pests during night.
- Moves pests toward player.
- Applies condition damage.
- Ends session on condition loss.
- Exposes snapshots with active-session actions.

### `html-interface-render-kit`

- Renders active-session HUD stat strip.
- Renders active-session quick buttons.
- Renders generic screen panels.
- Renders cards for slots, built items, roster, inventory, and outcome.
- Routes click actions to engine commands.

Current limitation: no exchange-specific branch for Market prices, capacity rows, latest result, disabled reasons, or transaction history.

### `world-canvas-render-kit`

- Handles canvas rendering of world snapshots.
- Draws trees, apples, pests, and player.

### `smoke-fixture-kit`

- Creates an orchard game.
- Asserts entry screen exists.
- Activates play.
- Ticks once.
- Asserts active-session route.
- Asserts apples exist.

Current limitation: no Market fixture coverage.

## Kit inventory

### Current kits

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
active-session-domain-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit-current-lightweight
smoke-fixture-kit
```

### Next-cut kits

```txt
market-command-envelope-kit
market-command-contract-kit
market-command-dispatch-kit
market-command-result-kit
market-command-result-journal-kit
transaction-envelope-kit
transaction-history-kit
price-snapshot-kit
capacity-policy-kit
orchard-economy-ledger-kit
inventory-market-unlock-kit
market-result-projection-kit
market-action-ui-kit
game-host-market-diagnostics-kit
market-fixture-replay-kit
market-command-smoke-kit
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

- `src/start.js` is already thin and should stay thin.
- `src/game.js` is the correct composition point for adding Market kits without making the host heavier.
- `src/kits/runtime.js` already returns command results, so the command envelope can be added without changing the host loop first.
- `src/kits/composition.js` is the first source seam that must change because it currently calls nested commands and discards their return values.
- `src/kits/scoped-interface-domains.js` already supports action descriptors, so the exchange screen can be extended through preset data first.
- `src/kits/game-domains.js` contains the economy primitives but must preserve `resource-ledger.values` exactly for HUD compatibility.
- `src/presets/orchard-preset.js` is the source of the visible Market placeholder.
- `src/renderer/html-interface-renderer.js` can support the next Market pass with one exchange-specific branch before broad renderer extraction.
- `tests/smoke.mjs` is the right place to add initial DOM-free Market command smoke because it already imports `createOrchardGame()` directly.

## Recommended next work

**Build target:** `Zombie Orchard Market Command Envelope + Exchange Projection Fixture Cutover`

Build order:

```txt
preserve current static host, active-session HUD, and world canvas behavior
-> keep snapshot["resource-ledger"].values stable
-> add market-command-envelope-kit with id, type, source, itemId, quantity, frame, elapsed, rawActionId
-> add market-command-contract-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, GET_PRICE_SNAPSHOT, GET_CAPACITY_SNAPSHOT
-> add deterministic price-snapshot-kit rows for apple-sell, basic-tool-buy, and row-supply-buy
-> add deterministic capacity-policy-kit rows for apples, money, wood, scrap, tools, and supplies
-> add transaction-envelope-kit with accepted/rejected shape and stable reasons
-> extend resource-ledger into orchard-economy-ledger while preserving canPay, pay, add, and values
-> expose resource-ledger.transactions and resource-ledger.lastTransaction
-> add inventory-market-unlock-kit for purchased tools and row supplies
-> add market-command-result-kit and market-command-result-journal-kit
-> update exchange preset actions to sell-apples, buy-basic-tool, buy-row-supply, and back
-> update interface-composition-kit to return nested command result and store lastResult
-> add market-result-projection-kit to expose renderer-ready Market state
-> add html-interface-renderer exchange branch for price rows, capacity rows, latest result, disabled reason, and recent transactions
-> extend window.GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> extend tests/smoke.mjs with zero-apple rejection, collect/sell, buy-tool, buy-supply, insufficient-funds rejection, capacity-full rejection, deterministic snapshots, transaction history, and replay parity
-> defer worker assignment, save runtime, codex progression, seeded pest spawning, and broad render-plan extraction
```

Acceptance targets:

```txt
npm test passes
active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds tool to inventory
First purchased basic tool auto-equips only if current equipped item is branch
Buy Row Supply appends accepted market_buy transaction and adds supply record
Insufficient money returns accepted=false reason=insufficient_funds
Capacity overflow returns accepted=false reason=capacity_full
GET_PRICE_SNAPSHOT is deterministic across fresh games
GET_CAPACITY_SNAPSHOT is deterministic across fresh games
interface-composition snapshot exposes lastResult for accepted and rejected Market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
GameHost exposes Market history, command journal, price snapshot, capacity snapshot, and diagnostics helpers
Market smoke fixtures run without DOM timing assumptions
worker assignment remains out of scope
```

## Validation status

No runtime source code changed.

No local build or smoke test was executed.
