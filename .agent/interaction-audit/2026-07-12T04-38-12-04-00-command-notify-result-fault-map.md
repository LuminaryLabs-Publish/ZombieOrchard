# ZombieOrchard Command, Notification, and Result Fault Map

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

Browser actions call `engine.command()`, which mutates a domain and then publishes synchronously before returning the result. Notification failure therefore crosses the command boundary after durable mutation. The caller cannot distinguish command rejection from publication failure, and the current delegated click adapter does not catch or report either case.

## Plan ledger

**Goal:** separate command admission/commit results from observer delivery results and make the browser adapter consume both without concealing mutation.

- [x] Trace delegated click actions.
- [x] Trace interface and active-session command dispatch.
- [x] Trace runtime notification and result return.
- [x] Trace raw public command/subscription access.
- [x] Define interaction result separation and failure mapping.
- [ ] Implement typed adapters and fixtures.

## Current browser map

```txt
[data-action] click
  -> engine.command("interface-composition", "activate", actionId)
  -> possible nested child command mutation
  -> runtime notify
  -> result discarded by renderer adapter

[data-command] click
  -> engine.command("active-session", commandName)
  -> active-session may mutate world/resources/pressure/score/message
  -> runtime notify
  -> result discarded by renderer adapter
```

## Current fault map

```txt
COMMAND_REJECTED
  runtime result exists
  browser adapter discards it

COMMAND_ACCEPTED + PUBLICATION_SUCCESS
  runtime result exists
  browser adapter discards it

COMMAND_ACCEPTED + OBSERVER_FAILURE
  durable mutation exists
  observer exception escapes
  runtime result does not return
  browser handler receives exception

NESTED_COMMAND + OBSERVER_FAILURE
  child/parent mutation and intermediate publication may already exist
  exception can interrupt parent flow
  no transaction or delivery summary identifies the boundary
```

## Required result separation

```txt
CommandCommitResult {
  commandId
  accepted
  reason
  stateRevision
  transactionRevision
}

PublicationSummary {
  publicationCycleId
  stateRevision
  deliveredCount
  failedCount
  quarantinedCount
  deliveryResults
}

BrowserCommandResult {
  commandCommitResult
  publicationSummary
  frameCycleResult?
  visibleFrameReceipt?
}
```

Observer failure must not change `commandCommitResult.accepted` after the commit boundary.

## Required browser adapter flow

```txt
click intent
  -> validate runtime/session/route capability
  -> submit typed command
  -> receive command commit result
  -> receive separate publication summary
  -> project accepted/rejected message
  -> await or observe first matching visible frame receipt
  -> never throw an observer callback error into the DOM event owner
```

## Required fault codes

```txt
COMMAND_REJECTED
COMMAND_COMMITTED
PUBLICATION_PARTIAL
PUBLICATION_FAILED
OBSERVER_QUARANTINED
FRAME_PARTIAL
FRAME_FAILED
RUNTIME_FAULTED
STALE_SESSION
STALE_FRAME_GENERATION
```

## Fixtures

```txt
rejected command + healthy observers
accepted command + healthy observers
accepted command + first observer throws
accepted command + later observer throws
nested interface action + observer throws
browser adapter consumes commit and publication separately
visible frame receipt matches committed command revision
```

## Invariants

```txt
publication failure cannot turn an accepted committed command into a rejected command
browser adapters do not discard typed command results
one observer cannot suppress later observer deliveries
DOM event handlers do not own runtime recovery
visible success claims cite the committed command and frame receipt
```
