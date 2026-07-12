# Known gaps — ZombieOrchard

## Primary authority chain

```txt
runtime session identity
  -> lifecycle state
  -> fixed-step clock and single-writer lease
  -> committed interface route and simulation policy
  -> player-control reachability and input retirement
  -> public capability gateway
  -> admitted composite command transaction
  -> committed simulation/state revision
  -> canvas and HTML frame receipt
  -> replay and persistence continuation
```

## Player-control reachability gaps

1. `active-session.command("move")` is implemented but not bound to the shipped browser UI.
2. `src/start.js` installs no keyboard, pointer-direction or touch movement adapter.
3. The HTML renderer binds clicks only.
4. Active-session controls expose Collect, Clear and Next Phase but no movement controls.
5. The world canvas is render-only.
6. No control-binding manifest exists.
7. No held-key state or input sequence exists.
8. No route/focus control lease exists.
9. No diagonal normalization or opposed-direction policy exists.
10. No blur, visibility, pause, route-exit, outcome, reset or disposal retirement path exists.
11. No typed movement result or rejection reason exists.
12. No movement result identifies the first canvas/HTML frame that presents it.
13. Player starts at `{ x: 0, y: 180 }` and remains there in normal product use.
14. Apple collection requires a target within 42 units, while random seeding does not guarantee one at the start position.
15. Existing smoke proof does not exercise movement or browser input.

## Composite command transaction gaps

- Browser actions discard returned results.
- Interface activation can invoke a nested child command and ignore its result.
- Child rejection can be concealed by parent success.
- Nested dispatch can publish intermediate state and then publish again.
- Multi-domain gameplay effects have no prepare/commit/rollback boundary.
- No command ID, expected revision, idempotency receipt or first-visible-frame acknowledgement exists.

## Public capability gaps

- `window.GameHost` exposes the complete mutable engine.
- Public callers can reach context, domains, commands, ticks and registration.
- No capability manifest, lease, allowlist, schema or revocation state exists.
- Public snapshots omit runtime, run, route, tick and committed-frame provenance.

## Runtime-session and clock gaps

- One mutable graph is constructed at module boot and reused by Play/New Game/Start.
- Outcome -> Title -> Play reuses terminal state.
- RAF, listeners, renderers and host resources have no ordered disposal.
- RAF submits hard-coded `1 / 60` and ignores elapsed browser time.
- Automatic and manual steps have no single-writer exclusion.

## Route admission gaps

- The graph begins ticking before Play.
- Every domain ticks on every route.
- Pause and management screens are not simulation barriers.
- Pressure can grow outside active gameplay.
- No route policy revision or step-admission result exists.

## Randomness and replay gaps

- Apples and pests use process-global `Math.random()`.
- No run seed, named stream, cursor or draw receipt exists.
- Callback cadence changes pest trials and random advancement.
- Random string entity IDs prevent stable replay identity.

## Persistence gaps

- Save Select is unreachable and has no slot authority.
- No storage adapter, schema, migration, checksum or slot revision exists.
- Snapshot has no restore inverse and omits clock/random continuation.
- No load epoch, rollback or first-restored-frame acknowledgement exists.

## Render and observation gaps

- Canvas and HTML publish no typed render result.
- Commands and movement have no frame acknowledgement.
- Public observation can advance ahead of visible pixels.
- No runtime/run/route/tick/state/transaction/input/frame correlation exists.
- Menus and Outcome can show predecessor-run pixels.

## Proof and deployment gaps

```txt
player-control fixtures: absent
browser movement smoke: absent
Pages movement smoke: absent
runtime-session fixture: absent
fixed-step fixture: absent
route-suspension fixture: absent
public-host fixture: absent
command-transaction fixture: absent
replay fixture: absent
save/load fixture: absent
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

Do not claim the orchard is explorable, movement is lifecycle-safe, browser controls are frame-correlated or held input is retired until the corresponding fixtures pass on `main`.
