# Render audit — random state and frame provenance gap

**Run:** `2026-07-10T23-50-53-04-00`

## Current render input

Both renderers receive only the aggregate domain snapshot.

```txt
world-canvas
  -> trees
  -> apples
  -> pests
  -> player

html-interface
  -> active screen
  -> active-session
  -> resources
  -> pressure
  -> construction
  -> roster
  -> inventory
```

The snapshot describes current outputs but not how random outcomes were chosen.

## Missing provenance

```txt
sessionEpoch
simulationTick
rootSeed
worldStreamCursor
encounterStreamCursor
randomDecisionStart
randomDecisionEnd
committedStateFingerprint
renderFrameId
```

Without those fields, a screenshot or render frame cannot be tied to the seed and decision range that produced it.

## Required observation row

```txt
renderFrameId
sessionEpoch
simulationTick
stateFingerprint
randomDecisionRange
worldStreamCursor
encounterStreamCursor
```

## Rules

- Renderers must never call the random service.
- Rendering the same snapshot twice must not advance any stream.
- A render observation must refer to an already committed state.
- UI replacement must not erase the result/provenance row needed for diagnostics.
- `GameHost` must expose detached bounded rows, not mutable runtime handles only.

## Fixture need

A headless renderer adapter should consume two identical committed snapshots and prove equal observation rows with unchanged random cursors.
