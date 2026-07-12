# Interaction audit: kit install command and result map

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

Kit installation is currently a direct method call rather than an admitted command. It returns the created domain or throws, but has no command ID, expected predecessor, typed rejection, commit result or replacement lifecycle receipt.

## Plan ledger

**Goal:** turn initial and runtime kit installation into one typed command/result protocol with stale-work rejection and explicit replacement policy.

- [x] Map initial installation calls.
- [x] Map public post-start installation access.
- [x] Identify current return and failure shapes.
- [x] Define typed command and result families.
- [x] Define stale, duplicate, dependency and rollback outcomes.
- [ ] Implement command fixtures.

## Current interaction

```txt
engine.addKit(kit)
  -> kit.create(ctx)
  -> throw only when returned domain has no ID
  -> assign domains[id]
  -> return domain
```

## Missing command envelope

```txt
installCommandId
runtimeSessionId
expectedGraphRevision
requestedPolicy: install | replace | remove
kitManifestSet
replacementMigrationPolicy
callerCapabilityId
```

## Required results

```txt
KitGraphCommittedResult
KitGraphNoopResult
DuplicateKitRejectedResult
DuplicateDomainRejectedResult
MissingServiceRejectedResult
IncompatibleServiceRejectedResult
CyclicDependencyRejectedResult
StaleGraphRejectedResult
CandidateCreateFailedResult
CandidateRollbackResult
PredecessorRetiredResult
PredecessorMigrationFailedResult
FirstKitGraphFrameAck
```

## Required map

```txt
KitGraphInstallCommand
  -> capability and session admission
  -> expected predecessor validation
  -> manifest and dependency validation
  -> isolated candidate construction
  -> commit OR rollback
  -> typed terminal result
  -> first visible graph-frame acknowledgement
```

## Public host correction

```txt
current: GameHost.engine.addKit

target:
GameHost.capabilities.kitGraph.submit(command)
GameHost.readKitGraphObservation()
```

The public surface must not expose the mutable domain map or unguarded installer.

## Required fixtures

```txt
duplicate command ID is idempotent
stale expected graph revision is rejected
duplicate domain leaves predecessor untouched
failed create returns rollback receipts
explicit replacement returns migration/disposal receipts
unauthorized public caller cannot mutate graph
terminal result correlates with first visible graph frame
```

## Validation boundary

The public API and runtime were not changed. No command/result fixture was run.