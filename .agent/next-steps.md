# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, clocked, capability-declared, reachable, atomic, reproducible, persistable and disposable session.

- [ ] Establish runtime session instance authority.
- [ ] Establish fixed-step clock authority.
- [ ] Establish a public capability gateway and reachability authority.
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

3. Public Capability Gateway and Reachability
   + Registry / Binding / Diagnostics-Quarantine Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest Determinism Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

# Gate 1 — Runtime session instance authority

1. Add one runtime owner for lifecycle, current session, RAF, listeners, renderers, `GameHost` and bounded journals.
2. Add runtime/session IDs, epochs, preset revision, lifecycle state and committed tick ID.
3. Convert Play, New Game, Start, Pause, Resume, Title and Outcome into admitted lifecycle commands.
4. Construct fresh graphs off-line and atomically transfer authority.
5. Gate ticks by lifecycle state and finalize Outcome exactly once.
6. Retain/cancel RAF and dispose listeners, renderers and global exposure idempotently.
7. Add Node and browser lifecycle fixtures.

# Gate 2 — Fixed-step clock authority

1. Replace one fixed step per RAF with a wall-time accumulator.
2. Define fixed step, frame clamp, catch-up limit and dropped-time policy.
3. Separate render frame ID from committed simulation tick ID.
4. Tick only lifecycle-admitted domains.
5. Prevent manual and automatic tick races.
6. Add cadence-parity and pause-freeze fixtures.

# Gate 3 — Public capability gateway and reachability

## 3.1 Define canonical descriptors

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

## 3.2 Create one public gateway

1. Route every browser action through `capabilityGateway.execute()` rather than direct `engine.command()`.
2. Attach session, epoch, committed tick, binding and target identity.
3. Validate lifecycle, route, owner command, target and required services.
4. Return one typed accepted/rejected result.
5. Retain the result until a rendered frame acknowledges it.
6. Publish detached gateway observations through `GameHost`.

## 3.3 Quarantine internal and debug control

1. Remove the raw engine handle from the default product host.
2. Keep manual ticking disabled in production builds.
3. Require an explicit debug lease for internal commands.
4. Mark internal/debug capability IDs separately from public capability IDs.
5. Journal debug use with session and epoch identity.
6. Reject stale debug leases after reset or disposal.

## 3.4 Validate current capability truth

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

internal/debug:
  resource and pressure APIs
  raw command routing
  manual tick
```

## 3.5 Bind and prove reachability

1. Add keyboard movement plus an accessible fallback.
2. Guarantee or select a reachable apple for a fresh run.
3. Enable Collect only under declared target policy.
4. Add typed Hire and Equip bindings.
5. Reject unknown item and construction IDs.
6. Disable or remove Market until an exchange service exists.
7. Keep Session Select dormant until route, slot and persistence ownership exist.

## 3.6 Derive truthful affordances

```txt
enabled
supportState
disabledReason
bindingType
targetSummary
registryRevision
lastResultId
```

The HTML renderer must emit actual disabled markup, visible reasons and the most recent accepted/rejected result.

## 3.7 Required result envelope

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

## 3.8 Fixture gate

DOM-free cases:

```txt
registry resolves every public capability to one owner command
public commands cannot bypass the gateway
internal/debug commands require a valid lease
stale debug lease rejects after reset
move changes position under admitted ticks
known apple can be deliberately reached and collected
out-of-range collect returns a typed visible rejection
hire/equip succeed or reject without partial mutation
Market is unsupported/disabled
Session Select is dormant
disabled projection matches gateway admission
result remains pending until one frame acknowledges it
```

Browser case:

```txt
fresh run
  -> move deliberately
  -> collect a known apple
  -> observe typed result and resource change
  -> inspect truthful Roster, Inventory, Market and Session Select states
  -> confirm GameHost exposes observations, not raw mutation authority
  -> verify first frame acknowledges registry revision and result
```

# Gate 4 — Composite command transaction authority

1. Add command/transaction/session/tick identity.
2. Use the capability gateway for public dispatch and a non-publishing internal executor for child work.
3. Preflight complete parent/child/route plans.
4. Validate targets and affordability.
5. Stage mutations, preserve child results, commit or roll back, then publish once.
6. Correlate the first rendered frame and add transaction fixtures.

# Gates 5 and 6

1. Inject session-owned random streams and record decisions for replay.
2. Define a versioned save envelope with staged restore, migration, commit and rollback.
3. Load into a candidate graph, advance the load epoch and reject stale work.
4. Add deterministic replay, roundtrip, corruption and first-frame fixtures.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

Do not implement the capability gateway ahead of session identity and committed-tick authority. Its contract is ready to consume those identifiers.