# Interaction audit — Route, Phase and Command Admission Map

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

Browser clicks alter interface routes through composition, while RAF and `GameHost.tick()` mutate simulation independently. No command proves that its source route, lifecycle and expected simulation tick are still current.

## Plan ledger

**Goal:** route all visible actions and manual stepping through one admission boundary tied to the committed route and simulation phase.

- [x] Trace delegated click handling.
- [x] Trace composition activation and nested commands.
- [x] Trace manual GameHost stepping.
- [x] Define command admission requirements.
- [ ] Implement typed interaction results.

## Current map

```txt
button[data-action]
  -> interface-composition.activate
  -> current route domain.activate
  -> optional nested engine.command
  -> optional route move

button[data-command]
  -> active-session command directly

GameHost.tick(dt)
  -> runtime tick directly
```

## Missing admission fields

```txt
commandId
runtimeId
runId
sessionEpoch
expectedLifecycleRevision
sourceRouteId
expectedRouteRevision
expectedSimulationPhase
expectedSimulationTickId
source
```

## Required policy

- Route actions must be admitted against the route and route revision shown to the player.
- Gameplay commands must require `RUNNING` unless explicitly allowed by policy.
- Pause/resume must commit phase changes before the next simulation step.
- Management commands may mutate their own transactional state while world simulation remains suspended.
- Manual stepping must require a fixture-only capability and produce a journaled result.
- Rejected or stale commands must not publish intermediate mutations.

## Required result

```txt
status
commandId
routeId
routeRevision
simulationPhase
simulationTickId
transactionId
mutatedDomainIds
reason
acknowledgedFrameId
```
