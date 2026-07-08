# ZombieOrchard Market Authority Audit: Transaction Result Projection Gate

**Timestamp:** `2026-07-08T04-49-40-04-00`

## Selection result

The current Publish repo comparison found no checked non-Cavalry repo that was both central-ledger absent and missing root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as the fallback follow-up because its root `.agent` state exists, but the Market authority seam remains the highest-value unresolved repo-local breakdown: the exchange screen exists, yet source inspection still shows it only exposes `back`, and nested command results are not retained or projected.

## Current evidence

```txt
src/presets/orchard-preset.js
  exchange:
    title: Market
    actions:
      - back -> active-session

src/kits/composition.js
  interface-composition activate:
    - asks active screen to activate an action
    - dispatches nested action.command if present
    - does not store nested command result
    - returns transition result or generic accepted result

src/kits/game-domains.js
  resource-ledger:
    - values
    - canPay(cost)
    - pay(cost)
    - add(values)
    - last: spent/gained
    - no transaction provenance

  inventory-runtime:
    - items
    - equipped
    - equip command
    - no purchase intake command

  construction-runtime and roster-runtime:
    - already mutate resources through resource-ledger pay
    - do not share transaction records yet
```

## Interaction loop to protect

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> engine installs kits
-> interface-composition owns active screen
-> active-session routes to exchange through Market action
-> exchange should emit stable Market actions
-> Market command authority should preflight and dispatch
-> resource-ledger and inventory-runtime apply accepted mutations only
-> command result journal records accepted and rejected attempts
-> html-interface-renderer consumes projection snapshots only
-> tests/smoke.mjs proves replayable result shape without DOM
```

## Target DSK/domain split

```txt
market-authority
├─ action-catalog
│  ├─ market-action-id-catalog-kit
│  └─ market-action-normalizer-kit
├─ source-state
│  ├─ market-price-source-kit
│  ├─ market-capacity-policy-kit
│  └─ market-source-snapshot-kit
├─ command-contract
│  ├─ market-command-envelope-kit
│  ├─ market-preflight-kit
│  ├─ market-command-result-kit
│  └─ market-rejection-reason-catalog-kit
├─ mutation-services
│  ├─ resource-transaction-history-kit
│  ├─ inventory-purchase-intake-kit
│  └─ market-command-dispatch-kit
├─ replay-proof
│  ├─ market-command-result-journal-kit
│  └─ market-fixture-replay-kit
└─ renderer-handoff
   ├─ market-result-projection-kit
   └─ exchange renderer consumes descriptors only
```

## Required command envelopes

```txt
MarketCommandEnvelope:
  id: stable fixture id
  type: sell-apples | buy-basic-tool | buy-row-supply
  source: exchange-screen | fixture | GameHost
  actorId: player | system
  quantity: integer >= 1
  issuedAtFrame: runtime frame
  sourceSnapshotId: hashable snapshot id
```

## Required source snapshot

```txt
MarketSourceSnapshot:
  id
  frame
  resourcesBefore
  inventoryBefore
  priceRows
  capacityRows
  availableActions
```

## Stable result reasons

```txt
accepted:
  market.sell.accepted
  market.buy.accepted

rejected:
  market.sell.no_apples
  market.buy.insufficient_funds
  market.buy.inventory_capacity_full
  market.command.unknown
  market.command.malformed
  market.quantity.invalid

unchanged:
  market.noop.back
  market.preview.only
```

## Transaction history shape

```txt
TransactionRecord:
  id
  commandId
  kind: market-sell | market-buy | construction-pay | roster-pay | harvest-gain | pest-gain
  resourcesBefore
  resourcesDelta
  resourcesAfter
  inventoryDelta
  accepted
  reason
```

## Renderer projection shape

```txt
MarketResultProjection:
  activeScreen: exchange
  title: Market
  cards:
    - sell apples
    - buy basic tool
    - buy row supply
  priceRows
  capacityRows
  lastResult
  recentTransactions
  disabledReasonsByActionId
```

## Fixture matrix

```txt
1. entry -> play -> market route still reaches exchange
2. sell-apples accepted when apples > 0
3. sell-apples rejected when apples = 0
4. buy-basic-tool accepted with enough money and inventory capacity
5. buy-basic-tool rejected for insufficient funds
6. buy-row-supply accepted with enough money and inventory capacity
7. buy-row-supply rejected when capacity is full
8. unknown market command rejected with stable reason
9. rejected market command does not mutate resources or inventory
10. accepted command appends transaction history
11. price rows are deterministic across snapshots
12. capacity rows are deterministic across snapshots
13. nested command result is retained by interface-composition
14. exchange renderer projection contains no DOM-owned business logic
15. GameHost can expose a fixture-readable market diagnostics snapshot
```

## Implementation boundary

Do not rewrite the whole game loop.

Do not move renderer, DOM, canvas, browser events, or animation ownership into reusable market kits.

Do not break these existing compatibility surfaces:

```txt
snapshot["resource-ledger"].values
engine.command("interface-composition", "activate", { actionId })
engine.tick(delta)
window.GameHost.engine
window.GameHost.getState()
window.GameHost.tick(delta)
```

## Next safe ledge

```txt
Market Result Contract + Transaction Projection Fixture Gate
```

Stop when Market command results, transaction records, nested result propagation, and renderer-ready exchange projection can be inspected through DOM-free fixtures while the existing static route and active-session loop still work.