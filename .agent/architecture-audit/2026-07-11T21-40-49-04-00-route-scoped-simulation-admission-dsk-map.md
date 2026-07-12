# Architecture audit — Route-Scoped Simulation Admission DSK Map

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

The runtime has domain ticking and interface routing but no authority joining them. This audit defines a composed admission domain that consumes future session and fixed-clock identities rather than creating a parallel timing system.

## Plan ledger

**Goal:** map the minimum DSK boundary required to decide whether each domain may mutate for a given route, lifecycle phase and fixed step.

- [x] Map current runtime, interface and gameplay ownership.
- [x] Separate simulation, presentation and lifecycle work.
- [x] Define route policy and simulation phase contracts.
- [x] Define step admission, receipt, observation and fixtures.
- [ ] Implement after runtime-session and fixed-step clock authority.

## Current ownership

```txt
kit-runtime
  -> owns all-domain tick loop

interface-composition
  -> owns visible active route

pressure-field and active-session
  -> own simulation mutation

start.js
  -> owns recursive RAF and fixed nominal delta

renderers
  -> project snapshots without admission provenance
```

## Required composed domain

```txt
zombie-orchard-route-scoped-simulation-admission-authority-domain
  simulation-phase-state-kit
  route-simulation-policy-kit
  domain-tick-classification-kit
  simulation-step-admission-kit
  simulation-step-plan-kit
  inactive-run-suspension-kit
  pause-resume-admission-kit
  management-route-time-policy-kit
  terminal-freeze-policy-kit
  manual-step-capability-kit
  simulation-step-receipt-kit
  route-tick-frame-correlation-kit
  simulation-admission-journal-kit
  route-suspension-fixture-kit
  hidden-mutation-fixture-kit
```

## DSK responsibilities

| DSK | Responsibility |
|---|---|
| simulation phase | canonical `NO_RUN`, `RUNNING`, `PAUSED`, `TERMINAL`, `SUSPENDED`, `DISPOSED` state and revision |
| route policy | map route plus lifecycle to admitted simulation behavior |
| tick classification | mark domains as simulation, presentation or lifecycle work |
| step admission | validate runtime/run/session, lifecycle, route revision and expected tick |
| step plan | select domain ticks and fixed-step count |
| suspension | produce a no-mutation receipt while presentation may continue |
| pause/resume | commit phase transitions and reset wall-time baseline |
| management policy | explicitly choose real-time or suspended behavior per management route |
| terminal freeze | reject post-outcome run mutation |
| manual-step capability | restrict test stepping and journal overrides |
| receipt/correlation | bind route, phase, tick, domains and frame |
| journal/fixtures | bounded observation and executable proof |

## Required command

```txt
SimulationStepCommand
  commandId
  runtimeId
  runId
  sessionEpoch
  expectedLifecycleRevision
  expectedRouteId
  expectedRouteRevision
  expectedClockRevision
  expectedSimulationTickId
  fixedStepCount
  source
```

## Required result

```txt
SimulationStepResult
  status: committed | suspended | stale | rejected | failed
  routeId
  routeRevision
  simulationPhase
  policyId
  previousSimulationTickId
  committedSimulationTickId
  tickedDomainIds
  skippedDomainIds
  stateFingerprint
  reason
```

## Dependency rule

This domain consumes identities from runtime-session authority and fixed-step plans from clock authority. It must not invent another run, epoch, clock or frame sequence.
