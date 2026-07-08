# ZombieOrchard Known Gaps

**Timestamp:** `2026-07-08T06-39-20-04-00`

## Critical gaps

```txt
- The exchange / Market screen exists but only exposes Back.
- Market actions do not yet have stable action IDs in source.
- There is no Market command envelope.
- There is no Market source snapshot.
- There is no deterministic price snapshot.
- There is no deterministic capacity snapshot.
- There is no Market preflight result with stable rejection reasons.
- There is no accepted/rejected MarketCommandResult record.
- Resource changes are not recorded as transaction history.
- Rejected commands are not journaled.
- Inventory purchases do not have a purchase-intake service.
- interface-composition dispatches nested commands but does not retain or project the nested result.
- html-interface-renderer has no exchange-specific projection branch.
- GameHost only exposes engine/getState/tick.
- tests/smoke.mjs only checks entry, Play transition, and apple existence.
```

## Architecture gaps

```txt
- active-session-domain-kit is doing too many jobs: movement, harvest, pest clearing, phase changes, health, score, and session ending.
- orchard-world uses Math.random directly, so apple and pest state is not replay-stable.
- resource-ledger exposes value mutation but not provenance.
- construction and roster payments mutate resources without shared transaction records.
- interface actions do not yet preserve command context for audit or replay.
- nested command results are not available to GameHost diagnostics or renderer projections.
```

## Market-specific gaps

```txt
- sell-apples is not implemented.
- buy-basic-tool is not implemented.
- buy-row-supply is not implemented.
- unknown Market command rejection is not stable.
- invalid quantity rejection is not stable.
- insufficient funds rejection is not Market-owned.
- inventory capacity full rejection is not implemented.
- rejected command side-effect checks do not exist.
```

## Render gaps

```txt
- world-canvas is a host renderer, not a render-plan consumer.
- buildings and roster actors are not drawn in the orchard world.
- pressure and night-state are not visualized in the world canvas.
- exchange cards are not rendered from economy projections.
- transaction cards are not rendered from transaction projections.
```

## Validation gaps

```txt
- No fixture covers active-session to exchange.
- No fixture covers accepted Market sell.
- No fixture covers rejected Market sell.
- No fixture covers accepted purchase.
- No fixture covers insufficient funds.
- No fixture covers inventory capacity full.
- No fixture covers unknown Market command.
- No fixture covers invalid quantity.
- No fixture proves deterministic price rows.
- No fixture proves deterministic capacity rows.
- No fixture proves nested command result propagation.
- No fixture proves transaction history shape.
- No fixture proves exchange projection shape.
```
