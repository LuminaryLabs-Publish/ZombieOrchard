# Market Authority Audit — Nested Result Source Contract

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Purpose

Define the exact source contract needed before implementing Market transactions.

The app already has command-returning domains. The missing piece is a durable Market result pipeline that survives nested dispatch through `interface-composition`, can be rendered as a projection, and can be replayed without DOM state.

## Contract objects

```txt
MarketActionId:
  sell-apples
  buy-basic-tool
  buy-row-supply
  back

MarketCommandEnvelope:
  id
  type
  actionId
  quantity
  source
  requestedAtFrame
  requestedAtElapsed

MarketSourceSnapshot:
  id
  resources
  inventory
  prices
  capacity
  activeScreen
  transactionCount

MarketPreflight:
  accepted
  reason
  cost
  gain
  item
  quantity

MarketCommandResult:
  id
  envelope
  accepted
  reason
  before
  after
  mutation
  transactionId
  projectionId

TransactionRecord:
  id
  kind
  resourceDelta
  itemDelta
  label
  frame
  elapsed

MarketCommandJournalEntry:
  id
  envelopeId
  actionId
  accepted
  reason
  frame

MarketResultJournalEntry:
  id
  resultId
  transactionId
  beforeId
  afterId
  accepted
  reason

MarketResultProjection:
  id
  resourceRows
  priceRows
  capacityRows
  actionRows
  latestResultRow
  transactionRows

MarketRenderReadback:
  projectionId
  consumedRows
  missingRows
  unsupportedRows
  fallbackRows
```

## Nested result propagation target

Current behavior:

```txt
interface-composition.activate
  -> active screen command("activate")
  -> action.command exists
  -> ctx.engine.command(...)
  -> nested result is discarded
  -> activate returns { accepted: true } or navigation result
```

Target behavior:

```txt
interface-composition.activate
  -> active screen command("activate")
  -> action.command exists
  -> ctx.engine.command(...)
  -> nested result retained
  -> activate returns { accepted, action, nestedResult, navigationResult }
  -> snapshot exposes lastResult
  -> MarketResultProjection can include latest result
```

## Market authority rows

```txt
accepted.sell-apples:
  apples decrease
  money increases
  transaction appended
  journals appended

rejected.sell-apples.no-apples:
  resources unchanged
  inventory unchanged
  no transaction appended
  journals appended

accepted.buy-basic-tool:
  money decreases
  inventory item appended
  transaction appended
  journals appended

rejected.buy-basic-tool.insufficient-funds:
  resources unchanged
  inventory unchanged
  no transaction appended
  journals appended

accepted.buy-row-supply:
  money decreases
  item/supply appended
  transaction appended
  journals appended

rejected.buy.capacity-full:
  resources unchanged
  inventory unchanged
  no transaction appended
  journals appended
```

## No-mutation proof rule

A rejected Market command is only valid when:

```txt
before.resources === after.resources
before.inventory === after.inventory
before.transactionCount === after.transactionCount
result.accepted === false
result.reason is stable
journal rows exist
```

## Implementation boundary

Implement source modules first.

Then splice into:

```txt
src/presets/orchard-preset.js
src/kits/game-domains.js
src/kits/composition.js
src/renderer/html-interface-renderer.js
src/start.js optional GameHost diagnostics
```

Do not rewrite `src/kits/runtime.js` unless a fixture proves the current command API cannot preserve the nested result.
