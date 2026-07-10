# Host proof audit: bounded scenario observation readback

Timestamp: `2026-07-10T17-18-47-04-00`

## Current GameHost

```js
window.GameHost = {
  engine,
  getState: () => engine.snapshot(),
  tick: (dt) => engine.tick(dt)
};
```

## Current capabilities

- Direct access to mutable engine authority.
- Aggregate snapshot retrieval.
- Manual tick invocation.

## Missing proof capabilities

```txt
scenario configuration readback
seed and random stream state
ordered command request/result rows
committed frame rows
durable event rows
renderer consumption rows
state and projection fingerprints
replay result
bounded journal metadata
```

## Risk

The raw `engine` handle is useful for debugging, but it is not proof. A consumer can mutate state between observations or dispatch unjournaled commands. `getState()` returns aggregate state without explaining how that state was produced.

## Required GameHost surface

```txt
GameHost.scenario.getConfig()
GameHost.scenario.getObservation()
GameHost.scenario.getCommands({ afterId, limit })
GameHost.scenario.getFrames({ afterFrame, limit })
GameHost.scenario.getRenderConsumption({ afterFrame, limit })
GameHost.scenario.replay(script)
GameHost.scenario.getReplayResult()
```

Each return value must be:

```txt
JSON-safe
immutable to the caller
bounded
stable-keyed
free of DOM, canvas, context, function, and engine handles
```

## Observation shape

```txt
{
  schemaVersion,
  scenarioId,
  seed,
  presetRevision,
  fixedDelta,
  latestFrame,
  initialFingerprint,
  latestFingerprint,
  commandRange,
  eventRange,
  renderRange,
  replayStatus,
  overflowCounts
}
```

## Recommendation

Keep raw debug access separate and explicitly non-authoritative. Add a dedicated bounded scenario observation surface for fixtures and automation. Proof consumers should never need the mutable engine handle.