# ZombieOrchard Deploy Audit: Market Fixture Build Test Gate

**Timestamp:** `2026-07-09T13-03-43-04-00`

## Current package scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy shape

The repo is a static browser app. The build step copies `index.html` and `src/` into `dist`.

No deploy workflow change is needed for this documentation pass.

## Current validation status

```txt
runtime source changed: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
branch created: no
pull request created: no
pushed to main: yes
```

## Required fixture gate

Before the next implementation is considered deploy-safe, add a fixture like:

```txt
tests/market-result-fixture.mjs
```

It should prove:

```txt
accepted sell-apples
accepted buy-basic-tool
rejected insufficient-resource
rejected capacity-full
no mutation on rejection
nested result retention
Exchange projection/readback
GameHost market diagnostics
```

## Required command gate

At minimum, after implementing the Market result/readback ledge, run:

```bash
npm test
npm run build
```

Preferred final script shape:

```json
{
  "scripts": {
    "test": "node tests/smoke.mjs && node tests/market-result-fixture.mjs"
  }
}
```

## Deploy rules

```txt
- Push only to main.
- Do not create branches.
- Do not create pull requests.
- Do not change Pages/static deploy until fixture and build pass.
```
