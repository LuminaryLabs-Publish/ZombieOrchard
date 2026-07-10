# Deploy audit — Market fixture/build gate

## Current validation status

Docs-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
```

## Required gate before Market expansion

Add a DOM-free Market fixture that can run without the browser renderer and prove:

```txt
engine boots with Market-capable interface screens
Market actions have stable ids
Market action source rows match command envelopes
preflight emits accepted/rejected rows
nested engine.command results are retained
resource and inventory deltas are recorded
Exchange projection consumes retained result rows
GameHost exposes JSON-safe market diagnostics
```

## Safe validation order

1. Add source/result types and fixture rows.
2. Run DOM-free fixture.
3. Run `npm test` if available.
4. Run `npm run build` if available.
5. Run browser smoke after fixture rows pass.

## Do not deploy or polish before

- nested result retention exists
- Market projection/readback exists
- fixture proves accepted/rejected rows
