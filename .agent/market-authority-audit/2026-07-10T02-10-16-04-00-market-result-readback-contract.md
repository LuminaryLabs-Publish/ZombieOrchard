# ZombieOrchard Market Authority Audit: Result Readback Contract

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Contract goal

Make Exchange/Market actions source-owned, result-first, renderer-readable, GameHost-readable, fixture-verifiable, and centrally tracked.

## Required source contracts

```txt
MarketActionCatalog:
  sell-apples
  buy-basic-tool
  buy-row-supply
  back

MarketCommandSourceManifest:
  action id
  label
  command domain
  command type
  payload
  price source
  capacity policy
  expected mutation

MarketCommandEnvelope:
  id
  actionId
  screen
  commandDomain
  commandType
  payload
  expectedMutation

MarketSourceSnapshot:
  resources
  inventory
  prices
  capacity
  activeScreen
```

## Required result contracts

```txt
MarketPreflight:
  accepted boolean
  reason code
  before snapshot

MarketCommandResult:
  status: accepted | rejected
  reason
  before snapshot
  after snapshot
  resourceDelta
  inventoryDelta
  transactionRows
  intakeRows
  noMutationProof for rejected rows

MarketResultJournal:
  ordered rows of command envelopes and command results
```

## Required readback contracts

```txt
interface-composition.snapshot().lastResult
html-interface-renderer market projection
marketRenderReadback
window.GameHost.getState().marketDiagnostics
DOM-free market fixture replay
central ledger latest tracker parity
```

## Why this comes first

The orchard runtime already composes domains and returns command results. The Market authority layer should use that existing runtime instead of replacing it.
