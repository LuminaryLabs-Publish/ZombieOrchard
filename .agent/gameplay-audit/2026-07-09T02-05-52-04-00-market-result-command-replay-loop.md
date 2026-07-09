# Gameplay Audit — Market Result Command Replay Loop

**Timestamp:** `2026-07-09T02-05-52-04-00`

## Gameplay read

The playable loop already supports orchard survival basics:

```txt
collect apples
clear pests
advance phase
build
roster
inventory
exchange shell
codex/preferences/outcome screens
```

The Market slice is not a new gameplay mode yet. It is the missing proof layer for economy actions.

## Current command behavior

```txt
active-session:
  move
  collect
  clear
  next-phase
  activate configured action

resource-ledger:
  add
  pay

construction-runtime:
  build

roster-runtime:
  hire

inventory-runtime:
  equip

interface-composition:
  transition
  back
  activate current screen action
```

## Gameplay gap

The exchange screen can be reached, but it does not yet have source-owned economy actions. When a configured interface action has `action.command`, `interface-composition` can dispatch it, but it drops the nested command result.

That makes gameplay replay ambiguous:

```txt
Was the command accepted?
What reason rejected it?
Did resources mutate?
Did inventory mutate?
Was a transaction recorded?
Did the UI consume the result?
Did GameHost expose the result for tests?
```

## Required replay contract

```txt
MarketReplayRow
  id
  startingResources
  startingInventory
  actionId
  commandEnvelope
  expectedStatus
  expectedReason
  expectedResourceDelta
  expectedInventoryDelta
  expectedTransactionCount
  expectedProjectionStatus
  expectedReadbackStatus
```

## First rows

```txt
sell apples accepted
sell apples rejected with zero apples
buy basic tool accepted
buy basic tool rejected with low money
buy row supply accepted
buy row supply rejected at capacity
back transition unchanged
```

## Gameplay implementation order

1. Add source-owned Market action rows.
2. Add command envelopes.
3. Add before/after source snapshots.
4. Add preflight/rejection reasons.
5. Add command result rows.
6. Add journals and transaction history.
7. Retain nested command result through interface-composition.
8. Project result into exchange renderer.
9. Add GameHost market diagnostics.
10. Add DOM-free replay fixture.

## Do not change yet

```txt
new enemies
new orchard stages
new worker AI
new tool effects
new save files
new art pass
new renderer pass
new input model
```

Those are downstream of the Market result proof.
