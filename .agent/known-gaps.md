# ZombieOrchard Known Gaps

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Critical gaps

```txt
- The exchange / Market screen exists but still falls through to generic screen rendering.
- The exchange screen currently only exposes Back.
- Market actions do not yet have stable source-owned action IDs.
- There is no MarketActionCatalog.
- There is no MarketCommandSourceManifest.
- There is no MarketCommandEnvelope.
- There is no MarketSourceSnapshot before/after pair.
- There is no deterministic price source snapshot.
- There is no deterministic capacity source snapshot.
- There is no Market preflight result with stable rejection reasons.
- There is no accepted/rejected MarketCommandResult record.
- There is no rejected-command no-mutation proof row.
- There is no MarketCommandJournal.
- There is no MarketResultJournal.
- There is no Market transaction ledger.
- There is no inventory purchase intake record for accepted Market buys.
- interface-composition currently drops nested command results.
- interface-composition snapshot does not expose lastResult.
- html-interface-renderer has no exchange-specific Market projection branch.
- There is no MarketRenderReadback record.
- GameHost does not expose fixture-readable Market diagnostics.
- There is no DOM-free Market result fixture.
- The central repo ledger was behind repo-local .agent state before this pass.
```

## Secondary gaps

```txt
- The wider economy remains intentionally shallow.
- Worker assignment is not yet source-owned.
- Tool effects are not yet source-owned.
- Phase authority is still local to active-session.
- Save/load is absent.
- Codex progression is shallow.
- Outcome summary is minimal.
- World-canvas is adequate for the current proof but not yet render-plan driven.
```

## Current risk

Adding more economy content before result readback will make Market bugs harder to isolate.

The specific risk is that nested commands already execute, but their results are not retained, projected, or fixture-readable.

## Recommended handling

Solve one vertical result-readback path first:

```txt
Market action -> command envelope -> preflight -> result -> journal -> transaction -> nested result -> projection -> renderer readback -> GameHost diagnostics -> fixture
```
