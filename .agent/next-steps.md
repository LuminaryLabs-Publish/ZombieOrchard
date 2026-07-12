# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, cadence-independent session whose simulation advances only under an explicit lifecycle and route policy.

- [ ] Implement runtime-session instance authority first.
- [ ] Add a fresh graph factory, staged commit, rollback and predecessor retirement.
- [ ] Implement a monotonic fixed-step clock owned by the committed session.
- [ ] Add route-scoped simulation admission before exposing more gameplay commands.
- [ ] Classify every domain tick as simulation, presentation or lifecycle work.
- [ ] Freeze Entry, Run Setup, Save Select, Preferences, Pause and Outcome mutation.
- [ ] Choose and fixture-test an explicit policy for management screens.
- [ ] Make manual stepping use a privileged typed capability rather than bypassing policy.
- [ ] Correlate route revision, simulation phase, tick ID and render frame ID.
- [ ] Add capability, transaction, replay and persistence authorities after this gate.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Route-scoped simulation admission design

### 1. Add canonical simulation phases

```txt
NO_RUN
RUNNING
PAUSED
TERMINAL
SUSPENDED
DISPOSED
```

The interface route is an input to policy, not the phase itself.

### 2. Classify domain work

```txt
simulation
  pressure-field
  active-session
  future AI, combat, economy and world mutation

presentation
  interface composition snapshot
  canvas projection
  HTML projection

lifecycle
  startup, reset, load, dispose and authority transfer
```

### 3. Add a route policy table

```txt
entry, session-select, run-setup, preferences -> NO_RUN or SUSPENDED
active-session -> RUNNING
interrupt -> PAUSED
construction, exchange, roster, inventory, knowledge -> explicit product policy
outcome -> TERMINAL
```

For the current prototype, suspend simulation on management routes until an intentional real-time policy is approved.

### 4. Admit steps transactionally

```txt
StepCommand
  -> session/lifecycle admission
  -> route revision admission
  -> route policy resolution
  -> fixed-step budget
  -> selected domain tick plan
  -> committed simulation receipt
  -> route/tick/frame acknowledgement
```

### 5. Define pause and resume semantics

```txt
pause
  -> finish or reject the current admitted step
  -> commit PAUSED
  -> admit presentation frames only

resume
  -> commit RUNNING
  -> reset wall-time baseline
  -> do not replay hidden paused duration
```

### 6. Fence manual stepping

`GameHost.tick(dt)` must be replaced or wrapped by a typed test capability carrying runtime, run, session, lifecycle, route and expected tick identity. It must obey the same route policy unless an explicit fixture-only override is admitted and journaled.

### 7. Add observation

Expose clone-safe read models only:

```txt
simulationPhase
routeId
routeRevision
routePolicyId
latestStepAdmissionResult
simulationTickId
renderFrameId
suspendedSince
bounded admission journal
```

## Required fixtures

```txt
Entry idle does not change pressure, pests, score or player state
Run Setup idle does not age the hidden run
Active Session advances exactly admitted fixed steps
Pause preserves simulation state across many presentation frames
Resume does not catch up paused wall time
management routes follow their declared policy
Settings and Title do not mutate the run
Outcome remains terminal and pressure does not continue
manual step cannot bypass route policy
route transition and first frame cite the same route revision
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission Authority
+ Menu/Pause/Management/Outcome Suspension Fixture Gate
```
