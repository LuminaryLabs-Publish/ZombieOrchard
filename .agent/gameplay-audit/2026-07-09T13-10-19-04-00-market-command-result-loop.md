# Gameplay Audit: Market Command Result Loop

**Timestamp:** `2026-07-09T13-10-19-04-00`

## Current playable loop

```txt
Entry
  -> Play
  -> Active Session
  -> Collect apples
  -> Clear pests
  -> Next Phase
  -> Build / Market / Roster / Inventory / Codex / Settings
  -> Outcome when active-session ends
```

## Current command loop

```txt
collect
  -> active-session.collect
  -> orchard-world.collectNear
  -> resource-ledger.add
  -> pressure-field.adjust
  -> active-session score/message

clear
  -> active-session.clear
  -> pest condition decrement or rejected nothing-in-reach

next-phase
  -> active-session.next-phase
  -> day/night switch

build storage shed
  -> interface-composition.activate
  -> nested construction-runtime.build
  -> resource-ledger.pay
  -> built object append
  -> nested result discarded by composition
```

## Market loop today

```txt
active-session Market action
  -> to: exchange
  -> Exchange screen
  -> Back only
```

There is no sell/buy command, no stable price source, no accepted/rejected result rows, no transaction ledger, and no fixture replay for Market behavior.

## Correct Market result loop

```txt
Market action selected
  -> stable action id
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> accepted MarketCommandResult or rejected MarketCommandResult
  -> if accepted: resource/inventory mutation + transaction record
  -> if rejected: prove no resource/inventory mutation
  -> MarketCommandJournal append
  -> MarketResultJournal append
  -> MarketSourceSnapshot after
  -> interface-composition lastResult
  -> Exchange projection
  -> renderer readback
  -> GameHost diagnostics
  -> fixture row assertion
```

## Required fixture rows

```txt
sell-apples accepted:
  starting apples > 0
  result.accepted === true
  money increases
  apples decreases
  transaction recorded

buy-basic-tool accepted:
  starting money >= price
  result.accepted === true
  money decreases
  inventory item added
  transaction recorded

buy-basic-tool rejected insufficient money:
  starting money < price
  result.accepted === false
  reason === "insufficient-resource"
  money unchanged
  inventory unchanged

buy-row-supply rejected capacity:
  starting inventory at capacity
  result.accepted === false
  reason === "capacity-full"
  resources unchanged
  inventory unchanged
```

## Gameplay conclusion

Do not widen the economy until the Market result loop is replayable, inspectable, and no-mutation-safe for rejected commands.
