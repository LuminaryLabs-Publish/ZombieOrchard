# ZombieOrchard Validation

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Available commands

```bash
npm run dev
npm test
npm run build
```

`package.json` maps these to:

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current proof surface

```txt
tests/smoke.mjs:
  - createOrchardGame()
  - verify entry screen is active
  - activate Play through interface-composition
  - tick once
  - verify active-session is active
  - verify orchard apples exist
```

## Current pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
pushed to main: yes, docs only
```

## Validation gap

There is still no dedicated Market fixture, so the current smoke surface cannot prove:

```txt
Exchange action IDs
accepted Market command results
rejected Market command results
no-mutation rejection behavior
resource transaction history
inventory intake
nested result retention
Exchange renderer readback
GameHost market diagnostics
central ledger parity
```

## Required validation after next implementation

```bash
npm test
npm run build
```

Add one of these before implementation is considered complete:

```bash
node tests/market-result-fixture.mjs
```

or wire the same fixture into:

```bash
npm test
```

## Fixture rows required

```txt
accepted sell-apples
rejected sell-apples with no apples
accepted buy-basic-tool
rejected buy-basic-tool with insufficient money
accepted buy-row-supply
rejected buy-row-supply with capacity full
```
