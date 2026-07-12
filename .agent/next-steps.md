# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

Add a terminal-outcome authority before expanding combat, scoring or restart flows. Failure must create one immutable result, revoke gameplay capabilities and drive Outcome from that committed result rather than from mutable live session state.

## Plan ledger

**Goal:** replace the loose `ended` Boolean and live Outcome projection with a revisioned, idempotent terminal transaction.

- [ ] Define `TerminalOutcomeCandidate` and `TerminalOutcomeResult`.
- [ ] Add terminal outcome ID, cause and revision.
- [ ] Bind the candidate to runtime session and run generation.
- [ ] Capture expected gameplay and participant revisions.
- [ ] Move the failure predicate into explicit terminal admission.
- [ ] Freeze score, day, phase, player, resources, pressure and relevant world summaries.
- [ ] Commit terminal phase and result atomically.
- [ ] Revoke movement, collection, clearing and phase-change commands.
- [ ] Revoke construction, roster and other economy mutations after terminal.
- [ ] Reject stale, duplicate and post-terminal commands with typed results.
- [ ] Route Outcome only from a committed terminal result.
- [ ] Render Outcome from the immutable terminal read model.
- [ ] Add terminal result revision to canvas and HTML frame plans.
- [ ] Acknowledge the first visible Outcome frame.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Add a terminal phase enum instead of relying only on `ended`.
2. Add an early terminal admission check to every active-session command.
3. Return `run-terminal` for post-terminal commands.
4. Capture a frozen terminal summary exactly once.
5. Make Outcome read the frozen summary.
6. Add a terminal result ID and revision.
7. Route Outcome only after terminal result commit.
8. Remove or capability-gate raw direct command access.
9. Add duplicate terminal and post-terminal fixtures.
10. Add source/dist/Pages parity proof.

## Required runtime flow

```txt
damage resolution
  -> terminal predicate evidence
  -> TerminalOutcomeCandidate
  -> predecessor and duplicate admission
  -> immutable participant summary
  -> atomic terminal result and phase commit
  -> gameplay/economy capability revocation
  -> Outcome route commit
  -> immutable result projection
  -> first visible terminal frame acknowledgement
```

## Target files

```txt
src/kits/game-domains.js
src/kits/composition.js
src/kits/runtime.js
src/game.js
src/start.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/kits/terminal-outcome-authority.js
src/kits/terminal-command-gateway.js
src/kits/terminal-observation.js
tests/terminal-failure.fixture.mjs
tests/post-terminal-command.fixture.mjs
tests/terminal-summary.fixture.mjs
tests/terminal-idempotency.fixture.mjs
scripts/smoke-terminal-outcome-browser.mjs
package.json
```

## Required fixtures

```txt
condition crosses zero -> one terminal result
multiple pests cross threshold in same step -> one result
next tick after failure -> no new terminal result
post-terminal move -> typed rejection and no position change
post-terminal collect -> typed rejection and no world/resource/score change
post-terminal clear -> typed rejection and no pest/resource/score change
post-terminal next-phase -> typed rejection and no day/phase change
direct GameHost command on Outcome -> rejected
Outcome summary -> stable across later ticks and rejected commands
duplicate terminal candidate -> stable replay
source/dist/Pages -> equivalent result and visible summary
```

## Dependency order

```txt
runtime session and run generation
  -> fixed-step damage resolution
  -> terminal predicate and result authority
  -> command/capability revocation
  -> Outcome route and projection
  -> restart and persistence
```

## Do not claim

Do not claim terminal sealing, immutable final score, post-terminal isolation, atomic Outcome routing, idempotency or visible result proof until the fixtures pass on `main`.
