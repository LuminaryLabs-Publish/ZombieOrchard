# Deploy Audit: Market Fixture Validation Wire Map

**Timestamp:** `2026-07-09T05-11-22-04-00`

## Current deploy surface

`ZombieOrchard` is a static browser app.

Current validation commands are:

```txt
npm run dev
npm test
npm run build
```

Current build shape:

```txt
rm -rf dist
mkdir -p dist
cp index.html dist/index.html
cp -R src dist/src
```

## Current smoke surface

`tests/smoke.mjs` proves basic app creation and entry/play flow.

It does not yet prove Market command results, nested result retention, Exchange projection, or renderer readback.

## Required next validation additions

```txt
scripts/zombie-orchard-market-result-fixture.mjs
npm run test:market
npm test includes or is preceded by test:market after fixture is stable
npm run build remains static artifact proof
```

## Fixture should prove

```txt
Market manifest loads
Market action catalog has stable IDs
accepted sale mutates resources correctly
accepted purchase mutates resources/inventory correctly
rejected command keeps before/after snapshots equal
nested command result is retained by interface-composition
Exchange projection consumes lastResult
MarketRenderReadback consumes projection
GameHost market diagnostics expose latest rows
```

## Deploy decision

Do not alter Pages or deployment wiring in the next source pass unless the new fixture requires package script wiring.

The next deploy-relevant change should be limited to validation scripts and package commands.

## Validation status for this docs pass

```txt
runtime source changed: no
package changed: no
workflow changed: no
fixture created: no
npm test run: no
npm run build run: no
browser smoke run: no
```
