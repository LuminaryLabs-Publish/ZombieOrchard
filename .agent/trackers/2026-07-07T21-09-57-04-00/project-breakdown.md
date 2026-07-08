# Zombie Orchard Project Breakdown

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Run timestamp:** `2026-07-07T21:09:57-04:00`

**Selected because:** `ZombieOrchard` was the oldest eligible tracked non-Cavalry repo in the central `LuminaryLabs-Dev/LuminaryLabs` Publish ledger. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Plan ledger

**Goal:** Refresh the internal docs for one Publish repo, re-identify the runtime loop, domains, services, and kit inventory, then lock the next implementation slice without touching runtime source.

**Checklist:**

- [x] Checked the central repo ledger before selecting a repo.
- [x] Selected only `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Avoided `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Reviewed current runtime source seams.
- [x] Re-identified the interaction loop.
- [x] Re-identified active and target domains.
- [x] Re-identified services exposed by the current kits.
- [x] Re-identified current, target, and deferred kits.
- [x] Added this timestamped tracker under root `.agent`.
- [x] Prepared central ledger/change-log updates.

## Current read

`ZombieOrchard` is still a standalone static browser orchard survival/economy shell.

The current source shape is compact and kit-composed:

```txt
index.html
-> src/boot.js
-> src/start.js
-> src/game.js
-> src/kits/runtime.js
-> generated interface domain kits
-> game-domain kits
-> canvas renderer + HTML renderer
-> window.GameHost
```

The active product loop exists and is playable: entry screen, active-session HUD, collection, row clearing, build route, market route, roster route, inventory route, codex route, day/night phase changes, canvas rendering, and a small host surface.

The repeated blocker is still **Market authority**. The Market route exists, but the `exchange` preset exposes only `Back`; nested command results are discarded by composition; resource transactions do not exist; inventory purchases do not exist; the HTML renderer has no exchange-specific branch; and `GameHost` exposes only `engine`, `getState`, and `tick`.

## Source-backed findings

```txt
README domain map:
  title -> entry
  save select -> session-select
  new game -> run-setup
  gameplay -> active-session
  pause -> interrupt
  build -> construction
  shop -> exchange
  workers -> roster
  inventory -> inventory
  codex -> knowledge
  settings -> preferences
  game over -> outcome
```

```txt
orchard preset:
  entry actions: Play, New Game, Settings
  active-session actions: Pause, Build, Market, Roster, Inventory, Codex
  construction action: Storage Shed build command
  exchange actions: Back only
  starting resources: money 40, apples 0, wood 12, scrap 3
  starting inventory: equipped branch, item Old Branch
```

```txt
composition seam:
  interface-composition.activate calls active screen activate
  if action.command exists, ctx.engine.command(...) is called
  nested command result is not returned or stored
  snapshot only exposes active, previous, activeSnapshot
```

```txt
game-domain seam:
  resource-ledger stores values and last marker only
  resource-ledger exposes canPay, pay, add
  construction pays through resource-ledger
  roster pays through resource-ledger
  inventory-runtime only supports equip
  active-session collect adds apples/money directly
```

```txt
renderer/host seam:
  HTML renderer renders active-session HUD or generic panels
  exchange currently renders as a generic panel with Back only
  root click handler routes data-action to interface-composition.activate
  root click handler routes data-command directly to active-session
  GameHost only exposes engine/getState/tick
```

## Current interaction loop

```txt
static host
  index.html loads browser shell
  -> src/boot.js imports src/start.js
  -> src/start.js creates engine, world canvas, and HTML renderer
  -> src/start.js starts requestAnimationFrame(draw)

engine composition
  createOrchardGame(orchardPreset)
  -> install resource-ledger-kit
  -> install pressure-field-kit
  -> install orchard-world-kit
  -> install construction-runtime-kit
  -> install roster-runtime-kit
  -> install inventory-runtime-kit
  -> generate scoped interface domain kits
  -> install active-session-domain-kit
  -> install interface-composition-kit

frame loop
  draw()
  -> engine.tick(1 / 60)
  -> ctx.delta/elapsed/frame advance
  -> pressure-field ticks pressure channels
  -> active-session ticks night pest pressure
  -> engine.snapshot aggregates every domain snapshot
  -> world-canvas renders orchard trees/apples/player/session state
  -> html-interface-renderer renders HUD or current screen panel
  -> requestAnimationFrame(draw)

player loop
  entry Play
  -> active-session
  -> Collect apples near player
  -> Clear reachable pests
  -> Next Phase toggles day/night
  -> Build opens construction
  -> Market opens exchange placeholder
  -> Roster opens roster placeholder
  -> Inventory opens inventory view
  -> Codex opens knowledge placeholder
  -> Outcome opens when active-session ended

host loop
  window.GameHost.engine
  window.GameHost.getState()
  window.GameHost.tick(dt)
```

## Target Market interaction loop

```txt
active-session Market action
-> exchange screen exposes Sell Apples, Buy Basic Tool, Buy Row Supply, Back
-> exchange action normalizes through market-action-id-catalog
-> action creates MarketCommandEnvelope
-> MarketSourceSnapshot captures resources, inventory, prices, capacity, frame, elapsed
-> market-preflight accepts/rejects with stable reason
-> accepted sell mutates resource-ledger and appends market_sell transaction
-> accepted buy mutates resource-ledger and inventory-runtime purchase intake
-> rejected command appends result without mutating resources or inventory
-> interface-composition returns nested result and stores lastResult
-> market-result-projection exposes renderer-ready rows/results/transactions
-> exchange-renderer-authority renders from snapshot only
-> GameHost exposes dispatch, diagnostics, journals, snapshots, and runSmoke
-> DOM-free Market fixture proves accepted/rejected replay parity
```

## Domains in use

```txt
runtime domains:
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

interface domains:
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

game domains:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas

market authority domains needed next:
  exchange-action-surface
  market-action-id-catalog
  market-command-envelope
  market-command-contract
  market-source-snapshot
  market-price-source
  market-capacity-policy
  market-preflight
  market-command-dispatch
  market-command-result
  market-command-result-journal
  transaction-envelope
  transaction-history
  orchard-economy-ledger
  inventory-purchase-intake
  purchase-intake-contract
  market-result-projection
  interface-nested-result
  exchange-renderer-authority
  gamehost-market-diagnostics
  market-smoke-contract
  market-fixture-replay

follow-on domains:
  seeded-random
  orchard-input
  harvest-interaction
  building-effects
  worker-assignment
  tool-effects
  phase-authority
  save-runtime
  codex-progression
  outcome-summary
  render-plan
  settlement-parity
```

## Current services offered by kits

```txt
kit-runtime:
  install kit
  register domain by id
  route command(domainId, type, payload)
  tick all tickable domains
  emit event records with frame/elapsed
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit:
  create screen state
  normalize action list
  select action by index
  set field values
  activate selected or requested action
  emit selected/field/action events
  expose screen snapshots

interface-composition-kit:
  track active and previous screen
  transition screens
  route back actions
  activate active screen
  dispatch nested action.command to engine
  route ended active session to outcome
  expose active screen snapshot

resource-ledger-kit:
  store resource values
  check affordability with canPay
  subtract resources with pay
  add resources with add
  respond to add/pay commands
  expose values and last marker

pressure-field-kit:
  track pressure channels
  adjust pressure channels
  tick rowPressure and curse pressure
  expose channel snapshot

orchard-world-kit:
  generate tree grid
  seed apple objects
  collect nearest apple inside radius
  reseed apples after collection
  expose trees, apples, bounds

construction-runtime-kit:
  store build catalog
  pay resource costs through resource-ledger
  append built item records
  expose build message and built list

roster-runtime-kit:
  store actors and roles
  pay hire cost through resource-ledger
  append field hand records
  expose roster message and actor list

inventory-runtime-kit:
  store item list
  store equipped id
  equip item by command
  expose items/equipped snapshot

active-session-domain-kit:
  hold day/phase/player/pests/score/message/end state
  move player
  collect apples into resource-ledger
  adjust row pressure after collection
  clear reachable pests
  add scrap from cleared pest
  advance day/night phase
  spawn pests at night
  resolve pest movement and player damage
  expose active-session snapshot

world-canvas-render-kit:
  resize canvas
  render orchard trees
  render apples
  render player/session objects

html-interface-render-kit:
  render HUD stat strip
  render quick command buttons
  render generic screen panels
  render construction/roster/inventory/outcome cards
  route data-action clicks
  route data-command clicks

game-host-diagnostics-kit:
  expose engine
  expose getState
  expose tick

smoke-fixture-kit:
  smoke entry state
  smoke play transition
  smoke active-session presence
  smoke apple existence
```

## Kit inventory

```txt
implemented kits:
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

target next-cut kits:
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
  interface-nested-result-kit
  exchange-renderer-authority-kit
  gamehost-market-diagnostics-kit
  market-smoke-contract-kit
  market-fixture-replay-kit

deferred kits:
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
1. src/presets/orchard-preset.js
   exchange actions still only include Back.

2. src/kits/composition.js
   nested ctx.engine.command(...) result is discarded.
   snapshot has no lastResult.

3. src/kits/game-domains.js
   resource-ledger has no transactions, lastTransaction, or appendTransaction.
   inventory-runtime has no purchase intake.

4. src/renderer/html-interface-renderer.js
   exchange is rendered through the generic panel path.
   there is no Market projection branch.

5. src/start.js
   GameHost only exposes engine, getState, and tick.

6. tests/smoke.mjs
   Market accepted/rejected replay coverage still needs to be added.
```

## Recommended next slice

```txt
Zombie Orchard Market Projection Host Smoke + Purchase Intake Replay Lock
```

## Build order

```txt
preserve current static host, HUD, canvas renderer, and snapshot["resource-ledger"].values
-> add stable Market action ids: sell-apples, buy-basic-tool, buy-row-supply, back
-> add Market command constants and normalization helpers
-> add deterministic price rows for apple sell, basic tool buy, and row supply buy
-> add deterministic capacity rows for money, apples, tools, supplies, wood, and scrap
-> add MarketCommandEnvelope records with id/type/source/itemId/quantity/frame/elapsed/rawActionId
-> add MarketSourceSnapshot from ledger, inventory, price, and capacity state
-> add stable preflight reasons: insufficient_inventory, insufficient_funds, capacity_full, unknown_market_command
-> add accepted/rejected MarketCommandResult records
-> append command result journal entries
-> extend resource-ledger with appendTransaction, transactions, and lastTransaction while preserving values/canPay/pay/add
-> extend inventory-runtime with purchase intake for basic tool and row supply records
-> auto-equip first purchased basic tool only when equipped is branch
-> update exchange preset actions
-> update interface-composition to return nested command result and store lastResult
-> add MarketResultProjection for renderer and host diagnostics
-> add exchange renderer branch with price cards, capacity rows, latest result, and recent transactions
-> extend GameHost with dispatch/getDiagnostics/getPriceSnapshot/getCapacitySnapshot/getTransactionHistory/getCommandJournal/runSmoke
-> add DOM-free Market replay smoke for accepted and rejected cases
-> defer workers, saves, codex, seeded replay, render-plan extraction, and settlement parity
```

## Acceptance target

```txt
npm test passes
entry -> play smoke still passes
active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds tool to inventory
First purchased basic tool auto-equips only when current equipped item is branch
Buy Row Supply appends accepted market_buy transaction and adds supply record
Insufficient money returns accepted=false reason=insufficient_funds
Capacity overflow returns accepted=false reason=capacity_full
Unknown Market command returns accepted=false reason=unknown_market_command
GET_PRICE_SNAPSHOT is deterministic across fresh games
GET_CAPACITY_SNAPSHOT is deterministic across fresh games
interface-composition snapshot exposes lastResult for accepted and rejected Market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
exchange renderer consumes Market projection from snapshot only
GameHost exposes Market history, command journal, price snapshot, capacity snapshot, diagnostics, and runSmoke
Market smoke fixtures run without DOM timing assumptions
worker assignment remains out of scope
```

## Validation

No runtime source files changed in this documentation pass.

No local build or smoke test was run in this documentation pass.
