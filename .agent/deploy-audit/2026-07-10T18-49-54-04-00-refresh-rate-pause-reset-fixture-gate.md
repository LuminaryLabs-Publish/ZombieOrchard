# Deploy audit — Refresh-rate, pause, and reset fixture gate

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Current gate

```txt
push to main
  -> npm test
     -> entry screen exists
     -> Play reaches active-session
     -> apples exist
  -> npm run build
  -> upload dist
  -> deploy Pages
```

The workflow order is correct. The proof surface is too weak.

## Missing fixture scripts

```txt
fixture:session-lifecycle
fixture:clock-parity
fixture:pause-freeze
fixture:reset-reentry
fixture:dispose-idempotency
fixture:deterministic-scenario
```

## Required lifecycle gate

```txt
create runtime in manual-clock mode
  -> assert idle gameplay does not advance
  -> start session
  -> advance fixed wall time at 30/60/120 Hz schedules
  -> compare committed simulation ticks and gameplay fingerprints
  -> pause and advance wall time
  -> assert no gameplay mutation
  -> resume
  -> mutate state
  -> New Game reset
  -> assert preset reset policy
  -> force ended state
  -> Title
  -> assert Entry persists
  -> stop/dispose twice
  -> assert no future ticks and no duplicate cleanup
```

## Required browser gate

A lightweight browser smoke should prove:

- one RAF loop after boot and after restart;
- one delegated click handler after renderer recreation;
- Pause freezes visible gameplay values;
- New Game visibly resets the session;
- Outcome -> Title remains on the title screen;
- GameHost readback is JSON-safe and does not expose unrestricted live ticking in automatic mode.

## Package gate target

```json
{
  "scripts": {
    "test": "node tests/smoke.mjs && node tests/session-lifecycle.mjs && node tests/clock-parity.mjs && node tests/deterministic-scenario.mjs",
    "build": "rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src"
  }
}
```

Exact script names may differ, but `npm test` must fail before build when lifecycle or clock parity regresses.

## Deployment conclusion

No workflow rewrite is required. Add deterministic DOM-free fixtures to the existing test stage, then add a small browser lifecycle smoke if the available CI environment supports it.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```