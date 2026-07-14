# Deploy audit: construction-adoption fixture gate

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

The current test checks Entry, Play, and apple presence. The build copies static files but does not prove construction behavior in source, dist, or Pages output.

## Plan ledger

**Goal:** require executable construction evidence before deployment is considered representative.

- [x] Inspect `tests/smoke.mjs`.
- [x] Inspect package scripts and build copy.
- [x] Confirm no construction fixture runs.
- [x] Define the missing source/dist/Pages matrix.
- [ ] Wire the matrix into the required check chain.

## Current proof

```txt
npm test
  -> create engine
  -> assert Entry
  -> activate Play
  -> tick once
  -> assert active-session
  -> assert apples exist
```

## Required headless fixtures

```txt
successful exact-item settlement
unknown item zero mutation
insufficient resource zero mutation
duplicate/stale command behavior
placement bounds and overlap
rollback after participant failure
effect activation exactly once
snapshot and replay determinism
```

## Required browser fixtures

```txt
click Build and Storage Shed
observe exact resource debit
observe Built card
return to active-session
observe structure on Canvas2D
verify collision/effect
verify one matching construction revision
verify first visible frame acknowledgement
```

## Deployment parity

Run the same semantic assertions against source, `dist`, and GitHub Pages. Record repository revision, artifact fingerprint, browser result, and screenshot or canvas evidence.

No deploy parity or construction readiness claim is made.
