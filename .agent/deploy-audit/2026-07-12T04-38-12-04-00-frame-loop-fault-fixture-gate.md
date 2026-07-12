# ZombieOrchard Frame-Loop Fault Fixture Gate

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

The current Node smoke and static build do not exercise observer failures, renderer failures, recursive RAF liveness, recovery generations, or visible-frame receipts. Deployment readiness requires deterministic fault injection against source, built artifact, a real browser, and GitHub Pages.

## Plan ledger

**Goal:** define the exact executable evidence required before frame-publication fault containment is considered deployable.

- [x] Read current package scripts and smoke boundary from existing audit state.
- [x] Map missing observer, render, scheduling, and recovery fixtures.
- [x] Define source, build, browser, and Pages gates.
- [x] Define artifacts and failure diagnostics.
- [ ] Add fixture modules and package scripts.
- [ ] Execute all gates on `main`.

## Required pure/runtime fixtures

```txt
observer-delivery-order
observer-failure-isolation
later-observer-delivery-after-fault
observer-quarantine-threshold
observer-revocation-result
command-result-preserved-after-publication-fault
tick-result-classifies-publication-fault
detached-snapshot-one-per-cycle
bounded-fault-journal
```

## Required frame fixtures

```txt
world-render-stage-success
world-render-stage-failure
html-render-stage-success
html-render-stage-failure
partial-frame-policy
failed-required-surface-no-frame-receipt
successor-schedule-finalization
critical-tick-fault-explicit-stop
recovery-generation-increment
stale-recovery-callback-rejection
first-recovered-visible-frame-receipt
```

## Required browser smoke

```txt
load Entry screen
install one healthy and one throwing observer through admitted test capability
activate Play or a deterministic command
verify committed result returns
verify healthy observer receives successor snapshot
verify loop continues or explicit fault state is visible
force world renderer fault
verify HTML/schedule policy
force HTML renderer fault
verify world/schedule policy
recover under a new generation
verify first recovered frame matches committed state revision
```

## Build and Pages gates

```txt
npm test
npm run build
built artifact browser smoke
GitHub Pages observer-fault smoke
GitHub Pages renderer-fault smoke
GitHub Pages recovery-frame smoke
```

## Required diagnostics

Each failed fixture must record:

```txt
runtimeSessionId
frameCycleId
frameCycleGeneration
stateRevision
publicationCycleId
observerLeaseId or surfaceId
stage result
fault class
successor schedule result
recovery generation
visible frame receipt or explicit absence
```

## Current result

```txt
runtime source changed: no
fixture code added: no
package scripts changed: no
browser fault injection available: no
built-artifact fault smoke: no
Pages fault smoke: no
branch created: no
pull request created: no
```

## Gate

Do not claim observer fault isolation, command-result preservation, frame-loop liveness, renderer recovery, or Pages readiness until every required fixture passes on `main` and the resulting receipts are retained.
