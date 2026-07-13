# Deploy audit: observer publication fixture gate

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

Current Node proof never registers a subscriber. Static build and Pages publication therefore prove file availability, not observer ordering, isolation or browser-frame liveness.

## Plan ledger

**Goal:** require source, built and deployed proof before observer-publication claims.

- [x] Inspect current smoke scope.
- [x] Define Node fixture matrix.
- [x] Define browser and Pages fixture matrix.
- [ ] Implement fixtures.
- [ ] Run source proof.
- [ ] Run dist proof.
- [ ] Run Pages proof.

## Node fixtures

```txt
normal two-observer monotonic order
shared-snapshot mutation isolation
throwing first observer with second observer continuation
committed command result preservation
reentrant command queue/rejection
reentrant tick queue/rejection
unsubscribe during delivery
observer generation retirement
slow-observer budget result
```

## Browser fixtures

```txt
throwing observer does not terminate RAF
canvas and HTML consume same publication sequence
observer failure is visible in diagnostics
no stale frame after committed tick
no nested publication stack growth
```

## Deployment gate

```txt
npm test
npm run build
run observer fixtures against src
run observer fixtures against dist
load GitHub Pages
repeat order/fault/reentrancy/frame checks
compare publication IDs, sequences and results
```

## Current result

```txt
observer fixtures implemented: no
source observer proof: not run
dist observer proof: not run
Pages observer proof: not run
deployment changed: no
```
