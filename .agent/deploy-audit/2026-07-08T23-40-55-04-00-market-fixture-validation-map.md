# ZombieOrchard Market Fixture Validation Map

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Current scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation coverage

```txt
tests/smoke.mjs:
  createOrchardGame()
  verify entry screen is active
  activate Play through interface-composition
  tick once
  verify active-session is active
  verify orchard apples exist
```

## Missing validation coverage

```txt
- No Market source manifest fixture.
- No accepted/rejected MarketCommandResult fixture.
- No rejected-command no-mutation proof.
- No transaction journal proof.
- No nested command result retention proof.
- No interface-composition snapshot.lastResult proof.
- No exchange renderer projection proof.
- No renderer readback proof.
- No GameHost market diagnostics proof.
```

## Next validation command

Add a script after source helpers exist:

```json
{
  "scripts": {
    "test:market": "node tests/market-transaction-fixture.mjs"
  }
}
```

Then keep `npm test` as the fast baseline and either call `npm run test:market` separately or compose it into a future `npm run check` script.

## Fixture order

```txt
1. Source manifest fixture rows.
2. Source snapshot deterministic rows.
3. Accepted sell/buy rows.
4. Rejected sell/buy/no-mutation rows.
5. Command/result journal rows.
6. Interface nested result adapter rows.
7. Exchange projection rows.
8. Renderer readback rows.
9. GameHost compatibility rows.
10. Static build still copies new src/market files.
```

## Deploy rule

Static deploy can remain unchanged because `npm run build` copies `src/` into `dist/src`.

Do not add bundler complexity for the Market fixture gate.

## Validation status for this pass

```txt
runtime source changed: no
package scripts changed: no
npm test run: no
npm run build run: no
browser smoke run: no
fixture run: no, source files do not exist yet
pushed to main: yes
```
