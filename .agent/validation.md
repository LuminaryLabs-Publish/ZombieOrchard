# Validation — ZombieOrchard

Last aligned: `2026-07-10T08-28-26-04-00`

## Validation state for this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: yes
```

## Current available commands

```txt
npm run dev
npm test
npm run build
```

## Current coverage

`npm test` currently runs `node tests/smoke.mjs`. The smoke path proves basic reachability into play and apple presence, not Market/Exchange transaction proof.

## Source evidence checked

```txt
package.json: dev/test/build scripts only.
index.html: #world canvas, #ui-root, #error-panel, boot module.
src/start.js: engine, world renderer, HTML renderer, RAF loop, GameHost.
src/kits/runtime.js: command() returns command results.
src/kits/composition.js: nested action.command result is dispatched but not retained.
src/presets/orchard-preset.js: exchange screen is Market + Back only.
src/renderer/html-interface-renderer.js: generic screen rendering, no Market branch.
tests/smoke.mjs: entry -> play -> apples exist.
```

## Missing validation

```txt
No tests/market-result-fixture.mjs exists yet.
No DOM-free Market accepted/rejected rows are asserted.
No nested interface command result retention is asserted.
No Exchange projection/readback is asserted.
No GameHost.market diagnostics are asserted.
```

## Required next validation gate

```txt
node tests/market-result-fixture.mjs
npm test
npm run build
```

The Market fixture should pass before expanding economy content or changing render/visual behavior.
