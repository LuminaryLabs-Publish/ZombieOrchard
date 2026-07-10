# Deploy audit — Market fixture build gate

Timestamp: `2026-07-10T07-08-10-04-00`

## Current scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> copy index.html and src/ into dist/
```

## Current validation coverage

The existing smoke coverage proves that the page can enter play and that apples exist. It does not exercise Exchange/Market actions, nested command result retention, resource transactions, inventory intake, HTML Market projection, or GameHost Market diagnostics.

## Required next gate

```txt
node tests/market-result-fixture.mjs
npm test
npm run build
```

`tests/market-result-fixture.mjs` should run without browser APIs and verify accepted and rejected Market rows from source action through command result, nested-result retention, transaction row, Exchange projection, and GameHost-compatible diagnostics.

## Deploy blockers

```txt
No Market source manifest exists.
No Market result fixture exists.
No package script references a Market fixture.
No Exchange projection/readback exists.
No GameHost.market diagnostics block exists.
```

## Safe deploy rule

Do not treat the Market/Exchange path as deploy-ready until DOM-free Market fixture rows and the existing browser smoke both pass.
