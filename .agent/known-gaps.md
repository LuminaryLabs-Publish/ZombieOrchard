# Known gaps — ZombieOrchard

## Primary authority chain

```txt
runtime session identity
  -> lifecycle state
  -> fixed-step clock and single-writer lease
  -> committed interface route and simulation policy
  -> public capability gateway
  -> admitted composite command transaction
  -> committed simulation/state revision
  -> canvas and HTML frame receipt
  -> replay and persistence continuation
```

## Public capability and reachability gaps

1. `window.GameHost` exposes the complete mutable engine object.
2. Public callers can reach `engine.ctx`.
3. Public callers can mutate frame, elapsed, delta, events and the domain table.
4. Public callers can reach `engine.domains` and every domain object.
5. Public callers can call domain `api` methods directly.
6. Direct API calls bypass runtime command publication.
7. Public callers can call domain `command()` directly.
8. Direct domain commands bypass the runtime gateway and notify path.
9. Public callers can call one domain's `tick()` independently.
10. Public callers can call full `engine.tick()` beside the active RAF.
11. No single-writer lease coordinates production and fixture stepping.
12. Public callers can invoke `addKit()`.
13. Duplicate domain IDs overwrite the existing domain entry.
14. No capability manifest or capability revision exists.
15. No capability lease, expiry or owner exists.
16. No public command allowlist exists.
17. No payload schema validation exists.
18. Public commands carry no host generation, runtime, run, session, lifecycle or route identity.
19. No expected-state or expected-tick revision is required.
20. No public command journal exists.
21. `getState()` omits clock, session, route and render-frame provenance.
22. No committed frame-correlated public read model exists.
23. Public subscriptions have no lease ID or forced retirement.
24. The host has no revocation state.
25. A predecessor host cannot be distinguished from a successor session host.
26. The smoke test does not instantiate or inspect the browser global.

## Runtime-session and fresh-run gaps

- One mutable graph is constructed at module boot.
- Play, New Game and Start reuse the same graph.
- No runtime ID, run ID, session epoch, graph revision or lifecycle revision exists.
- New Game does not create fresh resources, pressure, apples, construction, roster, inventory or active-session state.
- Outcome -> Title -> Play reuses terminal state.
- RAF, listener, renderer and public host resources have no leases or ordered disposal.

## Fixed-step clock gaps

- RAF submits a hard-coded `1 / 60` step and ignores the RAF timestamp.
- Simulation speed follows callback cadence.
- Stalls have no catch-up budget or drop/defer policy.
- No monotonic simulation tick ID, render frame ID or clock revision exists.
- Automatic and manual steps have no exclusion lease.

## Route-scoped simulation admission gaps

- The graph begins ticking before Play or New Game.
- Every registered domain tick is invoked on each runtime step.
- No canonical simulation phase exists.
- Pause and management screens are routes, not simulation barriers.
- Pressure can grow on inactive and terminal routes.
- Active-session mutation checks only `ended`.
- No route-policy revision, step admission result or domain mutation receipt exists.

## Composite command transaction gaps

- Browser actions call raw `engine.command()` and discard most result detail.
- Commands carry no command or transaction ID.
- Nested composition commands can publish intermediate state.
- Child rejection can be concealed by parent success.
- Resource and gameplay mutations have no rollback boundary.
- No result-to-frame acknowledgement exists.

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

- Canvas and HTML render after the state snapshot but publish no typed render result.
- Public observation can advance ahead of visible pixels after a manual tick.
- No runtime/run/session/route/tick/state/frame correlation exists.
- No explicit first-frame, failed-frame or pending-frame state exists.
- Menus and Outcome can show predecessor-run pixels.

## Proof and deployment gaps

```txt
runtime-session fixture: absent
fixed-step cadence fixture: absent
route suspension fixture: absent
public-host reachability fixture: absent
capability admission fixture: absent
single-writer step fixture: absent
host revocation fixture: absent
subscriber lease fixture: absent
frame-receipt fixture: absent
command transaction fixture: absent
replay fixture: absent
save/load roundtrip fixture: absent
browser host smoke: absent
Pages gate for these contracts: absent
```

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> route-scoped simulation admission authority
  -> public capability gateway and reachability
  -> composite command transaction authority
  -> seeded random and replay authority
  -> versioned save/load authority
  -> deployment proof
```

## Do not claim

Do not claim the public host is read-only, immutable, session-scoped, revocable, clock-safe, command-safe or frame-coherent until the corresponding fixtures pass on `main`.
