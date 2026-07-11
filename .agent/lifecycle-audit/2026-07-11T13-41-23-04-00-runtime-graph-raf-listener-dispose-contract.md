# Lifecycle audit: Runtime graph, RAF, listener and disposal contract

## Plan ledger

**Goal:** establish one lifecycle state machine and cleanup stack for every page-owned runtime resource.

- [x] Inventory page-owned resources.
- [x] Identify missing acquisition and cleanup receipts.
- [x] Define startup rollback and ordered disposal.
- [x] Define idempotence and stale-generation rules.
- [ ] Implement and fixture the lifecycle owner.

## Page-owned resources

```txt
engine graph
runtime context and domain closures
runtime listener set
canvas element and 2D context
HTML root and delegated click callback
recursive animation-frame callback
window.GameHost global
current aggregate snapshots
future clock and lifecycle journals
```

## Lifecycle states

```txt
UNINITIALIZED
BOOTING
TITLE
RUNNING
PAUSED
TERMINAL
TRANSITIONING
DISPOSING
DISPOSED
FAILED
```

Each transition must increment `lifecycleRevision` and carry `runtimeId`, `sessionId`, `sessionEpoch` and `graphRevision` where applicable.

## Startup transaction

```txt
allocate runtime identity
  -> create cleanup stack
  -> construct graph off-line
  -> validate required domains
  -> construct render owners
  -> register listener lease
  -> publish revocable host lease
  -> retain first RAF request
  -> atomically commit lifecycle state
  -> return StartupResult

failure at any stage
  -> run cleanup stack in reverse
  -> revoke partial globals
  -> publish FAILED result
```

## Ordered disposal

```txt
1. transition to DISPOSING and reject new commands
2. cancel retained RAF request
3. retire delegated listener lease
4. revoke window.GameHost lease
5. unsubscribe runtime subscribers
6. dispose HTML and canvas render owners
7. retire clock and session journals
8. mark graph generation inactive
9. release graph and snapshot references
10. publish one immutable DISPOSED result
```

## Stale-generation fence

Every callback and public command must carry or close over a generation token. A callback from an old generation must return a typed stale-generation rejection and must not schedule another RAF, mutate a domain or render a frame.

## Idempotence

```txt
dispose once
  -> committed DISPOSED result

dispose again
  -> no-op result with same final revision

cancel missing RAF
  -> explicit no-op cleanup row

remove missing listener
  -> explicit no-op cleanup row

revoke missing host
  -> explicit no-op cleanup row
```

## Required fixture matrix

```txt
startup success
startup failure at every acquisition point
startup rollback order
single RAF ownership
double start rejection
new-run authority transfer
stale RAF callback after replacement
listener removal
global revocation
render-after-dispose rejection
double dispose idempotence
zero post-disposal domain mutations
```