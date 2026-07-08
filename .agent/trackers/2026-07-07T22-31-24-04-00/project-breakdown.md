# Zombie Orchard Project Breakdown

**Run timestamp:** `2026-07-07T22:31:24-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Default branch:** `main`

**Change type:** internal docs and next-slice ideation only

## Selection note

`ZombieOrchard` was selected after checking the central repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and the currently accessible `LuminaryLabs-Publish` repositories. `TheCavalryOfRome` remains excluded by standing rule.

Latest eligible central-ledger timestamps checked before this pass:

```txt
ZombieOrchard    2026-07-07T21:09:57-04:00
HorrorCorridor   2026-07-07T21:18:45-04:00
TheOpenAbove     2026-07-07T21:29:47-04:00
AetherVale       2026-07-07T21:39:36-04:00
PhantomCommand   2026-07-07T21:50:56-04:00
PrehistoricRush  2026-07-07T21:59:06-04:00
MyCozyIsland     2026-07-07T22:11:41-04:00
IntoTheMeadow    2026-07-07T22:20:00-04:00
```

## Current read

`ZombieOrchard` is a compact static browser orchard survival and economy shell. It already has a small kit runtime, generated scoped interface domains, an interface composition kit, game-domain kits, a canvas world renderer, an HTML interface renderer, a minimal browser `GameHost`, and a DOM-free smoke fixture.

The active blocker is still the Market authority seam. The game exposes a Market route from the active session, but the `exchange` screen only has `Back`. Market sell and buy verbs do not exist yet, resource transactions are not journaled, inventory purchase intake does not exist, nested command results are discarded by `interface-composition`, the HTML renderer has no Market-specific projection branch, and `window.GameHost` only exposes `engine`, `getState`, and `tick`.

The next implementation should stay small and product-visible: make Market actions deterministic and replayable before adding worker assignment, saves, codex progression, seeded random replay, render-plan extraction, or settlement parity.

## Interaction loop

```txt
current runtime loop:
  index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame()
  -> src/start.js creates createWorldCanvas(document.querySelector("#world"))
  -> src/start.js creates createHtmlInterfaceRenderer({ root, engine })
  -> createOrchardGame installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition
  -> requestAnimationFrame draw loop calls engine.tick(1 / 60)
  -> runtime updates ctx.delta, ctx.elapsed, ctx.frame, tickable domains, and snapshots
  -> world-canvas renders trees, apples, pests, and player from snapshots
  -> html-interface-renderer renders active-session HUD or generic screen panels
  -> click[data-action] calls interface-composition activate
  -> click[data-command] calls active-session command directly
  -> window.GameHost exposes engine, getState, and tick
```

```txt
current player loop:
  entry screen
  -> Play moves to active-session
  -> active-session HUD shows day, phase, money, apples, wood, pressure, condition, message, and session actions
  -> Collect calls orchard-world collectNear and resource-ledger add
  -> Clear checks nearby pests and adds scrap on defeat
  -> Next Phase swaps day/night and increments day on morning
  -> Market moves to exchange, but exchange only exposes Back
  -> Build/Roster/Inventory/Codex show generic screens with limited domain cards
  -> outcome appears when active-session marks ended
```

```txt
target Market loop:
  active-session Market action
  -> exchange screen exposes sell-apples, buy-basic-tool, buy-row-supply, and back
  -> exchange action creates MarketCommandEnvelope
  -> MarketSourceSnapshot captures resources, inventory, prices, capacity, frame, elapsed, and active screen
  -> market-preflight returns accepted/rejected decision with stable reason
  -> accepted sell mutates resource-ledger and appends market_sell transaction
  -> accepted buy mutates resource-ledger and inventory-runtime purchase intake, then appends market_buy transaction
  -> rejected command appends MarketCommandResult without mutating resources or inventory
  -> interface-composition stores lastResult from nested command dispatch and returns it to the caller
  -> MarketResultProjection exposes renderer-ready price rows, capacity rows, latest result, recent transactions, and disabled reasons
  -> exchange renderer consumes projection from snapshot only
  -> GameHost exposes dispatch, diagnostics, price/capacity snapshots, transaction history, command journal, and runSmoke
  -> DOM-free Market replay smoke proves accepted and rejected parity
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

gameplay domains:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas

Market authority domains needed next:
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

deferred domains:
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

## Services the current kits offer

```txt
kit-runtime:
  install kits
  register domains
  route commands by domain id and type
  emit frame-tagged events
  tick domains
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit:
  create screen-specific domains
  normalize configured actions
  track selected index
  mutate simple fields
  emit selection, field, and action-request events
  expose screen snapshots with action metadata

interface-composition-kit:
  track active screen and previous screen
  transition and back navigation
  activate current screen actions
  dispatch nested action commands
  route outcome when active-session ends
  expose activeSnapshot

resource-ledger-kit:
  store resource values
  check affordability with canPay
  pay resource costs
  add resource values
  expose values and last marker

pressure-field-kit:
  store pressure channels
  adjust pressure with clamps
  tick rowPressure and curse pressure
  expose channel snapshots

orchard-world-kit:
  build tree grid
  seed apples randomly
  collect nearest apple by point and radius
  reseed apples after collection
  expose trees, apples, and bounds

construction-runtime-kit:
  expose build catalog
  pay build costs through resource-ledger
  append built item records
  expose build messages and snapshots

roster-runtime-kit:
  expose actor and role lists
  pay hire costs through resource-ledger
  append hired actor records
  expose roster messages and snapshots

inventory-runtime-kit:
  store items and equipped id
  equip existing item ids by command
  expose inventory snapshots

active-session-domain-kit:
  store day, phase, player, pests, score, message, and ended state
  move player
  collect apples through orchard-world and resource-ledger
  clear nearby pests
  advance day/night phase
  spawn night pests
  resolve pest pursuit and player damage
  expose active-session snapshots

world-canvas-render-kit:
  resize canvas
  render orchard trees
  render apples
  render pests
  render player

html-interface-render-kit:
  render HUD stat strip
  render active-session command buttons
  render generic screen panels
  render built, roster, inventory, and outcome cards
  bridge DOM clicks into runtime commands

game-host-diagnostics-kit:
  expose engine reference
  expose getState
  expose tick

smoke-fixture-kit:
  create game without DOM
  assert entry screen
  assert play transition
  assert orchard apples exist
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

## Source seams to protect

```txt
src/kits/runtime.js:
  engine.command already returns command results, but no central journal exists.
  Preserve accepted/rejected shape and add metadata additively.

src/kits/scoped-interface-domains.js:
  actions already carry id, label, to, command, disabled, and description.
  Add exchange action payloads without breaking generic screen snapshots.

src/kits/composition.js:
  nested command result is currently discarded.
  Store and return nested results as lastResult while preserving screen transition behavior.

src/kits/game-domains.js:
  resource-ledger values must remain snapshot-compatible.
  Add transactions and lastTransaction without changing values/canPay/pay/add.
  inventory-runtime needs purchase intake without breaking equip.

src/presets/orchard-preset.js:
  exchange currently only has Back.
  Add stable sell/buy/back action ids and command payloads.

src/renderer/html-interface-renderer.js:
  active-session HUD must stay unchanged.
  Add a specific exchange branch that reads Market projection from snapshots.

src/start.js:
  window.GameHost must keep engine/getState/tick.
  Add dispatch, diagnostics, snapshot helpers, history helpers, and runSmoke additively.

tests/smoke.mjs:
  Keep existing entry/play/apple checks.
  Add deterministic Market accepted/rejected replay cases.
```

## Recommended next work

```txt
Zombie Orchard Market Command Replay Harness + Transaction Projection Gate
```

Build order:

```txt
preserve current static host, active-session HUD, canvas renderer, and snapshot["resource-ledger"].values
-> add stable Market action ids: sell-apples, buy-basic-tool, buy-row-supply, back
-> add Market command constants and action-to-command normalization helpers
-> add deterministic price rows for apple sell, basic tool buy, and row supply buy
-> add deterministic capacity rows for money, apples, tools, supplies, wood, and scrap
-> add MarketCommandEnvelope records with id, type, source, itemId, quantity, frame, elapsed, and rawActionId
-> add MarketSourceSnapshot from ledger, inventory, price, capacity, frame, elapsed, and active screen
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
-> extend GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> add DOM-free Market replay smoke for accepted and rejected cases
-> defer workers, saves, codex, seeded replay, render-plan extraction, and settlement parity
```

Acceptance target:

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

No runtime source files changed in this pass. This was a documentation and planning update only.
