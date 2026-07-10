# Lifecycle audit — Session start, stop, reset, and dispose contract

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Missing owner

No object owns the lifetime of the engine, session-owned domains, RAF loop, renderer listeners, GameHost surface, or test/manual clock.

## Proposed lifecycle contract

```txt
createHost(config)
  -> host.startSession(options)
  -> host.pauseSession()
  -> host.resumeSession()
  -> host.resetSession(options)
  -> host.stopSession(reason)
  -> host.dispose()
```

## Ownership ledger

```txt
host
  owns engine instance
  owns runtime-session authority
  owns clock mode
  owns RAF request ID
  owns renderer instances
  owns GameHost publication/removal

runtime-session authority
  owns session ID
  owns lifecycle state
  owns transition sequencing
  owns domain reset/start/stop order

HTML renderer
  owns delegated root click listener
  returns disposer

world renderer
  owns canvas context projection state
  returns disposer/no-op state

kit runtime
  owns domain list
  routes reset/stop/dispose in declared order
```

## Ordered reset

```txt
pause automatic clock
  -> finalize previous session result
  -> reset resource ledger
  -> reset pressure field
  -> reset orchard world
  -> reset construction
  -> reset roster
  -> reset inventory
  -> reset active session
  -> reset interface composition/history
  -> reset or archive journals by policy
  -> assign new session ID
  -> transition to running
```

## Ordered disposal

```txt
mark stopping
  -> cancel RAF
  -> prevent new lifecycle/command mutation
  -> remove HTML listener
  -> dispose renderers
  -> dispose domains in reverse creation order
  -> clear subscribers
  -> remove or freeze GameHost
  -> mark disposed
```

## Idempotency rules

- Repeated `pause` on paused state is a no-op with a stable reason.
- Repeated `stop` on stopped state is a no-op.
- Repeated `dispose` is safe and does not remove unrelated listeners.
- `start` cannot create a second automatic loop.
- `reset` creates exactly one new session ID.
- Commands after disposal reject without mutation.

## Failure rollback

A failed start or reset must report which owners initialized, roll them back in reverse order, cancel any scheduled frame, remove any listener installed during the attempt, and leave the host in `failed` or `stopped` according to policy.

## Fixture matrix

```txt
idle -> start -> running
running -> pause -> paused
paused -> resume -> running
running -> reset -> running/new session ID
ended -> title/stop -> stopped/entry
stopped -> start -> running/new session ID
running -> stop -> stopped
stopped -> dispose -> disposed
running -> dispose -> disposed
start failure -> rollback -> failed/stopped
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```