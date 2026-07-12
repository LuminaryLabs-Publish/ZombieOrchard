# Kit graph audit: manifest, dependency and atomic commit contract

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

This contract defines the minimum data and lifecycle required for a reliable ZombieOrchard kit graph. A graph is valid only when ownership is unique, required services resolve compatibly, phases are deterministic, all candidate domains validate and the complete replacement can commit or roll back atomically.

## Plan ledger

**Goal:** make graph composition explicit enough to validate, fingerprint, replace, replay and correlate with visible output.

- [x] Define manifest fields.
- [x] Define service and dependency rules.
- [x] Define candidate isolation.
- [x] Define commit, rollback and predecessor retirement.
- [x] Define observation and proof.
- [ ] Implement the contract.

## Kit manifest

```txt
kitId
domainId
version
compatibilityRange
phase
provides[]
requires[]
optional[]
createPolicy
replacementPolicy
snapshotSchemaId
lifecycleHooks
manifestFingerprint
```

## Service contract

```txt
serviceId
version
providerKitId
providerDomainId
apiSchemaId
lifecycleScope
cardinality
consumerRequirements
```

A required service must resolve to one compatible admitted provider before candidate creation commits. Optional services must be named explicitly and produce a typed absent binding rather than relying on optional chaining.

## Deterministic phase policy

```txt
bootstrap
state providers
world providers
gameplay command owners
simulation
outcome derivation
interface composition
snapshot publication
render projection
diagnostics
```

Dependencies refine order inside phases. Stable kit IDs break remaining ties. Input manifest order must not affect the resolved graph.

## Candidate isolation

```txt
candidate domains map
candidate service registry
candidate event journal
candidate resource leases
candidate cleanup stack
read-only predecessor observation
no live-domain mutation
no public capability publication
```

## Commit contract

```txt
validate expected predecessor
freeze candidate fingerprint
suspend predecessor mutation at commit boundary
atomically publish domains, services, order and graph revision
migrate explicitly retained state
retire predecessor capabilities
run predecessor disposal in reverse acquisition order
publish installation receipts
resume frames on the new graph
```

## Rollback contract

Any validation, create, migration or commit failure must:

```txt
leave the live graph revision unchanged
revoke candidate capabilities
run candidate cleanup in reverse order
publish exact failed kit/service/phase
return cleanup receipts and unresolved leak status
produce no new visible graph frame
```

## Replacement policy

Silent replacement is forbidden. A replacement declares:

```txt
replacedDomainId
expectedOwnerKitId
newOwnerKitId
stateMigrationSchema
fallbackPolicy
predecessorDisposalPolicy
```

## Observation contract

```txt
graphId
graphRevision
graphFingerprint
resolvedOrder
kitManifestFingerprints
serviceBindings
installationReceipts
replacementLineage
cleanupReceipts
firstCanvasFrameReceipt
firstHtmlFrameReceipt
```

## Proof matrix

| Scenario | Required result |
|---|---|
| Duplicate domain | Typed rejection, unchanged graph |
| Missing service | Exact consumer/service diagnostic |
| Incompatible version | Required and provided versions recorded |
| Dependency cycle | Stable cycle path |
| Candidate create failure | Reverse cleanup receipts |
| Explicit replacement | Migration and predecessor retirement receipts |
| Stale replacement | Expected/current revision rejection |
| Successful commit | New fingerprint and matching first-frame receipts |

## Validation boundary

This is a documentation contract. No runtime graph behavior was changed.