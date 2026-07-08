# ZombieOrchard Validation

**Timestamp:** `2026-07-08T03-08-39-04-00`

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

No runtime code changed.

No local command execution was performed in this connector-only documentation pass.

## Required next validation matrix

```txt
Market fixture cases:
  - entry to active-session still works
  - active-session to exchange still works
  - sell-apples accepted when apples > 0
  - sell-apples rejected when apples = 0
  - buy-basic-tool accepted when money >= price and capacity available
  - buy-basic-tool rejected on insufficient funds
  - buy-row-supply accepted when money >= price and capacity available
  - buy command rejected when inventory capacity is full
  - unknown Market command rejected with stable reason
  - price rows stable across snapshots
  - capacity rows stable across snapshots
  - rejected commands do not mutate resources or inventory
  - accepted commands append transaction history
  - interface-composition exposes nested command result
  - html exchange projection renders from snapshot only
```

## Do not claim complete until

```txt
npm test passes after the Market fixture is added.
npm run build passes after renderer and host changes.
Manual browser smoke confirms active-session, Market, Build, Roster, Inventory, and Outcome remain reachable.
```
