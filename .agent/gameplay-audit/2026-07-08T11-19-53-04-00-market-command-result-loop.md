# ZombieOrchard Market Command Result Loop

**Timestamp:** `2026-07-08T11-19-53-04-00`

## Goal

Specify the gameplay authority loop for Market actions before implementation.

## Current player loop

```txt
Entry
-> Play
-> Active Session
-> Collect / Clear / Next Phase
-> Build / Market / Roster / Inventory / Codex / Pause
-> Market opens exchange
-> exchange currently only has Back
```

## Current source loop

```txt
html-interface-renderer data-action click
-> engine.command("interface-composition", "activate", { actionId })
-> interface-composition activates current screen action
-> if action.command exists, ctx.engine.command(action.command.domain, action.command.type, action.command.payload)
-> nested result is not retained
-> optional screen transition runs
```

## Current active-session direct command loop

```txt
html-interface-renderer data-command click
-> engine.command("active-session", command)
-> active-session handles collect / clear / next-phase
-> result returns to renderer call site only
-> no journal or projection is exposed
```

## Target Market command loop

```txt
exchange action row
-> MarketCommandEnvelope
-> MarketSourceSnapshot
-> MarketPreflight
-> MarketCommandResult
-> accepted: mutate resource-ledger / inventory-runtime through explicit helpers
-> accepted: append TransactionRecord
-> rejected: no mutation and stable reason
-> MarketResultJournal
-> interface-composition.lastResult
-> MarketResultProjection
-> GameHost market diagnostics
-> DOM-free fixture replay
```

## Required action IDs

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Required rejection reasons

```txt
unknown-market-command
invalid-quantity
insufficient-apples
insufficient-funds
inventory-capacity-full
missing-resource-ledger
missing-inventory-runtime
source-snapshot-unavailable
```

## Required result shape

```txt
{
  accepted: boolean,
  commandId: string,
  reason: string | null,
  sourceBefore: MarketSourceSnapshot,
  sourceAfter: MarketSourceSnapshot,
  transaction: TransactionRecord | null,
  projection: MarketResultProjection
}
```

## Required no-mutation proof

Every rejected command fixture should compare before/after snapshots for:

```txt
resource-ledger.values
inventory-runtime.items
inventory-runtime.equipped
market-runtime.transactions
```

## Non-goals for this slice

```txt
save slots
workers
codex progression
advanced orchard AI
visual polish
full render-plan extraction
```
