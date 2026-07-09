# ZombieOrchard Market Fixture Test Build Gate

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Available commands

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation gap

`tests/smoke.mjs` proves entry -> play -> active-session plus apple presence.

It does not prove Market command/result behavior.

## Required next gate

Add one of these before considering Market complete:

```txt
node tests/market-result-fixture.mjs
```

or wire Market fixture rows into:

```txt
npm test
```

## This pass

Docs-only. Runtime source was not changed. `npm test`, `npm run build`, browser smoke, and DOM-free Market fixture were not run.
