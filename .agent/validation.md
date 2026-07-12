# Validation — ZombieOrchard

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Scope

Documentation-only audit of frame-publication fault containment. Runtime source, dependencies, package scripts, rendering behavior, gameplay behavior, and deployment configuration were not changed.

## Plan ledger

**Goal:** record the source-backed observer/render failure path and the executable proof required before command-result preservation or frame-loop liveness is claimed.

- [x] Read browser boot and recursive RAF scheduling.
- [x] Read command mutation, tick mutation, snapshots, subscriptions, and synchronous notification.
- [x] Read world-canvas and HTML-interface render stages.
- [x] Confirm raw public access to `engine.subscribe()` through `window.GameHost.engine`.
- [x] Confirm observer invocation has no per-listener isolation.
- [x] Confirm command mutation occurs before notification and result return.
- [x] Confirm tick mutation occurs before notification and snapshot return.
- [x] Confirm next-frame scheduling occurs after tick and both renderers.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run fault-containment fixtures.

## Source-backed findings

```txt
src/kits/runtime.js
  -> engine.command() calls domain.command() before notify()
  -> engine.command() returns only after notify() completes
  -> engine.tick() mutates clock and domains before notify()
  -> notify() invokes listeners synchronously without try/catch
  -> one listener exception skips later listeners
  -> subscribe() accepts an untyped function and returns only a deletion closure

src/start.js
  -> exposes the raw engine through window.GameHost
  -> draw() calls tick, world.render, ui.render, then requestAnimationFrame
  -> no try/catch/finally wraps the frame cycle
  -> any stage exception prevents successor scheduling

src/renderer/world-canvas.js
  -> mutates one canvas directly
  -> returns no typed render result

src/renderer/html-interface-renderer.js
  -> replaces root.innerHTML directly
  -> returns no typed render result
  -> delegated click commands do not catch publication failures
```

## Deterministic failure sequences

### Command path

```txt
observer = () => { throw Error("boom") }
engine.subscribe(observer)
engine.command("resource-ledger", "add", { values: { money: 1 } })

result:
  resource mutation persists
  notify throws
  command result does not return
  later observers are skipped
```

### RAF path

```txt
draw()
  -> engine.tick commits clock/domain mutation
  -> notify invokes throwing observer
  -> exception escapes
  -> world.render not called
  -> ui.render not called
  -> requestAnimationFrame(draw) not called
```

### Renderer path

```txt
draw()
  -> tick and publication complete
  -> renderer throws
  -> remaining surface may not render
  -> next RAF is not scheduled
  -> public state can remain ahead of visible pixels
```

## Required fixtures

```txt
command-result-preserved-after-observer-fault
observer-delivery-continues-after-predecessor-fault
observer-delivery-result-identifies-failed-lease
observer-quarantine-and-revocation-policy
subscriber-throw-does-not-silently-stop-loop
world-render-fault-stage-result
html-render-fault-stage-result
partial-frame-classification
failed-frame-has-no-visible-frame-receipt
successor-schedule-finalization
critical-tick-fault-explicit-stop
recovery-generation-stale-callback-rejection
publication/state/frame-receipt-correlation
built-artifact-browser-smoke
Pages-frame-fault-recovery-smoke
```

## Existing proof boundary

Current `npm test` verifies only the Entry route, Play transition, and apple presence. It does not register throwing subscribers, force renderer exceptions, inspect command result preservation, verify later-observer delivery, test successor scheduling, or validate a recovery generation.

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
gameplay behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
observer fault fixtures: unavailable / not run
renderer fault fixtures: unavailable / not run
frame-cycle liveness fixture: unavailable / not run
recovery-generation fixture: unavailable / not run
Pages fault smoke: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No observer isolation, command-result preservation, render-stage recovery, frame-loop liveness, or visible-frame correlation claim is made.
