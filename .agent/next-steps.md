# Next steps — ZombieOrchard

## Plan ledger

**Goal:** implement a single admitted command path that resolves every participant before mutation, commits once, returns one truthful result and correlates that result to the first visible canvas and HTML frame.

- [ ] Implement runtime-session instance authority first.
- [ ] Implement a monotonic fixed-step clock with one step-writer lease.
- [ ] Implement route-scoped simulation admission.
- [ ] Replace the raw public engine with the versioned capability gateway.
- [ ] Add a canonical command envelope and expected revision.
- [ ] Resolve parent and child action commands before any mutation.
- [ ] Register all transaction participants and their prepare/commit/rollback services.
- [ ] Reject the entire transaction if any participant cannot prepare.
- [ ] Buffer events and subscriber publication until aggregate commit.
- [ ] Publish exactly one aggregate command result.
- [ ] Return the prior receipt for accepted duplicate command IDs.
- [ ] Correlate the result to the first canvas and HTML frame that presents it.
- [ ] Add failure injection and duplicate-submission fixtures.
- [ ] Implement seeded replay and versioned persistence only after transaction identity is stable.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Composite transaction design

### 1. Canonical envelope

```txt
commandId
transactionId
capabilityId
hostGeneration
runtimeId
runId
sessionEpoch
lifecycleRevision
routeRevision
expectedStateRevision
commandType
payload
```

### 2. Resolve the full command graph

Before mutation, expand the intent into one ordered plan:

```txt
interface activation
  -> selected action descriptor
  -> optional child gameplay command
  -> optional route transition
  -> required participant set
```

A child rejection must become the aggregate rejection. Parent success cannot conceal it.

### 3. Participant contract

```txt
prepare(command, snapshot)
  -> PreparedParticipant | RejectedParticipant

commit(prepared)
  -> ParticipantCommitReceipt

rollback(prepared, committedReceipt?)
  -> ParticipantRollbackReceipt
```

Initial participants:

```txt
interface-composition
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
```

### 4. Atomic gameplay plans

```txt
collect apple
  -> prepare target apple
  -> prepare reward delta
  -> prepare pressure delta
  -> prepare score/message delta
  -> commit all or none

clear pest
  -> prepare target and resulting condition
  -> prepare optional retirement
  -> prepare score and scrap delta
  -> commit all or none

build or hire
  -> prepare catalog/actor descriptor
  -> prepare affordability and debit
  -> prepare resulting entity
  -> commit debit and entity together
```

### 5. One publication barrier

During a transaction:

```txt
ctx.emit
subscriber notification
public observation
render invalidation
```

must be buffered. Release one ordered event batch and one subscriber notification after aggregate commit.

### 6. Aggregate result

```txt
AggregateCommandResult {
  commandId,
  transactionId,
  status,
  reason,
  beforeRevision,
  afterRevision,
  participantResults,
  emittedEvents,
  idempotencyStatus,
  canvasFrameId,
  htmlFrameId
}
```

### 7. Idempotency

A repeated accepted `commandId` must return the original result without repeating payment, collection, reward, score, route or entity creation.

A repeated rejected command may return the stable rejection while its expected revision still matches. A changed revision requires a new command ID.

### 8. Fixtures

```txt
shed-insufficient-resources
  -> aggregate rejected
  -> resources and built list unchanged
  -> one result and one publication

shed-success
  -> one debit and one built entity
  -> duplicate returns prior receipt

collect-participant-failure
  -> apple, rewards, pressure and score all unchanged

clear-participant-failure
  -> pest, score and scrap all unchanged

nested-command-result
  -> child rejection is visible to caller

publication-count
  -> no intermediate subscriber snapshot

stale-revision
  -> rejected before participant preparation

result-frame-correlation
  -> canvas and HTML frame cite committed transaction revision
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission Authority
+ Public Capability Gateway and Host Revocation
+ Composite Command Transaction Authority
+ Command Atomicity/Idempotency/Frame-Receipt Fixture Gate
```