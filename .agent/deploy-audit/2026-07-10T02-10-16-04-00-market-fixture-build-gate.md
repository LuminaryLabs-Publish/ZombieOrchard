# ZombieOrchard Deploy Audit: Market Fixture Build Gate

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Current commands

```bash
npm run dev
npm test
npm run build
```

Current mappings:

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current proof gap

`tests/smoke.mjs` proves only:

```txt
createOrchardGame()
entry screen exists
Play transition reaches active-session
one tick works
orchard apples exist
```

It does not prove:

```txt
Exchange action IDs
Market command envelopes
accepted Market rows
rejected Market rows
no-mutation rejection behavior
nested result retention
Exchange renderer readback
GameHost market diagnostics
central ledger parity
```

## Required next fixture

```bash
node tests/market-result-fixture.mjs
```

Fixture rows should include:

```txt
accepted sell apples
accepted buy basic tool
rejected insufficient resources
rejected capacity full
nested result retained
Exchange render readback
GameHost market diagnostics
```

## Build gate recommendation

After the fixture exists, wire it into `npm test` before widening Market economy or renderer work.

## Validation not run in this pass

```txt
npm test: not run
npm run build: not run
browser smoke: not run
market fixture: not run because it does not exist yet
```
