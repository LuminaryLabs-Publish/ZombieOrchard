# Validation — ZombieOrchard

## Scope

This was a documentation-only audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record the inspected surfaces, source-backed transaction findings, documentation changes and missing proof without overstating validation.

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
- [x] Re-read `package.json` and `index.html`.
- [x] Trace Construction -> Storage Shed from DOM click through parent and child dispatch.
- [x] Confirm nested publication, child-result loss, false parent success, target fallback and missing rollback/correlation.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [x] Complete central ledger and internal change-log synchronization.
- [ ] Runtime transaction implementation remains future work.

## Source-backed findings

```txt
src/renderer/html-interface-renderer.js
  -> delegated click calls engine.command(interface-composition, activate)
  -> command result is not projected to the caller or UI

src/kits/scoped-interface-domains.js
  -> activate returns an action descriptor
  -> action request event has no command or transaction identity

src/kits/composition.js
  -> dispatches child command through ctx.engine.command
  -> does not retain the child result
  -> evaluates route movement independently
  -> returns parent success without child evidence

src/kits/runtime.js
  -> every public command notifies subscribers
  -> nested public dispatch therefore publishes before parent completion
  -> outer command publishes again
  -> no internal non-publishing dispatch path exists
  -> no command IDs, journal, transaction context or state fingerprints exist

src/kits/game-domains.js
  -> construction unknown ID falls back to first catalog item
  -> resource payment returns Boolean only
  -> resource debit and object creation are not staged/rolled back as one transaction

src/presets/orchard-preset.js
  -> Storage Shed is the current action that exercises nested child dispatch

tests/smoke.mjs
  -> does not exercise construction, child rejection, publication count or rollback
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

The smoke test does not prove session lifecycle, pause fidelity, clock parity, capability reachability, command atomicity, child-result propagation, single publication, rollback, replay or persistence.

## Required DOM-free transaction fixture matrix

```txt
valid shed build
  -> accepted parent
  -> accepted child
  -> one resource debit
  -> one built object
  -> one publication

insufficient resources
  -> rejected child reason retained
  -> rejected parent
  -> no resource mutation
  -> no built object
  -> one publication

unknown build id
  -> typed target rejection
  -> no first-item fallback

missing child domain
  -> parent rejected
  -> route unchanged
  -> state fingerprint unchanged

child throws after staged debit
  -> rollback restores resource and construction fingerprints

command plus route / child accepted
  -> child and route commit atomically

command plus route / child rejected
  -> route unchanged

duplicate commandId
  -> one committed effect
  -> stable replayed result

stale session or epoch
  -> typed rejection
  -> no mutation

accepted/rejected/rolled-back cases
  -> exactly one subscriber notification each
  -> no intermediate partial snapshot
```

## Required browser fixture

```txt
click Storage Shed
  -> one visible debit/build transition
  -> one command result observation
  -> one committed fingerprint
  -> first rendered frame acknowledges the same transaction
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
transaction fixture: unavailable / not run
publication-count fixture: unavailable / not run
rollback fixture: unavailable / not run
render-correlation fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger updated on main: yes
central internal change log added: yes
```
