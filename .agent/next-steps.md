# Next steps — ZombieOrchard

## Ordered implementation queue

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

## Goal

Make one runtime owner responsible for creating, admitting, identifying, pausing, resetting, stopping, and disposing an orchard run. Screen navigation must become a projection of lifecycle state rather than the only lifecycle mechanism.

## Gate 1 — session instance authority and reset fidelity

1. Add a JSON-safe session state machine: `idle`, `starting`, `running`, `paused`, `ended`, `stopping`, `stopped`, `disposed`, and `failed`.
2. Add a monotonic `sessionEpoch` that changes whenever a new run is committed.
3. Add a preset-backed session factory that creates fresh resource, pressure, world, construction, roster, inventory, and active-session state.
4. Treat Play as a start/admit transaction, not a screen transition.
5. Treat New Game as an atomic reset plus new-session commit.
6. Treat Pause and Resume as lifecycle transactions that control gameplay-domain eligibility.
7. Treat Title as a stop/retire transaction with an explicit preservation policy.
8. Treat Outcome as an ended-session projection, not a permanent composition redirect.
9. Ensure Outcome -> Title remains on Entry until a new session is explicitly started.
10. Return typed lifecycle results with `accepted`, `status`, `reason`, `previousState`, `nextState`, `previousEpoch`, and `nextEpoch`.
11. Add immutable before/after session fingerprints to reset and start results.
12. Retain and cancel the RAF request ID.
13. Return and invoke renderer/listener disposal handles.
14. Reject commands after disposal.
15. Add bounded lifecycle and session journals to `GameHost` readback.
16. Add DOM-free start, reset, title, outcome, repeated-new-game, stop, and dispose fixtures.

## Gate 2 — fixed-step clock authority

1. Replace one-fixed-step-per-RAF with a host-owned accumulator driven by measured elapsed time.
2. Define fixed step, maximum frame delta, maximum catch-up steps, and dropped-time policy.
3. Separate render frame IDs from committed simulation tick IDs.
4. Tick only domains admitted by session state.
5. Prevent unrestricted `GameHost.tick()` from racing with automatic mode.
6. Add 30/60/120 Hz wall-time parity fixtures.
7. Prove Pause freezes every gameplay-owned fingerprint.
8. Prove resumed sessions continue from the same committed tick and epoch.

## Gate 3 — capability reachability

1. Add a canonical capability registry for every domain command and public service.
2. Classify capabilities as `public-direct`, `public-indirect`, `internal`, `dormant`, or `unsupported`.
3. Add keyboard movement and an accessible on-screen fallback.
4. Gate movement by authoritative session state.
5. Return typed movement results and resulting coordinates.
6. Guarantee a recoverable route to a collectible apple.
7. Link or explicitly classify Session Select.
8. Wire or classify roster hiring and inventory equipment.
9. Preserve construction access while retaining nested command results.
10. Mark Market unsupported until a real transaction service exists.
11. Propagate disabled metadata to disabled controls.
12. Add a capability/result journal and reachability fixture.

## Domain-update-first map

```txt
src/start.js host
  -> session owner, RAF owner, wall clock, renderer lifetime, disposal

src/game.js factory
  -> fresh domain graph creation and preset-backed reset factory

kit-runtime
  -> session metadata, epoch, lifecycle command routing, committed tick IDs,
     lifecycle journal, disposal guard

interface-composition-kit
  -> project lifecycle state into screens and stop forcing Outcome after retirement

active-session-domain-kit
  -> start/reset snapshot factory, session-state admission, ended result

resource / pressure / world / construction / roster / inventory kits
  -> deterministic reset hooks or fresh-instance reconstruction

html-interface-render-kit
  -> lifecycle controls, disabled state, result projection, disposer

world-canvas-render-kit
  -> render source epoch/tick observation and disposer

game-host-diagnostics-kit
  -> session state, epoch, committed tick, lifecycle results, fingerprints

smoke-fixture-kit
  -> start/reset/title/outcome/dispose and clock parity gates
```

Only add new kits where existing owners cannot cleanly hold the responsibility:

```txt
runtime-session-authority-kit
session-instance-factory-kit
session-fingerprint-kit
fixed-step-clock-kit
runtime-lifecycle-fixture-adapter-kit
browser-input-adapter-kit
capability-registry-kit
capability-reachability-fixture-kit
```

## Acceptance checklist

```txt
[ ] No gameplay domain ticks before Play commits a running session.
[ ] Every started run has a stable nonzero session epoch.
[ ] New Game creates a clean preset-backed state graph.
[ ] Repeated New Game calls do not retain resources, pressure, apples, builds, roster, equipment, pests, score, damage, or ended state.
[ ] Pause freezes every gameplay-owned state fingerprint.
[ ] Title retires or stops the current run according to an explicit policy.
[ ] Outcome -> Title remains on Entry and does not bounce back to Outcome.
[ ] Stop cancels future automatic ticks.
[ ] Dispose removes RAF and DOM-listener ownership and rejects future mutation.
[ ] Equal wall time at 30/60/120 Hz yields equivalent committed gameplay fingerprints.
[ ] Every public capability has one owner, route, affordance, binding, result, and fixture row.
[ ] npm test gates deployment on session, clock, and capability proof.
```

## Avoid until proof exists

- Market catalog or transaction expansion
- economy balancing
- new orchard content or pest types
- renderer replacement
- visual polish
- save/resume claims
- broad runtime refactors without session-instance and reset fixtures