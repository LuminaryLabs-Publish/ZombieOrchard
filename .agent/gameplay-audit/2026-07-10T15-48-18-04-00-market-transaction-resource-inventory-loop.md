# Gameplay audit: Market transaction resource/inventory loop

Timestamp: `2026-07-10T15-48-18-04-00`

## Current gameplay loop

```txt
enter active session
  -> move in orchard
  -> collect nearby apples
  -> gain apples and money
  -> clear pests for score and scrap
  -> advance day/night phase
  -> survive pest pressure
  -> open construction/market/roster/inventory/codex screens
```

## Current resource mutation paths

- Apple collection directly calls `resource-ledger.api.add(...)`.
- Construction directly calls `resource-ledger.api.pay(...)` and receives a boolean.
- Roster hiring directly calls `resource-ledger.api.pay(...)` and receives a boolean.
- Inventory supports equip only.
- Exchange has no buy/sell action.

## Market loop required before expansion

```txt
open Exchange
  -> inspect source-owned catalog
  -> choose stable Market action
  -> preflight price, affordability, and inventory capacity
  -> reject with no mutation and stable reason
     or
  -> create resource transaction
  -> create inventory intake
  -> return one correlated Market result
  -> project result into Exchange
  -> preserve result across render/readback
```

## Atomicity requirement

A purchase must not spend resources unless intake can succeed. The proof contract should show one of:

```txt
accepted + resource mutation + inventory mutation
rejected + no resource mutation + no inventory mutation
rolled_back + compensating resource row + no net mutation
```

The simplest first cut is preflight-first atomic acceptance, avoiding rollback.

## Deterministic fixture cases

1. Purchase accepted with sufficient money and capacity.
2. Purchase rejected for insufficient money.
3. Purchase rejected for inventory capacity.
4. Unknown Market action rejected.
5. Duplicate command ID rejected or replayed idempotently without double spending.
6. Parent interface result retains the exact child result.
7. Accepted result points to resource and inventory rows.
8. Rejected result proves no mutation.

## Gameplay conclusion

The Market should first become a deterministic, auditable transaction loop. Content breadth and economy tuning should follow only after accepted and rejected paths are fixture-proven.