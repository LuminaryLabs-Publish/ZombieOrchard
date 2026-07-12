# Deploy audit: run reset restart fixture gate

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

The existing smoke test proves only Entry, Play and initial apple population. It does not prove New Game, clean reset, post-failure restart, participant parity or source/dist/Pages behavior.

## Plan ledger

**Goal:** define executable gates before claiming that a deployed user can reliably start another clean run.

- [x] Read current package scripts and smoke fixture.
- [x] Identify missing reset and restart coverage.
- [x] Define Node state fixtures.
- [x] Define browser interaction fixtures.
- [x] Define source/dist/Pages parity gates.
- [ ] Implement fixtures and run them on `main`.

## Required Node fixtures

```txt
new-game-clean-state.fixture.mjs
failed-run-restart.fixture.mjs
pre-failure-title-new-game.fixture.mjs
run-reset-idempotency.fixture.mjs
run-reset-stale-revision.fixture.mjs
run-reset-participant-failure-rollback.fixture.mjs
run-reset-seed-reinitialization.fixture.mjs
```

## Required browser fixture

```txt
Entry -> Play -> mutate run -> Pause -> Title -> New Game -> Start
  -> active session remains visible
  -> clean preset state is shown
  -> predecessor values are absent

force terminal outcome -> Title -> Play/New Game -> Start
  -> no immediate bounce to Outcome
  -> first canvas and HTML receipts cite successor run generation
```

## Required parity matrix

```txt
source host
built dist
GitHub Pages

same reset command result codes
same clean-state fingerprint under fixed seed
same run generation in state, canvas and HTML receipts
no predecessor callback or command mutation after commit
```

## Existing proof limitations

`tests/smoke.mjs` creates one engine, verifies the Entry route, activates Play, ticks once and confirms apples exist. It never mutates or resets a run.

## Gate result

```txt
npm test: not run
npm run build: not run
reset Node fixtures: unavailable
browser restart smoke: unavailable
dist restart smoke: unavailable
Pages restart smoke: unavailable
```

No deployed restart-readiness claim is made.