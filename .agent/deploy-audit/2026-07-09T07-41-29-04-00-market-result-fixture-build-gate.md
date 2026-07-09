# ZombieOrchard Deploy Audit: Market Result Fixture Build Gate

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Current deploy/build surface

`package.json` exposes:

```bash
npm run dev
npm test
npm run build
```

Current script map:

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation gap

The current smoke proves only the minimal game boot/entry/play/apple path.

It does not prove:

```txt
Market command envelope
accepted Market transaction
rejected Market no-mutation
nested command result retention
interface-composition lastResult
exchange projection
Market render readback
GameHost Market diagnostics
```

## Required deploy gate

Add a separate script first:

```json
"test:market": "node scripts/zombie-orchard-market-result-fixture.mjs"
```

Then chain it into the normal test only after it is stable:

```json
"test": "node tests/smoke.mjs && node scripts/zombie-orchard-market-result-fixture.mjs"
```

## Fixture requirements

```txt
must not require DOM
must not require canvas
must not require requestAnimationFrame
must not require browser globals
must construct createOrchardGame directly
must run accepted and rejected Market rows
must assert before/after snapshots
must assert transaction history
must assert nested result retention
must assert renderer projection shape through pure projection helpers
must assert additive GameHost diagnostics helper if implemented outside browser
```

## Deployment rule

No runtime visual changes should be deployed until the fixture can prove Market result behavior through command, projection, readback, and diagnostics rows.
