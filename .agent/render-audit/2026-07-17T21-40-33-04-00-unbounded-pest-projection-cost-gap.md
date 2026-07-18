# Render audit: unbounded pest projection cost

**Timestamp:** `2026-07-17T21-40-33-04-00`

## Finding

`world-canvas-render-kit` iterates `session.pests` and issues one `fillRect` for every retained pest on every rendered frame. The renderer receives no population revision, visibility set, render budget, culling result or matching-frame digest.

The simulation can retain pests indefinitely while night remains active, so Canvas2D pest projection cost grows linearly with population. The renderer also resizes and clears the full canvas each frame; this audit does not attribute a measured regression to either path.

## Current path

```txt
active-session snapshot.pests[]
  -> world.render(snapshot)
  -> for each pest
  -> set fillStyle
  -> fillRect
```

## Missing render evidence

```txt
accepted population revision
visible pest set
render capacity
culling or aggregation policy
projected pest count
render-duration evidence
FirstPestBudgetBoundFrameAck
long-night browser frame fixture
```

## Required projection contract

```txt
PestProjectionCommitCommand
  runGeneration
  populationRevision
  policyRevision
  visibleBounds
  renderBudget

PestWorkBudgetResult
  populationCount
  visibleCount
  projectedCount
  deferredCount

FirstPestBudgetBoundFrameAck
  frame
  populationRevision
  projectedCount
```

## Recommended boundary

For the current small Canvas2D product, the first correction should be an explicit gameplay population cap and retirement policy. Rendering optimizations such as culling or aggregation should follow measured need; they must not hide an unbounded simulation.

## Validation

Source inspection only. No browser profiler, long-night trace, frame-time measurement, artifact smoke or Pages smoke ran.