# Render audit — Stale Run and First-Frame Projection Gap

## Summary

Canvas and HTML render from the same mutable graph, but neither consumes a committed run/frame record. Route changes can therefore display Entry or New Game UI while the canvas continues projecting the ended predecessor run, and a new run can never prove its first visible frame is fresh.

## Current render order

```txt
RAF callback
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next RAF
```

`world-canvas-render-kit` always reads `orchard-world` and `active-session`, regardless of the active interface route. `html-interface-render-kit` projects the route selected by `interface-composition`.

## Reachable mismatch

```txt
run ends
  -> canvas contains ended player, pests and orchard state
  -> HTML shows Outcome

Title
  -> active route becomes Entry
  -> same RAF continues
  -> same ended graph is ticked
  -> canvas still shows predecessor run
  -> HTML shows Entry

Play
  -> route briefly points at active-session
  -> no fresh state or frame is staged
  -> next tick routes back to Outcome
```

The UI route and world pixels can describe different lifecycle meanings even though they came from one snapshot.

## Missing evidence

```txt
runtimeId
runId
sessionEpoch
lifecycleRevision
simulationTickId
renderFrameId
worldProjectionResult
htmlProjectionResult
firstRunFrameAck
stateFingerprint
presentationFingerprint
```

## Required contract

1. Rendering consumes an immutable committed run snapshot.
2. Canvas and HTML results cite the same `runtimeId`, `runId`, `sessionEpoch`, tick and frame.
3. Entry and Run Setup must not present predecessor-run world state as current-run evidence.
4. Start/New Game success is withheld until both canvas and HTML acknowledge the first new-run frame.
5. A failed canvas or HTML projection does not publish a partial first-frame commit.
6. Stale predecessor render callbacks are rejected after epoch advance.
7. GameHost readback exposes only the latest committed frame record, not live mutable domain sampling.

## Required fixture

```txt
complete run A to failure
  -> capture outcome frame A
  -> Title
  -> assert Entry frame does not claim run B
  -> Start run B
  -> assert runId B != runId A
  -> assert canvas, HTML and GameHost cite run B
  -> assert initial resources/player/world equal canonical fresh preset
  -> assert no frame from run A commits after run B
```

No render-coherence or first-fresh-frame claim is valid until this fixture passes.