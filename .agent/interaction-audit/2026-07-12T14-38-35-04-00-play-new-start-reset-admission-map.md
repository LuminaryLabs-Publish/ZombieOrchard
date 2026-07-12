# Interaction audit: Play, New Game, Start and reset admission

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

Menu actions are interpreted as route changes, not lifecycle commands. The same `activate` pathway handles Play, New Game, Start, Resume and Title without distinguishing resume from create-new-run intent.

## Plan ledger

**Goal:** separate route navigation from admitted run lifecycle commands with typed results.

- [x] Map authored action IDs and destinations.
- [x] Trace delegated HTML activation.
- [x] Trace interface-composition action resolution.
- [x] Confirm nested lifecycle command is absent.
- [x] Define StartRun, ResumeRun and ReturnToTitle semantics.
- [ ] Implement command admission and UI result projection.

## Current action map

```txt
entry.play          -> route active-session
entry.new           -> route run-setup
run-setup.start     -> route active-session
interrupt.resume    -> route active-session
interrupt.title     -> route entry
outcome.title       -> route entry
```

No action carries a run lifecycle command. `interface-composition.activate` resolves the action and calls `move(next)`.

## Required semantic split

```txt
Play
  -> ResumeRunCommand only when an eligible suspended run exists
  -> otherwise StartRunCommand under explicit policy

New Game
  -> begin run-setup intent without mutating live run

Start
  -> StartRunCommand with preset/setup payload
  -> atomic candidate creation and install

Resume
  -> ResumeRunCommand against expected run generation

Title
  -> ReturnToTitleCommand
  -> explicit suspend, abandon or retain policy

Play after terminal outcome
  -> never resume terminal run implicitly
  -> require StartRun or explicit restart policy
```

## Required command result

```txt
RunLifecycleResult {
  accepted
  code
  commandId
  predecessorRunId
  predecessorGeneration
  successorRunId
  successorGeneration
  routeRevision
  participantReceipts
}
```

## Admission checks

```txt
current runtime session
current route revision
expected predecessor run revision
terminal/suspended/active phase
single-flight reset ownership
valid authored preset and setup
no duplicate command ID
candidate participant validation
```

## Non-claim

No menu action semantics or route behavior changed.