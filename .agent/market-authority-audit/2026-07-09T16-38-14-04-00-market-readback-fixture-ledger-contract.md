# ZombieOrchard Market Authority Audit: Market Readback Fixture Ledger Contract

**Timestamp:** `2026-07-09T16-38-14-04-00`

## Authority goal

Create a source-owned Market authority that is deterministic, fixture-readable, and renderer-readable.

## Source-owned rows

```txt
MarketActionCatalog:
  sell-apples
  buy-basic-tool
  buy-row-supply
  back

MarketCommandSourceManifest:
  sourceVersion
  actionCatalogVersion
  resourceSourceVersion
  inventorySourceVersion
  priceSourceVersion
  capacitySourceVersion
```

## Command envelope

```json
{
  "id": "market-command-0001",
  "type": "market.sell",
  "actionId": "sell-apples",
  "source": "exchange",
  "resourceDelta": { "apples": -5, "money": 10 },
  "inventoryDelta": [],
  "expectedMutation": true
}
```

## Command result

```json
{
  "id": "market-result-0001",
  "commandId": "market-command-0001",
  "actionId": "sell-apples",
  "status": "accepted",
  "reason": null,
  "before": "source-snapshot-before-id",
  "after": "source-snapshot-after-id",
  "mutated": true,
  "transactions": ["resource-transaction-id"],
  "intake": []
}
```

## Rejection rule

Rejected commands must keep source snapshots stable except for explicit journal/readback rows.

```txt
resources before == resources after
inventory before == inventory after
mutated == false
reason is stable and enumerable
```

## First fixture table

```txt
accepted sell-apples
accepted buy-basic-tool
rejected buy-basic-tool: insufficient-money
rejected buy-row-supply: capacity-blocked
back action: navigation-only / no market mutation
```

## Acceptance gate

This ledge is complete only when `tests/market-result-fixture.mjs` or an equivalent `npm test` entry proves source snapshots, results, transactions/intake, no-mutation rejection, nested result retention, Exchange render readback, and GameHost diagnostics.
