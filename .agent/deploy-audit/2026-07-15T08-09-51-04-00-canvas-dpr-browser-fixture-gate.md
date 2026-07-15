# Deploy audit: Canvas DPR browser fixture gate

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

The Node smoke test never constructs a canvas or browser viewport. The static build copies source files but does not prove source, `dist`, and deployed Pages use the same accepted logical/physical render-surface descriptor.

## Plan ledger

**Goal:** require executable browser evidence before claiming DPR correctness, stable backing-store reuse, or deployed parity.

- [x] Inspect package scripts and smoke coverage.
- [x] Confirm no Canvas2D browser fixture exists.
- [x] Define source, build, and Pages gates.
- [ ] Add browser automation.
- [ ] Capture accepted descriptors and screenshots.
- [ ] Compare source, `dist`, and Pages results.

## Required gates

```txt
source server:
  -> open at DPR 1 and DPR 2
  -> record CSS and physical dimensions
  -> record dimension-write count across 60 unchanged frames
  -> resize viewport and verify one accepted successor
  -> capture first matching frame

build artifact:
  -> npm run build
  -> serve dist
  -> repeat descriptor, write-count and screenshot checks

GitHub Pages:
  -> open deployed URL
  -> repeat descriptor and screenshot checks
  -> verify no stale source/build mismatch
```

## Pass criteria

```txt
physical dimensions equal accepted logical size * accepted DPR
unchanged frames do not rewrite dimensions
one accepted viewport change creates one successor generation
world coordinates remain logically stable
source, dist and Pages screenshots are equivalent within declared tolerance
no late resize command mutates a retired surface
```

No browser, build-artifact, or deployed-origin fixture was run in this documentation turn.
