# ZombieOrchard Deploy Audit: Market Fixture Check Build Wire

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Current commands

```bash
npm run dev
npm test
npm run build
```

Current `package.json` mappings:

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation surface

```txt
tests/smoke.mjs
  -> createOrchardGame()
  -> verify entry screen
  -> activate Play
  -> tick once
  -> verify active-session
  -> verify orchard apples exist
```

## Deploy gap

The build is static-copy only and should stay simple. The missing proof is not deployment structure; it is that `npm test` does not yet exercise Market source/result/readback rows.

## Required next validation wire

Add a DOM-free fixture first:

```bash
node tests/market-result-fixture.mjs
```

Then either wire it into `npm test` or add a named script:

```json
{
  "scripts": {
    "test": "node tests/smoke.mjs && node tests/market-result-fixture.mjs",
    "test:market": "node tests/market-result-fixture.mjs"
  }
}
```

## Build rule

Do not change Pages/static deploy until these pass locally in a source implementation pass:

```bash
npm test
npm run build
```

## This pass validation

```txt
runtime source changed: no
package.json changed: no
fixture added: no
npm test: not run
npm run build: not run
browser smoke: not run
push target: main only
branch created: no
pull request created: no
```
