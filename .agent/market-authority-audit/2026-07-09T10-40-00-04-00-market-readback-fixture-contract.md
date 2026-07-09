# ZombieOrchard Market Authority Audit — Readback Fixture Contract

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Contract goal

Make Market commands deterministic, typed, result-backed, renderer-readable, and fixture-verifiable.

## Required source records

```txt
MarketActionCatalog
MarketCommandSourceManifest
MarketCommandEnvelope
MarketSourceSnapshot
MarketPriceSource
MarketCapacityPolicy
MarketPreflight
MarketCommandResult
MarketRejectionReasonCatalog
MarketCommandJournal
MarketResultJournal
ResourceTransactionHistory
InventoryPurchaseIntake
```

## Required adapter/readback records

```txt
InterfaceNestedResultAdapter
MarketResultProjection
MarketRenderReadback
MarketGameHostDiagnostics
MarketFixtureReplay
CentralLedgerReadback
```

## Acceptance criteria

```txt
- Stable action IDs exist for each Exchange action.
- Each Market action becomes a command envelope.
- Each command has a before source snapshot.
- Each command has an after source snapshot.
- Accepted rows mutate resources/inventory exactly once.
- Rejected rows do not mutate resources or inventory.
- Every rejection has a stable reason.
- Every accepted row has a transaction record.
- interface-composition retains nested command result.
- snapshot().lastResult is available without breaking activeSnapshot.
- html-interface-renderer can project Exchange result state.
- render readback reports visible/action/result counts.
- GameHost exposes Market diagnostics additively.
- DOM-free fixture rows prove all of the above.
```

## Explicit non-goals

```txt
- No runtime replacement.
- No renderer replacement.
- No new economy categories.
- No shared-kit promotion.
- No Pages/deploy workflow change.
```
