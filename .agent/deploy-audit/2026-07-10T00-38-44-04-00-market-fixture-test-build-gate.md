# ZombieOrchard Deploy Audit: Market Fixture Test Build Gate

**Timestamp:** `2026-07-10T00-38-44-04-00`

## Current commands

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation gap

The current smoke test does not exercise Market accepted/rejected command rows, nested result retention, renderer readback, or GameHost diagnostics.

## Required next gate

Add one of:

```txt
node tests/market-result-fixture.mjs
```

or wire the Market fixture into:

```txt
npm test
```

## Required validation after implementation

```txt
npm test
npm run build
```

## This pass validation

```txt
runtime source changed: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture does not exist yet
pushed to main: yes, documentation only
```
