# Next steps — ZombieOrchard

## Plan ledger

**Goal:** Turn every orchard run into an identified, clocked, reachable, atomic, reproducible, and safely persistable session.

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
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. Composite Command Transaction Authority
   + Parent/Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate

6. Versioned Save/Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

## Gate 1 — Session instance authority

1. Add lifecycle states and a monotonic `sessionEpoch`.
2. Create a preset-backed fresh graph factory.
3. Treat Play/New Game/Pause/Resume/Title/Outcome as lifecycle transactions.
4. Retain and cancel RAF ownership.
5. Return and invoke renderer/listener disposal handles.
6. Reject stale commands after stop or dispose.
7. Add bounded lifecycle journals and fixtures.

## Gate 2 — Fixed-step clock authority

1. Replace one-fixed-step-per-RAF with a wall-time accumulator.
2. Define fixed step, maximum frame delta, catch-up limit, and dropped-time policy.
3. Separate render frame IDs from committed simulation tick IDs.
4. Tick only domains admitted by lifecycle state.
5. Prevent manual ticking from racing automatic mode.
6. Add cadence-parity and pause-freeze fixtures.

## Gate 3 — Capability reachability

1. Add a canonical capability registry.
2. Classify each service as public-direct, public-indirect, internal, dormant, or unsupported.
3. Add keyboard movement and an accessible fallback.
4. Gate movement by session state and return typed results.
5. Guarantee a recoverable route to a collectible apple.
6. Link or classify Session Select, hiring, equipment, selection, and field mutation.
7. Mark Market unsupported until a real service exists.
8. Render disabled actions as disabled.
9. Add reachability fixtures.

## Gate 4 — Composite command transaction authority

1. Add monotonic `commandId` and `transactionId`.
2. Add parent/child transaction context.
3. Prevent nested dispatch from notifying through the public path.
4. Preflight action, child domain, route target, resource effects, and target IDs.
5. Preserve every child result.
6. Reject the composite when a required child rejects.
7. Publish once after commit.
8. Preserve before fingerprints on rejection.
9. Return typed resource and target-validation results.
10. Add bounded command journals and render correlation.
11. Add accepted, rejected, rollback, route, and publication-count fixtures.

## Gate 5 — Seeded random and replay authority

1. Inject a random-source contract.
2. Put seed and random policy under the session owner.
3. Partition world and encounter streams.
4. Replace random string IDs with stable IDs.
5. Record draw indexes and random decisions.
6. Persist generator cursor state.
7. Correlate decisions with commands, ticks, and state fingerprints.
8. Add replay receipts and equality/divergence fixtures.

## Gate 6 — Versioned save/load authority

1. Define a JSON-safe save envelope with schema version, product ID, content revision, session epoch, seed, committed tick, command range, random cursors, and state fingerprint.
2. Separate durable domain state from transient UI messages, action catalogs, listeners, and renderer state.
3. Give every restorable domain explicit `exportState`, `validateState`, `stageRestore`, `commitRestore`, and `rollbackRestore` services.
4. Add a slot-index owner with stable slot IDs, labels, timestamps, progress summaries, schema versions, fingerprints, and status.
5. Add an injected persistence adapter. Use an in-memory adapter in Node and a browser adapter behind one contract.
6. Validate and migrate before mutating the live session.
7. Load through one atomic transaction that creates a new `loadEpoch`.
8. Reject stale commands, ticks, random deliveries, and render observations from the retired epoch.
9. Publish one terminal save/load result and one committed state publication.
10. Route Entry or Run Setup to Session Select only after the slot service is operational.
11. Add save, load, overwrite, delete, corrupted-slot, incompatible-version, migration, rollback, and same-state roundtrip fixtures.
12. Gate Pages on the Node fixture and a browser persistence smoke.

## Domain-update-first map

```txt
src/start.js
  -> lifecycle, clock, RAF, input, renderer lifetime, load epoch admission

src/game.js
  -> fresh graph factory, injected random source, persistence adapter

kit-runtime
  -> session/tick/command metadata, transaction barrier, export and staged restore orchestration

interface-composition-kit
  -> typed save-select transitions and load result routing

resource-ledger, pressure-field, orchard-world,
construction, roster, inventory, active-session
  -> durable export, validation, staged restore, commit, rollback

scoped interface domains
  -> classify durable fields versus transient selected index, messages, and action catalogs

render kits
  -> slot status projection and committed session/load provenance

GameHost
  -> detached lifecycle, clock, command, random, save/load, and render journals

tests/smoke.mjs
  -> all six authority fixture gates
```

## Candidate persistence kits

```txt
save-envelope-kit
save-schema-version-kit
content-identity-kit
save-slot-index-kit
committed-snapshot-export-kit
state-restore-kit
save-admission-validation-kit
save-migration-registry-kit
atomic-load-transaction-kit
browser-persistence-adapter-kit
load-epoch-authority-kit
save-load-result-journal-kit
save-roundtrip-fixture-kit
```

## Acceptance checklist

```txt
[ ] Session Select is either clearly unsupported or backed by a real slot owner.
[ ] A save envelope names schema, product/content identity, epoch, tick, seed, and fingerprint.
[ ] Export captures one committed state only.
[ ] Transient UI/render state is excluded or explicitly classified.
[ ] Corrupt or incompatible saves reject before live mutation.
[ ] Migration is explicit and deterministic.
[ ] Load mutates every required domain or none.
[ ] Successful load creates a new load epoch.
[ ] Same save loaded twice yields the same committed durable state.
[ ] Save/load results are bounded, detached, and visible through GameHost.
[ ] npm test and Pages gate the persistence fixtures.
```

## Avoid until proof exists

```txt
direct localStorage of engine.snapshot()
save/resume marketing claims
multiple user-facing slots without a slot owner
cloud save
cross-device sync
economy/content expansion
renderer replacement
```
