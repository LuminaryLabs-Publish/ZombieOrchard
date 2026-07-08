# ZombieOrchard Gameplay Audit: Market Command Replay Fixture

**Timestamp:** `2026-07-08T03-08-39-04-00`

## Current Market state

The active session has a `Market` action that transitions to the `exchange` screen.

The `exchange` screen currently only exposes `Back`.

There is no current market transaction authority.

## Target Market loop

```txt
active-session Market action
-> exchange screen
-> Sell Apples / Buy Basic Tool / Buy Row Supply / Back
-> action id normalized into MarketActionId
-> command wrapped in MarketCommandEnvelope
-> source snapshot captured from resources, inventory, price rows, capacity rows, active screen, frame, elapsed
-> market preflight returns accepted/rejected result
-> accepted result mutates resource-ledger and/or inventory-runtime
-> transaction record appended
-> rejected result does not mutate resources or inventory
-> command result journal records both accepted and rejected commands
-> interface-composition exposes nested command result as lastResult
-> exchange renderer reads MarketResultProjection from snapshot only
-> DOM-free smoke fixture proves parity
```

## Stable action IDs needed

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Stable rejection reasons needed

```txt
no_apples
insufficient_funds
inventory_capacity_full
unknown_market_action
missing_resource_ledger
missing_inventory_runtime
```

## Fixture matrix

```txt
1. sell-apples accepted when apples > 0
2. sell-apples rejected when apples = 0
3. buy-basic-tool accepted with enough money
4. buy-basic-tool rejected with insufficient funds
5. buy-row-supply accepted with enough money
6. buy command rejected when capacity is full
7. unknown action rejected with stable reason
8. rejected command does not mutate resources
9. accepted command appends transaction
10. interface-composition exposes nested result
```

## Stop condition for next implementation

A single DOM-free smoke file can create the game, route to Market, dispatch each fixture action, and verify result shape, resource mutation/non-mutation, transaction history, and nested result projection.
