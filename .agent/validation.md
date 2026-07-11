# Validation — ZombieOrchard

## Scope

This was a documentation-only audit. Runtime source, dependencies, package scripts, render behavior, and deployment configuration were not changed.

## Plan ledger

**Goal:** Record the inspected surfaces, documentation changes, and missing runtime-session proofs without overstating validation.

- [x] Re-read `src/boot.js`.
- [x] Re-read `src/start.js`.
- [x] Re-read `src/game.js`.
- [x] Re-read `src/kits/runtime.js`.
- [x] Re-read `src/kits/scoped-interface-domains.js`.
- [x] Re-read `src/kits/composition.js`.
- [x] Re-read `src/kits/game-domains.js`.
- [x] Re-read `src/presets/orchard-preset.js`.
- [x] Re-read `src/renderer/html-interface-renderer.js`.
- [x] Re-read `src/renderer/world-canvas.js`.
- [x] Re-read `tests/smoke.mjs`.
- [x] Re-read `package.json`.
- [x] Trace Play, New Game, Start, Pause, Resume, Title, Outcome, and re-entry behavior.
- [x] Confirm the process-lifetime graph, all-domain tick loop, Outcome bounce-back, and missing reset/disposal ownership.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime session implementation remains future work.
- [ ] Central ledger synchronization remains pending until the central write completes.

## Source-backed findings

```txt
src/start.js
  -> creates one engine before Play
  -> creates both renderers once
  -> starts an unretained recursive RAF
  -> exposes raw engine and unrestricted manual tick

src/kits/runtime.js
  -> ticks every domain on every engine tick
  -> has no lifecycle, reset, stop, or dispose service

src/kits/composition.js
  -> treats lifecycle-looking actions as routes
  -> automatically routes any ended session to Outcome

src/kits/game-domains.js
  -> active-session ended state is retained in closure
  -> pressure and other domains have no pause admission

src/presets/orchard-preset.js
  -> Play, New Game, Start, Pause, Resume, Title, and Outcome actions contain route targets only

renderers
  -> have render methods only
  -> delegated click listener has no removal handle
  -> render observations have no session identity or epoch
```

## Current proof surface

```txt
npm test
  -> creates one engine
  -> verifies Entry
  -> activates Play
  -> ticks once
  -> verifies Active Session
  -> verifies at least one apple
```

The current smoke test does not prove a fresh session, pause freeze, outcome finalization, stable return to title, reset, stale-work rejection, RAF/listener ownership, disposal, clock parity, command atomicity, replay, or persistence.

## Required session lifecycle fixture matrix

```txt
boot -> no gameplay mutation before admitted start
Play -> fresh session identity and initial fingerprint
mutate -> Title -> New Game -> Start -> initial state under new epoch
Pause at night -> repeated callbacks -> gameplay fingerprint unchanged
Resume -> same session and epoch continue
terminal condition -> one immutable outcome result
Outcome -> Title -> repeated ticks -> remains Entry
Outcome -> Title -> Play -> fresh non-ended session
reset construction failure -> old valid session unchanged
successful reset -> epoch increments once
duplicate Start -> one session graph and one terminal result
stale command/tick/callback -> typed rejection and no mutation
stop/start -> exactly one RAF owner
dispose twice -> same terminal result and zero owned leases
```

## Required browser fixture matrix

```txt
Play -> first-frame session observation
Pause -> visible freeze
Resume -> same epoch
Outcome -> Title remains stable
New Game -> fresh HUD/world state
rapid double-click Start -> one session
remount harness -> no duplicate listener or RAF
GameHost -> detached lifecycle observations
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
session lifecycle fixture: unavailable / not run
pause fidelity fixture: unavailable / not run
outcome/title fixture: unavailable / not run
reset fixture: unavailable / not run
disposal fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger updated on main: pending
```
