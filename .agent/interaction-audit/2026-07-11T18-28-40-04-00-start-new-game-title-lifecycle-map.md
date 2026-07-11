# Interaction audit — Start, New Game and Title Lifecycle Map

## Summary

The visible actions imply lifecycle semantics that their commands do not provide. Play, New Game, Start, Pause, Resume, Title and Outcome are implemented as route transitions or direct commands without runtime, run, epoch or lifecycle admission.

## Current action map

| Visible action | Current operation | Missing authority |
|---|---|---|
| Play | `move("active-session")` | start result, fresh run, run identity, first frame |
| New Game | `move("run-setup")` | candidate run, reset plan, replacement policy |
| Start | `move("active-session")` | graph construction, commit, rollback, first frame |
| Pause | `move("interrupt")` | simulation suspension, input fence, pause receipt |
| Resume | `move("active-session")` | clock baseline reset, resume receipt |
| Title | `move("entry")` | run exit, callback retirement, summary retention policy |
| Outcome Title | `move("entry")` | terminal run retirement |

## Current admission path

```txt
button click
  -> delegated HTML listener
  -> engine.command("interface-composition", "activate", actionId)
  -> active domain resolves action
  -> optional child command
  -> move(next route)
  -> command result discarded by renderer
```

The envelope contains no command ID, runtime ID, run ID, session epoch, expected lifecycle or expected route revision.

## Required interaction commands

```txt
StartRun
RequestNewRun
CommitNewRun
PauseRun
ResumeRun
EndRun
ExitRunToTitle
DisposeRuntime
```

Every command should carry:

```txt
commandId
runtimeId
expectedRunId
expectedSessionEpoch
expectedLifecycle
expectedLifecycleRevision
source
requestedAtFrameId
```

## Required behavior

1. Play starts a run only from an admitted idle/startable lifecycle.
2. New Game from an active or ended run uses an explicit replace/confirm policy.
3. Start commits a fully validated candidate run, not a route alone.
4. Pause prevents simulation ticks from mutating gameplay state.
5. Resume establishes a new wall-clock baseline before stepping.
6. Title exits and retires the run before Entry becomes authoritative.
7. Outcome actions operate against a latched ended run and cannot revive it.
8. Duplicate and stale lifecycle commands return typed, idempotent results.
9. Renderer event handlers surface rejected lifecycle results instead of silently discarding them.

## Required observation

```txt
activeRoute
runtimeId
runId
sessionEpoch
lifecycle
lifecycleRevision
lastLifecycleCommandId
lastLifecycleResult
firstCommittedFrameId
```

Route state is a projection of lifecycle authority, not the authority itself.