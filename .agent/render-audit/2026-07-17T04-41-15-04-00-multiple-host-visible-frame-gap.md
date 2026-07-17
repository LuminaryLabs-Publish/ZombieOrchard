# Render audit: multiple-host visible-frame gap

**Timestamp:** `2026-07-17T04-41-15-04-00`

## Finding

Canvas2D and HTML presentation are invoked by a recursive RAF owned only by the `draw` closure in `src/start.js`. The callback handle is not retained, and neither renderer exposes disposal. A replacement or duplicate host generation has no mechanism to prove exclusive ownership of the visible frame.

```txt
accepted host/frame generation: absent
stored RAF handle: absent
cancelled predecessor RAF: absent
renderer generation: absent
stale-frame rejection: absent
FirstHostBoundFrameAck: absent
```

A normal static load currently creates one loop, so no double-render incident was reproduced. The gap becomes relevant to future recovery, hot replacement, query-versioned module execution, BFCache policy, or explicit restart behavior.

## Required frame contract

```txt
HostRuntimeCommitResult
  -> accepted HostSessionId and RafLoopGeneration
  -> Canvas2D and HTML render one matching snapshot
  -> stale predecessor callbacks reject before mutation
  -> FirstHostBoundFrameAck
```

## Fixtures

- execute two boot attempts against one document root;
- prove one accepted RAF generation;
- retire the first generation and prove no later canvas or HTML mutation;
- replace the host and prove the first new frame belongs to the replacement generation;
- repeat from source, `dist`, and Pages origins.