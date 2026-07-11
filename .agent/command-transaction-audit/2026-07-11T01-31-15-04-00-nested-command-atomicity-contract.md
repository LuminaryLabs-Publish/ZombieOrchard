# Command transaction audit — Nested command atomicity contract

Timestamp: `2026-07-11T01-31-15-04-00`

## Invariant

One admitted browser intent must produce exactly one terminal composite result and at most one committed state publication.

## Current violations

```txt
nested child uses public engine.command
  -> child publishes before parent completion

child result discarded
  -> parent can report accepted when required child rejected

route resolved after child mutation
  -> potential partial commit if route fails

boolean resource payment
  -> no attributed debit result or rollback evidence

no transaction journal
  -> no durable proof of parent, child, route and publication order
```

## Proposed transaction lifecycle

```txt
received
  -> assigned commandId and transactionId
  -> preflighted
  -> staged
  -> children executed in transaction context
  -> route validated
  -> committed or rejected
  -> one notification published
  -> one detached journal row recorded
  -> next render observation correlated
```

## Atomicity rules

1. Nested dispatch must not invoke the public notify-on-return path.
2. Required child failure rejects the composite transaction.
3. Rejected transactions preserve the before fingerprint.
4. Successful transactions publish once after all effects are finalized.
5. Parent results include every child and route result.
6. Resource effects are typed and attributed to the transaction.
7. Exceptions become stable failure results and do not leak partial publication.
8. Journal rows are bounded, detached and JSON-safe.
9. Reentrant commands are explicitly rejected or queued.
10. Disposed or inactive sessions reject before any child mutation.

## Minimum result reasons

```txt
missing_domain
unknown_command
missing_action
action_disabled
invalid_target
missing_service
insufficient_resources
route_missing
child_rejected
exception
session_inactive
disposed
committed
```

## Acceptance proof

```txt
subscriber count before command
execute one parent action
subscriber count increases by exactly one on commit
parent result carries child result
invalid target leaves resource and entity fingerprints unchanged
insufficient resources leaves all owned fingerprints unchanged
route failure after preflight produces no child mutation
journal row matches returned composite result
render observation names committed commandId
```
