# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, isolated, clocked, reachable, atomic, reproducible, persistable and disposable session.

- [ ] Establish runtime session instance authority.
- [ ] Establish fixed-step clock authority.
- [ ] Make public capabilities reachable and classified.
- [ ] Establish composite command transaction authority.
- [ ] Establish seeded random and replay authority.
- [ ] Establish versioned save/load authority.
- [ ] Gate deployment on corresponding DOM-free and browser fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / Reset / Title / Outcome Fidelity Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz Parity Fixture Gate

3. Interaction Capability Reachability
   + Movement / Service-Binding Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest Determinism Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

# Gate 1 — Runtime session instance authority

1. Introduce `createZombieOrchardRuntime()` as the owner of lifecycle, current session, RAF generation, listener leases, renderers, GameHost and bounded journals.
2. Add `runtimeId`, `runtimeGeneration`, `sessionId`, `sessionEpoch`, `presetId`, `presetRevision`, `lifecycleState` and `committedTickId`.
3. Use explicit lifecycle states: `idle`, `starting`, `running`, `paused`, `ending`, `ended`, `returning_to_title`, `resetting`, `disposing`, `disposed`, `failed`.
4. Convert Play, New Game, Start, Pause, Resume, Title and Outcome from route-only actions into admitted lifecycle commands.
5. Construct fresh graphs off-line and atomically transfer authority instead of resetting process-lifetime closures in place.
6. Gate gameplay ticks by lifecycle state.
7. Finalize Outcome once into an immutable terminal result.
8. Retain and cancel one RAF owner.
9. Lease and release DOM listeners, renderers and the global host.
10. Expose detached JSON-safe lifecycle observations.
11. Add Node and browser lifecycle fixtures.

# Gate 2 — Fixed-step clock authority

1. Replace one fixed step per RAF with a wall-time accumulator.
2. Define fixed step, max frame delta, catch-up limit and dropped-time policy.
3. Separate render frame IDs from committed simulation tick IDs.
4. Tick only lifecycle-admitted domains.
5. Prevent manual ticking from racing automatic mode.
6. Add cadence-parity and pause-freeze fixtures.

# Gate 3 — Capability reachability

1. Add a canonical capability registry.
2. Classify each service as public-direct, public-indirect, internal, dormant or unsupported.
3. Bind movement through keyboard plus an accessible fallback.
4. Gate movement and gameplay commands by lifecycle.
5. Guarantee a recoverable route to a collectible apple.
6. Link or classify Session Select, hiring, equipment, selection and field mutation.
7. Mark Market unsupported until a service exists.
8. Project disabled actions truthfully.
9. Add reachability fixtures.

# Gate 4 — Composite command transaction authority

## 4.1 Add command and transaction identity

Every public command must carry:

```txt
commandId
transactionId
parentCommandId or null
runtimeId
sessionId
sessionEpoch
source
expectedCommittedTickId
issuedAt
```

Reject duplicate, stale-session and stale-tick commands before mutation.

## 4.2 Split public dispatch from internal dispatch

```txt
public dispatch
  -> admission
  -> transaction creation
  -> one final publication

internal dispatch
  -> executes within existing transaction
  -> never independently publishes
```

`interface-composition` must not call the public `engine.command()` path for child work.

## 4.3 Preflight the complete action plan

Before mutation, validate:

```txt
active screen and action
parent command capability
child domain and child command capability
child target identity
resource affordability
route target
session and phase admission
rollback support
```

An unknown construction ID must reject rather than fall back to the first catalog item.

## 4.4 Stage resource and gameplay mutations

The Storage Shed transaction should stage:

```txt
resource debit candidate
built-object candidate
construction message candidate
optional route candidate
```

No live domain mutates until the complete plan is valid.

## 4.5 Preserve child results

Each child result must include:

```txt
childCommandId
domain
type
accepted
reason
effects
beforeFingerprint
afterFingerprint
```

Required-child rejection rejects the parent transaction.

## 4.6 Add typed resource receipts

Replace Boolean payment with a debit result:

```txt
debitId
accepted
reason
requested
before
after
shortfall
```

The construction result must reference the debit receipt.

## 4.7 Commit or roll back atomically

```txt
all preflight succeeds
  -> commit staged child mutations
  -> commit route mutation
  -> append one journal row
  -> publish once

any required step fails
  -> restore all before states
  -> retain route
  -> append one rejection/rollback row
  -> publish once
```

## 4.8 Add one command result envelope

```txt
commandId
transactionId
accepted
reason
parentResult
childResults[]
routeResult
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
firstRenderedFrameId
```

The caller must receive the child build rejection instead of a parent-only success.

## 4.9 Correlate render consumption

Attach the last committed command/transaction identity to aggregate snapshots. Canvas and HTML renderers should publish a detached acknowledgement for the first frame that consumed the committed fingerprint.

## 4.10 Add bounded journals

Record admitted, rejected, committed and rolled-back transactions. Do not retain live domain references in the journal.

## 4.11 Add fixture gate

Required DOM-free cases:

```txt
valid shed build
  -> one debit
  -> one built object
  -> one parent result with accepted child
  -> one publication

insufficient resources
  -> no debit
  -> no built object
  -> parent rejected with child reason
  -> one publication

unknown build id
  -> rejected target
  -> no fallback build

missing child domain
  -> parent rejected
  -> route unchanged

child throws after staged debit
  -> rollback restores resources and construction state

command plus route succeeds
  -> child and route commit together

command plus route child rejects
  -> route unchanged

duplicate commandId
  -> exactly-once result
  -> no repeated effects

stale session/epoch
  -> typed rejection
  -> no mutation
```

Required publication cases:

```txt
accepted composite command -> subscriber called once
rejected composite command -> subscriber called once
rolled-back composite command -> subscriber called once
no intermediate partial snapshot is observable
```

Required browser case:

```txt
click Storage Shed
  -> one visible resource/build transition
  -> one correlated command result
  -> first rendered frame acknowledges committed fingerprint
```

# Gate 5 — Seeded random and replay authority

1. Inject a random-source contract owned by the session.
2. Partition world and encounter streams.
3. Replace random string IDs with stable IDs.
4. Record draw indexes and decisions.
5. Persist generator cursors.
6. Correlate decisions with commands, ticks and fingerprints.
7. Add replay receipts and equality/divergence fixtures.

# Gate 6 — Versioned save/load authority

1. Define a JSON-safe save envelope with schema, product/content identity, session epoch, seed, committed tick, command range, random cursors and fingerprint.
2. Separate durable state from transient UI, listeners, messages and renderer resources.
3. Give restorable domains export, validation, staged restore, commit and rollback services.
4. Add a stable slot-index owner.
5. Add migration and checked admission.
6. Load into a candidate graph and atomically transfer authority.
7. Advance load epoch and reject stale work.
8. Add roundtrip, corruption, rollback and first-frame fixtures.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

Do not implement the transaction gate ahead of session identity, committed ticks and capability classification. The transaction contract is ready to consume those identifiers once Gates 1–3 exist.
