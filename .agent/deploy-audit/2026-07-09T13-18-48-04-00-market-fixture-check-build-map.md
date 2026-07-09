# ZombieOrchard Deploy Audit: Market Fixture Check Build Map

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Current package commands

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy/build state

The static build copies `index.html` and `src/` into `dist`.

This is enough for the current static route, but the Market proof is not wired into test/build yet.

## Required next fixture command

Add either:

```txt
node tests/market-result-fixture.mjs
```

or wire it into:

```txt
npm test
```

## Required fixture rows

```txt
accepted sell-apples
accepted buy-basic-tool
rejected insufficient-resource
rejected capacity
nested result retained by interface-composition
Exchange renderer projection/readback produced
GameHost market diagnostics produced
```

## Release rule

Do not change Pages or deployment wiring until the Market fixture and existing smoke command both pass. Keep all changes on `main` and do not introduce branch-only deploy assumptions.

## Current pass validation

```txt
runtime source changed: no
package scripts changed: no
npm test: not run
npm run build: not run
browser smoke: not run
branch created: no
PR created: no
```
