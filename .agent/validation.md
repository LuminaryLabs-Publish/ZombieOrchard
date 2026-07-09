# ZombieOrchard Validation

**Timestamp:** `2026-07-09T07-30-48-04-00`

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

## Validation status for this audit pass

```txt
repo-list comparison: performed
central-ledger comparison: performed
source readback: performed
root .agent update: performed
architecture audit update: created
render audit update: created
gameplay audit update: created
market-authority audit update: created
deploy audit update: created
turn ledger update: created
central ledger update: performed
central change-log update: created
runtime source changed: no
branch created: no
pull request created: no
local npm test: not run
local npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because fixture files do not exist yet
```

## Next required validation

```txt
node scripts/zombie-orchard-market-result-fixture.mjs
npm test
npm run build
```

Run browser validation only after the DOM-free fixture proves accepted, rejected, no-mutation, nested-result, projection, readback, and GameHost rows.
