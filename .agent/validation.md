# Validation — ZombieOrchard

## Latest pass

`2026-07-10T10-00-37-04-00`

## Validation performed

Docs-only pass.

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
