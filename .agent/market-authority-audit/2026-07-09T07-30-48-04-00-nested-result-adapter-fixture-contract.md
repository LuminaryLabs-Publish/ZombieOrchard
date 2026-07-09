# ZombieOrchard Market Authority Audit: Nested Result Adapter Fixture Contract

**Timestamp:** `2026-07-09T07-30-48-04-00`

## Problem statement

`engine.command()` already returns result objects, but the current interface composition path discards nested command results.

Current behavior:

```txt
interface-composition.activate
  -> active interface domain returns { accepted: true, action }
  -> if action.command exists, ctx.engine.command(...) runs
  -> nested command result is ignored
  -> snapshot returns active, previous, activeSnapshot only
```

## Contract goal

Create a consumer-safe Market authority path that retains command results without replacing the runtime.

## Source-owned contracts

```txt
MarketActionCatalog:
  action rows and labels

MarketCommandSourceManifest:
  stable prices, outputs, capacity policy, reason catalog

MarketCommandEnvelope:
  normalized command request from action id

MarketSourceSnapshot:
  before/after resources, inventory, prices, capacity, active screen

MarketPreflight:
  deterministic accepted/rejected decision before mutation

MarketCommandResult:
  stable result record with command id, accepted, reason, before, after, transaction

TransactionRecord:
  resource and inventory deltas for accepted commands

InterfaceNestedResultAdapter:
  captures nested result and normalizes it for interface-composition snapshot.lastResult

MarketResultProjection:
  render-facing Market summary

MarketRenderReadback:
  renderer-facing proof row

MarketFixtureReplay:
  DOM-free accepted/rejected/no-mutation/nested-result proof
```

## Required compatibility

```txt
snapshot["interface-composition"].active: unchanged
snapshot["interface-composition"].previous: unchanged
snapshot["interface-composition"].activeSnapshot: unchanged
snapshot["resource-ledger"].values: unchanged shape
window.GameHost.engine: unchanged
window.GameHost.getState(): unchanged base behavior
window.GameHost.tick(dt): unchanged
```

## Additive readback

The next pass may add:

```txt
snapshot["interface-composition"].lastResult
snapshot["interface-composition"].lastNestedResult
snapshot["exchange"].marketProjection
window.GameHost.getState().marketDiagnostics
```

Only additive keys are allowed for this source cut.

## Fixture rows

```txt
row 1: sell-apples accepted
row 2: sell-apples rejected because missing-apples
row 3: buy-basic-tool accepted
row 4: buy-basic-tool rejected because missing-money
row 5: unknown action rejected
row 6: interface-composition nested result retained
row 7: renderer projection created
row 8: GameHost diagnostics include latest Market result
```

## Stop condition

The fixture is acceptable when it proves nested result retention and transaction/no-mutation behavior without DOM, canvas, localStorage, network, browser timing, or renderer rewrite.
