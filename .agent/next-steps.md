# ZombieOrchard Next Steps

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Goal

Make Market actions durable, replayable, transaction-backed, renderer-readable, nested-result-safe, and fixture-verifiable before expanding the wider orchard economy.

## Next safe implementation slice

```txt
ZombieOrchard Nested Market Result Source Contract + Exchange Projection Readback Fixture Gate
```

## Checklist

- [ ] Preserve current `index.html`, `src/boot.js`, `src/start.js`, active-session HUD, world-canvas renderer, and `snapshot["resource-ledger"].values` compatibility.
- [ ] Preserve `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick`.
- [ ] Add stable Market action IDs: `sell-apples`, `buy-basic-tool`, `buy-row-supply`, `back`.
- [ ] Extend the `exchange` preset so Market has real command actions.
- [ ] Add deterministic price rows.
- [ ] Add deterministic capacity rows.
- [ ] Add `MarketCommandEnvelope` records.
- [ ] Add `MarketSourceSnapshot` records before and after command execution.
- [ ] Add Market preflight with stable rejection reasons.
- [ ] Add accepted/rejected `MarketCommandResult` records.
- [ ] Add rejected-command no-mutation before/after snapshots.
- [ ] Add `MarketCommandJournal` rows.
- [ ] Add `MarketResultJournal` rows.
- [ ] Extend `resource-ledger` with transaction history while preserving `values`, `canPay`, `pay`, and `add`.
- [ ] Extend `inventory-runtime` with purchase intake while keeping `equipped` and `items` stable.
- [ ] Add a Market runtime/domain kit adjacent to the existing game-domain kits.
- [ ] Return nested command results through `interface-composition`.
- [ ] Expose `lastResult` in `interface-composition.snapshot()`.
- [ ] Preserve existing direct active-session `data-command` behavior for Collect/Clear/Next Phase while keeping Market commands inside Market authority.
- [ ] Add renderer-ready `MarketResultProjection`.
- [ ] Add an exchange renderer branch that consumes snapshot projection only.
- [ ] Add renderer readback that proves the exchange branch consumed projection rows and did not own price/capacity/transaction authority.
- [ ] Extend `window.GameHost` with optional fixture-readable Market diagnostics and smoke helpers.
- [ ] Add DOM-free fixture cases for accepted sell, rejected sell, accepted buy, insufficient funds, insufficient apples, capacity full, unknown command, invalid quantity, price determinism, capacity determinism, nested result propagation, command journal shape, result journal shape, transaction history, projection shape, renderer readback, and GameHost compatibility.

## Suggested implementation order

```txt
1. Create src/market/market-ids.js for action ids, command types, and reason constants.
2. Create src/market/market-source-snapshot.js for deterministic resource/inventory/price/capacity snapshots.
3. Create src/market/market-command-envelope.js for envelope normalization.
4. Create src/market/market-preflight.js for accepted/rejected preflight.
5. Create src/market/market-result.js for MarketCommandResult records.
6. Create src/market/market-transaction-ledger.js for TransactionRecord, command journal, and result journal helpers.
7. Create src/market/market-projection.js for MarketResultProjection rows.
8. Create src/market/market-render-readback.js for exchange projection consumption reports.
9. Add exchange preset action rows that target Market dispatch commands.
10. Extend resource-ledger with transaction history helpers while keeping values/canPay/pay/add stable.
11. Extend inventory-runtime with purchase intake while keeping equipped/items stable.
12. Add a market-runtime-kit or Market dispatch service adjacent to game-domain kits.
13. Return nested results through interface-composition and expose lastResult.
14. Render exchange from MarketResultProjection only.
15. Add renderer readback report for exchange projection consumption.
16. Add tests/market-transaction-fixture.mjs or extend tests/smoke.mjs with the Market fixture matrix.
17. Add optional GameHost diagnostics helpers for Market source/result/journal/projection inspection.
```

## Acceptance ledgers

```txt
.agent/market-authority-audit/acceptance-ledger.md
.agent/market-authority-audit/fixture-implementation-map.md
.agent/market-authority-audit/2026-07-08T09-48-58-04-00-transaction-replay-boundary.md
.agent/market-authority-audit/2026-07-08T11-19-53-04-00-result-propagation-fixture-gate.md
.agent/market-authority-audit/2026-07-08T12-51-50-04-00-command-journal-fixture-boundary.md
.agent/market-authority-audit/2026-07-08T14-18-45-04-00-acceptance-ledger-fixture-map.md
.agent/market-authority-audit/2026-07-08T16-10-36-04-00-transaction-ledger-source-splice-map.md
.agent/market-authority-audit/2026-07-08T16-20-00-04-00-nested-result-source-contract.md
```

Use those files as the source of truth for exact required result shapes, rejection reasons, transaction records, projection records, source files, and fixture cases.

## Defer until after Market authority

```txt
- worker assignment
- save runtime
- codex progression
- advanced phase authority
- seeded global replay
- construction effects
- roster morale/fatigue
- render-plan extraction
- settlement parity
```

## Stop condition

Stop the implementation slice when these fixture-readable cases are inspectable without DOM ownership:

```txt
- entry to active-session still works
- active-session to exchange still works
- exchange exposes sell-apples, buy-basic-tool, buy-row-supply, and back
- sell-apples accepted when apples > 0
- sell-apples rejected when apples = 0
- buy-basic-tool accepted when money >= price and capacity is available
- buy-basic-tool rejected on insufficient funds
- buy-row-supply accepted when money >= price and capacity is available
- buy command rejected when inventory capacity is full
- unknown Market command rejected with stable reason
- invalid quantity rejected with stable reason
- rejected command does not mutate resources or inventory
- accepted command appends transaction history
- accepted/rejected command appends MarketCommandJournal rows
- accepted/rejected command appends MarketResultJournal rows
- interface-composition exposes nested command result
- interface-composition snapshot exposes lastResult
- exchange projection is renderer-ready
- renderer readback proves projection rows consumed
- GameHost baseline engine/getState/tick shape remains available
```

The slice should remain additive. It should not rewrite the whole game loop, remove the static route, or move renderer ownership into reusable kits.
