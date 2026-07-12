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

## Composite command transaction gaps

1. Browser actions call `engine.command()` and discard the returned result.
2. Interface activation can invoke a nested child `engine.command()`.
3. The composition domain ignores the child result.
4. A rejected child can be concealed by a successful parent activation result.
5. Nested dispatch can notify subscribers before the parent finishes.
6. The outer command notifies again, so one intent can publish more than once.
7. No command ID or transaction ID exists.
8. No expected state revision is required.
9. No participant registry exists.
10. No prepare phase proves every participant can commit.
11. No event or publication buffer exists.
12. No aggregate commit boundary exists.
13. No rollback service exists.
14. No idempotency receipt exists.
15. No stable aggregate result includes every participant outcome.
16. No result identifies the first canvas and HTML frame that presents it.
17. The Storage Shed parent can report success when the child rejects for insufficient resources.
18. Apple collection removes and reseeds the apple before reward and pressure settlement completes.
19. Missing reward or pressure participants do not reject collection because optional chaining is used.
20. Pest clearing can retire a pest and add score before optional scrap credit.
21. Construction and hiring debit resources before appending the resulting entity.
22. Equipment accepts an arbitrary item ID without inventory admission.
23. Tests do not inject participant failure or verify rollback.
24. Tests do not verify duplicate-submission behavior.
25. Tests do not verify one-publication or result-to-frame correlation.

## Public capability and reachability gaps

- `window.GameHost` still exposes the complete mutable engine object.
- Public callers can reach and mutate `ctx`, `domains`, registration, APIs, commands and ticks.
- Duplicate domain IDs overwrite the existing domain entry.
- No capability manifest, lease, allowlist, payload schema or revocation state exists.
- Public full-graph ticks can run beside the production RAF.
- Public snapshots omit runtime, session, route, tick and frame provenance.
- Public subscriptions have no lease identity or forced retirement.

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

- Canvas and HTML render after the RAF snapshot but publish no typed render result.
- Command callers receive no frame acknowledgement.
- Nested command notifications can expose an intermediate state to subscribers.
- Public observation can advance ahead of visible pixels after a manual tick.
- No runtime/run/session/route/tick/state/transaction/frame correlation exists.
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
command transaction fixture: absent
participant failure/rollback fixture: absent
idempotency fixture: absent
single-publication fixture: absent
result-frame correlation fixture: absent
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

Do not claim browser commands are atomic, child-result truthful, rollback-safe, idempotent, single-publication or frame-correlated until the corresponding fixtures pass on `main`.