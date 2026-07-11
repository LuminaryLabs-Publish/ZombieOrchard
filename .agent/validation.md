# Validation — ZombieOrchard

## Scope

This was a documentation-only audit. Runtime source, dependencies, package scripts, render behavior, and deployment configuration were not changed.

## Plan ledger

**Goal:** Record exactly what was inspected, what was changed, and which persistence proofs remain absent.

- [x] Re-read `src/start.js`.
- [x] Re-read `src/game.js`.
- [x] Re-read `src/kits/runtime.js`.
- [x] Re-read `src/kits/scoped-interface-domains.js`.
- [x] Re-read `src/kits/composition.js`.
- [x] Re-read `src/kits/game-domains.js`.
- [x] Re-read `src/presets/orchard-preset.js`.
- [x] Re-read `src/renderer/html-interface-renderer.js`.
- [x] Re-read `tests/smoke.mjs`.
- [x] Re-read `package.json`.
- [x] Re-read `.github/workflows/deploy-pages.yml`.
- [x] Confirm the dormant Session Select and missing persistence services.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime persistence implementation remains future work.
- [ ] Central ledger sync is pending until the central write completes.

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

The test does not cover session lifecycle, cadence parity, capability reachability, command atomicity, deterministic randomness, replay, save export, slot indexing, load validation, migration, rollback, or browser persistence.

## Required persistence fixture matrix

```txt
fresh game -> save envelope -> schema/product/content identity present
save -> mutate -> load -> durable state equals saved fingerprint
save -> reset -> load -> deterministic state and random cursors restored
corrupt JSON -> typed rejection -> no live mutation
unsupported schema -> typed rejection -> no live mutation
older schema -> deterministic migration -> accepted terminal result
partial domain failure -> rollback -> before fingerprint preserved
slot overwrite -> atomic replacement
slot delete -> deterministic slot-index update
load success -> new loadEpoch -> stale work rejected
browser reload -> slot metadata and payload remain consistent
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
persistence fixture: unavailable / not run
migration fixture: unavailable / not run
atomic-load fixture: unavailable / not run
browser reload fixture: unavailable / not run

repo-local docs pushed to main: pending
central ledger updated on main: pending
```
