# Zombie Orchard Project Breakdown - 2026-07-07T23:48:44-04:00

## Selection

`LuminaryLabs-Publish/ZombieOrchard` was selected for this breakdown because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible tracked repo in `LuminaryLabs-Publish` after the latest `IntoTheMeadow` pass.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible central ledger timestamps checked:

```txt
ZombieOrchard    2026-07-07T22:31:24-04:00  selected
HorrorCorridor   2026-07-07T22:41:23-04:00
TheOpenAbove     2026-07-07T22:50:39-04:00
AetherVale       2026-07-07T22:59:19-04:00
PhantomCommand   2026-07-07T23:09:45-04:00
PrehistoricRush  2026-07-07T23:21:18-04:00
MyCozyIsland     2026-07-07T23:31:44-04:00
IntoTheMeadow    2026-07-07T23:40:40-04:00
TheCavalryOfRome excluded
```

## Current source read

`ZombieOrchard` is a standalone static orchard survival/economy browser game. The project is already kit-composed: `src/game.js` installs the runtime kit, generated scoped interface domains, interface composition, resource ledger, pressure field, orchard world, construction runtime, roster runtime, inventory runtime, active session, canvas renderer, HTML renderer, and smoke fixture.

The current blocker is not visual wiring. It is Market authority. The Market route exists, but `exchange` only exposes `Back`; Market sell/buy commands do not exist; the composition layer dispatches nested commands without returning or storing nested results; resource ledger snapshots have no transaction history; inventory runtime has no purchase intake; the HTML renderer has no exchange-specific projection branch; `window.GameHost` only exposes `engine`, `getState`, and `tick`; and the smoke test only proves entry, play transition, and apple existence.

## Interaction loop

### Current runtime loop

```txt
index.html
-> src/boot.js imports src/start.js
-> src/start.js creates createOrchardGame()
-> src/start.js creates createWorldCanvas(document.querySelector("#world"))
-> src/start.js creates createHtmlInterfaceRenderer({ root, engine })
-> src/game.js installs current kits
-> requestAnimationFrame draw() calls engine.tick(1 / 60)
-> runtime increments ctx.delta, ctx.elapsed, ctx.frame
-> tickable domains update pressure and active-session state
-> engine.snapshot() aggregates every domain snapshot
-> world-canvas renders orchard trees, apples, player, and session entities
-> html-interface-renderer renders active-session HUD or the active interface screen
-> click[data-action] dispatches interface-composition.activate
-> click[data-command] dispatches active-session command directly
-> window.GameHost exposes engine/getState/tick
```

### Current player loop

```txt
entry screen
-> Play transitions to active-session
-> HUD shows day, phase, money, apples, wood, pressure, condition
-> player can Collect, Clear, Next Phase, Pause, Build, Market, Roster, Inventory, Codex
-> Collect resolves nearest apple and mutates apples/money/pressure/score
-> Clear resolves nearby pest row cleanup
-> Next Phase swaps day/night and increments day on morning
-> Market opens exchange screen
-> exchange screen currently only offers Back
-> session ends when player condition reaches 0
-> outcome screen shows score/day summary
```

### Target Market transaction fixture loop

```txt
active-session Market action
-> interface-composition transitions active screen to exchange
-> exchange screen exposes Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
-> exchange action creates MarketCommandEnvelope
-> MarketSourceSnapshot captures frame, elapsed, active screen, resources, inventory, prices, capacity, and current action
-> market-preflight returns accepted/rejected with stable reason
-> accepted sell mutates resource-ledger and appends market_sell transaction
-> accepted buy mutates resource-ledger and inventory-runtime purchase intake, then appends market_buy transaction
-> rejected command appends MarketCommandResult with no resource or inventory mutation
-> interface-composition stores nested result as lastResult
-> MarketResultProjection exposes action rows, price rows, capacity rows, latest result, disabled reasons, and recent transactions
-> exchange renderer consumes projection from snapshot only
-> GameHost exposes market diagnostics and fixture helpers
-> DOM-free smoke proves accepted/rejected replay parity
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
  inventory-purchase-intake
  purchase-intake-contract
  market-result-projection
  interface-nested-result
  exchange-renderer-authority
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

## Services the kits offer

### Current services

```txt
kit-runtime:
  install kits
  create domains
  store domain registry
  route commands by domain id and type
  emit frame/elapsed events
  tick domains
  aggregate domain snapshots
  notify subscribers

scoped-interface-domain-kit:
  generate interface domains from preset entries
  store screen title/description/fields/meta
  normalize actions
  select actions
  set fields
  activate selected or addressed actions
  emit actionRequested events
  expose screen snapshots

interface-composition-kit:
  track active and previous screens
  transition to target screens
  back-route to previous or initial screen
  activate current screen action
  dispatch nested action.command calls
  auto-route ended sessions to outcome
  expose active screen snapshot

resource-ledger-kit:
  store money/apples/wood/scrap values
  check affordability with canPay
  pay resource costs
  add resource values
  store last gain/spend marker
  expose resource snapshots

pressure-field-kit:
  store pressure channels
  adjust channels
  tick rowPressure and curse growth
  clamp pressure values
  expose pressure snapshots

orchard-world-kit:
  generate tree grid
  seed apples randomly
  collect nearest apple within radius
  reseed apples after collection
  expose tree/apple/bounds snapshots

construction-runtime-kit:
  expose build catalog
  pay build costs through resource-ledger
  add built object records
  store construction message
  expose build snapshots

roster-runtime-kit:
  expose actors and roles
  hire workers by paying resource-ledger
  store roster message
  expose roster snapshots

inventory-runtime-kit:
  expose item list and equipped id
  equip existing or addressed item ids
  expose inventory snapshots

active-session-domain-kit:
  store day/phase/player/pests/score/message/end state
  activate active-session navigation actions
  move player
  collect apples through orchard-world and resource-ledger
  clear nearby pests
  advance day/night phase
  spawn/move pests at night
  detect outcome condition
  expose active-session snapshots

world-canvas-render-kit:
  resize canvas
  render orchard background
  render tree grid
  render apples
  render player/session entities

html-interface-render-kit:
  render HUD stat strip
  render active-session quick actions
  render generic screen panels
  render construction/roster/inventory/outcome cards
  route data-action and data-command clicks

game-host-diagnostics-kit:
  expose engine
  expose getState()
  expose tick(dt)

smoke-fixture-kit:
  instantiate game
  verify entry screen
  verify Play transition
  verify active session
  verify apples exist
```

### Needed next services

```txt
market-action-id-catalog-kit:
  define sell-apples, buy-basic-tool, buy-row-supply, and back ids
  map action ids to typed Market command records

market-command-envelope-kit:
  build fixture-readable command envelopes
  include id, type, source, itemId, quantity, frame, elapsed, and rawActionId

market-price-source-kit:
  expose deterministic sell/buy price rows
  keep fresh-game price snapshots stable

market-capacity-policy-kit:
  expose deterministic money/apple/tool/supply capacity rows
  return capacity_full reasons before mutation

market-source-snapshot-kit:
  capture resources, inventory, prices, capacity, frame, elapsed, active screen, and command context

market-preflight-kit:
  reject insufficient_inventory
  reject insufficient_funds
  reject capacity_full
  reject unknown_market_command
  return stable reason ids and copy

market-command-result-kit:
  return accepted/rejected result envelopes
  include before/after resource and inventory summary
  include transaction id when accepted

market-command-result-journal-kit:
  append all accepted and rejected results
  expose recent command results for diagnostics and fixtures

transaction-envelope-kit:
  create market_sell and market_buy transaction records
  include resource delta, item delta, provenance, frame, and elapsed

transaction-history-kit:
  preserve resource-ledger values shape
  add transactions and lastTransaction to snapshot

inventory-purchase-intake-kit:
  add purchased basic tool records
  add purchased row supply records
  auto-equip first bought basic tool only when equipped is branch

interface-nested-result-kit:
  return nested command result from interface-composition
  store lastResult in interface-composition snapshot

market-result-projection-kit:
  project action rows, price rows, capacity rows, latest result, disabled reasons, and recent transactions

exchange-renderer-authority-kit:
  render exchange from snapshot projection only
  render result and transaction cards

gamehost-market-diagnostics-kit:
  expose dispatch
  expose getDiagnostics
  expose getPriceSnapshot
  expose getCapacitySnapshot
  expose getTransactionHistory
  expose getCommandJournal
  expose runSmoke

market-smoke-contract-kit:
  prove rejected zero-apple sell
  prove collect then sell
  prove basic-tool purchase
  prove row-supply purchase
  prove insufficient-funds rejection
  prove capacity-full rejection
  prove price/capacity determinism
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
game-host-diagnostics-kit
smoke-fixture-kit
```

### Next-cut kits

```txt
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
save-runtime-kit
codex-progression-kit
outcome-summary-kit
render-plan-kit
settlement-parity-kit
```

## Source-backed findings

```txt
src/game.js:
  createOrchardGame installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition kits.

src/presets/orchard-preset.js:
  active-session includes Market navigation to exchange.
  exchange only contains Back.
  starting resources are money 40, apples 0, wood 12, scrap 3.
  inventory starts with equipped branch and Old Branch item.

src/kits/runtime.js:
  command routing already returns accepted/reason shaped results.
  no command journal or typed diagnostics exists yet.

src/kits/composition.js:
  nested action.command calls are dispatched but their results are discarded.
  snapshot exposes active, previous, and activeSnapshot only.

src/kits/game-domains.js:
  resource-ledger has values, last, canPay, pay, and add.
  resource-ledger has no transactions or lastTransaction.
  inventory-runtime only supports equip.
  active-session owns collect, clear, move, next-phase, and session outcome.

src/renderer/html-interface-renderer.js:
  renderer handles active-session HUD and generic screens.
  no exchange-specific Market projection branch exists.

src/start.js:
  GameHost exposes engine, getState, and tick only.

tests/smoke.mjs:
  smoke covers entry, Play transition, and apple existence only.
```

## Recommended next work

```txt
Zombie Orchard Market Transaction Fixture Matrix + Exchange Projection Acceptance Gate
```

Build order:

```txt
1. Preserve current static route, active-session HUD, world-canvas rendering, and snapshot["resource-ledger"].values.
2. Add source-owned Market action ids and command constants.
3. Extend exchange preset with Sell Apples, Buy Basic Tool, Buy Row Supply, and Back.
4. Add deterministic price and capacity rows.
5. Add MarketCommandEnvelope and MarketSourceSnapshot helpers.
6. Add market preflight with stable rejection reasons.
7. Add accepted/rejected MarketCommandResult records.
8. Add command result journal.
9. Extend resource-ledger with transaction history while preserving existing values/canPay/pay/add behavior.
10. Extend inventory-runtime with purchase intake for basic tools and row supplies.
11. Return nested command result through interface-composition and expose lastResult.
12. Add renderer-ready MarketResultProjection.
13. Add exchange renderer branch that consumes only snapshot projection.
14. Extend GameHost diagnostics and smoke helpers.
15. Add DOM-free fixture matrix for rejected sell, accepted sell, accepted buy, insufficient funds, capacity full, price determinism, and capacity determinism.
```

## Acceptance target

```txt
npm test passes
entry -> play smoke still passes
active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds/equips tool when equipped is branch
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

No runtime source files were changed in this docs-only pass. No local build or smoke test was run.