# Known gaps — ZombieOrchard

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

The newest gap is frame-publication fault containment. Commands and ticks mutate state before synchronous subscriber delivery, and the browser schedules the next RAF only after publication and both renderers finish. One throwing listener or renderer can therefore conceal a committed command result, skip later observers, leave visible surfaces stale, and permanently stop the loop.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and fixture bounded.

- [ ] Runtime session identity, lifecycle, and callback generation fencing.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Player-control reachability and input retirement.
- [ ] Public capability gateway and owner quarantine.
- [ ] Composite command transaction authority.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Seeded random/replay continuation.
- [ ] Versioned save/load authority.

## Frame-publication fault gaps

```txt
engine.command mutates before notify()
engine.tick mutates clock/domains before notify()
notify invokes listeners synchronously without isolation
one listener exception skips later listeners
one listener exception prevents command result return
one listener exception prevents tick snapshot return
GameHost exposes raw engine.subscribe
world and HTML render stages have no typed results
draw schedules next RAF only after tick and both renderers complete
any stage exception can terminate the recursive loop
no guaranteed finalization scheduler
no observer identity, lease, delivery result, quarantine, or revocation result
no frame-cycle ID, generation, stage result, recovery policy, or bounded fault journal
no distinction between committed state, published state, and visibly rendered state
no subscriber/renderer fault fixture
```

## Runtime-session gaps

- One mutable graph is constructed at module boot.
- RAF ownership is ambient and has no retained request ID.
- Renderer and HTML listener ownership have no ordered stop/dispose result.
- Stale callbacks have no session/generation fence.
- Outcome -> Title -> Play can reuse predecessor runtime state.

## Fixed-step clock gaps

- One literal `1 / 60` step is executed per display callback.
- RAF timestamps are ignored.
- Display cadence changes pressure, pest movement, damage, and spawn-trial count.
- Automatic and manual writers have no exclusive lease.
- No accumulator, catch-up budget, visibility suspension, lag result, step range, or frame receipt exists.

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
- Random apple placement does not guarantee a collectible within the initial radius.

## Composite command transaction gaps

- Browser actions discard returned results.
- Interface activation can invoke nested child commands and ignore its result.
- Child rejection can be concealed by parent success.
- Nested dispatch can publish intermediate state and publish again.
- No prepare/commit/rollback boundary, command ID, idempotency receipt, or transaction/frame acknowledgement exists.

## Public capability gaps

- `window.GameHost` exposes the complete mutable engine.
- Public callers can reach context, domains, commands, ticks, subscriptions, and kit registration.
- No capability manifest, lease, allowlist, schema, or revocation state exists.
- Public snapshots omit runtime, route, tick, state, publication, and frame provenance.

## Randomness and replay gaps

- Apples and pests use process-global `Math.random()`.
- No run seed, named stream, cursor, draw receipt, or checkpoint exists.
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
- Menus and Outcome can show predecessor-run pixels.
- No runtime/session/route/step/state/transaction/publication/frame correlation exists.

## Proof and deployment gaps

```txt
runtime-session fixture: absent
fixed-step cadence fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
command-transaction fixture: absent
subscriber-fault fixture: absent
renderer-fault fixture: absent
frame-recovery fixture: absent
replay fixture: absent
save/load fixture: absent
built-artifact browser proof: absent
Pages fault-recovery proof: absent
```

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> route-scoped simulation admission authority
  -> player-control reachability authority
  -> public capability gateway
  -> composite command transaction authority
  -> frame-publication fault containment authority
  -> seeded replay authority
  -> versioned persistence authority
  -> deployment proof
```

## Do not claim

Do not claim timing parity, command atomicity, observer isolation, frame-loop liveness, render recovery, replay fidelity, save continuity, or visible-frame correlation until the corresponding fixtures pass on `main`.
