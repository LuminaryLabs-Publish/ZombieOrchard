# Single-publication and rollback contract

## Audit timestamp

```txt
2026-07-11T07-51-07-04-00
```

## Goal

Specify the transaction semantics that prevent partial state visibility and guarantee complete restoration when any required composite-command step fails.

## Transaction boundary

```txt
one admitted parent command
  -> one transaction
  -> zero or more internal child operations
  -> zero or one route operation
  -> one terminal result
  -> one publication
```

## Before-state capture

Participating domains must provide detached checkpoint services for the fields they can mutate.

For Storage Shed:

```txt
resource-ledger values + last
construction-runtime built + message
interface-composition active + previous, when routing
```

The transaction records a canonical before fingerprint over the participating durable state.

## Staging contract

No child writes directly to live state during preflight. It creates a candidate effect plan:

```txt
resource debit effect
built-object append effect
message effect
route effect
```

Each effect must be deterministic from the admitted command, current committed state and stable ID allocation.

## Commit contract

Commit order must be explicit and reversible. Recommended order:

1. Verify the participating states still match their preflight revisions.
2. Apply the resource debit.
3. Apply the built-object append.
4. Apply the message.
5. Apply the route transition.
6. Compute the after fingerprint.
7. Append the terminal transaction row.
8. Publish one aggregate snapshot.

No renderer or subscriber can observe steps 2–5 independently.

## Rollback contract

If any required commit step fails:

1. Stop further effects.
2. Restore every participating domain from the captured checkpoint.
3. Verify the restored fingerprint equals the before fingerprint.
4. Append one `rolled_back` result with the failed step and child reason.
5. Publish one restored aggregate snapshot.
6. Never route to the candidate destination.

Rollback failure is a fatal session error and must not be concealed as a normal command rejection.

## Publication contract

```txt
accepted transaction: exactly one publication
rejected preflight: exactly one result publication, no state mutation
rolled-back transaction: exactly one restored-state publication
replayed duplicate: zero new mutation publications; return prior result
```

Publications must carry `transactionId`, terminal state and state fingerprint.

## Exactly-once policy

Maintain a bounded command-result index by `commandId` within `sessionEpoch`.

```txt
new commandId
  -> process

same commandId + same canonical request
  -> return prior result

same commandId + different canonical request
  -> reject command_id_conflict
```

## Failure taxonomy

```txt
invalid_envelope
stale_session
stale_epoch
stale_tick
unknown_parent_domain
unknown_parent_command
unavailable_action
unknown_child_domain
unknown_child_command
unknown_target
insufficient_resources
route_unavailable
revision_conflict
child_execution_failed
commit_failed
rollback_failed
command_id_conflict
```

## Journal row

```txt
transactionId
commandId
sessionId
sessionEpoch
source
receivedAt
terminalState
reason
childResults[]
resourceReceipts[]
routeResult
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
firstRenderedFrameId
```

## Non-negotiable proofs

- No intermediate snapshot is visible.
- Parent acceptance always agrees with required-child results.
- Rejection and rollback preserve the before fingerprint.
- One command ID cannot repeat effects.
- Unknown targets never fall back silently.
- One committed result correlates with one first-rendered-frame acknowledgement.
