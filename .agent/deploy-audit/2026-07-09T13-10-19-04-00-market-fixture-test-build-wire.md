# Deploy Audit: Market Fixture Test Build Wire

**Timestamp:** `2026-07-09T13-10-19-04-00`

## Current scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy/build shape

The repo is a static browser app. `npm run build` copies `index.html` and `src/` into `dist`.

The current build does not transform source and does not run Market fixture validation before copying artifacts.

## Current validation gap

`tests/smoke.mjs` proves only:

```txt
create game
entry active
activate Play
one tick
active-session active
apples exist
```

It does not prove:

```txt
Exchange action source rows
Market command envelopes
accepted Market result rows
rejected no-mutation rows
nested result retention
Exchange renderer readback
GameHost Market diagnostics
```

## Required next validation wiring

Add a DOM-free fixture script:

```txt
tests/market-result-fixture.mjs
```

Run it either from:

```json
{
  "scripts": {
    "test": "node tests/smoke.mjs && node tests/market-result-fixture.mjs"
  }
}
```

or through a separate script:

```json
{
  "scripts": {
    "test:market": "node tests/market-result-fixture.mjs"
  }
}
```

## Required commands after next implementation

```bash
npm test
npm run build
```

## Deployment guardrail

Do not change Pages/deploy behavior before fixture rows prove Market accepted/rejected behavior and static build still copies the route.
