# Deploy audit: refresh-rate browser fixture gate

## Required proof before release claims

```txt
source host at synthetic 30 Hz
source host at synthetic 60 Hz
source host at synthetic 120 Hz
same wall duration -> same fixed-step count and gameplay state
long-frame catch-up respects max step budget
excess time produces an explicit diagnostic
hidden tab follows declared suspension policy
resume does not apply stale unbounded debt
Canvas2D and HTML render the same state revision
built dist behavior matches source
published Pages behavior matches built dist
```

## Measurements

Capture wall duration, callback count, admitted step count, dropped/deferred seconds, runtime elapsed, pressure channels, pest count, pest travel, player condition, Canvas receipt, HTML receipt and final state fingerprint.

## Existing coverage

`npm test` runs a headless smoke with one explicit `engine.tick(1 / 60)`. It does not execute RAF, browser visibility, multiple callback frequencies, catch-up, renderer receipts, built output or Pages.

## Gate

Do not claim refresh-rate independence, correct fixed-step accumulation, hidden-tab safety, visible-frame convergence, source/dist parity or Pages readiness until the fixture matrix passes against immutable source and artifact revisions.