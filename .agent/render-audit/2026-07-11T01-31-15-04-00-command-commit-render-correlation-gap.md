# Render audit — Command commit and render correlation gap

Timestamp: `2026-07-11T01-31-15-04-00`

## Current render path

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next frame
```

Direct browser commands mutate state between frames. The renderers receive only the next aggregate snapshot. They do not receive:

```txt
commandId
transactionId
parentCommandId
command result
publication count
before/after fingerprint
committed simulation tick
source event or random-decision range
```

## Observable coherence gap

A composite interface action can publish an intermediate child state before the parent command completes. The render loop itself does not subscribe, but any subscriber or immediate `GameHost.getState()` read can observe the child mutation without the final route/result facts. The next RAF then renders a later aggregate snapshot with no indication of which command commit produced it.

For construction:

```txt
click Storage Shed
  -> child build notification can occur
  -> parent result can still report accepted even if child rejected
  -> next rendered UI relies on construction.message rather than a typed result
  -> canvas and HTML snapshots expose no command commit identity
```

## Required render observation

```txt
RenderObservation
  renderFrameId
  sourceCommandId
  sourceTransactionId
  sourceSessionEpoch
  sourceSimulationTick
  sourceStateFingerprint
  worldProjectionCommitted
  htmlProjectionCommitted
  projectionErrors[]
```

## Required proof

- One composite command produces at most one committed state publication.
- A rejected child command produces no state fingerprint change.
- A required child rejection prevents the dependent route transition.
- The next rendered observation names the committed command and state fingerprint.
- Canvas and HTML projections consume the same aggregate snapshot identity.
- `GameHost` can return detached last-command and last-render observations.

## Out of scope

```txt
visual redesign
canvas fidelity
new art
renderer replacement
animation work
```
