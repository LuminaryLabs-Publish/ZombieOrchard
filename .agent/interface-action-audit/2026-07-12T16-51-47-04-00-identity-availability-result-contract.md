# Interface action audit: identity, availability and result contract

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

This contract separates explicit action identity from selection, makes availability a first-class result and requires nested gameplay and route outcomes to be composed into one authoritative action result.

## Plan ledger

**Goal:** define the minimum result-first contract needed to replace fail-open action activation.

- [x] Define command evidence.
- [x] Define admission outcomes.
- [x] Define nested result composition.
- [x] Define visible projection evidence.
- [ ] Implement schemas and fixtures.

## Command contract

```txt
InterfaceActionCommand {
  commandId
  runtimeSessionId
  runId
  runGeneration
  expectedRouteId
  expectedRouteRevision
  expectedActionSetRevision
  actionId
  expectedActionFingerprint
  source
}
```

`actionId` is mandatory for activate-by-id. Selection activation uses a different command carrying `expectedSelectionRevision`.

## Availability contract

```txt
ActionAvailability {
  actionId
  actionFingerprint
  enabled
  reason
  routeRevision
  actionSetRevision
}
```

The same availability object drives command admission and HTML affordance projection.

## Result contract

```txt
InterfaceActionResult {
  commandId
  actionId
  accepted
  reason
  routeRevisionBefore
  routeRevisionAfter
  actionSetRevision
  nestedCommandResult
  routeTransitionResult
  stateRevision
  resultRevision
  replayed
}
```

## Commit policy

```txt
no nested command
  -> action may commit route or no-op result

required nested command accepted
  -> route policy may commit

required nested command rejected
  -> outer result rejects
  -> route remains unchanged unless explicitly configured otherwise

optional nested command rejected
  -> result records partial policy explicitly
```

## Invariants

```txt
unknown explicit ID never activates selection
missing explicit ID never activates selection
availability and visible disabled state share one source
nested rejection is never rewritten as success
duplicate command cannot repeat nested effect
stale route/action-set evidence cannot invoke gameplay
result projection cites the committed result revision
```

## Journal fields

```txt
command ID
caller source
session/run/route/action-set revisions
action identity and fingerprint
admission decision
nested result
route result
state/result revisions
visible acknowledgement
```

## Non-claim

No runtime contract is implemented yet.