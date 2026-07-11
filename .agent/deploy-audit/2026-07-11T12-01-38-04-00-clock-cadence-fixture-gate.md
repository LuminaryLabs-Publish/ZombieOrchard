# Fixed-Step Clock Fixture Gate

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

The current smoke test does not exercise timing. Deployment should not claim stable gameplay speed or pause semantics until deterministic clock fixtures and browser proof are part of the gate.

## Plan ledger

**Goal:** fail deployment when cadence, pause, stall or manual-step behavior violates the clock contract.

- [x] Inventory current test/build scripts.
- [x] Define DOM-free fixture matrix.
- [x] Define browser timing smoke.
- [ ] Implement scripts and wire them into `npm test`.

## Current gate

```txt
npm test
  -> tests/smoke.mjs

npm run build
  -> copy index.html and src into dist
```

## Required fixtures

```txt
fixture:clock-cadence-parity
fixture:clock-pause-freeze
fixture:clock-stall-budget
fixture:clock-manual-exclusion
fixture:clock-terminal-stability
fixture:clock-render-correlation
```

## Required browser smoke

```txt
smoke:clock-browser
  -> start one identified session
  -> drive controlled 30/60/120 Hz schedules
  -> verify equal committed ticks for equal wall time
  -> pause and verify zero gameplay ticks
  -> resume without backlog burst
  -> simulate visibility stall and verify bounded overrun result
  -> verify GameHost cannot bypass automatic clock ownership
  -> verify canvas and HTML acknowledge one committed tick
```

## Deployment admission

```txt
existing smoke passes
clock fixtures pass
browser clock smoke passes
static build succeeds
Pages artifact contains clock modules and required fixture wiring
```

Any cadence-dependent state, post-pause mutation, unbounded catch-up, manual/automatic double advance or frame/tick mismatch must fail the gate rather than emit a warning.
