# ZombieOrchard Deploy Audit: Market Result Fixture Wire Map

**Timestamp:** `2026-07-09T07-30-48-04-00`

## Current commands

```txt
npm run dev
npm test
npm run build
```

Current scripts:

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy shape

The build script creates a static `dist/` folder from `index.html` and `src/`.

The existing smoke test is DOM-free and only checks baseline game creation, entry activation, active-session transition, and apple seeding.

## Fixture gap

There is no Market-specific fixture script yet.

The next source pass should add:

```txt
scripts/zombie-orchard-market-result-fixture.mjs
npm run test:market
```

Then chain it into the main test command only after the standalone fixture is green.

## Required fixture checks

```txt
createOrchardGame()
transition to active-session
collect or seed resources deterministically for Market rows
transition to exchange
execute sell-apples
verify accepted result
verify apples decrease and money increases
execute rejected sell-apples row
verify no mutation
execute buy-basic-tool
verify inventory intake
execute rejected buy row
verify no mutation
verify interface-composition.lastResult exists
verify Market projection exists
verify MarketRenderReadback exists
verify GameHost diagnostics can expose result row additively
```

## Validation performed this pass

```txt
repo-list comparison: performed
central-ledger comparison: performed
source readback: performed
docs updated: yes
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
Market fixture: not run because fixture does not exist yet
```

## Stop condition

Do not promote the Market slice until `node scripts/zombie-orchard-market-result-fixture.mjs`, `npm test`, and `npm run build` pass from `main`.
