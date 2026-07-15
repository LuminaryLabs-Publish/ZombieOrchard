# Interaction audit: route simulation command-result map

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Current interface actions can transition routes, but their command results do not include simulation suspension or resume settlement.

## Plan ledger

**Goal:** make route actions produce one typed result that covers both presentation and simulation admission.

- [x] Map active route action handling.
- [x] Map nested command handling.
- [x] Map missing simulation-policy settlement.
- [ ] Implement typed commands and results.

## Current map

```txt
click action
  -> html renderer dispatches interface-composition.activate
  -> active interface domain returns action descriptor
  -> optional nested command executes
  -> composition moves to destination
  -> result exposes active route only
  -> simulation eligibility is unchanged
```

## Required map

```txt
RouteTransitionCommand
  input:
    TransitionCommandId
    RunGeneration
    ExpectedRouteRevision
    destination
    reason

  prepare:
    destination route
    SimulationPolicyDescriptor
    pressure lease
    active-session lease
    renderer projection descriptor

  validate:
    current run and route
    destination support
    stale/duplicate/conflict status
    terminal and retired predicates

  settle:
    atomically adopt route and policy
    preserve predecessor on failure
    suspend or resume eligible ticks
    clear stale input/time debt

  publish:
    RouteSimulationAdmissionResult
    RouteTransitionResult
    SimulationSuspensionResult
    FirstRouteBoundVisibleFrameAck
```

## Rejection rule

A rejected transition must leave route, pressure, active-session, render projections and run generation unchanged.

## Validation boundary

No command-result implementation or fixture exists.
