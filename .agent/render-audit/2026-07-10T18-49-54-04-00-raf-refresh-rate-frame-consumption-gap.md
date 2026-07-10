# Render audit — RAF refresh-rate and frame-consumption gap

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Current frame path

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

## Findings

1. Render cadence and simulation cadence are the same callback count.
2. The RAF timestamp is ignored.
3. One fixed simulation step runs per displayed frame.
4. High-refresh displays accelerate pressure, pest spawn probability, pursuit, damage, and all other tick-driven state.
5. Low-refresh or throttled displays slow the same systems.
6. The canvas is resized by assigning width and height every render, clearing and reallocating its backing store even when dimensions are unchanged.
7. The HTML renderer replaces the entire root `innerHTML` every frame.
8. Renderers receive aggregate state but no committed simulation tick ID or state fingerprint.
9. No render-consumption row identifies which session/tick/snapshot was projected.
10. Rendering continues while screen intent says Pause, but gameplay also continues because there is no separate simulation eligibility gate.
11. World and HTML renderers expose no `dispose()` method.
12. The delegated click listener survives for the page lifetime and cannot be removed by the renderer owner.

## Required separation

```txt
wall-clock RAF
  -> clock accumulator
  -> zero or more fixed simulation steps
  -> one committed gameplay snapshot
  -> one optional render projection
```

Render frequency may vary. Committed gameplay results over equal wall time must not.

## Required render observation

```txt
{
  sessionId,
  renderFrameId,
  simulationTick,
  stateFingerprint,
  viewport,
  worldProjectionFingerprint,
  interfaceProjectionFingerprint,
  renderedAtWallTime,
  lifecycleState
}
```

## Acceptance proof

- 30, 60, and 120 Hz render schedules produce the same simulation tick count and gameplay fingerprint for equal wall time.
- Render-frame counts may differ and must be recorded separately.
- Paused sessions may render but cannot advance gameplay.
- Canvas backing-store resize occurs only when dimensions change.
- Renderer disposal prevents future projection and removes listener ownership.
- Repeated renderer creation/disposal does not duplicate click handling.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```