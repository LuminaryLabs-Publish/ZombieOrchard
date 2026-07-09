# ZombieOrchard Validation

**Timestamp:** `2026-07-08T21-18-39-04-00`

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
Market nested result / transaction fixture gate: created
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
Playwright smoke: not run
GitHub Pages check: not run
```

No runtime code changed.

No local command execution was performed in this connector-only documentation pass.

## Required next validation matrix

```txt
Market fixture cases:
  - entry to active-session still works
  - active-session to exchange still works
  - exchange exposes sell-apples, buy-basic-tool, buy-row-supply, and back
  - MarketCommandSourceManifest has expected action ids
  - MarketCommandSourceManifest has expected command types
  - MarketCommandSourceManifest has expected reason catalog
  - MarketCommandSourceManifest has price rows
  - MarketCommandSourceManifest has capacity rows
  - sell-apples accepted when apples > 0
  - sell-apples rejected when apples = 0
  - buy-basic-tool accepted when money >= price and capacity available
  - buy-basic-tool rejected on insufficient funds
  - buy-row-supply accepted when money >= price and capacity available
  - buy command rejected when inventory capacity is full
  - unknown Market command rejected with stable reason
  - invalid quantity rejected with stable reason
  - price rows stable across snapshots
  - capacity rows stable across snapshots
  - rejected commands do not mutate resources or inventory
  - accepted commands append transaction history
  - accepted/rejected commands append MarketCommandJournal rows
  - accepted/rejected commands append MarketResultJournal rows
  - interface-composition exposes nested command result
  - interface-composition snapshot exposes lastResult
  - html exchange projection renders from snapshot only
  - renderer readback proves projection rows consumed by renderer
  - GameHost baseline engine/getState/tick shape remains available
```

## Suggested future commands

```bash
npm test
npm run build
python -m http.server 5173
```

After the Market transaction fixture implementation exists, add one of these fixture targets:

```bash
node tests/market-transaction-fixture.mjs
# or
npm test
```

## Do not claim complete until

```txt
npm test passes after the Market fixture is added.
npm run build passes after renderer and host changes.
Manual browser smoke confirms active-session, Market, Build, Roster, Inventory, and Outcome remain reachable.
Fixture output proves source manifest, accepted, rejected, no-mutation, transaction history, Market command journal, Market result journal, nested result propagation, projection shape, renderer readback, and GameHost compatibility cases.
```
