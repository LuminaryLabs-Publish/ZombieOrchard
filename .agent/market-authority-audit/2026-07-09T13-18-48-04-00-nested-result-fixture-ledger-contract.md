# ZombieOrchard Market Authority Audit: Nested Result Fixture Ledger Contract

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Authority status

Market authority is not source-owned yet.

The current `exchange` domain is descriptor-only and has no action catalog beyond Back. The runtime can route commands and return command results, but Market-specific accepted/rejected rows do not exist.

## Required source-owned contract

```txt
MarketActionCatalog:
  stable action ids
  labels
  command type
  price/source rows
  inventory/resource deltas
  rejection reason ids

MarketCommandEnvelope:
  command id
  action id
  command type
  source screen
  expected resource delta
  expected inventory delta
  expected mutation flag

MarketSourceSnapshot:
  resources
  inventory
  prices
  capacity
  active screen
  prior transactions

MarketPreflight:
  accepted boolean
  reason id
  required resource rows
  capacity rows
  projected mutation summary

MarketCommandResult:
  result id
  command id
  accepted boolean
  reason id
  before snapshot id
  after snapshot id
  mutation summary

MarketCommandJournal / MarketResultJournal:
  append-only fixture-readable rows
```

## Required mutation rules

```txt
accepted sell-apples:
  apples decreases
  money increases
  transaction appended

accepted buy-basic-tool:
  money decreases
  inventory item appended or equipped
  transaction appended

rejected insufficient-resource:
  resources unchanged
  inventory unchanged
  rejected reason stable
  no transaction appended unless rejection journal is separate

rejected capacity:
  resources unchanged
  inventory unchanged
  rejected reason stable
```

## Adapter requirement

`interface-composition` must remain backward-compatible while retaining nested command results:

```txt
old behavior:
  action.command may run
  transitions still work
  snapshots still expose active/previous/activeSnapshot

new additive behavior:
  nested result retained
  lastResult exposed
  MarketResultProjection can consume it
  GameHost can read it
```

## Central ledger requirement

After source implementation, the central `LuminaryLabs-Dev/LuminaryLabs` ledger must point to the same tracker timestamp as the repo-local `.agent` state. This run documents the gap and syncs the current docs-only state.
