# Next steps — ZombieOrchard

## Plan ledger

**Goal:** Turn each orchard run into one identified, isolated, clocked, reachable, atomic, reproducible, persistable, and disposable session.

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

## 1. Introduce a runtime host owner

Move process-lifetime ownership out of loose module scope.

```txt
createZombieOrchardRuntime()
  -> owns lifecycle state
  -> owns current session or null
  -> owns RAF generation
  -> owns input listener leases
  -> owns renderers
  -> owns GameHost exposure
  -> owns bounded journals
```

The host should expose `startNewSession`, `pause`, `resume`, `returnToTitle`, `reset`, `stop`, and `dispose` through typed results.

## 2. Add session identity

Every live run must have:

```txt
runtimeId
runtimeGeneration
sessionId
sessionEpoch
presetId
presetRevision
lifecycleState
committedTickId
```

Increase `sessionEpoch` only when a fresh graph becomes authoritative.

## 3. Add explicit lifecycle states

```txt
idle
starting
running
paused
ending
ended
returning_to_title
resetting
disposing
disposed
failed
```

UI routes project these states. They do not replace them.

## 4. Replace route-only lifecycle actions

```txt
Entry.Play         -> START_NEW_SESSION or explicit resume policy
Entry.NewGame      -> OPEN_RUN_SETUP
RunSetup.Start     -> START_NEW_SESSION
Active.Pause       -> PAUSE_SESSION
Interrupt.Resume   -> RESUME_SESSION
Interrupt.Title    -> RETURN_TO_TITLE
Outcome.Title      -> RETURN_TO_TITLE
future Reset       -> RESET_SESSION
```

Every command must include `commandId`, source, expected session identity, and expected epoch.

## 5. Create a fresh graph factory

`createOrchardGame()` should be used by a session factory, not called once as the process-lifetime game.

Required services:

```txt
validate preset
inject seed/clock/adapters
construct candidate graph
capture initial fingerprint
return typed construction result
```

Do not reset every closure in place. Build a fresh graph and transfer authority atomically.

## 6. Gate ticks by lifecycle

```txt
running: gameplay tick admitted
paused: gameplay tick skipped
idle: gameplay tick skipped
starting/resetting: old and candidate live mutation skipped until commit
ended: gameplay tick skipped
returning_to_title: gameplay tick skipped
disposed: all commands and ticks rejected
```

UI/render projection may continue while gameplay ticks are skipped.

## 7. Finalize Outcome once

Replace mutable `active-session.ended` route inference with a typed terminal result.

```txt
terminal condition
  -> END_SESSION
  -> freeze gameplay
  -> capture immutable score/day/result
  -> lifecycle = ended
  -> project Outcome
```

Title must clear automatic Outcome admission for the retired epoch.

## 8. Retain and cancel RAF ownership

Track one RAF ID and one runtime generation. `start()` must not create a second loop. `stop()` and `dispose()` must cancel pending callbacks and reject stale generations.

## 9. Lease and release inputs, globals, and renderers

- HTML renderer returns a delegated-listener removal handle.
- World renderer returns a disposal handle even if currently lightweight.
- GameHost is leased and restored/deleted only by its owner.
- Every resource is recorded in a cleanup stack.
- Disposal is idempotent and returns active-owner counts.

## 10. Add detached lifecycle observations

GameHost should expose JSON-safe observations rather than the raw mutable engine as the primary authority surface.

```txt
current lifecycle
current session identity
last lifecycle result
bounded lifecycle journal
active RAF count
active listener lease count
last committed tick/frame/fingerprint
```

## 11. Add fixture gate

Required Node cases:

```txt
boot idle without gameplay mutation
Play creates initial session
mutate -> Title -> New Game -> fresh initial state
Pause freezes gameplay
Resume continues same epoch
Outcome finalizes once
Outcome -> Title remains Entry
Outcome -> Title -> Play creates non-ended session
reset increments epoch once
duplicate Start creates one graph
stale command/tick/callback rejects
stop/start maintains one RAF owner
dispose twice is idempotent
construction failure preserves previous valid state
```

Required browser cases:

```txt
first-frame session identity
pause freeze
stable title after outcome
fresh HUD/world after New Game
rapid double-click Start creates one session
no duplicate listener or RAF after remount harness
```

# Gate 2 — Fixed-step clock authority

1. Replace one-fixed-step-per-RAF with a wall-time accumulator.
2. Define fixed step, max frame delta, catch-up limit, and dropped-time policy.
3. Separate render frame IDs from committed simulation tick IDs.
4. Tick only lifecycle-admitted domains.
5. Prevent manual ticking from racing automatic mode.
6. Add cadence-parity and pause-freeze fixtures.

# Gate 3 — Capability reachability

1. Add a canonical capability registry.
2. Classify each service as public-direct, public-indirect, internal, dormant, or unsupported.
3. Bind movement through keyboard plus an accessible fallback.
4. Gate movement by lifecycle and return typed results.
5. Guarantee a recoverable route to a collectible apple.
6. Link or classify Session Select, hiring, equipment, selection, and field mutation.
7. Mark Market unsupported until a service exists.
8. Project disabled actions truthfully.
9. Add reachability fixtures.

# Gate 4 — Composite command transaction authority

1. Add monotonic `commandId` and `transactionId`.
2. Add parent/child transaction context.
3. Prevent nested dispatch from publishing through the public path.
4. Preflight actions, child domains, routes, resource effects, and targets.
5. Preserve child results.
6. Reject parent transactions when required children reject.
7. Publish once after commit.
8. Preserve before fingerprints on rejection.
9. Add typed resource and target results.
10. Add bounded journals and render correlation.
11. Add accepted, rejected, rollback, route, and publication-count fixtures.

# Gate 5 — Seeded random and replay authority

1. Inject a random-source contract.
2. Put seed and random policy under session ownership.
3. Partition world and encounter streams.
4. Replace random string IDs with stable IDs.
5. Record draw indexes and decisions.
6. Persist generator cursors.
7. Correlate decisions with commands, ticks, and fingerprints.
8. Add replay receipts and equality/divergence fixtures.

# Gate 6 — Versioned save/load authority

1. Define a JSON-safe envelope with schema, product/content identity, session epoch, seed, committed tick, command range, random cursors, and fingerprint.
2. Separate durable domain state from transient UI, listeners, messages, and renderer state.
3. Give restorable domains export, validation, staged restore, commit, and rollback services.
4. Add a stable slot-index owner.
5. Add injected in-memory and browser adapters.
6. Validate and migrate before live mutation.
7. Load through one atomic transaction that creates a new epoch.
8. Reject stale work from retired epochs.
9. Publish one terminal save/load result and one committed state publication.
10. Route to Session Select only after the slot service is operational.
11. Add roundtrip, corruption, version, migration, rollback, and browser reload fixtures.

## Domain-update-first map

```txt
src/start.js
  -> runtime host, lifecycle, RAF, listener, renderer, global ownership

src/game.js
  -> fresh graph factory and dependency injection

kit-runtime
  -> lifecycle/tick/command metadata and stale-epoch rejection

interface-composition-kit
  -> route projection from typed lifecycle results

active-session-domain-kit
  -> terminal result production and gameplay freeze

render kits
  -> session provenance, first-frame acknowledgement, disposal handles

GameHost
  -> detached lifecycle observations and fixture commands

tests/smoke.mjs
  -> all six authority fixture gates
```

## Avoid until proof exists

```txt
direct localStorage of engine.snapshot()
save/resume claims
cloud save
new economy/content systems
renderer replacement
more UI routes that imitate unsupported lifecycle behavior
```
