# Render audit: observer fault and visible-frame liveness gap

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

The browser frame calls `engine.tick()` before canvas and HTML projection. A subscriber exception therefore occurs after simulation mutation but before either renderer and before scheduling the successor RAF.

## Plan ledger

**Goal:** keep observer failures from terminating visible presentation or separating committed state from frame provenance.

- [x] Trace `draw()` ordering.
- [x] Trace tick notification ordering.
- [x] Confirm no browser error boundary or successor-RAF finally path exists.
- [x] Define required frame correlation.
- [ ] Add browser and Pages fixtures.

## Current frame path

```txt
requestAnimationFrame(draw)
  -> engine.tick(1/60)
     -> mutate frame and domains
     -> notify subscribers
        -> subscriber may throw
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

## Failure consequence

```txt
subscriber throws
  -> simulation state is already committed
  -> tick does not return snapshot
  -> canvas render is skipped
  -> HTML render is skipped
  -> successor RAF is not requested
  -> last visible frame no longer represents current state
```

## Missing frame authority

```txt
publication sequence
committed tick result
observer delivery report
render admission result
canvas/HTML shared frame ID
frame-loop continuation policy
first visible publication-frame acknowledgement
```

## Required proof

- Throwing observer does not stop later observers.
- Throwing observer does not suppress the next browser frame.
- Canvas and HTML cite the same publication sequence.
- A committed tick that cannot be rendered reports a typed presentation failure.
- Source, dist and Pages behavior match.
