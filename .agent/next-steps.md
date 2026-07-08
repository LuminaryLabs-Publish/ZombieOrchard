# ZombieOrchard Next Steps

**Timestamp:** `2026-07-08T04-49-40-04-00`

## Goal

Make Market actions durable, replayable, transaction-backed, and renderer-readable before expanding the wider economy.

## Next safe implementation slice

```txt
Market Result Contract + Transaction Projection Fixture Gate
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
- [ ] Extend `window.GameHost` with fixture-readable Market diagnostics and smoke helpers.
- [ ] Add DOM-free fixture cases for accepted sell, rejected sell, accepted buy, insufficient funds, capacity full, unknown command, price determinism, capacity determinism, nested result propagation, transaction history, and projection shape.

## Suggested implementation order

```txt
1. market action id catalog
2. market price/capacity source snapshots
3. command envelope + preflight
4. command result + stable reason catalog
5. resource transaction history
6. inventory purchase intake
7. market dispatch service
8. nested result propagation through interface-composition
9. exchange projection snapshot
10. DOM-free market fixture replay
11. HTML exchange renderer branch
12. GameHost diagnostics helpers
```

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
- sell-apples accepted when apples > 0
- sell-apples rejected when apples = 0
- buy-basic-tool accepted when money >= price and capacity is available
- buy-basic-tool rejected on insufficient funds
- buy-row-supply accepted when money >= price and capacity is available
- buy command rejected when inventory capacity is full
- unknown Market command rejected with stable reason
- rejected command does not mutate resources or inventory
- accepted command appends transaction history
- interface-composition exposes nested command result
- exchange projection is renderer-ready
```

The slice should remain additive. It should not rewrite the whole game loop, remove the static route, or move renderer ownership into reusable kits.