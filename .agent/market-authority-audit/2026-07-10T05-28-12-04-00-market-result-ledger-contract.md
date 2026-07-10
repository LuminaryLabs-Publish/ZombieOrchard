# Market Authority Audit: Market Result Ledger Contract

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Goal

Make Market actions source-owned, result-owned, and fixture-readable before expanding the economy.

## Required authority rows

```txt
MarketActionCatalog
MarketActionIdCatalog
MarketCommandSourceManifest
MarketCommandEnvelope
MarketSourceSnapshotBefore
MarketPreflight
MarketCommandResult
MarketSourceSnapshotAfter
MarketCommandJournal
MarketResultJournal
ResourceTransactionHistory
InventoryPurchaseIntake
InterfaceNestedResultAdapter
MarketResultProjection
MarketRenderReadback
MarketGameHostDiagnostics
MarketFixtureReplay
```

## Stable action ids

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Stable rejection reasons

```txt
missing-action
insufficient-apples
insufficient-money
inventory-capacity-full
missing-resource-ledger
missing-inventory-runtime
not-market-screen
```

## Minimum result shape

```txt
{
  id,
  actionId,
  status: "accepted" | "rejected",
  reason,
  resourceDelta,
  inventoryDelta,
  before,
  after,
  transactionRows,
  intakeRows
}
```

## Compatibility rule

Do not replace `createKitRuntime`.

Do not remove raw `engine.snapshot()` fields.

Add Market diagnostics as additive readback.
