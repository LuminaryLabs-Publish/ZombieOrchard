# Interaction audit: Lifecycle command and session admission map

## Plan ledger

**Goal:** route all browser, UI and diagnostic lifecycle intents through one typed session-aware admission boundary.

- [x] Trace delegated UI clicks to direct engine commands.
- [x] Trace route activation and nested command dispatch.
- [x] Trace direct `GameHost` access.
- [x] Define lifecycle/session admission fields and result classes.
- [ ] Implement the gateway and behavioral fixtures.

## Current input path

```txt
click
  -> find data-action or data-command
  -> engine.command()
  -> domain mutates immediately
  -> runtime notifies subscribers
  -> command result is discarded by the renderer

GameHost
  -> raw engine reference
  -> direct snapshot or tick
  -> no lifecycle/session admission
```

## Missing command envelope

```txt
commandId
source
runtimeId
sessionId
sessionEpoch
observedLifecycleRevision
observedRoute
expectedGraphRevision
issuedAtTickId
```

## Required admission matrix

| Command class | BOOTING | TITLE | RUNNING | PAUSED | TERMINAL | TRANSITIONING | DISPOSED |
|---|---:|---:|---:|---:|---:|---:|---:|
| start runtime | reject | no-op | reject | reject | reject | reject | reject |
| new run | reject | admit | explicit replace | explicit replace | admit | reject | reject |
| pause | reject | reject | admit | no-op | reject | reject | reject |
| resume | reject | reject | no-op | admit | reject | reject | reject |
| return to title | reject | no-op | admit policy | admit policy | admit policy | reject | reject |
| gameplay command | reject | reject | admit | reject | reject | reject | reject |
| debug step | reject | reject | lease-dependent | lease-dependent | reject | reject | reject |
| dispose | admit rollback | admit | admit | admit | admit | admit idempotently | no-op |

## Required result

```txt
LifecycleCommandResult
  commandId
  accepted
  classification: committed | rejected | no-op | failed | rolled-back
  reasonCode
  runtimeId
  previousSessionId
  currentSessionId
  previousEpoch
  currentEpoch
  previousLifecycleState
  currentLifecycleState
  lifecycleRevision
  graphRevision
  cleanupRows[]
```

## Interaction proof

```txt
double Start click
  -> one new session commit
  -> duplicate returns no-op or duplicate result

stale old-session click
  -> rejected without domain mutation

click during transition
  -> rejected or queued by explicit policy

click after dispose
  -> listener absent and gateway rejects

GameHost
  -> exposes clone-safe observation and admitted commands only
  -> no raw engine or unrestricted tick by default
```