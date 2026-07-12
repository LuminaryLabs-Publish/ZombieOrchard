# Known gaps — ZombieOrchard

## Primary authority chain

```txt
runtime session identity
  -> lifecycle state
  -> fixed-step clock and single-writer lease
  -> committed route and simulation policy
  -> player-control reachability and input retirement
  -> public capability gateway
  -> composite command transaction
  -> committed state revision
  -> canvas and HTML frame receipt
  -> replay and persistence continuation
```

## Fixed-step clock gaps

1. `src/start.js` calls `engine.tick(1 / 60)` once per `requestAnimationFrame`.
2. The RAF timestamp is ignored.
3. Display callback count is simulation time.
4. At 30/60/120 Hz, simulation advances at approximately 0.5x/1x/2x wall time.
5. Pressure gain, pest movement, contact damage, and random spawn-trial count vary by display cadence.
6. `window.GameHost.tick(dt)` can advance the same graph independently of RAF.
7. Automatic and manual step writers have no exclusive lease.
8. No monotonic wall-time source or injectable test clock exists.
9. No simulation epoch or step ID exists.
10. No accumulator or exact fixed-step batch exists.
11. No catch-up-step budget exists.
12. No retained-lag or dropped-lag result exists.
13. No hidden-tab suspension or bounded resume policy exists.
14. Runtime publishes after every tick call, so repeated catch-up calls would multiply public snapshots.
15. No committed simulation batch can be correlated to the first visible canvas/HTML frame.
16. Existing smoke proof does not execute browser timing or cadence fixtures.

## Runtime-session gaps

- One mutable graph is constructed at module boot.
- RAF ownership is ambient and has no retained request ID.
- Renderer and HTML listener ownership have no ordered stop/dispose result.
- Stale callbacks have no session/generation fence.
- Outcome -> Title -> Play can reuse predecessor runtime state.

## Route-admission gaps

- The graph begins ticking before Play.
- Every domain ticks on every route.
- Pause and management screens are not simulation barriers.
- Pressure can grow outside active gameplay.
- No route policy revision or step-admission result exists.

## Player-control reachability gaps

- `active-session.command("move")` is implemented but not bound to the shipped browser UI.
- No keyboard, directional pointer, or touch movement adapter exists.
- No held-key state, route/focus lease, input sequence, or retirement path exists.
- No typed movement result or movement-to-frame receipt exists.
- Random apple placement does not guarantee a collectible within the initial 42-unit radius.

## Composite command transaction gaps

- Browser actions discard returned results.
- Interface activation can invoke a nested child command and ignore its result.
- Child rejection can be concealed by parent success.
- Nested dispatch can publish intermediate state and publish again.
- No prepare/commit/rollback boundary, command ID, idempotency receipt, or transaction/frame acknowledgement exists.

## Public capability gaps

- `window.GameHost` exposes the complete mutable engine.
- Public callers can reach context, domains, commands, ticks, and kit registration.
- No capability manifest, lease, allowlist, schema, or revocation state exists.
- Public snapshots omit runtime, route, tick, state, and frame provenance.

## Randomness and replay gaps

- Apples and pests use process-global `Math.random()`.
- No run seed, named stream, cursor, or draw receipt exists.
- Callback cadence changes pest trials and random advancement.
- Random string entity IDs prevent stable replay identity.

## Persistence gaps

- Save Select is unreachable and has no slot authority.
- No storage adapter, schema, migration, checksum, or slot revision exists.
- Snapshot has no restore inverse and omits clock/random continuation.
- No load epoch, rollback, or first-restored-frame acknowledgement exists.

## Render and observation gaps

- Canvas and HTML publish no typed render result.
- Public observation can advance ahead of visible pixels.
- No runtime/session/route/epoch/step/state/transaction/input/frame correlation exists.
- Menus and Outcome can show predecessor-run pixels.

## Proof and deployment gaps

```txt
runtime-session fixture: absent
fixed-step cadence fixture: absent
automatic/manual writer fixture: absent
hidden-tab resume fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
command-transaction fixture: absent
replay fixture: absent
save/load fixture: absent
built-artifact browser proof: absent
Pages cadence proof: absent
```

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> route-scoped simulation admission authority
  -> player-control reachability authority
  -> public capability gateway
  -> composite command transaction authority
  -> seeded replay authority
  -> versioned persistence authority
  -> deployment proof
```

## Do not claim

Do not claim timing parity, fixed-step determinism, display-independent difficulty, manual-step safety, hidden-tab safety, movement reachability, replay fidelity, save continuity, or frame correlation until the corresponding fixtures pass on `main`.