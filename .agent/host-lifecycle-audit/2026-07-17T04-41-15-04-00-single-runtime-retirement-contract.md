# Host lifecycle audit: single-runtime retirement contract

**Timestamp:** `2026-07-17T04-41-15-04-00`

## Required invariant

At most one active host generation may own a given ZombieOrchard document root.

## Admission

```txt
HostSessionId
DocumentGeneration
CanvasRootRevision
UiRootRevision
ExpectedPredecessorGeneration
ReplacementPolicy
```

Admission rejects duplicate, stale, missing-root, or unretired-predecessor requests before listeners, RAF, or public capabilities become live.

## Commit

The accepted generation owns one immutable lifecycle set:

```txt
engine generation
Canvas2D renderer generation
HTML renderer generation
DOM listener lease
RAF loop generation
GameHost capability generation
```

Commit is successful only when the first matching Canvas2D/HTML frame is acknowledged.

## Retirement

Retirement is idempotent and ordered:

1. mark the generation retiring;
2. reject new commands and stale RAF callbacks;
3. cancel the accepted RAF handle;
4. remove owned DOM listeners;
5. dispose renderers and subscriptions;
6. dispose engine/domain resources;
7. retire or replace `window.GameHost`;
8. publish terminal `HostLifecycleResult`.

## Page lifecycle

- `pagehide` must choose suspend or retire explicitly.
- BFCache restoration through `pageshow` must resume the same accepted generation or replace it after retirement.
- hidden/visible transitions must not allocate a second RAF generation.
- unload is not the sole cleanup guarantee.

## Proof requirements

- duplicate boot rejection;
- exactly one live click listener;
- exactly one advancing simulation owner;
- no stale canvas/HTML mutation after retirement;
- stale `GameHost` call rejection;
- BFCache restore behavior;
- source/dist/Pages parity;
- `FirstHostBoundFrameAck` from the accepted generation.