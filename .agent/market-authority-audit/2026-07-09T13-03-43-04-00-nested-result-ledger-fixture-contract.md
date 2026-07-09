# ZombieOrchard Market Authority Audit: Nested Result Ledger Fixture Contract

**Timestamp:** `2026-07-09T13-03-43-04-00`

## Contract target

Market authority should be source-owned, result-first, replayable, and compatible with the current browser route.

The next implementation must add proof around Market actions without replacing `createKitRuntime`, `createOrchardGame`, `world-canvas`, or the existing HTML renderer fallback.

## Required source records

```txt
MarketActionCatalog
  id
  label
  description
  commandType
  priceRef
  capacityRef
  resourceDelta
  inventoryDelta

MarketCommandSourceManifest
  version
  actionIds[]
  rejectionReasons[]
  priceSource
  capacitySource

MarketCommandEnvelope
  id
  frame
  actionId
  commandType
  source
  expectedMutation

MarketSourceSnapshot
  resources
  inventory
  prices
  capacity
  activeScreen
```

## Required result records

```txt
MarketPreflight
  accepted
  reason
  actionId
  affordability
  capacity

MarketCommandResult
  accepted
  reason
  actionId
  envelopeId
  beforeHash
  afterHash
  resourceDelta
  inventoryDelta
  transactionId

MarketCommandJournal
  rows[]

MarketResultJournal
  rows[]

ResourceTransactionHistory
  rows[]

InventoryPurchaseIntake
  rows[]
```

## Nested-result adapter requirement

Current `interface-composition` may call:

```txt
ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})
```

That nested result is currently discarded.

The next ledge needs an `interface-nested-result-adapter-kit` that preserves compatibility while adding:

```txt
snapshot().lastResult
snapshot().lastNestedCommand
snapshot().lastNestedResult
snapshot().lastMarketResult
```

## Fixture acceptance criteria

```txt
accepted sell:
  - result.accepted === true
  - money increases
  - apples decreases
  - transaction row added
  - nested result retained

accepted buy:
  - result.accepted === true
  - money decreases
  - inventory item added
  - transaction row added
  - nested result retained

rejected insufficient-resource:
  - result.accepted === false
  - reason === insufficient-resource
  - resources unchanged
  - inventory unchanged
  - rejection journal row added

rejected capacity:
  - result.accepted === false
  - reason === capacity-full
  - resources unchanged
  - inventory unchanged
  - rejection journal row added
```

## Compatibility rules

```txt
- Keep engine.command return shape compatible.
- Keep current raw engine snapshot accessible.
- Keep existing active-session HUD route intact.
- Keep generic screen fallback intact.
- Add Market diagnostics additively.
```
