# ZombieOrchard Market Acceptance Ledger Fixture Map

**Timestamp:** `2026-07-08T14-18-45-04-00`

## Goal

Turn the Market implementation target into fixture rows that can prove authority without DOM, canvas, browser, or renderer-owned economy logic.

## Acceptance ledger rows

```txt
ZO-MARKET-001 entry-to-active-session
  start: new createOrchardGame snapshot
  command: interface-composition.activate play
  expect: active-session

ZO-MARKET-002 active-session-to-exchange
  start: active-session snapshot
  command: interface-composition.activate market
  expect: exchange

ZO-MARKET-003 exchange-action-catalog
  start: exchange snapshot
  expect actions: sell-apples, buy-basic-tool, buy-row-supply, back

ZO-MARKET-004 accepted-sell-apples
  given: apples > 0
  command: market sell-apples quantity 1
  expect: accepted true, money increases, apples decreases, transaction row appended

ZO-MARKET-005 rejected-sell-no-apples
  given: apples = 0
  command: market sell-apples quantity 1
  expect: accepted false, reason insufficient-apples, no resource/inventory mutation

ZO-MARKET-006 accepted-buy-basic-tool
  given: money >= price and capacity available
  command: market buy-basic-tool quantity 1
  expect: accepted true, money decreases, item appended, transaction row appended

ZO-MARKET-007 rejected-buy-insufficient-funds
  given: money < price
  command: market buy-basic-tool quantity 1
  expect: accepted false, reason insufficient-funds, no mutation

ZO-MARKET-008 accepted-buy-row-supply
  given: money >= price and capacity available
  command: market buy-row-supply quantity 1
  expect: accepted true, deterministic price row used

ZO-MARKET-009 rejected-buy-capacity-full
  given: inventory capacity full
  command: market buy-basic-tool quantity 1
  expect: accepted false, reason inventory-capacity-full, no mutation

ZO-MARKET-010 rejected-unknown-command
  given: exchange
  command: market unknown-id
  expect: accepted false, reason unknown-market-command, no mutation

ZO-MARKET-011 rejected-invalid-quantity
  given: exchange
  command: market sell-apples quantity 0
  expect: accepted false, reason invalid-quantity, no mutation

ZO-MARKET-012 price-determinism
  given: same source snapshot
  command: derive price rows twice
  expect: equal price row hash

ZO-MARKET-013 capacity-determinism
  given: same inventory/source snapshot
  command: derive capacity rows twice
  expect: equal capacity row hash

ZO-MARKET-014 nested-result-propagation
  given: exchange action with nested market command
  command: interface-composition.activate sell-apples
  expect: interface-composition.lastResult contains nested MarketCommandResult

ZO-MARKET-015 command-journal-shape
  given: accepted and rejected commands
  expect: MarketCommandJournal contains both rows

ZO-MARKET-016 result-journal-shape
  given: accepted and rejected commands
  expect: MarketResultJournal contains both rows with before/after hashes

ZO-MARKET-017 transaction-history-shape
  given: accepted sell/buy
  expect: resource transaction history rows reference Market result ids

ZO-MARKET-018 projection-shape
  given: exchange snapshot after Market command
  expect: MarketResultProjection contains prices, capacities, actions, latestResult, journal tail

ZO-MARKET-019 renderer-readback
  given: exchange renderer consumes projection
  expect: ExchangeRenderReadback proves projection rows consumed and authorityOwnedByRenderer false

ZO-MARKET-020 GameHost-compatibility
  given: post-Market implementation
  expect: window.GameHost.engine/getState/tick still present
```

## Fixture entrypoint target

```txt
tests/market-fixture.mjs
```

or folded into:

```txt
tests/smoke.mjs
```

Only fold into `tests/smoke.mjs` if the output stays readable and the existing baseline smoke remains obvious.

## Source modules to create

```txt
src/market/market-ids.js
src/market/market-sources.js
src/market/market-command.js
src/market/market-results.js
```

## Source modules to extend

```txt
src/presets/orchard-preset.js
src/kits/game-domains.js
src/kits/composition.js
src/game.js
src/renderer/html-interface-renderer.js
src/start.js
package.json
```

## Hard guardrails

```txt
- Do not remove index.html.
- Do not remove src/boot.js.
- Do not remove src/start.js.
- Do not rename createOrchardGame.
- Do not remove window.GameHost.engine/getState/tick.
- Do not make the renderer own Market authority.
- Do not make rejected commands mutate resources or inventory.
- Do not make price/capacity rows random.
```

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Ledger + Exchange Renderer Readback Fixture Gate
```
