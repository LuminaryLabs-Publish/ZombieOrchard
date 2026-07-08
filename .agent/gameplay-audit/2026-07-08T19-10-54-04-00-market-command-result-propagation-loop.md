# ZombieOrchard Gameplay Audit: Market Command Result Propagation Loop

**Timestamp:** `2026-07-08T19-10-54-04-00`

## Purpose

Document the gameplay loop that should become fixture-readable when Market commands are implemented.

## Current gameplay loop

```txt
Entry
  -> Play
  -> active-session
  -> move/collect/clear/next-phase through direct active-session commands
  -> Build screen can call construction-runtime build through nested action.command
  -> Market screen exists as exchange
  -> exchange currently only supports Back
  -> Roster/Inventory/Codex/Settings are generic panels
  -> session ends when active-session condition reaches zero
  -> outcome screen
```

## Current result path

```txt
button[data-action]
  -> html-interface-renderer
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen command("activate") returns { accepted, action }
  -> interface-composition dispatches action.command through ctx.engine.command(...)
  -> nested command result is not stored
  -> transition may happen
  -> interface-composition returns generic accepted result
```

The runtime command router can return results, but the gameplay route loses nested results at the interface-composition layer.

## Target Market loop

```txt
active-session
  -> Market action
  -> exchange screen
  -> sell-apples / buy-basic-tool / buy-row-supply action
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> TransactionRecord when accepted
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> MarketSourceSnapshot after
  -> nested result retained by interface-composition
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> exchange renderer readback
  -> GameHost-compatible diagnostics
```

## Required command cases

```txt
sell-apples:
  accepted when apples > 0 and quantity is valid
  rejected when apples = 0
  rejected when quantity invalid

buy-basic-tool:
  accepted when money >= price and capacity available
  rejected when money insufficient
  rejected when capacity full

buy-row-supply:
  accepted when money >= price and capacity available
  rejected when money insufficient
  rejected when capacity full

unknown-market-command:
  rejected with stable reason
  no mutation
```

## Required result fields

```txt
MarketCommandResult {
  id: string,
  commandId: string,
  commandType: string,
  actionId: string,
  accepted: boolean,
  reason: string | null,
  sourceBefore: MarketSourceSnapshot,
  sourceAfter: MarketSourceSnapshot,
  mutation: {
    resourcesDelta: object,
    inventoryDelta: object,
    transactionId: string | null
  },
  projection: MarketResultProjection,
  journalIndex: number
}
```

## Gameplay invariants

```txt
active-session Collect/Clear/Next Phase stay direct active-session commands.
Market commands stay inside Market authority.
Rejected Market commands do not mutate resources or inventory.
Accepted Market commands append transaction history.
Back still returns to active-session.
Entry -> Play remains unchanged.
Build/Roster/Inventory/Codex/Settings remain reachable.
Outcome remains reachable.
```

## Next safe ledge

```txt
ZombieOrchard Market Command Source Manifest + Nested Result Consumer Fixture Gate
```
