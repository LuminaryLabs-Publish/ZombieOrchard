# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

Add a real run lifecycle boundary before expanding persistence, replay or authored setup. New Game and restart must construct a complete candidate generation, validate it, atomically install every participant, retire the predecessor and prove the first matching frame.

## Plan ledger

**Goal:** replace route-only New Game behavior with a typed, idempotent and atomic run-reset transaction.

- [ ] Define `StartRunCommand`, `ResetRunCommand` and `RunResetResult` schemas.
- [ ] Add stable command IDs, run IDs, run generations and run revisions.
- [ ] Bind lifecycle commands to runtime session, route and expected predecessor revision.
- [ ] Define explicit Play, New Game, Start, Resume, Title and terminal-restart policies.
- [ ] Create a run participant registry covering every mutable domain.
- [ ] Add participant initial-state and validation contracts.
- [ ] Allocate a deterministic seed and ID namespace per run generation.
- [ ] Construct complete candidate participant state away from the live graph.
- [ ] Validate cross-domain initial invariants.
- [ ] Atomically install the candidate or preserve the predecessor unchanged.
- [ ] Add rollback and exactly-once predecessor retirement.
- [ ] Fence stale predecessor commands, callbacks and async results.
- [ ] Add duplicate reset-command replay behavior.
- [ ] Publish participant reset receipts and one state fingerprint.
- [ ] Add run generation to canvas and HTML read models.
- [ ] Acknowledge the first frame where both surfaces cite the successor generation.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Introduce a pure `createInitialRunState(preset, runContext)` function for every participant.
2. Add `runId`, `runGeneration` and `runRevision` to the authoritative read model.
3. Replace route-only `run-setup.start` with `StartRunCommand`.
4. Define whether Entry Play resumes an eligible suspended run or starts a new run.
5. Reject implicit resume of a terminal run.
6. Build a candidate participant map without writing live state.
7. Validate resource, inventory, world, player and route invariants.
8. Commit all participants under one revision.
9. Return reset and retirement receipts.
10. Add first-frame acknowledgement and parity fixtures.

## Required runtime flow

```txt
menu lifecycle intent
  -> canonical lifecycle command
  -> session/route/predecessor admission
  -> preset and policy resolution
  -> candidate run identity, generation and seed
  -> candidate participant construction
  -> invariant validation
  -> atomic commit or full rollback
  -> predecessor retirement and stale fencing
  -> typed result and participant receipts
  -> visible-frame acknowledgement
```

## Target files

```txt
src/game.js
src/start.js
src/kits/runtime.js
src/kits/composition.js
src/kits/scoped-interface-domains.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/kits/run-lifecycle.js
src/kits/run-reset-transaction.js
src/kits/run-observation.js
tests/new-game-clean-state.fixture.mjs
tests/failed-run-restart.fixture.mjs
tests/run-reset-idempotency.fixture.mjs
tests/run-reset-rollback.fixture.mjs
scripts/smoke-run-reset-browser.mjs
package.json
```

## Required fixtures

```txt
partial run -> New Game -> clean preset state
terminal run -> Title -> restart -> playable successor
Play with eligible suspended run -> explicit resume policy
Play with terminal run -> no implicit terminal resume
reset duplicate command ID -> one mutation and stable result
stale predecessor revision -> typed rejection
candidate participant failure -> predecessor unchanged
commit-stage failure -> full rollback
old callback/command after reset -> stale rejection
fixed seed -> deterministic initial apples and IDs
canvas/HTML -> matching run generation and state fingerprint
source/dist/Pages -> equivalent reset results
```

## Dependency order

```txt
kit graph installation
  -> runtime session authority
  -> run reset generation authority
  -> route/input/economy transactions
  -> frame publication and render correlation
  -> replay and persistence
```

## Do not claim

Do not claim clean New Game, reliable restart, atomic reset, deterministic initial state, stale-command isolation or visible reset-frame parity until the fixtures pass on `main`.