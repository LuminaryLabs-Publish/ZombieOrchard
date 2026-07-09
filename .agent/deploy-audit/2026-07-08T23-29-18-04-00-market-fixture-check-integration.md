# ZombieOrchard Market Fixture Check Integration

**Timestamp:** `2026-07-08T23-29-18-04-00`

## Scope

This deploy audit records how the next Market fixture should integrate with the existing static validation path.

No workflow, package script, or runtime source changed in this pass.

## Existing package commands

```txt
npm run dev:
  python -m http.server 5173

npm test:
  node tests/smoke.mjs

npm run build:
  rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy shape

```txt
source route:
  index.html
  src/**

build artifact:
  dist/index.html
  dist/src/**
```

## Current smoke proof

```txt
tests/smoke.mjs:
  createOrchardGame()
  assert entry active
  activate Play through interface-composition
  tick once
  assert active-session active
  assert apples exist
```

## Required fixture integration

```txt
Add:
  tests/market-transaction-fixture.mjs

Then either:
  keep npm test as node tests/smoke.mjs and document direct fixture command

Or, preferred:
  update npm test to run both:
    node tests/smoke.mjs && node tests/market-transaction-fixture.mjs
```

## Fixture constraints

```txt
- DOM-free.
- No canvas dependency.
- No browser dependency.
- No Playwright dependency.
- No GitHub Pages dependency.
- Should import createOrchardGame and source-owned Market helpers.
- Should preserve existing smoke behavior.
- Should not require package install changes.
```

## Required cases before deploy confidence

```txt
- source manifest shape
- action ids
- reason ids
- price rows
- capacity rows
- active-session to exchange
- accepted sell
- rejected sell
- accepted buy
- rejected buy insufficient funds
- rejected buy capacity full
- unknown command
- invalid quantity
- no-mutation on reject
- transaction history on accept
- command journal shape
- result journal shape
- nested result adapter shape
- projection shape
- renderer readback shape
- GameHost baseline compatibility
```

## Do not update deploy first

Do not change Pages workflow, build command, or route structure before the Market fixture exists and passes locally.

## Stop line

The next deploy-safe point is when `npm test` includes the Market fixture and passes with the existing smoke test.
