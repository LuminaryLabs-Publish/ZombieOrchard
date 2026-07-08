# Zombie Orchard Project Breakdown

**Timestamp:** `2026-07-08T01-20-35-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Mode:** internal documentation refresh only

**Selected because:** the central repo ledger showed `ZombieOrchard` as the oldest eligible tracked non-Cavalry `LuminaryLabs-Publish` repo after the latest `IntoTheMeadow` pass.

## Goal

Refresh the root `.agent` documentation for `ZombieOrchard`, re-identify the interaction loop, domains, service surfaces, and kit inventory, then narrow the next work into a Market command replay fixture gate that can be implemented without changing unrelated orchard systems.

## Scope

```txt
in scope:
  docs-only breakdown
  current source read
  loop/domain/service/kit inventory
  next implementation slice
  central ledger/update-log coordination

out of scope:
  runtime source edits
  smoke execution
  worker assignment
  save system
  codex progression
  seeded replay beyond Market fixtures
  render-plan extraction
  settlement parity
```

## Current source facts

```txt
src/boot.js
  imports src/start.js

src/start.js
  creates createOrchardGame()
  creates createWorldCanvas(document.querySelector("#world"))
  creates createHtmlInterfaceRenderer({ root, engine })
  runs requestAnimationFrame draw loop
  exposes window.GameHost = { engine, getState, tick }

src/game.js
  installs resource-ledger
  installs pressure-field
  installs orchard-world
  installs construction-runtime
  installs roster-runtime
  installs inventory-runtime
  installs generated interface domain kits except generated active-session
  installs active-session-domain-kit from game-domains.js
  installs interface-composition-kit

src/presets/orchard-preset.js
  active-session routes Market to exchange
  exchange still only exposes Back

src/kits/composition.js
  activate dispatches nested action.command
  nested command dispatch result is discarded
  snapshot exposes active, previous, and activeSnapshot only

src/kits/game-domains.js
  resource-ledger exposes values, canPay, pay, add, last
  resource-ledger has no transactions, lastTransaction, or command journal
  inventory-runtime supports equip only
  active-session owns day/phase/player/collect/clear/next-phase/session outcome state

src/renderer/html-interface-renderer.js
  active-session has custom HUD branch
  construction/roster/inventory/outcome have card branches
  exchange has no Market-specific projection branch

tests/smoke.mjs
  proves entry screen
  proves Play transition
  proves orchard apples exist
  does not cover exchange, commands, transactions, prices, capacity, or GameHost diagnostics
```

## Interaction loop

### Current runtime loop

```txt
index.html
-> src/boot.js imports src/start.js
-> src/start.js creates the orchard engine
-> createOrchardGame() installs game, interface, and composition kits
-> draw() calls engine.tick(1 / 60)
-> runtime clamps dt, increments elapsed/frame, clears events, ticks domains
-> engine.snapshot() aggregates domain snapshots
-> world-canvas renders orchard trees/apples/player from snapshot
-> html-interface-renderer renders active-session HUD or generic screen panels
-> data-command clicks route directly to active-session
-> data-action clicks route to interface-composition.activate
-> window.GameHost exposes engine/getState/tick
```

### Current player-facing loop

```txt
entry
-> Play
-> active-session HUD
-> Collect apple near player
-> Clear nearby pest
-> Next Phase day/night
-> Build opens construction
-> Market opens exchange
-> Roster opens roster
-> Inventory opens inventory
-> Codex opens knowledge
-> exchange only offers Back
-> session outcome routes to outcome if active-session ends
```

### Target Market command replay loop

```txt
active-session Market action
-> exchange screen exposes Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
-> exchange action normalizes into MarketActionId
-> create MarketCommandEnvelope
-> create MarketSourceSnapshot from resources, inventory, prices, capacity, frame, elapsed, active screen, and command context
-> market-preflight returns accepted/rejected decision with stable MarketReason
-> accepted sell mutates resource-ledger and appends market_sell transaction
-> accepted buy mutates resource-ledger and inventory purchase intake, then appends market_buy transaction
-> rejected command appends result with no resource or inventory mutation
-> interface-composition stores nested lastResult
-> market-result-projection exposes renderer-ready rows, disabled reasons, latest result, recent transactions, price snapshot, and capacity snapshot
-> exchange renderer consumes projection from snapshot only
-> GameHost exposes dispatch, diagnostics, market snapshots, command journal, transaction history, and runSmoke
-> DOM-free fixture matrix proves accepted/rejected replay parity
```

## Domains in use

```txt
runtime:
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

interface:
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

game:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas

market-authority-next:
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
  exchange-renderer-authority
  interface-nested-result
  gamehost-market-diagnostics
  market-smoke-contract
  market-fixture-replay

follow-on:
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

## Services that the kits offer

### Current services

```txt
kit-runtime:
  install kits
  register domains
  route commands
  tick domains
  emit events
  aggregate snapshots
  publish subscriptions

scoped-interface-domain-kit:
  create reusable interface domains from presets
  normalize actions
  hold selected index, fields, metadata
  handle select/set-field/activate
  emit action-request events
  snapshot screen title, actions, fields, meta

interface-composition-kit:
  track active screen
  track previous screen
  transition/back between screens
  activate current screen action
  dispatch nested action.command
  auto-route ended sessions to outcome
  snapshot active, previous, activeSnapshot

resource-ledger-kit:
  store resource values
  test canPay
  pay costs
  add resource deltas
  expose pay/add commands
  snapshot values and last marker

pressure-field-kit:
  store pressure channels
  adjust pressure channels
  tick rowPressure/curse
  expose adjust command
  snapshot channels

orchard-world-kit:
  generate tree grid
  generate apples with random placement
  collect nearest apple
  reseed apples
  snapshot trees, apples, bounds

construction-runtime-kit:
  expose build catalog
  pay costs through resource-ledger
  append built item records
  expose build messages
  snapshot catalog, built items, message

roster-runtime-kit:
  hold actor and role records
  hire actor with payment
  expose roster messages
  snapshot roster state

inventory-runtime-kit:
  hold items
  track equipped item
  equip item
  snapshot inventory

active-session-domain-kit:
  hold day and phase
  hold player state
  move player
  collect apples
  clear pests
  advance phase
  tick night pressure/pests
  end session when condition reaches zero
  snapshot session state and actions

world-canvas-render-kit:
  resize canvas
  clear/draw orchard world
  render trees, apples, player, pests, and bounds from snapshot

html-interface-render-kit:
  render active-session HUD
  render generic screen panels
  render construction, roster, inventory, and outcome cards
  route click events into engine commands

GameHost diagnostics kit:
  expose engine reference
  expose getState
  expose tick

smoke-fixture-kit:
  construct game without DOM
  assert entry screen
  assert Play transition
  assert orchard apples exist
```

### Needed Market services

```txt
market-action-id-catalog-kit:
  define sell-apples, buy-basic-tool, buy-row-supply, back
  keep action ids stable for fixtures and renderer

market-command-envelope-kit:
  normalize exchange actions into command envelopes
  record frame, elapsed, source screen, action id, payload, and command id

market-price-source-kit:
  produce deterministic sell and buy price rows
  expose price fingerprint for replay checks

market-capacity-policy-kit:
  calculate inventory/supply capacity
  return capacity rows and disabled reasons

market-source-snapshot-kit:
  capture resources, inventory, prices, capacity, active screen, frame, elapsed, and command context before mutation

market-preflight-kit:
  reject insufficient_inventory
  reject insufficient_funds
  reject capacity_full
  reject unknown_market_command
  accept valid sell/buy commands

market-command-result-kit:
  return accepted/rejected records
  include stable reason, label, delta, transaction id, and source snapshot fingerprint

market-command-result-journal-kit:
  append every Market command result
  preserve rejected results without mutation
  expose latest result and counters

transaction-envelope-kit:
  create market_sell and market_buy transaction records
  include before/after resource deltas and inventory deltas

transaction-history-kit:
  append transaction records to resource-ledger snapshot
  expose recent transactions and lastTransaction

inventory-purchase-intake-kit:
  add bought basic tools
  add row supplies
  auto-equip first bought tool only when policy accepts it

interface-nested-result-kit:
  return nested command dispatch result from interface-composition.activate
  persist lastResult in interface-composition snapshot

market-result-projection-kit:
  build renderer-ready action rows, price rows, capacity rows, latest result, and transaction cards

exchange-renderer-authority-kit:
  render exchange from snapshot projection only
  avoid direct ledger/inventory reads in renderer branch

gamehost-market-diagnostics-kit:
  expose dispatch
  expose getDiagnostics
  expose getMarketSnapshot
  expose getCommandJournal
  expose getTransactionHistory
  expose runSmoke

market-fixture-replay-kit:
  run DOM-free accepted/rejected replay fixtures
  compare resource, inventory, journal, transaction, price, and capacity snapshots
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

next-cut:
  market-action-id-catalog-kit
  market-command-envelope-kit
  market-command-contract-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
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

## Blockers

```txt
exchange is still a placeholder and only exposes Back
Market actions do not exist in the preset
nested command results are discarded by interface-composition
resource-ledger has no transaction history
inventory-runtime has no purchase intake
renderer has no exchange projection branch
GameHost has no dispatch, diagnostics, command journal, transaction history, price snapshot, capacity snapshot, or runSmoke
smoke coverage does not enter the Market route
random orchard generation remains non-deterministic, but should stay deferred until the Market fixture seam is stable
```

## Recommended next work

```txt
Zombie Orchard Market Command Replay Fixture + Transaction Projection Gate
```

Build order:

```txt
preserve current static route, active-session HUD, world-canvas rendering, and snapshot["resource-ledger"].values
-> add source-owned Market action ids and command constants
-> extend exchange preset with Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
-> add deterministic price rows and capacity rows
-> add MarketCommandEnvelope and MarketSourceSnapshot helpers
-> add market preflight with stable rejection reasons
-> add accepted/rejected MarketCommandResult records
-> add Market command result journal
-> extend resource-ledger with transactions and lastTransaction while preserving values/canPay/pay/add
-> extend inventory-runtime with purchase intake for basic tools and row supplies
-> return nested command result through interface-composition and expose lastResult
-> add renderer-ready MarketResultProjection
-> add exchange renderer branch from snapshot projection only
-> extend GameHost with dispatch, diagnostics, price/capacity snapshots, transaction history, command journal, and runSmoke
-> add DOM-free fixture matrix for rejected sell, accepted sell, accepted buy, insufficient funds, capacity full, unknown command, price determinism, and capacity determinism
-> defer workers, saves, codex, global seeded replay, render-plan extraction, and settlement parity
```

## Acceptance target

```txt
npm test passes
entry -> Play smoke still passes
active-session HUD still reads snapshot["resource-ledger"].values
Market opens exchange
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds/equips tool when policy accepts auto-equip
Buy Row Supply appends accepted market_buy transaction and adds supply record
Insufficient money returns accepted=false reason=insufficient_funds
Capacity overflow returns accepted=false reason=capacity_full
Unknown Market command returns accepted=false reason=unknown_market_command
Price snapshot is deterministic across fresh games
Capacity snapshot is deterministic across fresh games
interface-composition snapshot exposes lastResult for Market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
exchange renderer consumes Market projection from snapshot only
GameHost exposes Market history, command journal, price snapshot, capacity snapshot, diagnostics, and runSmoke
Market smoke fixtures run without DOM timing assumptions
worker assignment remains out of scope
```

## Validation

No runtime source files were changed. No local build or smoke test was run for this documentation-only pass.
