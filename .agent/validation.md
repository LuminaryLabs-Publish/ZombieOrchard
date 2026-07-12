# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Scope

Documentation-only audit of interface action identity, selection fallback, availability projection, nested command result propagation, route admission, stale-action fencing, idempotency and visible-result correlation. Runtime source, dependencies, package scripts, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before interface-action correctness claims are made.

- [x] Read `src/start.js` and confirm delegated HTML and public raw-engine command paths.
- [x] Read `src/game.js` and confirm all interface/gameplay kits install into one runtime.
- [x] Read `src/kits/runtime.js` and confirm commands publish synchronously without command identity or revisions.
- [x] Read `src/kits/scoped-interface-domains.js` and confirm explicit-ID fallback to selected action.
- [x] Read `src/kits/composition.js` and confirm nested command results are discarded.
- [x] Read `src/kits/game-domains.js` and confirm active-session exact lookup and construction rejection behavior.
- [x] Read `src/presets/orchard-preset.js` and trace current route and command-bearing actions.
- [x] Read `src/renderer/html-interface-renderer.js` and confirm disabled state and action result are not projected.
- [x] Read `tests/smoke.mjs` and confirm action-admission coverage is absent.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run interface-action fixtures.

## Source-backed findings

```txt
src/kits/scoped-interface-domains.js
  -> explicit activate uses exact match OR selectedIndex fallback
  -> invalid or missing actionId can execute a selected action
  -> disabled is checked after fallback resolution

src/kits/game-domains.js
  -> active-session activate uses exact match only
  -> action semantics differ across interface domains
  -> construction-runtime can return accepted=false for missing resources

src/kits/composition.js
  -> optional nested engine.command result is not stored
  -> route transition can proceed independently of nested result
  -> command-bearing action without route returns accepted=true unconditionally

src/renderer/html-interface-renderer.js
  -> action.disabled is ignored
  -> every action is rendered as a clickable button
  -> no action result or rejection feedback is projected

src/start.js
  -> window.GameHost exposes the raw engine command surface

tests/smoke.mjs
  -> verifies Entry, Play and apples only
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
generic scoped interface definitions: 11
custom active-session interface: 1
exact explicit lookup policies: inconsistent
unknown explicit ID rejection in generic domains: no
missing explicit ID rejection in generic domains: no
nested command result propagation: no
disabled HTML controls: no
route revision fields: 0
action-set revision fields: 0
action command IDs: 0
action result revisions: 0
first visible action-result receipts: 0
```

## Required fixtures

```txt
invalid Entry action ID -> rejected, no Play transition
missing Entry action ID -> rejected, no selected fallback
explicit selected activation -> separate command and deterministic result
active-session and generic domains -> same identity contract
stale route revision -> typed rejection
stale action-set revision -> typed rejection
disabled descriptor -> disabled HTML and command rejection
construction insufficient resources -> composition returns nested rejection
successful construction -> exactly one mutation and success result
duplicate action command ID -> stable replay and no duplicate effect
canvas/HTML -> matching action result revision
source/dist/Pages -> equivalent admission and feedback
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
interface action fixtures: unavailable / not run
browser action smoke: unavailable / not run
Pages action smoke: unavailable / not run
```

Source evidence was read through the connected repository. No exact-ID admission, truthful disabled projection, nested-result propagation, stale-action isolation, idempotency or visible result-frame claim is made.