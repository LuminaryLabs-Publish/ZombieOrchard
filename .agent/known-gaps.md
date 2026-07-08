# ZombieOrchard Known Gaps

**Timestamp:** `2026-07-08T11-19-53-04-00`

## Critical gaps

```txt
- The exchange / Market screen exists but only exposes Back.
- Market actions do not yet have stable source-owned action IDs.
- There is no MarketCommandEnvelope.
- There is no MarketSourceSnapshot.
- There is no deterministic price source snapshot.
- There is no deterministic capacity source snapshot.
- There is no Market preflight result with stable rejection reasons.
- There is no accepted/rejected MarketCommandResult record.
- There is no MarketResultJournal.
- Resource changes are not recorded as transaction history.
- Rejected Market commands are not proven side-effect free.
- Inventory purchases do not have a purchase-intake service.
- interface-composition dispatches nested commands but does not retain, return, journal, or project the nested result.
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
- market-specific logic currently has no dedicated dispatch service.
- Market projection snapshots are not separated from generic screen rendering.
- direct data-command clicks in html-interface-renderer bypass the interface-composition result ledger.
```

## Market-specific gaps

```txt
- sell-apples is not implemented.
- buy-basic-tool is not implemented.
- buy-row-supply is not implemented.
- market-return-to-active-session remains the only exchange action.
- unknown Market command rejection is not stable.
- invalid quantity rejection is not stable.
- insufficient funds rejection is not Market-owned.
- insufficient apples rejection is not Market-owned.
- inventory capacity full rejection is not implemented.
- accepted sell/buy records do not produce TransactionRecord data.
- rejected command before/after snapshots do not exist.
- Market projection rows do not exist for the exchange renderer.
- Market transaction replay has no source-owned fixture entrypoint.
- Market renderer readback has no stable projection report.
```

## Render gaps

```txt
- world-canvas is a host renderer, not a render-plan consumer.
- buildings and roster actors are not drawn in the orchard world.
- pressure and night-state are not visualized in the world canvas.
- exchange cards are not rendered from economy projections.
- transaction cards are not rendered from transaction projections.
- HTML renderer has no stable branch for MarketResultProjection rows.
- There is no renderer readback report proving the exchange view consumed MarketResultProjection instead of owning authority.
```

## Validation gaps

```txt
- No fixture covers active-session to exchange.
- No fixture covers exchange action catalog shape.
- No fixture covers accepted Market sell.
- No fixture covers rejected Market sell.
- No fixture covers accepted purchase.
- No fixture covers insufficient funds.
- No fixture covers insufficient apples.
- No fixture covers inventory capacity full.
- No fixture covers unknown Market command.
- No fixture covers invalid quantity.
- No fixture proves deterministic price rows.
- No fixture proves deterministic capacity rows.
- No fixture proves nested command result propagation.
- No fixture proves direct data-command commands are not mixed into Market authority.
- No fixture proves transaction history shape.
- No fixture proves exchange projection shape.
- No fixture proves renderer readback of MarketResultProjection.
- No fixture proves rejected command no-mutation before/after snapshots.
- No fixture proves GameHost baseline compatibility after Market helpers are added.
```

## Defer until Market fixture is implemented

```txt
- save slots
- worker assignment
- codex progression
- seeded global replay
- building effects
- tool durability
- expanded pest AI
- render-plan extraction
- settlement parity
```
