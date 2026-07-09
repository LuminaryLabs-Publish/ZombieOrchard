# ZombieOrchard Deploy Audit — Market Fixture Validation Map

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Current scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy shape

The repo is a static browser app. `npm run build` copies `index.html` and `src/` into `dist`.

## Validation gap

The current `npm test` smoke does not prove Market accepted/rejected rows, transaction history, nested result retention, Exchange renderer projection, or GameHost diagnostics.

## Required validation map

```txt
scripts or tests:
  tests/market-result-fixture.mjs

proof rows:
  accepted sell-apples
  accepted buy-basic-tool
  rejected insufficient-resource
  rejected capacity

must verify:
  action id
  command envelope
  before snapshot
  after snapshot
  result accepted/rejected
  rejection reason
  no mutation on rejection
  transaction on acceptance
  nested result retained
  renderer projection/readback data
  GameHost diagnostic shape
```

## Deploy constraint

Do not change static deploy mechanics until the Market fixture runs locally with `npm test` and `npm run build` still succeeds.
