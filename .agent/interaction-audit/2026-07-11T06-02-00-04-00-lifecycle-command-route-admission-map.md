# Interaction audit — Lifecycle command and route admission map

## Timestamp

```txt
2026-07-11T06-02-00-04-00
```

## Current input path

```txt
click
  -> closest [data-action]
  -> engine.command(interface-composition, activate)
  -> active screen activate
  -> optional nested child command
  -> optional route move

click
  -> closest [data-command]
  -> engine.command(active-session, command)
```

## Current lifecycle-looking actions

| Screen | Action | Current effect | Missing authority |
|---|---|---|---|
| Entry | Play | Route to `active-session` | Resume/fresh-session policy and typed result |
| Entry | New Game | Route to `run-setup` | New-session intent |
| Run Setup | Start | Route to `active-session` | Fresh graph construction and epoch commit |
| Active Session | Pause | Route to `interrupt` | Tick/input freeze |
| Interrupt | Resume | Route to `active-session` | Same-session resume result |
| Interrupt | Title | Route to `entry` | Run retirement and cleanup |
| Outcome | Title | Route to `entry` | Terminal retirement and bounce-back prevention |

## Admission defects

1. Lifecycle intent is encoded in UI route data.
2. Actions do not carry `commandId`, `sessionId`, `expectedEpoch`, source, or reason.
3. `interface-composition.activate` can route even when no lifecycle transition was committed.
4. The active session accepts direct commands regardless of screen or lifecycle state.
5. `GameHost.tick()` bypasses browser/UI admission and can mutate state at any time.
6. No stale input generation is rejected after title, reset, or future remount.
7. No duplicate-click or repeated Start policy exists.
8. Rejected nested child commands do not necessarily block route movement.
9. There is no terminal interaction lock after Outcome.
10. Button projection does not distinguish starting, paused, resetting, failed, or disposed states.

## Required command map

```txt
Entry.Play
  -> RESUME_SESSION when an explicitly resumable session exists
  -> otherwise START_NEW_SESSION

Entry.NewGame
  -> OPEN_RUN_SETUP only

RunSetup.Start
  -> START_NEW_SESSION with preset/options

ActiveSession.Pause
  -> PAUSE_SESSION

Interrupt.Resume
  -> RESUME_SESSION

Interrupt.Title
  -> RETURN_TO_TITLE

Outcome.Title
  -> RETURN_TO_TITLE after terminal finalization

Outcome.NewGame or Entry.NewGame
  -> RESET_SESSION / START_NEW_SESSION by declared policy
```

## Required admission envelope

```txt
commandId
sourceInputId
sourceScreen
runtimeGeneration
expectedSessionId
expectedSessionEpoch
commandType
payload
issuedAtRenderFrame
```

## Required result projection

```txt
accepted or rejected
reason code
before/after lifecycle state
before/after session identity
first committed tick
first rendered frame
cleanup status
retryability
```

## Accessibility requirement

Lifecycle behavior must not depend on DOM button identity alone. The same command envelope should be usable by keyboard, automated fixture, GameHost diagnostic adapter, and future controller/touch adapters.

## Required fixtures

```txt
double Start click -> one accepted session creation
Pause from Entry -> rejected
Resume while running -> rejected or idempotent by policy
Title while idle -> idempotent result
active-session command while paused -> rejected
active-session command from stale epoch -> rejected
manual GameHost tick while automatic running -> rejected or isolated by explicit mode
Outcome Title -> accepted once and stable on later ticks
```
