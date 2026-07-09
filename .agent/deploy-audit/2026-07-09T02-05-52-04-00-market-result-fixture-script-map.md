# Deploy Audit — Market Result Fixture Script Map

**Timestamp:** `2026-07-09T02-05-52-04-00`

## Current scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current smoke surface

The existing smoke is intentionally small. It proves the engine can boot, activate Play through `interface-composition`, tick once, and retain orchard apples.

## Needed fixture script

Add a new DOM-free fixture before browser validation:

```txt
scripts/zombie-orchard-market-result-fixture.mjs
```

It should:

```txt
import { createOrchardGame } from "../src/game.js"
create engine
navigate entry -> active session -> exchange
execute Market action rows
capture before/after resource snapshots
capture before/after inventory snapshots
capture interface-composition lastResult
capture Market projection
capture Market readback
assert accepted rows mutate
assert rejected rows do not mutate
assert command/result journals append
assert transaction rows append only for accepted commands
```

## Recommended package script addition

```json
{
  "scripts": {
    "test:market": "node scripts/zombie-orchard-market-result-fixture.mjs"
  }
}
```

Do not replace `npm test` until the fixture is stable. Add it as a separate script first, then decide whether to chain it into `npm test` after runtime compatibility is confirmed.

## Deploy safety

The current static build can stay unchanged while the fixture is added.

```txt
- no branch creation
- no PR workflow
- no Pages workflow change required
- no dist commit required
- no browser-only dependency in the fixture
```

## Validation sequence for the next implementation

```txt
node scripts/zombie-orchard-market-result-fixture.mjs
npm test
npm run build
manual browser route check only after fixture passes
```
