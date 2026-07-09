# ZombieOrchard Market Authority Audit: Market Result Ledger Central Sync Contract

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Authority question

Which layer owns Market action truth, result truth, and readback truth?

## Current state

```txt
orchard-preset.js
  -> active-session action `market` routes to exchange
  -> exchange only exposes Back

scoped-interface-domains.js
  -> screen domains return action descriptors

composition.js
  -> interface-composition activates current screen action
  -> nested action.command may call ctx.engine.command(...)
  -> nested result is discarded

html-interface-renderer.js
  -> active-session has special HUD rendering
  -> exchange has no special Market projection

start.js
  -> GameHost exposes engine/getState/tick only
```

## Required authority records

```txt
MarketActionCatalog
  -> stable action IDs and labels

MarketCommandSourceManifest
  -> source-owned price, capacity, command, and reason metadata

MarketCommandEnvelope
  -> normalized domain/type/payload/action/source row

MarketSourceSnapshot
  -> before/after resources, inventory, market capacity, active screen

MarketPreflight
  -> accepted/rejected reason before mutation

MarketCommandResult
  -> stable result object with accepted, changed, reason, commandId, transactionId

MarketCommandJournal
  -> command history row

MarketResultJournal
  -> result history row

TransactionRecord
  -> accepted resource/inventory delta

InterfaceNestedResultAdapter
  -> preserves nested command result in interface-composition

MarketResultProjection
  -> renderer-facing view model

MarketRenderReadback
  -> proof renderer consumed Market projection

MarketGameHostDiagnostics
  -> fixture-readable host surface
```

## Compatibility constraints

```txt
Do not remove window.GameHost.engine.
Do not remove window.GameHost.getState.
Do not remove window.GameHost.tick.
Do not break active-session HUD.
Do not break generic screen rendering.
Do not change existing resource-ledger value shape.
Do not require DOM/canvas/browser state in the fixture.
```

## Central sync constraint

After Market result proof lands, update `LuminaryLabs-Dev/LuminaryLabs` immediately so the repo ledger points at the same tracker, turn ledger, kit registry, fixture, and audit files.

## Next safe ledge

```txt
ZombieOrchard Market Result Ledger Central Sync + Exchange Transaction Fixture Gate
```
