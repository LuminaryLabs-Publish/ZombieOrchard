# Deploy Audit: Market Fixture Package Gate

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Current package surface

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current deploy state

The repo has a static build command that copies `index.html` and `src/` into `dist`.

This pass did not change build scripts or runtime source.

## Required next fixture command

```txt
npm run test:market -> node scripts/zombie-orchard-market-result-fixture.mjs
```

## Recommended validation order

```txt
node scripts/zombie-orchard-market-result-fixture.mjs
npm run test:market
npm test
npm run build
static browser smoke after fixture passes
```

## Gate criteria

```txt
fixture proves accepted Market sell row
fixture proves rejected Market sell row
fixture proves accepted Market buy row
fixture proves rejected Market buy row
fixture proves no mutation on rejected rows
fixture proves interface-composition lastResult
fixture proves MarketResultProjection shape
fixture proves MarketRenderReadback shape
fixture proves GameHost market diagnostics helper shape
existing smoke remains passing
build artifact still contains index.html and src/
```

## Main finding

Do not add a deploy dependency, bundler, branch workflow, or Pages rewrite for the next pass.

The next deploy-facing change should only add a DOM-free Market fixture script and package command, then keep the static build unchanged.
