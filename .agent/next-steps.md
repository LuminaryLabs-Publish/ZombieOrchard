# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

Add a single interface-action authority before expanding menus or command-bearing screens. Explicit action commands must use exact identity, prove the current route and action-set revision, expose truthful availability, propagate nested results and publish visible feedback.

## Plan ledger

**Goal:** replace fail-open action resolution and discarded nested results with one typed, revision-bound and idempotent interface transaction.

- [ ] Define `InterfaceActionCommand` and `InterfaceActionResult` schemas.
- [ ] Add stable command IDs and action descriptor fingerprints.
- [ ] Add route revision and action-set revision to interface snapshots.
- [ ] Require exact action lookup for every explicit action command.
- [ ] Remove selected-index fallback from explicit activation.
- [ ] Keep selection activation as a separate command with explicit semantics.
- [ ] Bind action commands to runtime session and run generation.
- [ ] Reject stale route, stale action-set and stale descriptor fingerprints.
- [ ] Define one availability result with disabled reason.
- [ ] Project `disabled` and `aria-disabled` truthfully.
- [ ] Capture and propagate nested gameplay command results.
- [ ] Define whether route transitions require nested success.
- [ ] Add action command idempotency and duplicate replay.
- [ ] Publish action observation and bounded journal rows.
- [ ] Add result feedback to the HTML read model.
- [ ] Add action result revision to canvas and HTML frame plans.
- [ ] Acknowledge the first visible result frame.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Split `activate-by-id` from `activate-selected`.
2. Make `activate-by-id` exact-match only.
3. Return `unknown-action`, `disabled-action`, `stale-route` and `stale-action-set` results.
4. Add `routeRevision` and `actionSetRevision` to composition snapshots.
5. Store the nested command result in composition.
6. Return nested rejection instead of unconditional success.
7. Gate route transition on an explicit action policy.
8. Render disabled state and rejection feedback.
9. Add a stable action result revision.
10. Add first-frame and source/dist/Pages parity fixtures.

## Required runtime flow

```txt
visible action or public caller
  -> canonical InterfaceActionCommand
  -> session/run/route/action-set admission
  -> exact identity and availability lookup
  -> duplicate and stale-command checks
  -> nested command execution exactly once
  -> typed nested result propagation
  -> conditional route transition
  -> InterfaceActionResult commit
  -> availability/result projection
  -> visible-frame acknowledgement
```

## Target files

```txt
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/runtime.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/start.js
src/kits/interface-action-authority.js
src/kits/action-observation.js
tests/interface-action-id.fixture.mjs
tests/interface-action-disabled.fixture.mjs
tests/interface-action-nested-result.fixture.mjs
tests/interface-action-stale-route.fixture.mjs
scripts/smoke-interface-actions-browser.mjs
package.json
```

## Required fixtures

```txt
Entry invalid action ID -> typed rejection and no Play transition
Entry missing action ID -> typed rejection and no selected fallback
selected activation command -> explicit selected action only
stale Entry action after route change -> stale-route rejection
action-set revision mismatch -> stale-action-set rejection
disabled action -> visibly disabled and command rejected
construction build insufficient resources -> composition returns nested rejection
successful construction -> one mutation and one result
same command ID repeated -> stable replay and no duplicate mutation
source/dist/Pages -> equivalent action results and visible feedback
```

## Dependency order

```txt
kit graph and runtime session
  -> run generation and route revision
  -> interface action admission
  -> nested gameplay command transactions
  -> HTML/canvas result projection
  -> replay and persistence
```

## Do not claim

Do not claim exact action identity, truthful disabled state, nested-result propagation, stale-action rejection, idempotency or visible result proof until the fixtures pass on `main`.