# Next steps: ZombieOrchard pest population budget

**Timestamp:** `2026-07-17T21-40-33-04-00`  
**Status:** `pest-population-spawn-budget-retirement-authority-audited`

## Summary

The next implementation slice is a targeted population-policy boundary inside `active-session-domain-kit`. It should cap and retire pests before considering pooling, culling or a separate enemy subsystem.

## Checklist

**Goal:** ensure pest creation, update, retirement and projection are bounded and settle against one accepted population revision.

- [ ] Define soft capacity, hard capacity, spawn rate and policy revision.
- [ ] Replace direct `pests.push()` with one admitted spawn function.
- [ ] Bind spawn admission to run, phase and population generations.
- [ ] Add stable pest generation and creation-time evidence.
- [ ] Decide day-entry, lifetime and distance-retirement policies.
- [ ] Preserve clear rewards only for accepted player-clear retirement.
- [ ] Publish `PestSpawnAdmissionResult` and `PestPopulationResult`.
- [ ] Bound per-tick update work and record deferred work if needed.
- [ ] Bound or cull visible pest projection only after the gameplay cap exists.
- [ ] Project population or threat evidence in the HUD.
- [ ] Publish `FirstPestBudgetBoundFrameAck`.
- [ ] Add long-night, capacity, phase-toggle, clear-retirement, reset, source, dist and Pages fixtures.

## Ordering

```txt
population policy
  -> spawn admission
  -> lifetime and phase retirement
  -> reward-safe retirement settlement
  -> bounded update snapshot
  -> bounded visible projection
  -> matching-frame acknowledgement
  -> source/dist/Pages fixtures
```

Preserve the existing active-session, pressure, renderer and interface boundaries. This is targeted workload ownership, not an engine restructure.