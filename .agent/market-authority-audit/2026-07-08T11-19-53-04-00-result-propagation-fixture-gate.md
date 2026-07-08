# ZombieOrchard Market Result Propagation Fixture Gate

**Timestamp:** `2026-07-08T11-19-53-04-00`

## Goal

Define the exact source-authority gate for implementing Market sell/buy behavior without leaking authority into the renderer.

## Source facts

```txt
src/kits/runtime.js:
  engine.command returns a domain.command result.

src/kits/composition.js:
  nested action.command dispatch currently drops the nested command result.

src/presets/orchard-preset.js:
  exchange currently only has Back.

src/kits/game-domains.js:
  resource-ledger has values/canPay/pay/add but no transaction records.
  inventory-runtime has items/equipped/equip but no purchase intake.

src/renderer/html-interface-renderer.js:
  generic screens render action buttons only.
  no exchange-specific Market projection branch exists.
```

## Implementation cut

Add Market authority as an additive kit/service set:

```txt
src/market/market-ids.js
src/market/market-sources.js
src/market/market-command.js
src/market/market-results.js
src/kits/market-domain.js
```

Then integrate with existing files:

```txt
src/game.js:
  install market-runtime-kit beside game-domain kits.

src/presets/orchard-preset.js:
  add exchange action rows with action.command entries.

src/kits/composition.js:
  retain nested command result as lastResult and return it in the outer result.

src/kits/game-domains.js:
  extend resource-ledger with transaction helpers.
  extend inventory-runtime with purchase intake helpers.

src/renderer/html-interface-renderer.js:
  render exchange from MarketResultProjection snapshot.

tests/smoke.mjs or tests/market-fixture.mjs:
  add DOM-free Market fixture rows.
```

## Fixture rows required

```txt
entry-to-active-session
active-session-to-exchange
exchange-action-catalog
sell-apples-accepted
sell-apples-rejected-no-apples
buy-basic-tool-accepted
buy-basic-tool-rejected-insufficient-funds
buy-row-supply-accepted
buy-rejected-capacity-full
unknown-market-command-rejected
invalid-quantity-rejected
price-source-deterministic
capacity-source-deterministic
nested-result-propagates-through-interface-composition
accepted-command-appends-transaction
rejected-command-does-not-mutate
market-projection-shape
renderer-readback-shape
gamehost-baseline-compatibility
```

## Acceptance contract

```txt
A Market command is complete only when:
  - accepted commands produce a MarketCommandResult.
  - rejected commands produce a MarketCommandResult.
  - every result has a stable commandId.
  - every rejection has a stable reason.
  - accepted commands append TransactionRecord.
  - rejected commands do not mutate resources or inventory.
  - interface-composition exposes the nested result.
  - exchange renderer consumes MarketResultProjection.
  - renderer readback proves consumption only.
  - GameHost baseline engine/getState/tick is unchanged.
```

## Stop condition

Stop before broader economy work. This gate is complete when DOM-free fixtures can prove command authority, result propagation, transaction history, no-mutation rejection, projection shape, render readback shape, and baseline GameHost compatibility.
