# ZombieOrchard Next Steps

**Timestamp:** `2026-07-08T03-08-39-04-00`

## Goal

Make Market actions durable, replayable, and renderer-readable before expanding the wider economy.

## Checklist

- [ ] Preserve current `index.html`, `src/start.js`, active-session HUD, and `snapshot["resource-ledger"].values` compatibility.
- [ ] Add stable Market action IDs: `sell-apples`, `buy-basic-tool`, `buy-row-supply`, `back`.
- [ ] Extend the `exchange` preset so Market has actual command actions.
- [ ] Add deterministic price rows and capacity rows.
- [ ] Add `MarketCommandEnvelope` records.
- [ ] Add `MarketSourceSnapshot` records.
- [ ] Add Market preflight with stable rejection reasons.
- [ ] Add accepted/rejected `MarketCommandResult` records.
- [ ] Add a command result journal.
- [ ] Extend `resource-ledger` with transaction history while preserving `values`, `canPay`, `pay`, and `add`.
- [ ] Extend `inventory-runtime` with purchase intake.
- [ ] Return nested command results through `interface-composition` and expose `lastResult`.
- [ ] Add renderer-ready `MarketResultProjection`.
- [ ] Add an exchange renderer branch that consumes only snapshot projection.
- [ ] Extend `window.GameHost` with diagnostics and smoke helpers.
- [ ] Add DOM-free fixture cases for accepted sell, rejected sell, accepted buy, insufficient funds, capacity full, unknown command, price determinism, capacity determinism, nested result propagation, and transaction history.

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

## Next safe implementation slice

```txt
Market Command Replay Fixture + Transaction Projection Gate
```

The slice should remain additive. It should not rewrite the whole game loop, remove the static route, or move renderer ownership into reusable kits.
