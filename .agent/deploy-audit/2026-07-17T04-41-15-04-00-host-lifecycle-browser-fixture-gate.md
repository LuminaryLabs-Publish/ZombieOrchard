# Deploy audit: host lifecycle browser fixture gate

**Timestamp:** `2026-07-17T04-41-15-04-00`

## Current proof

`npm test` executes a Node smoke fixture against game state. The build copies static files into `dist`, and Pages publishes the artifact. No real-browser fixture executes boot twice, retires the host, exercises pagehide/pageshow, counts listeners/RAF owners, or correlates the first visible frame with a host generation.

## Required gate

```txt
source browser fixture
  -> admit one host
  -> attempt duplicate boot
  -> prove one active RAF and listener lease
  -> retire the host
  -> prove no stale mutation
  -> replace the host
  -> prove FirstHostBoundFrameAck

repeat against dist
repeat against Pages
compare lifecycle result digests
```

## Required fixtures

- duplicate side-effect boot;
- query-versioned module boot;
- explicit stop/dispose;
- stale RAF callback after retirement;
- stale delegated click after retirement;
- stale `GameHost` reference;
- pagehide/pageshow BFCache path;
- missing-root and partial-construction rollback;
- source/dist/Pages parity.

## Release rule

Do not claim host lifecycle safety until the same accepted HostSessionId and terminal lifecycle results are proven in source, built artifact, and deployed Pages execution.