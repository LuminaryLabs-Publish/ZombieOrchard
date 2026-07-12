# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Scope

Documentation-only audit of run identity, New Game/restart semantics, participant reset contracts, atomic candidate commit, rollback, predecessor retirement, stale-command rejection and visible-frame correlation. Runtime source, dependencies, package scripts, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before clean-reset or restart claims are made.

- [x] Read `src/start.js` and confirm one page-lifetime engine instance.
- [x] Read `src/game.js` and confirm all mutable kits install once.
- [x] Read `src/kits/runtime.js` and confirm no graph reset transaction.
- [x] Read `src/kits/composition.js` and trace route-only activation plus terminal Outcome routing.
- [x] Read `src/kits/scoped-interface-domains.js` and confirm generic route action activation.
- [x] Read `src/kits/game-domains.js` and inventory mutable participant state and sticky `ended` state.
- [x] Read `src/presets/orchard-preset.js` and trace Play, New Game, Start, Resume and Title actions.
- [x] Read `src/renderer/html-interface-renderer.js` and confirm route action dispatch and missing generation evidence.
- [x] Read `tests/smoke.mjs` and confirm restart coverage is absent.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run reset/restart fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates one engine during module boot
  -> recursive RAF reuses it for page lifetime

src/game.js
  -> installs all 19 engine kits once
  -> exposes no start/reset factory on the returned engine

src/presets/orchard-preset.js
  -> Play, New Game, Start, Resume and Title carry route destinations only

src/kits/composition.js
  -> activate resolves action and move(next)
  -> ended active-session automatically moves to Outcome
  -> no run lifecycle command or result

src/kits/game-domains.js
  -> active-session initializes ended=false once
  -> failure sets ended=true
  -> no reset command
  -> all participant state remains mutable and retained

src/renderer/html-interface-renderer.js
  -> dispatches action IDs to interface-composition
  -> receives no run ID, generation or reset receipt

tests/smoke.mjs
  -> verifies Entry, Play and apples only
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
run ID fields: 0
run generation fields: 0
run reset commands: 0
participant reset contracts: 0
candidate reset transactions: 0
reset rollback paths: 0
predecessor retirement receipts: 0
stale run rejection paths: 0
first visible reset-generation receipts: 0
```

## Required fixtures

```txt
partial run -> New Game -> clean state
terminal run -> Title -> restart -> playable successor
terminal run -> Play -> explicit policy result
run reset duplicate command idempotency
stale predecessor revision rejection
candidate participant failure with predecessor unchanged
commit failure with full rollback
old command/callback after reset rejected
fixed-seed initial orchard parity
canvas/HTML run-generation parity
source/dist/Pages reset-result parity
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
run reset fixtures: unavailable / not run
browser restart smoke: unavailable / not run
Pages restart smoke: unavailable / not run
```

The local container could not resolve GitHub for a fresh checkout, so existing commands were not executed through a local clone. Source evidence was read through the connected repository. No clean-reset, restart, atomic-commit, rollback, stale-command isolation or visible reset-frame claim is made.