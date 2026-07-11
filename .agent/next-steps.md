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
   + Start / New Run / Title / Outcome / Dispose Fixture Gate

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

### 1. Add the parent owner

Create:

```txt
zombie-orchard-runtime-session-instance-authority-domain
```

It must own:

```txt
runtimeId
sessionId
sessionEpoch
lifecycleState
lifecycleRevision
graphRevision
current graph authority
RAF lease
listener leases
renderer owners
public-host lease
cleanup stack
bounded lifecycle journal
```

### 2. Replace module-level implicit startup

Move browser setup behind a typed `RuntimeStartCommand`.

```txt
UNINITIALIZED
  -> BOOTING
  -> validate roots and preset
  -> construct graph off-line
  -> construct renderer owners
  -> register cleanup leases
  -> publish revocable host
  -> retain one RAF request
  -> TITLE or RUNNING
```

Every acquisition must add a reverse cleanup entry before the next stage.

### 3. Add fresh-run construction

`NewGameCommand` and restart must construct a new graph rather than route the current graph.

A fresh graph must reset:

```txt
resources
pressure
orchard apples and future random stream
construction
roster
inventory
active-session player/day/phase/pests/score/message/ended
screen fields and selected indices
composition active/previous state
```

### 4. Define lifecycle commands

```txt
RuntimeStartCommand
NewGameCommand
PauseCommand
ResumeCommand
ReturnToTitleCommand
OutcomeCommand
RestartCommand
RuntimeDisposeCommand
```

Each command must include runtime/session/epoch and observed lifecycle revision. Results must classify committed, rejected, no-op, failed or rolled back.

### 5. Define Title retention policy

Returning to Title must explicitly choose one policy:

```txt
retain resumable session
retire current session
replace current session
```

The policy must not be inferred from the interface route.

### 6. Add authority transfer

```txt
prepare new graph and resources
  -> validate required domains
  -> fence old callbacks
  -> stop old mutation authority
  -> transfer input/clock/render/public-host authority atomically
  -> publish new session descriptor
  -> dispose old session idempotently
```

### 7. Retain and dispose page resources

Retain the RAF request ID and generation token. Return removable delegated-listener leases. Add renderer `dispose()` methods. Replace the permanent raw `window.GameHost` object with a revocable lease exposing clone-safe observation and admitted commands.

### 8. Add startup rollback and disposal

Required order:

```txt
reject new commands
cancel RAF
retire listeners
revoke GameHost
unsubscribe runtime listeners
dispose render owners
retire clock/session journals
fence graph generation
release graph/snapshot references
publish stable DISPOSED result
```

Disposal must be idempotent and return cleanup rows.

### 9. Add Gate 1 fixtures

```txt
fresh startup
double-start rejection
New Game fresh-state parity
pause/resume session preservation
Title retain-or-retire policy
terminal retirement
old-session command rejection
stale RAF callback rejection
listener removal
GameHost revocation
startup failure rollback
double-dispose idempotence
zero post-disposal mutation
session/frame correlation
```

## Gate 2 — Fixed-step clock authority

1. Consume `sessionId`, `sessionEpoch` and lifecycle state from Gate 1.
2. Replace one fixed step per RAF with a wall-time accumulator.
3. Define `fixedStep`, `maxFrameDelta`, `maxCatchupSteps` and dropped/deferred-time policy.
4. Add monotonic `simulationTickId`, independent `renderFrameId` and `clockRevision`.
5. Tick only lifecycle-admitted domains.
6. Render once from the latest committed tick after zero or more updates.
7. Reject manual stepping while the automatic clock owns mutation authority.
8. Allow deterministic manual stepping only through an explicit debug lease.
9. Reset accumulator and wall-time baseline on pause, visibility resume and session handoff.
10. Correlate each rendered frame with session, tick, clock revision and state fingerprint.

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
3. Consume session, committed tick and state fingerprint identities from earlier gates.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / New Run / Title / Outcome / Dispose Fixture Gate
```