# Gameplay audit: install order and service failure loop

**Timestamp:** `2026-07-12T10-09-07-04-00`

## Summary

Gameplay behavior depends on undeclared service lookups and object insertion order. Missing providers are converted into ordinary gameplay rejection messages, while composition timing depends on being installed after active-session.

## Plan ledger

**Goal:** distinguish graph-construction faults from valid gameplay outcomes and make simulation phase order explicit.

- [x] Trace construction, roster, collection and outcome routing dependencies.
- [x] Identify missing-provider behavior.
- [x] Identify order-sensitive same-tick behavior.
- [x] Define typed graph-admission failures and explicit phases.
- [ ] Implement fixtures for missing services and reordered kits.

## Service-failure paths

```txt
construction-runtime without resource-ledger
  -> ledger API is undefined
  -> payment fails
  -> UI says Missing resources
  -> graph misconfiguration appears as economy state

roster-runtime without resource-ledger
  -> payment fails
  -> UI says Not enough money

active-session without orchard-world
  -> collectNear is absent
  -> collection reports No apple close enough

active-session without pressure-field
  -> collection succeeds
  -> pressure adjustment is silently skipped
```

## Order-sensitive path

```txt
active-session tick sets ended = true
  -> interface-composition currently ticks later
  -> route moves to outcome in the same frame

composition installed earlier
  -> it reads predecessor ended = false
  -> outcome transition is delayed one tick
```

## Required results

```txt
MissingRequiredServiceResult
IncompatibleServiceVersionResult
InvalidPhaseDependencyResult
DeterministicPhasePlan
GameplayCommandResult
GraphAdmissionResult
```

Graph failures must be rejected before gameplay starts. They must never be presented as resource scarcity, distance, or ordinary action rejection.