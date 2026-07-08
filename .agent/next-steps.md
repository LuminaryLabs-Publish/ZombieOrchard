# ZombieOrchard Next Steps

**Timestamp:** `2026-07-08T08-02-32-04-00`

## Goal

Make Market actions durable, replayable, transaction-backed, and renderer-readable before expanding the wider orchard economy.

## Next safe implementation slice

```txt
ZombieOrchard Market Fixture Implementation Map
```

## Checklist

- [ ] Preserve current `index.html`, `src/start.js`, active-session HUD, world-canvas renderer, and `snapshot["resource-ledger"].values` compatibility.
- [ ] Add stable Market action IDs: `sell-apples`, `buy-basic-tool`, `buy-row-supply`, `back`.
- [ ] Extend the `exchange` preset so Market has real command actions.
- [ ] Add deterministic price rows.
- [ ] Add deterministic capacity rows.
- [ ] Add `MarketCommandEnvelope` records.
- [ ] Add `MarketSourceSnapshot` records.
- [ ] Add Market preflight with stable rejection reasons.
- [ ] Add accepted/rejected `MarketCommandResult` records.
- [ ] Add a command result journal.
- [ ] Extend `resource-ledger` with transaction history while preserving `values`, `canPay`, `pay`, and `add`.
- [ ] Extend `inventory-runtime` with purchase intake.
- [ ] Return nested command results through `interface-composition` and expose `lastResult` in its snapshot.
- [ ] Add renderer-ready `MarketResultProjection`.
- [ ] Add an exchange renderer branch that consumes snapshot projection only.
- [ ] Keep `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick` stable.
- [ ] Extend `window.GameHost` with optional fixture-readable Market diagnostics and smoke helpers.
- [ ] Add DOM-free fixture cases for accepted sell, rejected sell, accepted buy, insufficient funds, capacity full, unknown command, invalid quantity, price determinism, capacity determinism, nested result propagation, transaction history, and projection shape.

## Suggested implementation order

```txt
1. Create src/market/market-ids.js for action ids and reason constants.
2. Create src/market/market-sources.js for deterministic price/capacity/source snapshots.
3. Create src/market/market-command.js for command envelope normalization and preflight.
4. Create src/market/market-results.js for MarketCommandResult, TransactionRecord, and MarketResultProjection helpers.
5. Add exchange preset action rows that target a market dispatch command.
6. Extend resource-ledger with transaction history helpers while keeping values/canPay/pay/add stable.
7. Extend inventory-runtime with purchase intake while keeping equipped/items stable.
8. Add a market-runtime-kit or market dispatch service adjacent to game-domain kits.
9. Return nested results through interface-composition and expose lastResult.
10. Render exchange from MarketResultProjection only.
11. Add tests/market-fixture.mjs or extend tests/smoke.mjs with the Market fixture matrix.
12. Add optional GameHost diagnostics helpers for Market source/result/journal inspection.
```

## Acceptance ledgers

```txt
.agent/market-authority-audit/acceptance-ledger.md
.agent/market-authority-audit/fixture-implementation-map.md
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
- interface-composition exposes nested command result
- exchange projection is renderer-ready
- GameHost baseline engine/getState/tick remains stable
```

The slice should remain additive. It should not rewrite the whole game loop, remove the static route, or move renderer ownership into reusable kits.
