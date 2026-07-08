# ZombieOrchard Market Command Journal Fixture Boundary

**Timestamp:** `2026-07-08T12-51-50-04-00`

## Purpose

Define the minimum fixture-readable Market authority boundary before runtime implementation.

The goal is not to make the Market visually rich first. The goal is to make every Market action produce stable source snapshots, command envelopes, accepted/rejected results, mutation summaries, transaction records, and journal rows.

## Source files that currently shape the seam

```txt
src/presets/orchard-preset.js:
  exchange currently exposes only Back.

src/kits/runtime.js:
  engine.command returns command results but has no command journal.

src/kits/composition.js:
  dispatches nested action.command through ctx.engine.command but drops the nested result.

src/kits/game-domains.js:
  resource-ledger has values/canPay/pay/add only.
  inventory-runtime has equip only.

src/renderer/html-interface-renderer.js:
  renders generic screen actions and has no exchange projection branch.

tests/smoke.mjs:
  proves entry/play/apple baseline only.
```

## Required contracts

```ts
type MarketCommandEnvelope = {
  commandId: string;
  actionId: "sell-apples" | "buy-basic-tool" | "buy-row-supply" | "back";
  quantity: number;
  sourceFingerprint: string;
  frame: number;
};

type MarketSourceSnapshot = {
  resources: Record<string, number>;
  inventory: { items: unknown[]; equipped: string; capacity: number };
  prices: MarketPriceRow[];
  capacity: MarketCapacityRow[];
};

type MarketCommandResult = {
  accepted: boolean;
  reason: string;
  envelope: MarketCommandEnvelope;
  before: MarketSourceSnapshot;
  after: MarketSourceSnapshot;
  mutations: MarketMutationSummary[];
  transaction?: TransactionRecord;
};

type MarketCommandJournalEntry = {
  resultId: string;
  accepted: boolean;
  reason: string;
  actionId: string;
  beforeFingerprint: string;
  afterFingerprint: string;
  transactionId?: string;
};

type MarketResultProjection = {
  actionRows: unknown[];
  priceRows: unknown[];
  capacityRows: unknown[];
  lastResult: MarketCommandJournalEntry | null;
  transactionRows: TransactionRecord[];
};
```

## Stable reasons

```txt
accepted
back
insufficient-apples
insufficient-funds
capacity-full
unknown-market-command
invalid-quantity
missing-market-source
missing-resource-ledger
missing-inventory-runtime
```

## Fixture matrix

```txt
entry-play-baseline:
  preserves existing smoke.mjs behavior

market-navigation:
  active-session -> exchange works through interface-composition

exchange-action-catalog:
  exchange exposes sell-apples, buy-basic-tool, buy-row-supply, back

accepted-sell-apples:
  apples decrease, money increases, transaction appended, journal row accepted

rejected-sell-no-apples:
  resources unchanged, inventory unchanged, journal row rejected reason insufficient-apples

accepted-buy-basic-tool:
  money decreases, inventory item added, transaction appended, journal row accepted

rejected-buy-insufficient-funds:
  resources unchanged, inventory unchanged, journal row rejected reason insufficient-funds

rejected-buy-capacity-full:
  resources unchanged, inventory unchanged, journal row rejected reason capacity-full

unknown-market-command:
  no mutation, stable rejected reason unknown-market-command

invalid-quantity:
  no mutation, stable rejected reason invalid-quantity

nested-result-propagation:
  interface-composition.lastResult equals nested MarketCommandResult summary

projection-shape:
  MarketResultProjection exposes actionRows, priceRows, capacityRows, lastResult, transactionRows

renderer-readback:
  html exchange branch reports consumed projection rows and owns no Market authority

GameHost-compatibility:
  window.GameHost.engine/getState/tick remain stable, optional Market diagnostics are additive
```

## Implementation boundary

Create pure Market helpers first, then wire them into kits:

```txt
src/market/market-ids.js
src/market/market-sources.js
src/market/market-command.js
src/market/market-results.js
src/kits/market-runtime.js
src/kits/composition.js additive lastResult retention
src/presets/orchard-preset.js exchange action rows
src/renderer/html-interface-renderer.js exchange projection branch
tests/market-fixture.mjs
```

## Stop condition

Stop when DOM-free fixtures prove accepted, rejected, no-mutation, transaction history, Market command journal, nested result propagation, projection shape, renderer readback, and GameHost compatibility without moving Market authority into the renderer.
