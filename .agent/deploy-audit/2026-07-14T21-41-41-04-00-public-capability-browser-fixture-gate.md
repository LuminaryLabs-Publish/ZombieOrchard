# Deploy audit: public capability browser fixture gate

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

The current smoke proof does not exercise `window.GameHost`, external ticking, direct engine access, route or pause admission, capability retirement, or frame convergence. Static build and Pages publication can therefore succeed while the public host boundary remains unrestricted.

## Plan ledger

**Goal:** block capability-readiness claims until source, dist and Pages execute the same public-host fixture matrix.

- [x] Identify current smoke coverage.
- [x] Identify missing browser and deployed-origin coverage.
- [ ] Add source browser fixtures.
- [ ] Run the same fixtures against `dist`.
- [ ] Run the same fixtures against the Pages URL.
- [ ] Bind results to product and artifact revisions.

## Required fixture matrix

```txt
production GameHost excludes raw engine, ctx, domains and addKit
state readback is immutable and revisioned
allowlisted public command settles once
unknown command is rejected without mutation
duplicate command is idempotently rejected
stale state revision is rejected
wrong host or run generation is rejected
route-ineligible command is rejected
pause-ineligible command is rejected
external tick is disabled in production
diagnostic tick requires a valid lease
expired or retired lease is rejected
headless step is explicitly classified
visible step produces one matching HTML and Canvas2D acknowledgement
capability retirement rejects late callers
source, dist and Pages results match
```

## Artifact evidence

Each fixture result should bind:

```txt
product commit
artifact hash
capability policy revision
host generation
run generation
browser and viewport identity
runtime frame revision
HTML frame revision
Canvas frame revision
```

## Validation boundary

No test, workflow, build or deployment change was made and no browser fixture was run.