# Validation — ZombieOrchard

## Latest pass

`2026-07-10T12-49-54-04-00`

## Validation performed

Docs-only pass.

```txt
- Checked current public LuminaryLabs-Publish repo list.
- Compared central repo-ledger recency across non-Cavalry Publish repos.
- Confirmed no checked repo was new, ledger-absent, missing root agent state, recently added, or otherwise undocumented.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected ZombieOrchard as oldest eligible documented fallback.
- Read .agent root docs and kit registry.
- Read package.json, index.html, src/boot.js, src/start.js, src/game.js, src/kits/runtime.js, src/kits/composition.js, src/kits/scoped-interface-domains.js, src/kits/game-domains.js, src/renderer/html-interface-renderer.js, src/renderer/world-canvas.js, src/presets/orchard-preset.js, and tests/smoke.mjs.
- Added timestamped tracker and audit entries.
- Updated central ledger and internal change-log.
```

## Runtime validation not performed

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

## Why runtime validation was not run

This pass updated internal `.agent` documentation only. No runtime source, package, renderer, or fixture files were changed.

## Validation required for next implementation

```txt
DOM-free Market fixture
npm test
npm run build
browser smoke
GameHost.market readback inspection
```

## Required fixture assertions next

- accepted Market action keeps nested `CommandResult`.
- rejected Market action keeps stable reason.
- resource deltas are recorded.
- inventory deltas are recorded.
- Exchange projection consumes retained results.
- HTML renderer readback reports Market projection state.
- `GameHost.market` is JSON-safe.
