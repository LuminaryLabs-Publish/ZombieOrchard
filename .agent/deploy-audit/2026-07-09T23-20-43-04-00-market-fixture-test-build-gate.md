# ZombieOrchard Deploy Audit: Market Fixture Test Build Gate

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Current package scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current smoke coverage

`tests/smoke.mjs` proves:

```txt
createOrchardGame()
entry screen exists
Play transitions to active-session
tick runs
orchard apples exist
```

It does not prove Market accepted/rejected rows.

## Deploy risk

`npm test` and `npm run build` can pass while Exchange/Market remains Back-only and result-unreadable.

## Required next deploy gate

Add a DOM-free fixture such as:

```txt
tests/market-result-fixture.mjs
```

Then run:

```bash
npm test
npm run build
```

## Fixture expectations

```txt
activate exchange screen
stable Market action ids exist
sell-apples accepted row exists
sell-apples rejected row exists
buy-basic-tool accepted row exists
buy-basic-tool rejected row exists
rejected rows prove no mutation
nested result retained by interface-composition
Exchange projection/readback exists
GameHost market diagnostics exist
```

## Validation in this pass

```txt
runtime source changed: no
package scripts changed: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
branch created: no
pull request created: no
```
