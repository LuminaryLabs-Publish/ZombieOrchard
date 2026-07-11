# Deploy audit — Session reset fidelity fixture gate

Timestamp: `2026-07-10T22-11-24-04-00`

## Current gate

```txt
npm test
  -> node tests/smoke.mjs
  -> prove Entry exists
  -> activate Play
  -> tick once
  -> prove Gameplay screen
  -> prove at least one apple exists

npm run build
  -> copy index.html and src into dist

Pages workflow
  -> test
  -> build
  -> upload artifact
  -> deploy
```

## Current blind spots

The deployment gate can pass while:

```txt
gameplay ticks before Play
New Game retains all prior state
Pause allows damage and pressure growth
Title leaves the run live
Outcome -> Title returns to Outcome
multiple automatic loops or listeners exist
stop and dispose are impossible
30/60/120 Hz schedules diverge
movement is unreachable
```

## Required DOM-free fixture files

```txt
tests/session-start-reset.mjs
tests/session-title-outcome.mjs
tests/session-stop-dispose.mjs
tests/clock-parity.mjs
tests/capability-reachability.mjs
```

## Required package gate

```txt
npm test
  -> current smoke
  -> session start/reset fidelity
  -> title/outcome stability
  -> stop/dispose ownership
  -> fixed-step clock parity
  -> capability reachability
```

## Minimum assertions

1. Boot begins without an admitted gameplay session.
2. Play commits epoch `1` and a clean preset-backed fingerprint.
3. Mutating every reset-owned domain followed by New Game commits epoch `2` and exact reset state.
4. Pause freezes all gameplay-owned state.
5. Outcome -> Title remains on Entry after repeated ticks.
6. Repeated start/reset cycles leave one automatic clock and one interaction listener.
7. Stop prevents future automatic ticks.
8. Dispose removes ownership and rejects future commands.
9. Equivalent wall time at 30, 60, and 120 Hz produces equivalent committed gameplay fingerprints.
10. The capability fixture proves movement and other declared public controls are reachable or explicitly classified.

## Workflow assessment

The Pages workflow structure does not need redesign. The test command needs stronger fixture composition. Keep deployment blocked until session-instance, reset, title/outcome, disposal, and clock parity fixtures pass.

## Validation this pass

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
npm test run: no
npm run build run: no
browser smoke run: no
new fixture executed: no
```

This file defines the required gate; it does not claim the gate exists yet.