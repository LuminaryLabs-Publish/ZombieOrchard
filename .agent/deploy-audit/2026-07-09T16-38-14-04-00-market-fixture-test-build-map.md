# ZombieOrchard Deploy Audit: Market Fixture Test Build Map

**Timestamp:** `2026-07-09T16-38-14-04-00`

## Current commands

```bash
npm run dev
npm test
npm run build
```

## Current deploy/build surface

```txt
npm run build
  -> remove dist
  -> copy index.html
  -> copy src/
```

## Current validation surface

```txt
npm test
  -> node tests/smoke.mjs
```

## Missing deploy gate

There is no Market-specific fixture command yet.

Add one before implementation is considered validated:

```bash
node tests/market-result-fixture.mjs
```

Preferred package script:

```json
{
  "scripts": {
    "test": "node tests/smoke.mjs && node tests/market-result-fixture.mjs",
    "test:market": "node tests/market-result-fixture.mjs"
  }
}
```

## Build/deploy rule

Keep the static build path stable. Do not change Pages routing or artifact layout until Market rows are fixture-proven with:

```bash
npm test
npm run build
```

## Central sync rule

After fixture proof, update:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/<timestamp>-zombie-orchard-*.md
```
