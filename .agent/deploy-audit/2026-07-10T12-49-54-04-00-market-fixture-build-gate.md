# Deploy audit — Market Fixture Build Gate

## Timestamp

`2026-07-10T12-49-54-04-00`

## Current scripts

`package.json` exposes:

```txt
npm run dev
npm test
npm run build
```

`npm test` runs:

```txt
node tests/smoke.mjs
```

`npm run build` creates `dist`, copies `index.html`, and copies `src/`.

## Current smoke coverage

`tests/smoke.mjs` proves:

```txt
engine starts at entry
play transitions to active-session
orchard apples exist
```

It does not prove Market behavior.

## Required gate before Market expansion

Add a DOM-free Market fixture before shipping any Market content or renderer polish:

```txt
tests/market-result-projection-smoke.mjs
```

Minimum assertions:

```txt
accepted Market command retains nested result
rejected Market command retains stable reason
resource delta rows are recorded
inventory intake rows are recorded
Exchange projection reads retained result
HTML renderer readback rows can be produced without a browser
GameHost.market is JSON-safe
```

## Validation for next implementation

```txt
npm test
npm run build
browser smoke
GameHost.market readback inspection
```

## This pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
pushed to main: yes
```
