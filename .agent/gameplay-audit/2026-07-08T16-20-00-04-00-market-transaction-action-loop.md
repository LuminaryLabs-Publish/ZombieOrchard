# Gameplay Audit — Market Transaction Action Loop

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Current playable loop

```txt
Entry
  -> Play
  -> Active Session
  -> move player
  -> collect apples
  -> clear pests
  -> next phase
  -> open Build / Market / Roster / Inventory / Codex / Settings
  -> Market reaches exchange shell
  -> exchange currently only exposes Back
  -> session ends when condition reaches zero
  -> Outcome
```

## Current command loop

```txt
active-session HUD buttons:
  data-command="collect" / "clear" / "next-phase"
  -> engine.command("active-session", command)

screen action buttons:
  data-action="..."
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen command("activate")
  -> optional nested action.command
  -> optional screen transition
```

## Market gameplay gap

Market is the correct next gameplay seam because it touches player-facing economy without requiring a full app rewrite.

Current constraints:

```txt
- exchange only routes Back
- apples can be collected into resource-ledger
- money can be gained through apple collection
- resource-ledger can add/pay values but has no transaction history
- inventory-runtime can equip items but cannot receive purchases
- interface-composition drops nested command results
- tests/smoke.mjs never reaches exchange
```

## Required gameplay action rows

```txt
sell-apples:
  source: resource-ledger.values.apples
  accepted when quantity > 0 and apples >= quantity
  mutation: apples decreases, money increases
  transaction: sell.apples

buy-basic-tool:
  source: resource-ledger.values.money + inventory-runtime.items
  accepted when money >= price and capacity is available
  mutation: money decreases, inventory item appended
  transaction: buy.basic-tool

buy-row-supply:
  source: resource-ledger.values.money + inventory-runtime.items
  accepted when money >= price and capacity is available
  mutation: money decreases, inventory item appended or supply count increases
  transaction: buy.row-supply

back:
  source: interface-composition previous/active
  accepted as navigation only
  mutation: interface active screen changes
  transaction: none
```

## Required rejection reasons

```txt
market.unknown-command
market.invalid-quantity
market.insufficient-apples
market.insufficient-funds
market.inventory-capacity-full
market.missing-resource-ledger
market.missing-inventory-runtime
market.no-op-navigation
```

## Gameplay proof rule

Every Market command must produce a stable result object whether accepted or rejected.

Rejected commands must prove no mutation by comparing `MarketSourceSnapshot` before and after execution.

Accepted commands must prove mutation by appending a `TransactionRecord` and journal rows.

## Fixture stop line

The next implementation is complete only when DOM-free fixtures prove:

```txt
entry -> active-session -> exchange
exchange action catalog shape
accepted sell-apples
rejected sell-apples
accepted buy-basic-tool
rejected buy-basic-tool on insufficient funds
accepted buy-row-supply
rejected buy on capacity full
unknown command rejection
invalid quantity rejection
rejected no-mutation before/after snapshots
accepted transaction history append
MarketCommandJournal append
MarketResultJournal append
interface-composition nested result propagation
GameHost baseline compatibility
```
