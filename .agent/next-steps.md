# Next steps — ZombieOrchard

## Ordered implementation queue

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

## Goal

Make every orchard run an identified, clocked, reachable, and reproducible transaction. Screen navigation must project lifecycle state, simulation time must be independent of render cadence, public capabilities must be reachable, and all random outcomes must be derived from session-scoped seeded streams.

## Gate 1 — session instance authority and reset fidelity

1. Add JSON-safe session states: `idle`, `starting`, `running`, `paused`, `ended`, `stopping`, `stopped`, `disposed`, and `failed`.
2. Add a monotonic `sessionEpoch`.
3. Add a preset-backed session factory that creates fresh resource, pressure, world, construction, roster, inventory, and active-session state.
4. Treat Play as start/admit, New Game as atomic reset/start, Pause/Resume as lifecycle commands, and Title as stop/retire.
5. Project Outcome from one ended-session result instead of a permanent composition redirect.
6. Return typed lifecycle results and before/after fingerprints.
7. Retain and cancel RAF ownership.
8. Return and invoke renderer/listener disposal handles.
9. Reject commands after disposal.
10. Add bounded lifecycle/session journals to `GameHost`.
11. Add DOM-free start, reset, title, outcome, stop, and disposal fixtures.

## Gate 2 — fixed-step clock authority

1. Replace one-fixed-step-per-RAF with a host-owned wall-time accumulator.
2. Define fixed step, maximum frame delta, maximum catch-up steps, and dropped-time policy.
3. Separate render frame IDs from committed simulation tick IDs.
4. Tick only domains admitted by session state.
5. Prevent unrestricted manual ticks from racing automatic mode.
6. Add 30/60/120 Hz parity fixtures.
7. Prove Pause freezes every gameplay-owned fingerprint.

## Gate 3 — capability reachability

1. Add a canonical capability registry for every command and public service.
2. Classify capabilities as `public-direct`, `public-indirect`, `internal`, `dormant`, or `unsupported`.
3. Add keyboard movement and an accessible on-screen fallback.
4. Gate movement by authoritative session state.
5. Return typed movement results with resulting coordinates.
6. Guarantee a recoverable route to a collectible apple.
7. Link or classify Session Select.
8. Wire or classify roster hiring and inventory equipment.
9. Preserve construction access while retaining child command results.
10. Mark Market unsupported until a real transaction service exists.
11. Add a capability/result journal and reachability fixture.

## Gate 4 — seeded random and replay authority

1. Inject one random-source contract through `createOrchardGame()` and the kit context.
2. Put the run seed and random policy under the session owner.
3. Partition streams at minimum into `world` and `encounter` so a world-generation change does not perturb pest timing.
4. Replace random string IDs with monotonic or stream-derived stable IDs.
5. Record each random decision with `sessionEpoch`, `simulationTick`, `streamId`, `drawIndex`, `purpose`, normalized sample, and resolved outcome.
6. Persist the generator state or a sufficient replay cursor in detached snapshots.
7. Define New Game seed policy: explicit seed, generated seed retained in the start result, or deterministic derivation from an admitted configuration.
8. Ensure apple replenishment uses the world stream and pest admission/spawn uses the encounter stream.
9. Correlate command rows and committed state fingerprints with the random decision range they consumed.
10. Publish seed, stream cursors, recent decisions, and state fingerprint through JSON-safe `GameHost` readback.
11. Add exact-seed replay fixtures and different-seed divergence fixtures.
12. Gate deployment on deterministic initial orchard, collection/replenishment, night pest spawning, damage, score, and outcome proof.

## Domain-update-first map

```txt
src/start.js host
  -> session owner, RAF owner, wall clock, renderer lifetime, disposal

src/game.js factory
  -> fresh graph creation, preset reset factory, injected random provider

kit-runtime
  -> session metadata, epoch, committed ticks, command sequence,
     random provider in context, result journal, disposal guard

orchard-world-kit
  -> world-stream apple generation, stable IDs, seed/cursor readback

active-session-domain-kit
  -> encounter-stream spawn admission and placement, stable pest IDs

interface-composition-kit
  -> lifecycle projection and complete child results

render kits
  -> source session/tick/fingerprint/random-decision range observation

GameHost
  -> detached session, clock, capability, seed, cursor, decision and replay readback

tests/smoke.mjs
  -> session/reset, clock, reachability and seed/replay fixture gates
```

Prefer updating existing owners. Add only the missing cross-domain contracts:

```txt
runtime-session-authority-kit
session-instance-factory-kit
fixed-step-clock-kit
browser-input-adapter-kit
capability-registry-kit
seeded-random-source-kit
random-stream-partition-kit
random-decision-ledger-kit
command-replay-ledger-kit
state-fingerprint-kit
seed-replay-fixture-kit
```

## Acceptance checklist

```txt
[ ] No gameplay tick occurs before a running session is committed.
[ ] Every run has a stable session epoch and declared seed.
[ ] New Game resets every owned domain under an explicit seed policy.
[ ] Pause freezes gameplay state and random-stream cursors.
[ ] Equal wall time at 30/60/120 Hz yields equivalent committed state.
[ ] Every public capability has an owner, route, affordance, result, and fixture.
[ ] Same seed plus same committed command/tick schedule yields identical apples.
[ ] Same seed plus same schedule yields identical pest decisions and IDs.
[ ] Random draw order is independent between world and encounter streams.
[ ] Every committed state fingerprint names the random decision range consumed.
[ ] Different seeds produce declared divergence without invalid state.
[ ] npm test gates deployment on session, clock, capability, and deterministic replay proof.
```

## Avoid until proof exists

- Market catalog or transaction expansion
- economy balancing
- new orchard content or pest types
- renderer replacement
- visual polish
- save/resume claims
- broad runtime refactors that bypass existing kit owners
