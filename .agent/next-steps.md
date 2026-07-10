# Next steps — ZombieOrchard

Last aligned: `2026-07-10T08-28-26-04-00`

## Next safe ledge

```txt
ZombieOrchard Market Projection Result Ledger Refresh + GameHost Fixture Gate
```

## Goal

Make the Exchange/Market path source-owned, nested-result-safe, renderer-readable, GameHost-readable, and fixture-verifiable while preserving the current engine and browser shell.

## First implementation slice

```txt
src/market/market-actions.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-results.js
src/market/market-result-ledger.js
src/market/market-projection.js
src/market/market-gamehost.js
tests/market-result-fixture.mjs
```

## Required behavior

```txt
1. Define stable Market action IDs and source rows.
2. Wrap Market actions in command envelopes.
3. Add price, resource, and capacity preflight rows.
4. Return typed accepted/rejected/no_mutation result rows.
5. Preserve nested action.command results inside interface-composition.
6. Record resource transaction history.
7. Record inventory purchase intake rows.
8. Add Exchange-specific render projection rows.
9. Expose additive GameHost.market diagnostics.
10. Prove accepted and rejected rows in a DOM-free fixture.
```

## Compatibility rules

```txt
Keep engine.command() compatibility.
Keep window.GameHost.engine/getState/tick compatibility.
Keep the existing canvas renderer.
Keep the existing HTML renderer entrypoint.
Add Market readback as additive data only.
```

## Avoid next

```txt
Do not rewrite the runtime.
Do not rewrite the canvas renderer.
Do not redesign the orchard visuals.
Do not expand economy content before Market result proof exists.
Do not infer success from final resource totals only.
```

## Validation target

```txt
node tests/market-result-fixture.mjs
npm test
npm run build
```

The fixture should run without browser APIs and assert source action, preflight, result, transaction, inventory, nested-result, projection, and GameHost-compatible rows.
