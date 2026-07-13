# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Scope

Documentation-only reconciliation of runtime subscriptions, snapshot publication, shared delivery objects, reentrant mutation, observer exceptions, browser-frame liveness and central tracking. Runtime source, dependencies, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before observer-publication correctness claims are made.

- [x] Read `src/start.js` and confirm `engine.tick()` precedes both renderers and successor RAF scheduling.
- [x] Read `src/game.js` and confirm all kits share one runtime.
- [x] Read `src/kits/runtime.js` and confirm synchronous shared-object listener delivery.
- [x] Confirm command and tick mutation occurs before notification.
- [x] Confirm listener errors are not isolated.
- [x] Confirm listeners can re-enter public `command()` and `tick()`.
- [x] Confirm the repo-local observer audit was newer than central tracking.
- [x] Add timestamped reconciliation audits and root routing.
- [x] Synchronize the central repo ledger and internal change log.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run observer-publication fixtures.

## Source-backed findings

```txt
src/kits/runtime.js
  -> one Set stores untyped listeners
  -> command mutates before notify
  -> tick mutates all domains before notify
  -> notify captures one snapshot object
  -> every listener receives the same object
  -> no try/catch, queue, sequence or reentrancy guard

src/start.js
  -> engine.tick occurs before canvas and HTML rendering
  -> no error boundary protects draw
  -> successor RAF is requested only after render

tests/smoke.mjs
  -> no subscriber is registered
  -> no order, mutation, throw, reentrancy or liveness assertion exists
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
listener registries: 1 Set
publication sequences: 0
observer identities: 0
immutable envelopes: 0
delivery queues: 0
reentrancy guards: 0
fault-isolated listener calls: 0
observer delivery fixtures: 0
```

## Required fixtures

```txt
immutable per-observer delivery
monotonic sequence and predecessor
reentrant command queueing/rejection
reentrant tick queueing/rejection
throwing observer continuation
committed-result preservation
retry duplicate protection
slow-observer budget
unsubscribe during publication
canvas/HTML frame correlation
source/dist/Pages parity
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
central ledger synchronized: yes
central change log added: yes

npm test: not run
npm run build: not run
observer publication fixtures: unavailable / not run
browser observer smoke: unavailable / not run
Pages observer smoke: unavailable / not run
```

No immutable-delivery, monotonic-order, reentrancy-isolation, observer-fault-containment, retry-safety or visible-frame-liveness claim is made.