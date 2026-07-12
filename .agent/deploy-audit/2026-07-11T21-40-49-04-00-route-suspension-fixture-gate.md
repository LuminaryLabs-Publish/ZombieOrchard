# Deploy audit — Route Suspension Fixture Gate

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

The current smoke test proves Entry can route to Play and apples exist. It does not prove that menus, Pause, management routes or Outcome suspend the intended simulation domains.

## Plan ledger

**Goal:** prevent deployment from claiming authoritative pause or route safety until deterministic and browser fixtures prove no hidden mutation.

- [x] Inspect current package scripts and smoke scope.
- [x] Define DOM-free route-policy fixtures.
- [x] Define browser route/frame fixtures.
- [x] Define deployment admission criteria.
- [ ] Implement and run the gate.

## Required DOM-free fixtures

```txt
route-policy-table.test.mjs
entry-idle-suspension.test.mjs
run-setup-idle-suspension.test.mjs
active-session-step-admission.test.mjs
pause-resume-suspension.test.mjs
management-route-policy.test.mjs
terminal-freeze.test.mjs
manual-step-admission.test.mjs
route-step-result-idempotency.test.mjs
```

## Required browser fixtures

```txt
Entry remains interactive while simulation fingerprint stays fixed
Play begins at the first admitted simulation tick
Pause freezes pressure, pests and player condition
Resume creates no paused-time catch-up burst
management routes follow the declared policy
Settings and Title do not age the run
Outcome stays terminal
canvas, HTML and GameHost cite one route/phase/tick/frame record
repeated route transitions retain one RAF and one delegated listener
```

## Package gate

Recommended:

```txt
npm test
npm run test:simulation-admission
npm run smoke:routes
npm run build
```

## Deployment rule

Pages may claim Pause or menu safety only after runtime-session, fixed-step clock, route-admission and browser frame-parity fixtures pass on `main`.

## Current result

```txt
runtime source changed: no
package scripts changed: no
deployment workflow changed: no
npm test: not run
npm run build: not run
route fixtures: unavailable
browser smoke: not run
Pause/menu safety claim: not permitted
```
