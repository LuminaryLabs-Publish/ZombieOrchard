# Interaction audit: add-kit command and replacement result map

**Timestamp:** `2026-07-12T10-09-07-04-00`

## Summary

The current public path exposes `GameHost.engine.addKit()` as an untyped direct mutation. It has no actor, capability, command ID, expected graph revision, replacement policy or result envelope.

## Plan ledger

**Goal:** route every graph mutation through one capability-gated command with explicit admission and replacement results.

- [x] Trace startup installation and public post-start access.
- [x] Identify missing command identity and graph fences.
- [x] Define accepted, rejected, stale and replacement results.
- [ ] Implement and validate the command surface.

## Current path

```txt
browser or diagnostic caller
  -> window.GameHost.engine.addKit(kit)
  -> kit.create(liveCtx)
  -> require domain.id
  -> assign live map entry
  -> return raw domain
```

## Required path

```txt
KitGraphInstallCommand
  commandId
  actorId
  capabilityLeaseId
  runtimeSessionId
  expectedGraphRevision
  manifests
  replacementPolicy

  -> capability admission
  -> idempotency check
  -> predecessor and session check
  -> candidate graph planning
  -> dependency and service admission
  -> detached construction
  -> atomic commit or rollback
  -> typed result
```

## Typed results

```txt
KitGraphInstalledResult
KitGraphReplacedResult
DuplicateKitRejectedResult
DuplicateDomainRejectedResult
MissingServiceRejectedResult
IncompatibleServiceRejectedResult
CyclicGraphRejectedResult
StaleGraphRevisionRejectedResult
UnauthorizedGraphMutationRejectedResult
KitCreateFailedResult
KitGraphRollbackResult
```

## Public surface rule

`GameHost` may expose read-only graph observations and a capability-gated command adapter. It must not expose the mutable engine owner or raw `addKit()`.