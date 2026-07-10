# Deploy Audit — Market Fixture Build Gate

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Current scripts

```txt
npm test -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation gap

The smoke test proves entry screen, play transition, and apple presence. It does not prove Market result retention, Exchange projection, resource transaction rows, inventory intake rows, renderer readback, or GameHost.market diagnostics.

## Required next gate

```txt
node tests/market-result-retention-fixture.mjs
npm test
npm run build
browser smoke
GameHost.market readback inspection
```

## Fixture requirements

```txt
accepted Market action keeps nested command result
rejected Market action keeps stable reason
resource deltas are recorded
inventory deltas are recorded
Exchange projection consumes retained results
HTML renderer readback reports Market projection state
GameHost.market is JSON-safe
```

## Validation status for this pass

Docs-only.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
```
