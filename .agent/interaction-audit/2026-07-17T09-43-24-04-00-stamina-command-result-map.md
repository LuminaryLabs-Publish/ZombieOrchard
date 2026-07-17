# Interaction audit: stamina command and result map

**Timestamp:** `2026-07-17T09-43-24-04-00`

## Current command surface

```txt
HTML button or host command
  -> active-session command
  -> command mutates gameplay directly
  -> returns only accepted true/false
  -> snapshot is rendered later
```

`move`, `collect` and `clear` do not include effort evidence, expected stamina revision, exhaustion policy or a typed stamina result.

## Required map

```txt
ActionIntent
  -> StaminaActionAdmissionCommand
     runId
     playerRevision
     actionId
     requestedMagnitude
     expectedStaminaRevision

  -> ActionEffortAdmissionResult
     accepted | degraded | rejected
     resolvedCost
     reason
     staminaBefore

  -> accepted gameplay command
  -> StaminaActionResult
     gameplayAccepted
     chargedCost
     staminaAfter
     exhaustionState
     staminaRevision

  -> StaminaProjectionResult
  -> FirstStaminaBoundFrameAck
```

## Failure and race rules

- Reject stale expected revisions.
- Do not charge twice for duplicate action identity.
- Define whether failed collect/clear attempts cost effort.
- Never let a rejected effort admission still move, collect or damage a pest.
- Do not let a later recovery result overwrite a newer action result.
- Bind rendered stamina to the same accepted player revision.

## Validation boundary

This is a proposed interaction contract. Existing command behavior and return values remain unchanged.