# ZombieOrchard Next Steps

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Goal

Make Market actions source-owned, replayable, nested-result-safe, transaction-backed, renderer-readable, GameHost-readable, and fixture-verifiable before expanding the wider orchard economy.

## Next safe implementation slice

```txt
ZombieOrchard Market Nested Result Consumer + Exchange Projection Fixture Gate
```

## Checklist

- [ ] Preserve current `index.html`, `src/boot.js`, `src/start.js`, active-session HUD, world-canvas renderer, and `snapshot["resource-ledger"].values` compatibility.
- [ ] Preserve `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick`.
- [ ] Add stable Market action IDs: `sell-apples`, `buy-basic-tool`, `buy-row-supply`, `back`.
- [ ] Add `MarketActionCatalog` and `MarketCommandSourceManifest` as the durable source of action/reason/price/capacity rows.
- [ ] Add `MarketCommandEnvelope` normalization.
- [ ] Add `MarketSourceSnapshot` before/after rows for resources, inventory, prices, capacity, and active interface state.
- [ ] Add deterministic `MarketPreflight` with stable rejection reasons.
- [ ] Add stable `MarketCommandResult` records.
- [ ] Add no-mutation proof for rejected commands.
- [ ] Add `MarketCommandJournal` and `MarketResultJournal`.
- [ ] Add resource transaction history for accepted Market rows.
- [ ] Add inventory purchase intake records where Market buys create inventory.
- [ ] Add `InterfaceNestedResultAdapter` so `interface-composition.activate` preserves nested command results.
- [ ] Expose `interface-composition.snapshot().lastResult` without breaking `active`, `previous`, or `activeSnapshot`.
- [ ] Add Exchange-specific Market projection for `html-interface-renderer`.
- [ ] Add `MarketRenderReadback` rows proving the renderer consumed Market projection.
- [ ] Add additive `GameHost` Market diagnostics.
- [ ] Add `scripts/zombie-orchard-market-result-fixture.mjs`.
- [ ] Add a separate `npm run test:market` script before chaining it into the main smoke.
- [ ] Run the DOM-free Market fixture.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.

## Stop condition

Stop when the fixture proves accepted, rejected, unchanged, transaction, nested-result, projection, readback, and GameHost rows without DOM, canvas, browser state, renderer rewrite, or wider economy expansion.
