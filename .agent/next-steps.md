# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, clocked, capability-declared, reachable, atomic, reproducible, persistable and disposable session.

- [ ] Establish runtime session instance authority.
- [ ] Establish fixed-step clock authority.
- [ ] Establish capability registry and reachability authority.
- [ ] Establish composite command transaction authority.
- [ ] Establish seeded random and replay authority.
- [ ] Establish versioned save/load authority.
- [ ] Gate deployment on DOM-free and browser fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / Reset / Title / Outcome Fidelity Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz Parity Fixture Gate

3. Interaction Capability Reachability
   + Registry / Movement / Service-Binding Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest Determinism Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

# Gate 1 — Runtime session instance authority

1. Add one runtime owner for lifecycle, current session, RAF, listener leases, renderers, GameHost and bounded journals.
2. Add runtime/session IDs, epochs, preset revision, lifecycle state and committed tick ID.
3. Convert Play, New Game, Start, Pause, Resume, Title and Outcome into admitted lifecycle commands.
4. Construct fresh graphs off-line and atomically transfer authority.
5. Gate ticks by lifecycle state.
6. Finalize Outcome once.
7. Retain/cancel RAF and dispose listeners/renderers/global host idempotently.
8. Add Node and browser lifecycle fixtures.

# Gate 2 — Fixed-step clock authority

1. Replace one fixed step per RAF with a wall-time accumulator.
2. Define fixed step, frame clamp, catch-up limit and dropped-time policy.
3. Separate render frame ID from committed simulation tick ID.
4. Tick only lifecycle-admitted domains.
5. Prevent manual and automatic tick races.
6. Add cadence-parity and pause-freeze fixtures.

# Gate 3 — Capability registry and reachability authority

## 3.1 Add canonical descriptors

Each capability must declare:

```txt
capabilityId
ownerDomainId
commandType
supportState
publicSurface
allowedLifecycleStates[]
allowedRoutes[]
inputBindings[]
targetType or null
requires[]
provides[]
resultSchemaId
revision
```

## 3.2 Validate owner bindings

At startup, reject or classify descriptors when:

```txt
owner domain is missing
owner command is missing
duplicate capability ID exists
required service is missing
binding targets an unknown capability
public capability has no shipped binding
```

## 3.3 Classify the current product truthfully

```txt
supported:
  route navigation
  collect, clear, next-phase
  Storage Shed action

unreachable:
  move
  hire
  equip

unsupported:
  Market transaction

dormant:
  Session Select

internal:
  resource/pressure APIs
  raw engine and manual tick
```

## 3.4 Bind movement

1. Add keyboard movement.
2. Add an accessible button or equivalent fallback.
3. Convert input into admitted movement intent.
4. Gate movement by session, lifecycle and active route.
5. Prove deterministic position change under fixed ticks.

## 3.5 Prove collectible reachability

1. Guarantee or select a reachable apple for a fresh run.
2. Expose current target/reachability state.
3. Enable Collect only under declared policy or return a visible out-of-range reason.
4. Return target ID and resource/score effects.

## 3.6 Bind roster and inventory

1. Add typed roster candidate selection.
2. Bind Hire through the capability registry.
3. Add typed inventory item selection.
4. Bind Equip and reject unknown item IDs.
5. Project accepted/rejected results and updated state.

## 3.7 Handle unsupported and dormant surfaces

1. Mark Market unsupported until an exchange service exists.
2. Disable or remove its route action with a reason.
3. Keep Session Select dormant until it has a route, slot index and persistence owner.
4. Do not represent read-only cards as operational capability proof.

## 3.8 Derive affordances from registry state

```txt
enabled
supportState
disabledReason
bindingType
targetSummary
registryRevision
```

The renderer must emit actual disabled markup and a user-visible reason where appropriate.

## 3.9 Retain typed results

```txt
capabilityId
bindingId
commandId
sessionId
sessionEpoch
accepted
reason
targetId
effects[]
committedTickId
stateFingerprint
firstRenderedFrameId
```

DOM callers must not discard these results.

## 3.10 Restrict diagnostics bypass

Replace public raw engine exposure with detached observations and explicitly internal debug controls.

## 3.11 Add capability fixture gate

Required DOM-free cases:

```txt
registry validates all descriptors and owner commands
supported public capability has a binding
move changes position under admitted session state
collect succeeds after deliberate movement to a known apple
out-of-range collect returns a typed visible rejection
hire succeeds and insufficient funds rejects without mutation
equip known item succeeds and unknown item rejects
Market is unsupported/disabled
Session Select is dormant
static and rendered disabled state match registry state
```

Required browser case:

```txt
fresh run
  -> move deliberately
  -> collect a known apple
  -> observe accepted result and resource change
  -> inspect truthful Roster, Inventory, Market and Session Select affordances
  -> verify first frame acknowledges registry revision and command result
```

# Gate 4 — Composite command transaction authority

1. Add command/transaction/session/tick identity.
2. Separate public publishing dispatch from internal non-publishing dispatch.
3. Preflight complete parent/child/route plans against the capability registry.
4. Validate targets and resource affordability.
5. Stage mutations.
6. Preserve child results.
7. Commit or roll back atomically.
8. Publish once.
9. Correlate the first rendered frame.
10. Add transaction fixtures.

# Gate 5 — Seeded random and replay authority

1. Inject session-owned random sources.
2. Partition world and encounter streams.
3. Replace random string IDs.
4. Record draw cursors and decisions.
5. Persist/replay command, tick and random evidence.
6. Add equality and divergence fixtures.

# Gate 6 — Versioned save/load authority

1. Define a versioned save envelope.
2. Separate durable and transient state.
3. Add export, validation, staged restore, commit and rollback.
4. Add slot index, migration and checked admission.
5. Load into a candidate graph and atomically transfer authority.
6. Advance load epoch and reject stale work.
7. Add roundtrip, corruption, rollback and first-frame fixtures.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

Do not implement capability binding ahead of session identity and committed-tick authority. The Gate 3 contract is ready to consume those identifiers.