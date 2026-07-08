# ZombieOrchard Economy / Market Gameplay Audit

**Timestamp:** `2026-07-08T08-02-32-04-00`

## Current player loop

```txt
Entry
-> Play
-> Active Session
-> move/collect/clear/next-phase through active-session commands
-> collect apples for apples/money
-> clear pests for score/scrap
-> build storage shed through construction-runtime
-> open Market through active-session interface action
-> exchange screen currently only allows Back
-> night phase spawns pests
-> health reaches zero
-> outcome screen
```

## Current economy loop

```txt
resources:
  money, apples, wood, scrap

resource-ledger services:
  canPay(cost)
  pay(cost)
  add(values)

current producers:
  collect apple -> apples + 1, money + 3 or +8
  clear pest -> scrap + 1 after condition reaches zero

current consumers:
  build storage shed -> wood -4, money -8
  hire command exists in roster-runtime but is not currently exposed from preset actions
```

## Market gameplay gap

The Market screen is already a navigable screen, but it is not yet a gameplay system.

Current source behavior:

```txt
active-session action:
  market -> exchange

exchange preset:
  Back only

resource-ledger:
  can pay/add but no transaction history

inventory-runtime:
  equip only, no purchase intake

interface-composition:
  nested commands can be fired but nested result is not stored
```

## Gameplay authority target

Market should become a compact survival/economy loop, not just a menu.

Target first loop:

```txt
player collects apples
-> opens Market
-> sell-apples converts apples into money through accepted MarketCommandResult
-> buy-basic-tool converts money into inventory item through purchase intake
-> buy-row-supply converts money into supply item through purchase intake
-> rejected commands return stable reasons and mutate nothing
-> transaction history explains every accepted economy mutation
-> exchange projection shows prices, capacity, last result, and transactions
```

## Required gameplay cases

```txt
accepted sell:
  requires apples > 0
  decreases apples
  increases money
  appends sell transaction
  updates last result/projection

rejected sell:
  requires apples = 0
  returns no-apples-to-sell
  preserves resources and inventory
  appends or exposes rejected result without transaction mutation

accepted buy-basic-tool:
  requires enough money and capacity
  decreases money
  adds tool item
  optionally equips first bought tool
  appends buy transaction

rejected buy-basic-tool:
  returns insufficient-funds or inventory-capacity-full
  preserves resources and inventory

accepted buy-row-supply:
  requires enough money and capacity
  decreases money
  adds supply item
  appends buy transaction

invalid command:
  returns unknown-market-command or invalid-quantity
  preserves resources and inventory
```

## Gameplay constraints

```txt
- Do not increase enemy/pest complexity before Market proof.
- Do not add save-slot complexity before Market proof.
- Do not make visual renderer own economy state.
- Do not remove active-session collect/clear/next-phase loop.
- Do not break the existing Build route.
- Do not remove current resource-ledger values shape.
```

## Next ledge

```txt
ZombieOrchard Market Fixture Implementation Map
```

The next implementation should prove economy interaction first through source and fixtures.

Visual polish can follow after Market source authority is observable.
