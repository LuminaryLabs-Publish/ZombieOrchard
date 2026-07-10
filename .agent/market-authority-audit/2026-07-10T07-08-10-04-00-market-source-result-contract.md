# Market authority audit — source/result contract

Timestamp: `2026-07-10T07-08-10-04-00`

## Authority status

Market authority is not source-owned yet. Exchange exists as an interface/domain concept, and the engine already has command result behavior, but there is no durable Market source manifest or transaction-result contract.

## Contract to add

```txt
MarketAction
  id
  label
  command
  source
  price
  capacityPolicy
  inventoryEffect
  resourceEffect

MarketPreflight
  actionId
  accepted
  reasonCode
  priceSnapshot
  resourceSnapshot
  capacitySnapshot

MarketCommandResult
  actionId
  commandId
  status
  reasonCode
  before
  after
  resourceDelta
  inventoryDelta
  compatibilityOutput
  compatibilityError

MarketExchangeResultLedger
  ordered rows from nested interface activation through final projection
```

## Reason catalog

Initial reason codes should include at least:

```txt
accepted
unknown_market_action
insufficient_resource
inventory_capacity_full
invalid_command
no_market_context
no_mutation
```

## Fixture contract

A DOM-free fixture should be able to run Market rows without a browser and assert:

```txt
accepted purchase row
rejected insufficient-resource row
nested action result retained
resource transaction captured
inventory intake captured
Exchange projection row produced
GameHost-compatible diagnostics shape produced
legacy engine.command compatibility preserved
```
