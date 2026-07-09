# ZombieOrchard Next Steps

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Goal

Make Market actions source-owned, replayable, transaction-backed, nested-result-safe, renderer-readable, GameHost-readable, and fixture-verifiable before expanding the wider orchard economy.

## Next safe implementation slice

```txt
ZombieOrchard Market Consumer Fixture Readback + Central Ledger Sync Gate
```

## Checklist

- [ ] Preserve current `index.html`, `src/boot.js`, `src/start.js`, active-session HUD, world-canvas renderer, and `snapshot["resource-ledger"].values` compatibility.
- [ ] Preserve `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick`.
- [ ] Add stable Market action IDs: `sell-apples`, `buy-basic-tool`, `buy-row-supply`, `back`.
- [ ] Add `MarketCommandSourceManifest` as the durable source of Market command/action/reason/price/capacity rows.
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
- [ ] Return nested results through `interface-composition`.
- [ ] Add `InterfaceNestedResultAdapter` so nested results have a stable consumer-facing shape.
- [ ] Expose `lastResult` in `interface-composition.snapshot()`.
- [ ] Preserve existing direct active-session `data-command` behavior for Collect/Clear/Next Phase while keeping Market commands inside Market authority.
- [ ] Add renderer-ready `MarketResultProjection`.
- [ ] Add an exchange renderer branch that consumes snapshot projection only.
- [ ] Add renderer readback that proves the exchange branch consumed projection rows and did not own price/capacity/transaction authority.
- [ ] Extend `window.GameHost` with optional fixture-readable Market diagnostics and smoke helpers.
- [ ] Add DOM-free fixture cases for source manifest, accepted sell, rejected sell, accepted buy, insufficient funds, insufficient apples, capacity full, unknown command, invalid quantity, price determinism, capacity determinism, nested result propagation, command journal shape, result journal shape, transaction history, projection shape, renderer readback, source manifest to projection parity, and GameHost compatibility.

## Suggested implementation order

```txt
1. Create src/market/market-ids.js for action ids, command types, and reason constants.
2. Create src/market/market-command-source-manifest.js for durable Market command/action/reason/price/capacity rows.
3. Create src/market/market-command-envelope.js for envelope normalization.
4. Create src/market/market-source-snapshot.js for deterministic resource/inventory/price/capacity snapshots.
5. Create src/market/market-preflight.js for accepted/rejected preflight.
6. Create src/market/market-result.js for MarketCommandResult records.
7. Create src/market/market-transaction-ledger.js for TransactionRecord, command journal, and result journal helpers.
8. Create src/market/market-projection.js for MarketResultProjection rows.
9. Create src/market/market-render-readback.js for exchange projection consumption reports.
10. Create src/market/market-fixture-rows.js for source-manifest and command-result fixture cases.
11. Add exchange preset action rows that target Market dispatch commands.
12. Extend resource-ledger with transaction history helpers while keeping values/canPay/pay/add stable.
13. Extend inventory-runtime with purchase intake while keeping equipped/items stable.
14. Add a market-runtime-kit or Market dispatch service adjacent to game-domain kits.
15. Update interface-composition so nested command results are retained and adapted.
16. Update interface-composition snapshot to expose lastResult additively.
17. Update html-interface-renderer exchange branch to consume MarketResultProjection only.
18. Add MarketRenderReadback rows for renderer consumption proof.
19. Extend GameHost additively with market diagnostics.
20. Add tests/market-transaction-fixture.mjs.
21. Add package script test:market after the fixture exists.
```

## Stop condition

```txt
Stop when the fixture proves source manifest rows, accepted mutation, rejected no-mutation, transaction history, nested result propagation, exchange projection, renderer readback, GameHost diagnostics, and baseline compatibility.
```
