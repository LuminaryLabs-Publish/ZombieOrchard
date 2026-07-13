# Deploy audit: observer publication central sync gate

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Summary

Static source checks and the current Node smoke do not exercise runtime subscriptions. Deployment cannot prove observer order, mutation isolation, fault containment or frame-loop liveness.

## Plan ledger

**Goal:** define the proof gate required before runtime-observer correctness is claimed for source, `dist` or deployed Pages.

- [x] Confirm current smoke has no subscriber fixture.
- [x] Confirm no browser observer harness exists.
- [x] Confirm no deployed Pages observer probe exists.
- [x] Record the required parity matrix.
- [ ] Implement and run all fixtures.

## Required fixtures

```txt
normal two-observer monotonic order
shared-snapshot mutation isolation
throwing first observer with successful second delivery
reentrant command queue/rejection
reentrant tick queue/rejection
committed result preserved after delivery fault
retry duplicate protection
unsubscribe during delivery
slow-observer budget result
canvas and HTML publication correlation
successor RAF after observer fault
source/dist/Pages parity
```

## Gate

The observer-publication claim remains blocked until all fixture rows pass against the exact `main` commit deployed to GitHub Pages.

## Current result

```txt
npm test: not run
npm run build: not run
observer fixtures: unavailable / not run
browser smoke: unavailable / not run
Pages smoke: unavailable / not run
```