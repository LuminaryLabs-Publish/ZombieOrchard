# Market Authority Audit — Market Result Readback Fixture Contract

**Timestamp:** `2026-07-09T02-05-52-04-00`

## Authority statement

Market authority should live in source-owned result contracts, not in renderer conditionals or ad hoc interface actions.

The current runtime already has enough composition to host this cleanly. The missing contract is result retention and readback.

## Current blocker

```txt
interface-composition.activate
  -> asks active interface domain for selected action
  -> gets { accepted: true, action }
  -> if action.command exists, calls ctx.engine.command(...)
  -> ignores nested result
  -> returns move(next) or { accepted: true }
```

Because the nested command result is ignored, the route cannot prove accepted/rejected Market outcomes through fixture rows.

## Required source-owned records

```txt
MarketActionId
MarketCommandSourceRow
MarketCommandEnvelope
MarketSourceSnapshot
MarketPreflightResult
MarketCommandResult
MarketRejectionReason
MarketCommandJournalRow
MarketResultJournalRow
TransactionRecord
InventoryIntakeRecord
InterfaceNestedResult
MarketProjection
MarketRenderReadback
MarketGameHostDiagnostics
```

## Acceptance matrix

| Row | Expected result | Mutation | Projection | Readback |
| --- | --- | --- | --- | --- |
| `exchange-back` | accepted transition | no economy mutation | back result or no-op | transition readback |
| `sell-apples-ok` | accepted | apples down / money up | accepted row | renderer consumed |
| `sell-apples-none` | rejected | no mutation | rejected reason | renderer consumed |
| `buy-basic-tool-ok` | accepted | money down / inventory up | accepted row | renderer consumed |
| `buy-basic-tool-poor` | rejected | no mutation | rejected reason | renderer consumed |
| `buy-row-supply-ok` | accepted | money down / capacity or inventory up | accepted row | renderer consumed |
| `buy-row-supply-full` | rejected | no mutation | rejected reason | renderer consumed |

## Compatibility rules

```txt
- Preserve window.GameHost.engine.
- Preserve window.GameHost.getState().
- Preserve window.GameHost.tick(dt).
- Preserve engine.command(domainId, type, payload) return shape.
- Preserve current active-session HUD.
- Preserve generic screen rendering for non-exchange screens.
- Preserve resource-ledger snapshot values.
- Preserve inventory-runtime snapshot items.
```

## Proposed additive host diagnostics

```txt
window.GameHost.getState().market = {
  active: snapshot["interface-composition"]?.active === "exchange",
  sourceManifestVersion,
  lastEnvelope,
  lastResult,
  lastProjection,
  lastRenderReadback,
  commandJournalLength,
  resultJournalLength,
  transactionCount,
  fixtureReady
}
```

## Fixture stop condition

The ledge is done only when a DOM-free script can create the engine, walk into exchange, execute Market rows, and verify:

```txt
accepted rows mutate exactly once
rejected rows do not mutate
nested command result is retained
interface-composition snapshot exposes lastResult
exchange projection consumes lastResult
render readback records consumption
GameHost exposes market diagnostics
legacy route still works
```
