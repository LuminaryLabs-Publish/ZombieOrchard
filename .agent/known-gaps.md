# Known gaps — ZombieOrchard

## Primary authority chain

```txt
runtime session identity
  -> lifecycle state
  -> fixed-step clock
  -> committed interface route and revision
  -> route simulation policy
  -> admitted domain tick plan
  -> committed simulation tick receipt
  -> rendered canvas/HTML frame
  -> command, replay and persistence continuation
```

## Route-scoped simulation admission gaps

1. The graph begins ticking at module boot before Play or New Game.
2. `kit-runtime.tick()` invokes every domain tick on every admitted call.
3. No domain tick is classified as simulation, presentation or lifecycle work.
4. `interface-composition` owns only `active` and `previous` route fields.
5. No canonical `NO_RUN`, `RUNNING`, `PAUSED`, `TERMINAL`, `SUSPENDED` or `DISPOSED` phase exists.
6. No route revision or route-policy revision exists.
7. `pressure-field.tick()` advances on Entry, Run Setup, Save Select, Settings, Pause, management routes and Outcome.
8. `active-session.tick()` advances whenever `ended` is false, regardless visible route.
9. Pause is only a route to `interrupt`; it is not a simulation barrier.
10. Build, Market, Roster, Inventory and Codex have no explicit real-time or suspended-time policy.
11. Entry and Run Setup can age the retained graph before the player starts.
12. Title and Settings can hide a still-mutating run.
13. Outcome freezes active-session mutation through `ended`, but pressure continues.
14. `GameHost.tick(dt)` can bypass visible-route expectations.
15. No step admission result explains whether work ran, was suspended or was rejected.
16. No simulation receipt identifies which domains mutated.
17. No journal records route/phase decisions.
18. Canvas, HTML and GameHost frames carry no shared route, phase, tick or frame identity.
19. Resume has no wall-time baseline reset or catch-up policy.
20. No menu-idle, pause, management-route, terminal-freeze or manual-step fixture exists.

## Runtime-session and fresh-run gaps

- One mutable graph is constructed at module boot.
- Play, New Game and Start reuse the same graph.
- No runtime ID, run ID, session epoch, graph revision or lifecycle revision exists.
- New Game does not create fresh resources, pressure, apples, construction, roster, inventory or active-session state.
- Outcome -> Title -> Play reuses terminal state.
- RAF, listener, renderer and `GameHost` resources have no leases or ordered disposal.

## Fixed-step clock gaps

- RAF submits a hard-coded `1 / 60` step and ignores the RAF timestamp.
- Simulation speed follows callback cadence.
- Stalls have no catch-up budget or drop/defer policy.
- No monotonic simulation tick ID, render frame ID or clock revision exists.
- Automatic and manual steps have no exclusion lease.

## Capability and transaction gaps

- Browser actions call raw `engine.command()` and generally discard typed results.
- Commands carry no session, lifecycle, route or tick identity.
- Nested composition commands publish intermediate state.
- Child rejection can be concealed by parent success.
- Resource and gameplay mutations have no rollback boundary.
- No command ID, transaction ID, idempotency cache or result-to-frame acknowledgement exists.

## Randomness and replay gaps

- Apples and pests use process-global `Math.random()`.
- No run seed, policy version, named stream, cursor or draw receipt exists.
- Callback cadence changes pest trial count and random advancement.
- Random string entity IDs prevent stable replay identity.
- No deterministic replay verifier or first-divergence result exists.

## Persistence gaps

- Save Select is unreachable and has no authoritative slots or actions.
- No storage adapter, save/load commands, schema, migration, checksum or slot revision exists.
- `engine.snapshot()` has no restore inverse and omits clock/random continuation.
- No candidate graph, load epoch, rollback, corruption quarantine or first restored frame acknowledgement exists.

## Render and observation gaps

- The world canvas renders retained orchard/session state on every route.
- Menus and Outcome can show predecessor-run pixels.
- Renderers expose no route, phase, tick, run or frame provenance.
- `GameHost` exposes live mutable state rather than a committed read model.

## Proof and deployment gaps

```txt
runtime-session fixture: absent
fixed-step cadence fixture: absent
route suspension fixture: absent
management-route policy fixture: absent
manual-step admission fixture: absent
command transaction fixture: absent
replay fixture: absent
save/load roundtrip fixture: absent
browser frame-parity fixture: absent
Pages gate for these contracts: absent
```

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> route-scoped simulation admission authority
  -> public capability gateway
  -> composite command transaction authority
  -> seeded random and replay authority
  -> versioned save/load authority
  -> deployment proof
```

## Do not claim

Do not claim authoritative Pause, menu idleness, management-screen safety, cadence-independent simulation, deterministic replay, fresh New Game state, resumable persistence, frame coherence or lifecycle cleanup until the corresponding fixtures pass on `main`.
