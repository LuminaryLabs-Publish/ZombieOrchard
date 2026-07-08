# ZombieOrchard Market Acceptance Ledger

**Timestamp:** `2026-07-08T06-39-20-04-00`

## Purpose

Define the exact source-backed acceptance ledger for the next Market implementation pass.

This file is documentation only. It does not change runtime behavior.

## Source-backed current facts

```txt
README.md:
  ZombieOrchard is a standalone kit-composed orchard survival/economy game shell.
  It uses scoped interface domains and project presets.

index.html:
  Loads ./src/boot.js, canvas#world, section#ui-root, and section#error-panel.

src/boot.js:
  Imports ./start.js only.

src/start.js:
  Creates createOrchardGame(), createWorldCanvas(canvas), and createHtmlInterfaceRenderer({ root, engine }).
  Runs requestAnimationFrame(draw), calls engine.tick(1 / 60), renders world and UI, and exposes window.GameHost.

src/game.js:
  Installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, interface domains, active-session, and interface-composition.

src/kits/runtime.js:
  Routes engine.command(domainId, type, payload) and returns accepted/rejected command results, but does not journal commands.

src/kits/composition.js:
  Dispatches nested action.command, but drops the nested command result instead of retaining it.

src/presets/orchard-preset.js:
  exchange currently exposes only Back.

src/kits/game-domains.js:
  resource-ledger has values/canPay/pay/add but no transaction history.
  inventory-runtime has equip only; no purchase intake.
  active-session owns move, collect, clear, next-phase, score, pests, and session ending.

tests/smoke.mjs:
  Proves entry, Play transition, active-session, and apple existence only.
```

## Required Market action IDs

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Required command envelope

```txt
MarketCommandEnvelope:
  id: stable string
  type: sell | buy | back
  itemId: optional stable string
  quantity: finite integer >= 1
  source: exchange | GameHost | fixture
  frame: runtime frame or fixture frame
  issuedAt: deterministic fixture time or runtime elapsed
```

## Required source snapshot

```txt
MarketSourceSnapshot:
  prices:
    sell-apples: +3 money per red apple equivalent
    buy-basic-tool: cost money >= 1
    buy-row-supply: cost money >= 1
  capacity:
    inventoryMax: finite integer
    currentInventoryCount: finite integer
  resourcesBefore:
    money, apples, wood, scrap
  inventoryBefore:
    items, equipped
```

Exact numbers can be tuned in source, but fixtures must prove they are deterministic across repeated snapshots.

## Required result record

```txt
MarketCommandResult:
  accepted: boolean
  commandId: stable string
  reason: stable string
  transaction: null | TransactionRecord
  resourcesBefore: object
  resourcesAfter: object
  inventoryBefore: object
  inventoryAfter: object
  projection: MarketResultProjection
```

## Stable rejection reasons

```txt
unknown-market-command
no-apples-to-sell
insufficient-funds
inventory-capacity-full
invalid-quantity
missing-market-source
```

Rejected commands must not mutate resources, inventory, transaction history, or score.

## Transaction record shape

```txt
TransactionRecord:
  id: stable string
  type: sell | buy
  commandId: stable string
  resourceDeltas: object
  inventoryDeltas: object
  frame: runtime frame or fixture frame
```

## Renderer projection contract

```txt
MarketResultProjection:
  title: string
  message: string
  rows: array of display rows
  lastResult: compact accepted/rejected result
  transactions: compact recent transaction rows
```

The HTML renderer should consume this projection only. It should not own price, capacity, or transaction logic.

## Acceptance matrix

```txt
[ ] entry to active-session still passes.
[ ] active-session to exchange passes.
[ ] exchange exposes sell-apples, buy-basic-tool, buy-row-supply, and back.
[ ] sell-apples accepted when apples > 0.
[ ] sell-apples rejected when apples = 0.
[ ] buy-basic-tool accepted when money >= price and capacity is available.
[ ] buy-basic-tool rejected when money < price.
[ ] buy-row-supply accepted when money >= price and capacity is available.
[ ] buy command rejected when inventory capacity is full.
[ ] unknown Market command returns unknown-market-command.
[ ] invalid quantity returns invalid-quantity.
[ ] rejected command leaves resources unchanged.
[ ] rejected command leaves inventory unchanged.
[ ] accepted command appends transaction history.
[ ] resource-ledger preserves values/canPay/pay/add compatibility.
[ ] inventory-runtime preserves equipped/items compatibility.
[ ] interface-composition retains nested result as lastResult.
[ ] exchange projection has stable title/message/rows/lastResult/transactions shape.
[ ] window.GameHost still exposes engine/getState/tick.
[ ] DOM-free fixture can replay the market cases without renderer ownership.
```

## Next implementation guardrails

```txt
Do not rewrite the whole game.
Do not remove the static route.
Do not move Market business logic into html-interface-renderer.
Do not remove current snapshot["resource-ledger"].values shape.
Do not remove current active-session HUD behavior.
Do not expand workers, save slots, or codex progression before this fixture passes.
```
