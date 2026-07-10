# ZombieOrchard Next Steps

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Goal

Make Market actions source-owned, replayable, nested-result-safe, transaction-backed, renderer-readable, GameHost-readable, fixture-verifiable, and centrally tracked before expanding the wider orchard economy.

## Next safe implementation slice

```txt
ZombieOrchard Market Nested Result Ledger Refresh + Exchange Fixture Gate
```

## Checklist

- [ ] Preserve current `index.html`, `src/boot.js`, `src/start.js`, active-session HUD, world-canvas renderer, and `snapshot["resource-ledger"].values` compatibility.
- [ ] Preserve `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick`.
- [ ] Add stable Market action IDs: `sell-apples`, `buy-basic-tool`, `buy-row-supply`, `back`.
- [ ] Add `MarketActionCatalog` and `MarketCommandSourceManifest`.
- [ ] Add Market command envelopes with `id`, `type`, `actionId`, `source`, `resourceDelta`, `inventoryDelta`, and `expectedMutation`.
- [ ] Add before/after Market source snapshots covering resources, inventory, prices, capacity, and active screen.
- [ ] Add Market preflight with stable rejection reasons.
- [ ] Add accepted/rejected Market command result records.
- [ ] Add resource transaction history for accepted rows.
- [ ] Add inventory intake rows for accepted purchase rows.
- [ ] Add Market command and result journals.
- [ ] Add an interface nested-result adapter.
- [ ] Preserve `interface-composition.command("activate", ...)` while adding `snapshot().lastResult`.
- [ ] Add Exchange-specific projection in `html-interface-renderer`.
- [ ] Add Market render readback summarizing visible action count, last result, rejection reason, transaction count, and intake count.
- [ ] Add additive `window.GameHost.getState().marketDiagnostics` or equivalent without removing the raw engine snapshot.
- [ ] Add a DOM-free fixture script for accepted sell, accepted buy, rejected insufficient-resource, and rejected capacity rows.
- [ ] Wire the fixture into `npm test` or add `npm run test:market` before widening the game economy.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Push only to `main`.
- [ ] Update root `.agent/` docs and the central LuminaryLabs ledger after implementation.

## Stop condition

Stop this slice when accepted/rejected Market rows prove:

```txt
stable action id
command envelope
before source snapshot
after source snapshot
accepted or rejected result
no mutation for rejected rows
resource transaction history for accepted rows
inventory intake history for accepted buy rows
nested result retained by interface-composition
Exchange renderer projection/readback
GameHost diagnostics
DOM-free fixture replay
central ledger updated to the exact repo-local tracker timestamp
```

## First implementation files

```txt
src/market/market-action-catalog.js
src/market/market-command-source-manifest.js
src/market/market-command-envelope.js
src/market/market-source-snapshot.js
src/market/market-preflight.js
src/market/market-command-result.js
src/market/market-result-journal.js
src/market/resource-transaction-history.js
src/market/inventory-purchase-intake.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-gamehost-diagnostics.js
tests/market-result-fixture.mjs
```

## Defer until after proof

```txt
save/load
new crop types
worker automation
deep shop economy
visual polish
shared-kit extraction
Pages workflow changes
```
