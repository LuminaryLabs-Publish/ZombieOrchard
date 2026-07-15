# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-15T02-38-45-04-00`

## Summary

The current priority gap is host-clock admission. Browser callback count, rather than measured wall time, controls simulation progress. The host lacks monotonic timestamp sampling, an accumulator, bounded catch-up, visibility settlement, dropped-time diagnostics and clock-bound render receipts.

## Plan ledger

**Goal:** keep timing risks dependency ordered and tied to executable proof.

- [ ] Host frame identity and clock revision.
- [ ] Monotonic RAF timestamp validation.
- [ ] Wall-delta clamp.
- [ ] Fixed-step duration policy.
- [ ] Accumulator ownership.
- [ ] Bounded catch-up steps.
- [ ] Deferred/dropped-time result.
- [ ] Hidden-tab policy.
- [ ] Resume timestamp and accumulator settlement.
- [ ] Simulation-step identity and results.
- [ ] Render-once host-frame policy.
- [ ] Canvas2D and HTML timing receipts.
- [ ] First clock-bound visible-frame acknowledgement.
- [ ] Host retirement and stale-callback rejection.
- [ ] 30/60/120 Hz, stall, visibility, dist and Pages fixtures.

## Clock gaps

```txt
RAF timestamp consumed: no
monotonic clock sample: absent
HostFrameId: absent
ClockRevision: absent
wall delta derivation: absent
wall delta clamp at host boundary: absent
fixed-step accumulator: absent
catch-up budget: absent
deferred-time result: absent
dropped-time result: absent
visibility transition result: absent
resume clock reset: absent
SimulationStepId: absent
HostFrameResult: absent
Canvas timing receipt: absent
HTML timing receipt: absent
FirstClockBoundVisibleFrameAck: absent
refresh-rate fixture matrix: absent
```

## Source consequences

- One callback always advances `1/60` simulated seconds.
- High callback rates can advance gameplay faster than wall time.
- Low callback rates can advance gameplay slower than wall time.
- Pressure, pest spawning, movement and damage inherit the same rate coupling.
- Rendering and simulation cannot be scheduled independently.
- Long frames have no explicit catch-up or discarded-time accounting.
- Hidden and resumed tabs have no authoritative clock transition.
- Existing smoke coverage cannot detect callback-rate divergence.

## Retained unresolved gaps

### Lifecycle and public capability

- New Game and retry still lack clean deterministic run generations.
- Gameplay and pressure are not route-suspended.
- Public `GameHost` still exposes raw mutable runtime access and manual tick.
- Runtime observers and events lack immutable generation-bound publication.

### Gameplay transactions

- Roster, inventory and construction transaction boundaries remain incomplete.
- Pest capacity and terminal settlement remain unresolved.

### Presentation and persistence

- Canvas2D and HTML lack one atomic frame result.
- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML content is not safely constructed.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim refresh-rate independence, fixed-step correctness, hidden-tab safety, timing diagnostics, visible-frame convergence, artifact parity or production readiness until required fixtures pass on `main`.