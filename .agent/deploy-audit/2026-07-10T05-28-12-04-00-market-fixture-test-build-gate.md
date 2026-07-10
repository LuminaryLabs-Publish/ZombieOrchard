# Deploy Audit: Market Fixture Test Build Gate

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Current scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current smoke coverage

```txt
createOrchardGame()
entry screen active
activate Play
one tick
active-session active
orchard apples exist
```

## Missing deploy gate

There is no Market fixture and no build-time proof that Exchange result rows exist.

## Required next validation

```bash
node tests/market-result-fixture.mjs
npm test
npm run build
```

The fixture should either be wired into `npm test` or exposed as `npm run test:market` before economy expansion.

## Fixture rows

```txt
accepted sell-apples
rejected sell-apples with zero apples
accepted buy-basic-tool
rejected buy-basic-tool with insufficient money
accepted buy-row-supply
rejected buy-row-supply at capacity
```

## Current pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because proof files do not exist yet
```
