# ZombieOrchard Market Authority Audit: Command Result Contract

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Authority goal

Create a source-owned Market path that proves each action as a command row, not just a UI click.

## Required contracts

```txt
MarketActionCatalog:
  sell-apples
  buy-basic-tool
  buy-row-supply
  back

MarketCommandSourceManifest:
  action id
  label
  command type
  source domain
  price source
  inventory target
  expected mutation

MarketCommandEnvelope:
  id
  type
  actionId
  source
  resourceDelta
  inventoryDelta
  expectedMutation
  timestamp/frame fields if available

MarketSourceSnapshot:
  resources
  inventory
  prices
  capacity
  active screen

MarketPreflight:
  accepted boolean
  stable reason code
  human label

MarketCommandResult:
  accepted/rejected
  reason
  before snapshot
  after snapshot
  mutation summary
  transaction rows
  intake rows

MarketCommandJournal / MarketResultJournal:
  ordered records for fixture replay
```

## Current gap

The repo has resource and inventory domains, but Market does not source-own actions, preflight them, create result rows, retain nested results, or expose diagnostics.

## Accepted rows needed

```txt
sell-apples accepted -> money increases, apples decreases, transaction row appended
buy-basic-tool accepted -> money decreases, inventory item appended, intake row appended
buy-row-supply accepted -> money decreases, capacity/intake row appended
```

## Rejected rows needed

```txt
sell-apples rejected_no_inventory -> no resource mutation
buy-basic-tool rejected_insufficient_money -> no resource or inventory mutation
buy-row-supply rejected_capacity_full -> no resource or inventory mutation
unknown action rejected_unknown_action -> no mutation
```

## GameHost readback needed

```txt
window.GameHost.getState().marketDiagnostics = {
  actionCatalog,
  lastCommand,
  lastResult,
  commandJournalCount,
  resultJournalCount,
  transactionCount,
  intakeCount,
  fixtureStatus
}
```

## Main finding

Market authority should be additive and fixture-first. Do not rewrite `createKitRuntime`; use its existing result-returning command path and make the Market result rows durable.
