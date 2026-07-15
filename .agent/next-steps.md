# Next steps: ZombieOrchard route-bound simulation suspension

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Status:** `route-simulation-suspension-admission-authority-audited`

## Summary

Add a route-simulation authority before changing individual gameplay domains. Every transition must settle the active route, pressure lease, active-session lease, stale input/time debt and render revision together.

## Plan ledger

**Goal:** make Pause and non-gameplay routes truly suspend hazards while preserving deterministic state and exact resume behavior.

### Gate 1: identity and policy

- [ ] Add `RunGeneration`, `RouteRevision`, `TransitionCommandId` and `SimulationPolicyRevision`.
- [ ] Define policies for running, suspended, background-safe, terminal and retired.
- [ ] Assign a default policy to all 12 routes.
- [ ] Reject unknown, stale, duplicate and conflicting transitions.

### Gate 2: tick admission

- [ ] Replace unconditional pressure ticking with a lease check.
- [ ] Replace unconditional active-session ticking with a lease check.
- [ ] Ensure a rejected transition changes no tick eligibility.
- [ ] Ensure zero unauthorized mutation on suspended routes.

### Gate 3: transition settlement

- [ ] Adopt route and simulation policy atomically.
- [ ] Preserve the predecessor on failure.
- [ ] Suspend Pause and management routes.
- [ ] Retire gameplay leases on Title and Outcome.
- [ ] Define whether any future background-safe domain may continue.

### Gate 4: resume

- [ ] Require the matching run generation and suspended route revision.
- [ ] Clear or settle stale input.
- [ ] Coordinate with the retained host-clock authority to avoid elapsed-time debt.
- [ ] Reactivate each lease exactly once.
- [ ] Publish `ResumeSimulationResult`.

### Gate 5: presentation and proof

- [ ] Add `SimulationRevision` to snapshots.
- [ ] Add Canvas2D and HTML route projection receipts.
- [ ] Publish `FirstRouteBoundVisibleFrameAck`.
- [ ] Test source, production dist and Pages parity.

## Recommended file cut

```txt
src/host/
  route-simulation-suspension-authority.js
  simulation-policy-descriptor.js
  simulation-lease.js
  route-transition-result.js

src/kits/
  runtime.js
  composition.js
  game-domains.js

src/renderer/
  world-canvas.js
  html-interface-renderer.js

tests/
  route-simulation-suspension.fixture.mjs
```

## Required fixtures

```txt
entry/settings/run-setup -> no pressure growth
pause/management routes -> no pest spawn movement or damage
pause near defeat -> no hidden outcome
resume -> progression restarts once
title/outcome -> gameplay leases retired
stale transition and stale tick -> rejected
Canvas2D and HTML -> matching route/simulation revision
source/dist/Pages -> matching results
```

## Retained next steps

The host-clock fixed-step authority remains required and should be implemented before final suspension/resume timing proof. Clean run generations, public runtime capability, persistence, terminal settlement and presentation coherence remain open.

## Do not claim

Do not claim pause safety, route-bound simulation, resume correctness, hidden-hazard prevention, frame convergence, artifact parity or production readiness until the full matrix passes.
