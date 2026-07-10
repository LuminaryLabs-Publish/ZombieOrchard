# Deploy Audit: Market Fixture Test Build Gate

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Current package scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation surface

`tests/smoke.mjs` proves:

```txt
createOrchardGame() succeeds
entry screen is active
Play transitions to active-session
tick succeeds
orchard apples exist
```

## Missing validation surface

```txt
Market source manifest proof
Market accepted/rejected command rows
nested command result retention
resource transaction history
inventory intake history
Exchange projection/readback
GameHost marketDiagnostics
DOM-free fixture replay
browser click smoke for Market
```

## Required next gate

Add a fixture before considering Market complete:

```txt
tests/market-result-fixture.mjs
```

Then run:

```txt
npm test
npm run build
```

Preferred package wiring:

```txt
npm test -> node tests/smoke.mjs && node tests/market-result-fixture.mjs
```

## Deployment finding

No workflow or Pages deploy change is needed for the next safe ledge.

The deploy gate should stay simple: prove Market rows through Node fixture, then confirm static build still copies `index.html` and `src/` into `dist`.

## Current pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
```
