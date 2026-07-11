# Session authority audit — Runtime session epoch and lifecycle contract

## Timestamp

```txt
2026-07-11T06-02-00-04-00
```

## Authority statement

One runtime may own at most one current orchard session. Every session-changing operation must be an admitted command that produces one terminal result. Interface routes may project lifecycle state but may not create, pause, end, reset, or retire a session by themselves.

## Session identity

```txt
runtimeId
runtimeGeneration
sessionId
sessionEpoch
presetId
presetRevision
seedPolicy
createdAtCommandId
lifecycleState
committedTickId
terminalResultId or null
```

`sessionEpoch` must increase whenever a fresh graph becomes authoritative, including New Game, Reset, or a successful future Load.

## Lifecycle state machine

```txt
idle
  -> starting
  -> running
  -> paused
  -> running
  -> ending
  -> ended
  -> returning_to_title
  -> idle

running / paused / ended
  -> resetting
  -> starting
  -> running

any non-disposed state
  -> disposing
  -> disposed

starting / resetting / disposing
  -> failed only through a typed terminal failure result
```

## Tick admission

```txt
running: simulation ticks admitted
paused: simulation ticks skipped, UI/render projection allowed
idle: simulation ticks skipped
starting/resetting: old session skipped; candidate graph not live until commit
ended: simulation ticks skipped; terminal projection allowed
returning_to_title: simulation ticks skipped
disposed: all ticks and commands rejected
```

## Start transaction

```txt
START_NEW_SESSION
  -> validate current lifecycle and expected epoch
  -> validate preset/options
  -> create candidate graph with injected dependencies
  -> capture candidate initial fingerprint
  -> stop admission to previous graph
  -> commit new sessionId and epoch
  -> publish initial committed snapshot
  -> acknowledge first rendered frame
  -> retire previous graph/resources
  -> publish StartSessionResult
```

A candidate construction failure must leave the previous valid lifecycle state and graph unchanged.

## Pause and resume

Pause freezes gameplay mutation at one committed tick. Resume continues the same `sessionId` and `sessionEpoch`. Neither operation reconstructs the graph.

## Outcome finalization

```txt
terminal gameplay condition
  -> END_SESSION command/result
  -> freeze gameplay mutation
  -> capture immutable score/day/result snapshot
  -> lifecycle = ended
  -> route projection = outcome
```

Automatic Outcome routing may observe a committed terminal result, but it must not infer lifecycle solely from mutable `active-session.ended` state.

## Return-to-title transaction

```txt
RETURN_TO_TITLE
  -> freeze gameplay admission
  -> commit retired/suspended policy
  -> clear automatic outcome admission for retired epoch
  -> route to Entry
  -> release or retain graph by explicit policy
  -> publish terminal result
```

For the current product, the safest policy is to retire the run and require Play/New Game to construct a fresh graph because no domain exposes a complete suspend/resume contract.

## Reset transaction

Reset should construct a fresh graph and atomically transfer ownership. Do not reset individual closures opportunistically.

```txt
old epoch N
  -> prepare candidate epoch N+1
  -> commit candidate
  -> acknowledge first frame N+1
  -> dispose epoch N
```

## Resource ownership

The runtime session owner must track:

```txt
engine graph
RAF id and generation
DOM listener leases
renderer handles
subscriptions
GameHost exposure
pending lifecycle commands
last committed snapshot
terminal snapshot
journals
```

## Idempotency

```txt
Pause while paused -> idempotent or typed rejection
Resume while running -> idempotent or typed rejection
Title while idle -> idempotent
Dispose twice -> same terminal disposal result
Duplicate Start commandId -> return prior result, never create another graph
Stale expectedEpoch -> reject without mutation
```

## Observability

A detached session observation must expose bounded JSON-safe data only. It must not expose the mutable engine object as the authoritative control surface.

## Acceptance criteria

```txt
[ ] No mutable gameplay graph exists before an admitted start, unless explicitly classified as an inactive candidate.
[ ] Play and New Game semantics are distinct and documented.
[ ] Pause freezes pressure, pests, damage, score, world mutation, and gameplay commands.
[ ] Title after Outcome remains on Entry.
[ ] Play after Outcome creates a fresh non-ended session.
[ ] Every accepted fresh start increments sessionEpoch once.
[ ] One RAF owner exists.
[ ] All listener/global/resource ownership is releasable.
[ ] Stale commands, ticks, callbacks, snapshots, and render observations reject.
[ ] Fixtures prove start, pause, resume, title, outcome, reset, failure rollback, and disposal.
```
