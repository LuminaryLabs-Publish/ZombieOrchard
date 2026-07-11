# Next steps — ZombieOrchard

## Plan ledger

**Goal:** Turn every orchard run into an identified, clocked, reachable, atomic, and reproducible transaction with truthful command results and proof-grade readback.

- [ ] Establish runtime session instance authority.
- [ ] Establish fixed-step clock authority.
- [ ] Make public capabilities reachable and classified.
- [ ] Establish composite command transaction authority.
- [ ] Establish seeded random and replay authority.
- [ ] Gate deployment on the corresponding DOM-free fixtures.

## Ordered implementation queue

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Composite Command Transaction Authority
   + Parent/Child Result and Single-Publication Fixture Gate

5. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

## Gate 1 — Session instance authority

1. Add JSON-safe lifecycle states and a monotonic `sessionEpoch`.
2. Create a preset-backed factory for fresh resource, pressure, world, construction, roster, inventory, and active-session state.
3. Treat Play as start/admit, New Game as reset/start, Pause/Resume as lifecycle commands, and Title as stop/retire.
4. Project Outcome from one ended-session result.
5. Retain and cancel RAF ownership.
6. Return and invoke renderer/listener disposal handles.
7. Reject commands after disposal.
8. Add bounded lifecycle journals and DOM-free lifecycle fixtures.

## Gate 2 — Fixed-step clock authority

1. Replace one-fixed-step-per-RAF with a host-owned wall-time accumulator.
2. Define fixed step, maximum frame delta, catch-up limit, and dropped-time policy.
3. Separate render frame IDs from committed simulation tick IDs.
4. Tick only domains admitted by session state.
5. Prevent manual ticking from racing automatic mode.
6. Add 30/60/120 Hz parity and pause-freeze fixtures.

## Gate 3 — Capability reachability

1. Add a canonical capability registry.
2. Classify each command/service as public-direct, public-indirect, internal, dormant, or unsupported.
3. Add keyboard movement and an accessible on-screen fallback.
4. Gate movement by session state and return typed results.
5. Guarantee a recoverable route to a collectible apple.
6. Link or classify Session Select, hiring, equipment, select, and set-field.
7. Mark Market unsupported until a real service exists.
8. Render disabled actions as disabled.
9. Add reachability fixtures.

## Gate 4 — Composite command transaction authority

1. Add a monotonic `commandId` and `transactionId` in `kit-runtime`.
2. Add a transaction context for parent and nested child commands.
3. Prevent nested dispatch from using the public notify-on-return path.
4. Preflight action, child domain, child command, route target, resource effects, and target IDs before mutation.
5. Preserve every child result inside one parent result.
6. Reject the composite transaction when a required child rejects.
7. Publish subscribers once after successful commit.
8. Preserve the before fingerprint on rejection.
9. Replace boolean resource payment with typed debit/add results carrying attribution and before/after values.
10. Reject unknown construction targets instead of falling back to the first catalog item.
11. Reject unknown equipment IDs.
12. Record bounded detached command journal rows.
13. Correlate the next rendered snapshot with the committed command ID.
14. Add accepted, rejected, nested, route, rollback and publication-count fixtures.

## Gate 5 — Seeded random and replay authority

1. Inject a random-source contract through the game factory and kit context.
2. Put the run seed and random policy under the session owner.
3. Partition world and encounter streams.
4. Replace random string IDs with stable IDs.
5. Record random decisions with epoch, tick, stream, draw index, purpose, sample, and outcome.
6. Persist sufficient generator cursor state for replay.
7. Correlate random decision ranges with committed command IDs and state fingerprints.
8. Publish seed, cursors, decisions, command journal, and replay receipt through detached `GameHost` readback.
9. Add same-seed equality and different-seed divergence fixtures.

## Domain-update-first map

```txt
src/start.js
  -> session owner, wall clock, RAF owner, renderer lifetime, disposal

src/game.js
  -> fresh graph creation, reset factory, injected random provider

kit-runtime
  -> session metadata, committed ticks, command sequence,
     transaction context, publication barrier, journals, disposal guard

interface-composition-kit
  -> parent/child/route composite result and required-child failure handling

resource-ledger-kit
  -> typed attributed debit and addition results

construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
  -> strict target validation and typed mutation results

orchard-world-kit
active-session-domain-kit
  -> seeded streams, stable IDs and replay facts

render kits
  -> source session, tick, command, state fingerprint and random range

GameHost
  -> detached lifecycle, clock, capability, command, random and render readback

tests/smoke.mjs
  -> lifecycle, clock, reachability, command transaction and replay fixture gates
```

## Candidate missing kits

```txt
runtime-session-authority-kit
session-instance-factory-kit
fixed-step-clock-kit
browser-input-adapter-kit
capability-registry-kit
command-envelope-kit
command-sequence-kit
composite-command-transaction-kit
command-result-envelope-kit
command-publication-barrier-kit
resource-transaction-result-kit
command-journal-kit
render-command-correlation-kit
seeded-random-source-kit
random-stream-partition-kit
random-decision-ledger-kit
command-replay-ledger-kit
state-fingerprint-kit
command-transaction-fixture-kit
seed-replay-fixture-kit
```

## Acceptance checklist

```txt
[ ] No gameplay tick occurs before a running session is committed.
[ ] Every run has a stable session epoch and declared seed.
[ ] New Game resets every owned domain.
[ ] Equal wall time at 30/60/120 Hz yields equivalent committed state.
[ ] Every public capability has an owner, route, affordance, result, and fixture.
[ ] Every browser intent has one commandId and one terminal composite result.
[ ] Required child rejection prevents dependent route mutation.
[ ] Rejected transactions preserve the before fingerprint.
[ ] Committed transactions publish subscribers exactly once.
[ ] Build, hire and equip reject invalid target IDs without mutation.
[ ] Render observations name the committed command ID.
[ ] Same seed and same committed schedule yield identical apples and pests.
[ ] npm test gates deployment on all five authority fixtures.
```

## Avoid until proof exists

```txt
Market expansion
economy balancing
new orchard content
new pest types
renderer replacement
visual polish
save/resume claims
broad runtime rewrites that bypass current kit owners
```
