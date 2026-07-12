# Simulation Admission Audit — Route Policy and Tick Contract

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

This contract makes simulation admission a first-class result instead of an accidental consequence of RAF and route rendering.

## Plan ledger

**Goal:** define deterministic route policy, domain selection, suspension and resume semantics for every fixed simulation step.

- [x] Define simulation phases.
- [x] Define route policy baseline.
- [x] Define domain tick classifications.
- [x] Define admitted and suspended step results.
- [x] Define observation and fixtures.
- [ ] Implement after session and clock authority.

## Simulation phases

```txt
NO_RUN
RUNNING
PAUSED
SUSPENDED
TERMINAL
DISPOSED
```

## Route policy baseline

```txt
entry             -> NO_RUN
session-select    -> NO_RUN
run-setup         -> NO_RUN
active-session    -> RUNNING
interrupt         -> PAUSED
construction      -> SUSPENDED
exchange          -> SUSPENDED
roster            -> SUSPENDED
inventory         -> SUSPENDED
knowledge         -> SUSPENDED
preferences       -> SUSPENDED
outcome           -> TERMINAL
```

A later product decision may make selected management routes real-time, but that must be a versioned policy change with fixtures.

## Tick classifications

```txt
simulation domains
  pressure-field
  active-session
  future economy, AI, combat and world mutation

command-only domains
  resource-ledger
  orchard-world collection/refill
  construction-runtime
  roster-runtime
  inventory-runtime

presentation and routing
  scoped interface domains
  interface-composition snapshot
  canvas and HTML renderers
```

## Admission contract

```txt
resolve committed session
resolve lifecycle and route revision
resolve route policy
validate fixed-step plan
select tickable simulation domains
commit all selected domain mutations
publish one step receipt
render from the committed receipt
```

## Suspension contract

A suspended presentation frame may update visual effects and DOM projection only. It must not change pressure, random streams, pests, player condition, score, resources, apples or authoritative elapsed simulation time.

## Resume contract

Resume commits a new route and simulation-phase revision, resets the wall-time baseline, and begins from the previous committed simulation tick. Paused wall time is not converted into catch-up steps.

## Observation

```txt
current phase and revision
route and route revision
policy ID and version
latest admission result
latest committed simulation tick
selected/skipped domains
suspension start and duration
bounded decision journal
latest acknowledged frame
```
