# Gameplay audit: inert worker orchard loop

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

Hired actors are durable roster records only. They do not collect apples, reduce pressure, assist clearing, repair trees, support construction, absorb damage, generate resources or participate in any other active-session rule.

## Plan ledger

**Goal:** make every accepted worker role produce one authored, bounded and revisioned gameplay capability.

- [x] Trace roster creation and active-session reads.
- [x] Confirm active-session has zero roster dependencies.
- [x] Identify candidate labor effects.
- [ ] Implement deterministic worker effects and fixtures.

## Current loop

```txt
raw hire
  -> pay caller-controlled cost
  -> append actor
  -> role = harvest

active session
  -> tick pressure and pests
  -> move player
  -> collect apples near player
  -> clear pests near player
  -> change phase
  -> apply pest damage
  -> never read roster-runtime
```

## Missing gameplay contract

```txt
WorkerRoleDescriptor
  role identity
  supported actions
  cadence
  range or assigned zone
  labor output
  stamina or morale effect
  wage or upkeep policy
  failure and retirement policy
  presentation descriptor
```

## Candidate harvest role

A minimal `harvest` role could periodically collect one eligible apple within an assigned zone, publish a labor receipt, grant resources exactly once and expose the same worker-effect revision to UI and Canvas2D. The exact behavior is future implementation, not present runtime behavior.

## Required invariants

- No worker effect without an accepted hire result.
- No duplicate labor settlement for one cadence window.
- No effect after run retirement or worker removal.
- Resource grants must cite worker, role and effect revisions.
- Failed gameplay adoption must roll back the hire and payment.
- Deterministic fixtures must replace unbounded `Math.random()` dependence for proof scenarios.