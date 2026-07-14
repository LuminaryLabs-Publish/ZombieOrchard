# Deploy audit: clean run reset fixture gate

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

The current smoke test proves only the first Entry-to-Play route transition and apple presence. Static copy and Pages publication can succeed while New Game, retry, pause, title return, deterministic reset, and successor-frame identity remain broken.

## Plan ledger

**Goal:** block clean-run claims until source, browser, built output, and Pages execute the same reset and generation matrix.

- [x] Inspect current smoke and build scripts.
- [x] Confirm no reset, retry, route-suspension, or frame-generation fixture exists.
- [x] Define the required fixture matrix.
- [ ] Add and execute the fixtures on `main`.

## Required source fixtures

```txt
first Play creates clean generation
New Game Start creates distinct generation
preset values restored
all mutable gameplay state reset
deterministic seed reproduction
new-seed divergence
duplicate and stale command rejection
candidate failure rollback
predecessor outcome retention
```

## Required browser fixtures

```txt
entry and setup suspend gameplay and pressure
pause suspends gameplay and pressure
Title retires active gameplay admission
outcome -> title -> Play does not rebound to old outcome
HTML and Canvas2D expose matching RunGeneration
first visible successor frame acknowledged
no predecessor frame appears after adoption
```

## Required artifact gates

```txt
npm test includes clean-run matrix
npm run build preserves testable behavior
dist smoke passes the same generation assertions
Pages origin passes the same browser assertions
source, dist, and Pages fingerprints agree
```

No deployment or production-readiness claim is valid until the matrix passes against the exact published artifact.