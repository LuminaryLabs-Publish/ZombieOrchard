# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, clocked, capability-declared, atomic, reproducible, persistable and disposable session.

- [ ] Establish runtime session instance authority.
- [ ] Establish fixed-step clock authority.
- [ ] Establish a public capability gateway and reachability authority.
- [ ] Establish composite command transaction authority.
- [ ] Establish seeded random and replay authority.
- [ ] Establish versioned save/load authority.
- [ ] Gate deployment on DOM-free and browser fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / Reset / Title / Outcome Fidelity Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz / Stall / Manual-Step Fixture Gate

3. Public Capability Gateway and Reachability
   + Registry / Binding / Diagnostics-Quarantine Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest Determinism Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

## Gate 1 — Runtime session instance authority

1. Add one runtime owner for lifecycle, current session, RAF, listeners, renderers, `GameHost` and bounded journals.
2. Add runtime/session IDs, epochs, preset revision and lifecycle state.
3. Construct fresh graphs off-line and atomically transfer authority.
4. Convert Play, New Game, Start, Pause, Resume, Title and Outcome into admitted lifecycle commands.
5. Retain/cancel RAF and dispose listeners, renderers and globals idempotently.
6. Publish session identity to the clock.

## Gate 2 — Fixed-step clock authority

1. Replace one fixed step per RAF with a wall-time accumulator.
2. Define `fixedStep`, `maxFrameDelta`, `maxCatchupSteps` and dropped/deferred-time policy.
3. Add monotonic `simulationTickId`, independent `renderFrameId` and `clockRevision`.
4. Tick only lifecycle-admitted domains.
5. Render once from the latest committed tick after zero or more updates.
6. Reject manual stepping while the automatic clock owns mutation authority.
7. Allow deterministic manual stepping only through an explicit debug lease.
8. Reset accumulator and wall-time baseline on pause, visibility resume and session handoff.
9. Publish typed overrun, pause, resume and manual-step results.
10. Correlate each rendered frame with session, tick, clock revision and state fingerprint.

### Required clock descriptor

```txt
clockId
sessionId
sessionEpoch
clockRevision
fixedStepSeconds
maxFrameDeltaSeconds
maxCatchupSteps
pausePolicy
visibilityResumePolicy
droppedTimePolicy
mode: automatic | manual | stopped
```

### Required committed-tick receipt

```txt
sessionId
sessionEpoch
clockRevision
simulationTickId
fixedStepSeconds
commandSequenceRange
events[]
stateFingerprint
```

### Required render-frame receipt

```txt
renderFrameId
sessionId
sessionEpoch
clockRevision
latestSimulationTickId
stateFingerprint
worldRendered
interfaceRendered
```

### Clock fixture matrix

```txt
30 Hz, 60 Hz and 120 Hz for 10 wall seconds
  -> identical committed tick count
  -> identical pressure changes
  -> identical deterministic gameplay once seeded randomness exists

pause for 5 wall seconds
  -> zero gameplay ticks
  -> no catch-up burst on resume

2 second stall
  -> bounded catch-up steps
  -> explicit deferred/dropped-time result

manual step during automatic mode
  -> rejected without mutation

manual mode step
  -> exactly one committed tick and one receipt

terminal state
  -> exactly-once finalization
  -> no post-terminal gameplay ticks
```

## Gate 3 — Public capability gateway

1. Route every browser action through one gateway.
2. Attach session, epoch and committed tick identity.
3. Validate lifecycle, route, binding, target and service readiness.
4. Retain accepted/rejected results until a render frame acknowledges them.
5. Remove raw engine and unrestricted manual tick from the default host.

## Gate 4 — Composite command transaction authority

1. Add command and transaction identity.
2. Preflight parent, child and route plans.
3. Stage resource and gameplay mutations.
4. Preserve child results.
5. Commit or roll back once, publish once and correlate the first frame.

## Gates 5 and 6

1. Inject session-owned random streams and record decisions for replay.
2. Define a versioned save envelope with staged restore, migration, commit and rollback.
3. Consume committed tick and state fingerprint identities from the clock.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Start / Pause / 30-60-120 Hz Fidelity Fixture Gate
```
