# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Scope

Documentation-only audit of failure detection, terminal outcome sealing, post-terminal command admission, Outcome routing, immutable result projection and visible-frame correlation. Runtime source, dependencies, package scripts, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before terminal-outcome correctness claims are made.

- [x] Read `src/start.js` and confirm raw engine publication.
- [x] Read `src/game.js` and confirm all interface/gameplay kits install into one runtime.
- [x] Read `src/kits/runtime.js` and confirm commands have no lifecycle or terminal admission.
- [x] Read `src/kits/composition.js` and confirm Outcome routing follows a later snapshot observation.
- [x] Read `src/kits/game-domains.js` and confirm tick-only terminal suspension and post-terminal command availability.
- [x] Read `src/presets/orchard-preset.js` and confirm Outcome route actions and active-session command surfaces.
- [x] Read `src/renderer/html-interface-renderer.js` and confirm Outcome reads live score/day.
- [x] Read `src/renderer/world-canvas.js` and confirm no terminal result revision is consumed.
- [x] Read `tests/smoke.mjs` and confirm terminal coverage is absent.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run terminal-outcome fixtures.

## Source-backed findings

```txt
src/kits/game-domains.js
  -> tick returns early when ended
  -> command handler does not reject when ended
  -> move, collect, clear and next-phase can still mutate
  -> failure creates no terminal result ID or revision

src/kits/composition.js
  -> Outcome route is committed in a separate domain tick
  -> route commit has no shared terminal transaction

src/start.js
  -> window.GameHost exposes raw engine commands

src/renderer/html-interface-renderer.js
  -> Outcome cards read current active-session score and day
  -> no immutable terminal result is projected

src/renderer/world-canvas.js
  -> canvas consumes live world/session state
  -> no terminal result or terminal frame revision is consumed

tests/smoke.mjs
  -> verifies Entry, Play and apples only
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
terminal flags: 1 ended Boolean
terminal result objects: 0
terminal revisions: 0
post-terminal command guards: 0
commands still callable after ended: move, collect, clear, next-phase
immutable Outcome read models: 0
first visible terminal receipts: 0
terminal fixtures: 0
```

## Required fixtures

```txt
failure threshold -> exactly one terminal result
multiple damaging pests -> one terminal commit
terminal commit -> Outcome route from same result
post-terminal move -> rejected with no state change
post-terminal collect -> rejected with no world/economy/score change
post-terminal clear -> rejected with no pest/economy/score change
post-terminal next-phase -> rejected with no day/phase change
raw GameHost post-terminal command -> rejected
Outcome score/day -> immutable after terminal
duplicate terminal candidate -> stable replay
canvas/HTML -> matching terminal result revision
source/dist/Pages -> equivalent terminal result and summary
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
terminal outcome fixtures: unavailable / not run
browser terminal smoke: unavailable / not run
Pages terminal smoke: unavailable / not run
```

Source evidence was read through the connected repository. No terminal seal, immutable final summary, post-terminal command revocation, atomic route commit, idempotency or visible terminal-frame claim is made.
