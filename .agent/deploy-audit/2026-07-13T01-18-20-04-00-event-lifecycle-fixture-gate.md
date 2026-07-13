# Deploy audit: event lifecycle fixture gate

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

Current smoke and build steps do not validate event emission, retention, public readback or source/dist/Pages parity.

## Plan ledger

**Goal:** block event-authority claims until identical fixture outcomes are proven across every shipped surface.

- [x] Review package scripts.
- [x] Confirm `npm test` runs only the existing smoke.
- [x] Confirm static build copies source without an event-specific gate.
- [x] Define fixture matrix.
- [ ] Implement and run fixtures.

## Required gate

```txt
Node source fixture
browser source fixture
dist browser fixture
GitHub Pages fixture

each must prove:
  event identity and sequence
  command/tick correlation
  no pre-consumption deletion
  immutable payload
  bounded retention
  consumer acknowledgement
  public readback isolation
  event-to-frame acknowledgement
```

## Current result

```txt
npm test: not run
npm run build: not run
event lifecycle fixtures: unavailable
browser smoke: unavailable
dist smoke: unavailable
Pages smoke: unavailable
```

No deployment-readiness claim is made.
