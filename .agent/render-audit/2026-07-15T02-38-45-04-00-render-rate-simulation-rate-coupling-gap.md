# Render audit: render-rate and simulation-rate coupling

## Finding

The active host performs exactly one simulation step and one Canvas2D/HTML render for every RAF callback. Because each callback submits a constant `1/60`, render frequency determines simulated elapsed time.

```txt
RAF callback
  -> tick(1 / 60)
  -> Canvas2D render
  -> HTML render
```

## Consequences

- High-refresh displays can advance gameplay faster than wall time.
- Low-refresh or overloaded displays can advance gameplay slower than wall time.
- Rendering cannot run at a different cadence from simulation.
- A stall has no bounded catch-up or explicit dropped-time result.
- Hidden-tab throttling has no defined suspension/resume contract.
- Neither renderer records the host frame, simulation-step range or clock revision it displayed.

## Required render contract

Render at most once per accepted host frame from the latest immutable post-step snapshot. Bind both renderers to `HostFrameId`, `ClockRevision`, first/last `SimulationStepId` and `StateRevision`, then publish matching Canvas2D and HTML receipts.

## Required proof

```txt
30 Hz callback fixture preserves wall-time gameplay rate
60 Hz callback fixture preserves wall-time gameplay rate
120 Hz callback fixture preserves wall-time gameplay rate
multi-step catch-up renders once
zero-step host frame may render once without mutating gameplay
hidden-tab transition follows declared policy
resume discards or bounds stale clock debt
Canvas2D and HTML cite the same accepted snapshot
```

No visual or timing behavior changed in this audit.