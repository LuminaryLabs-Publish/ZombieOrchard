# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, cadence-independent, capability-declared, atomic, reproducible, persistable and disposable session.

- [ ] Implement runtime-session instance authority first.
- [ ] Implement fixed-step clock authority using the session owner.
- [ ] Add a public capability gateway and quarantine raw diagnostics.
- [ ] Add composite command transaction authority.
- [ ] Inject seeded random streams and replay receipts.
- [ ] Add versioned save/load authority.
- [ ] Gate deployment on lifecycle, cadence, transaction, replay and persistence fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / New Run / Title / Outcome / Dispose Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz / Stall / Visibility / Manual-Step Fixture Gate

3. Public Capability Gateway and Reachability
   + Registry / Binding / Diagnostics-Quarantine Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest Determinism Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

## Gate 1 prerequisite — Runtime session instance authority

The clock must consume, not duplicate:

```txt
runtimeId
sessionId
sessionEpoch
lifecycleState
lifecycleRevision
callback generation
current graph authority
RAF lease
```

Before Gate 2, Gate 1 must provide:

```txt
one retained RAF owner
stale-callback rejection
pause/resume lifecycle admission
fresh-run authority transfer
ordered disposal
revocable public host
```

## Gate 2 — Fixed-step clock authority

### 1. Add the parent owner

Create:

```txt
zombie-orchard-fixed-step-clock-authority-domain
```

It owns:

```txt
clock descriptor
monotonic wall-time baseline
accumulator remainder
clock revision
simulation tick sequence
render frame sequence
catch-up budget
overrun policy
automatic tick lease
manual debug lease
bounded clock journal
```

### 2. Replace one-step-per-RAF timing

Current:

```txt
RAF callback
  -> engine.tick(1 / 60)
```

Required:

```txt
RAF callback(timestamp)
  -> sample monotonic wall time
  -> validate session/lifecycle/generation
  -> derive accepted wall delta
  -> add to accumulator
  -> execute zero or more fixed ticks up to budget
  -> render once from latest committed tick
```

### 3. Version the clock descriptor

```txt
fixedStep
maxFrameDelta
maxCatchupSteps
overflowPolicy
pauseAccumulatorPolicy
renderPolicy
```

Do not leave timing policy as hidden literals.

### 4. Separate identities

```txt
simulationTickId
  increments once per committed simulation tick

renderFrameId
  increments once per attempted/committed browser presentation

clockRevision
  increments for committed clock-state transitions
```

`ctx.frame` must not represent both mutation and presentation.

### 5. Add lifecycle admission

```txt
RUNNING
  automatic fixed ticks admitted

PAUSED / TITLE / OUTCOME by declared policy
  simulation mutation rejected or frozen

DISPOSING / DISPOSED
  all clock mutation rejected

stale session/epoch/generation
  reject
```

Route names must not implicitly define clock behavior.

### 6. Define catch-up and overflow behavior

For a delayed callback:

```txt
accepted frame delta
  -> clamp by maxFrameDelta
  -> execute at most maxCatchupSteps
  -> retain, defer or drop excess by explicit policy
  -> return a typed overrun result
```

Never silently discard or simulate unbounded time.

### 7. Define pause and visibility barriers

```txt
pause
  -> stop mutation
  -> retire wall-time baseline

resume
  -> establish new baseline
  -> first resumed callback adds no hidden elapsed time

visibility restore
  -> same baseline-reset rule
```

### 8. Quarantine manual stepping

Replace unrestricted `GameHost.tick(dt)` with:

```txt
AcquireManualStepLeaseCommand
ManualStepCommand { stepCount }
ReleaseManualStepLeaseCommand
```

Manual stepping rejects while automatic clock ownership is active. Automatic mutation rejects while a manual lease is active.

### 9. Correlate presentation

Every canvas, HTML and public observation receipt must include:

```txt
runtimeId
sessionId
sessionEpoch
simulationTickId
clockRevision
renderFrameId
stateFingerprint hook
```

### 10. Add Gate 2 fixtures

```txt
30/60/120 Hz equal-wall-time parity
zero-tick render callback
multi-tick catch-up callback
bounded stall overflow
pause freeze
resume baseline reset
visibility baseline reset
automatic/manual exclusion
exclusive manual stepping
stale-session callback rejection
canvas/HTML/GameHost tick parity
```

## Gate 3 — Public capability gateway

1. Route browser actions through one admitted gateway.
2. Attach session, epoch, lifecycle and committed tick identity.
3. Validate route, binding, target and service readiness.
4. Retain results until a render frame acknowledges them.
5. Remove raw engine and unrestricted tick from the default host.

## Gate 4 — Composite command transactions

1. Add command and transaction identity.
2. Preflight parent and child plans.
3. Stage resource/gameplay mutations.
4. Preserve child results.
5. Commit or roll back once, publish once and correlate the first frame.

## Gates 5 and 6

1. Inject session-owned random streams for apples and pests.
2. Record random decisions and committed ticks for replay.
3. Add a versioned save envelope with staged restore, migration, commit and rollback.
4. Consume session, tick and state-fingerprint identities from earlier gates.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ ZombieOrchard Fixed-Step Clock Authority
+ Start / Pause / 30-60-120 Hz / Stall / Visibility / Manual-Step Fixture Gate
```