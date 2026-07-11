# Command transaction audit: Preflight, commit, rollback, and publication

## Summary

Composite commands need a formal transaction protocol. The protocol must reject invalid targets before mutation, stage all required effects, commit them under one identity, roll back on failure, and publish one complete result instead of exposing nested intermediate state.

## Plan ledger

**Goal:** define the exact transaction phases, invariants, result shape, and fixture cases required before changing the runtime.

- [x] Define command identity.
- [x] Define transaction phases.
- [x] Define preflight inputs.
- [x] Define staged effects.
- [x] Define commit and rollback invariants.
- [x] Define publication rules.
- [x] Define result and journal shapes.
- [x] Define deterministic fixture cases.
- [ ] Implement the protocol.
- [ ] Run fixtures.

## Command envelope

```txt
commandId
transactionId
parentCommandId or null
runtimeId
sessionId
sessionEpoch
source
activeScreenId
commandDomain
commandType
payload
expectedCommittedTickId
issuedAt
```

## Phases

```txt
received
  -> admitted or rejected
  -> planned
  -> preflighted
  -> staged
  -> committing
  -> committed

failure after staging
  -> rolling_back
  -> rolled_back

all terminal states
  -> result sealed
  -> one publication
  -> optional first-frame acknowledgement
```

## Preflight

Validate without live mutation:

```txt
runtime and session identity
session epoch
expected committed tick
active screen
action identity
parent command capability
child domain and command capability
target identity
resource affordability
route target
required-child policy
rollback capability
```

## Storage Shed staged effects

```txt
resource before state
resource debit candidate
construction before state
built-object candidate
message candidate
route before state
route candidate
aggregate before fingerprint
```

## Commit invariants

1. All required preflight checks succeed before mutation.
2. Child execution uses an internal non-publishing path.
3. Resource debit and built-object creation share one commit boundary.
4. Route mutation occurs only after required child success.
5. The final aggregate fingerprint is computed after all effects commit.
6. Subscribers receive exactly one committed snapshot.
7. The caller receives the sealed parent and child result.

## Rollback invariants

1. Every staged effect has a recorded before state.
2. Any required failure restores resources, construction, route, and messages.
3. Rollback is idempotent.
4. Rolled-back state matches the before fingerprint.
5. Subscribers receive one terminal rollback result and no partial state.

## Result envelope

```txt
commandId
transactionId
parentCommandId
runtimeId
sessionId
sessionEpoch
accepted
reason
phase
parentResult
childResults[]
resourceReceipts[]
routeResult
rollbackResult
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
firstRenderedFrameId
```

## Journal row

```txt
sequence
commandId
transactionId
phase
accepted
reason
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
createdAt
```

Journal entries must be bounded and JSON-safe. They must not retain live domain objects or DOM nodes.

## Fixture matrix

```txt
valid shed build
insufficient resources
unknown target
missing child domain
child throw after staged debit
command plus route accepted
command plus route child rejected
duplicate commandId
stale session
stale epoch
stale committed tick
accepted publication count
rejected publication count
rollback publication count
canvas/HTML first-frame correlation
```
