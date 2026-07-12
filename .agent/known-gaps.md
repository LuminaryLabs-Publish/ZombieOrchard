# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

The newest documented gap is kit-graph installation authority. The shipped runtime builds and mutates one live domain map without manifests, dependency checks, service compatibility, duplicate-owner protection, atomic commit, rollback, disposal or graph-to-frame provenance.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Kit graph identity, manifests, compatibility and atomic installation.
- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Player-control reachability and input retirement.
- [ ] Public capability gateway and owner quarantine.
- [ ] Composite command transaction authority.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas render-surface and world-projection authority.
- [ ] HTML interface projection, focus and encoding authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Kit-graph installation gaps

```txt
kit manifest: absent
kit ID uniqueness: absent
kit version and compatibility range: absent
domain ownership declaration: absent
provided-service declaration: absent
required-service declaration: absent
service version validation: absent
dependency graph: absent
cycle detection: absent
named create/tick/dispose phases: absent
deterministic topological order: absent
duplicate domain rejection: absent
candidate graph isolation: absent
atomic commit: absent
rollback and reverse cleanup: absent
predecessor migration or disposal: absent
graph ID, revision and fingerprint: absent
installation receipt: absent
stale replacement rejection: absent
first visible graph-frame receipt: absent
```

## Source consequences

- `engine.addKit()` writes directly into the live `domains` object.
- A matching domain ID silently replaces the predecessor.
- `tick()` inherits execution order from object insertion history.
- `createOrchardGame()` manually orders kits without a machine-checked phase contract.
- Gameplay domains discover collaborators through optional `ctx.domains[id]?.api` lookups.
- Missing providers can appear as ordinary gameplay rejection rather than graph failure.
- Failed candidate creation has no reverse cleanup ledger.
- `window.GameHost.engine.addKit()` permits post-start graph mutation.
- Snapshots contain no graph provenance.

## Retained unresolved gaps

### Runtime and clock

- Module boot creates one graph and starts one ambient RAF loop.
- RAF ownership has no retained ID or callback generation.
- One literal `1 / 60` tick runs per display callback.
- Visibility and display cadence alter simulation progress and random trials.

### Route and control

- Domains tick before Play and while menus are active.
- `active-session.command("move")` has no shipped browser binding.
- No keyboard/touch movement lease or retirement path exists.

### Public capability and transaction

- `window.GameHost` exposes the mutable engine, domains, ticks and kit registration.
- Nested interface commands can conceal child failure.
- Multi-domain operations lack prepare/commit/rollback and idempotency.

### Frame and render surfaces

- Subscriber or renderer exceptions can terminate the frame loop.
- Canvas dimensions are rewritten from CSS dimensions every frame.
- DPR, pixel budgets, world fit, surface revisions and canvas-frame proof are absent.
- HTML projection replaces the complete subtree every frame.
- Canvas and HTML consumers have no shared committed frame receipt.

### Replay and persistence

- Apples and pests use process-global `Math.random()`.
- No run seed, stream cursor, replay journal or deterministic IDs exist.
- Save Select has no storage, schema, migration, checksum or restore authority.

## Proof gaps

```txt
kit manifest fixture: absent
kit order fixture: absent
duplicate domain fixture: absent
missing/incompatible service fixture: absent
candidate rollback fixture: absent
runtime replacement fixture: absent
graph-to-frame fixture: absent
runtime-session fixture: absent
fixed-step cadence fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
command-transaction fixture: absent
subscriber/renderer fault fixture: absent
canvas viewport/DPR fixture: absent
DOM/focus/encoding fixtures: absent
canvas/HTML frame parity fixture: absent
replay fixture: absent
save/load fixture: absent
built-artifact and Pages graph smoke: absent
```

## Dependency order

```txt
kit graph installation
  -> runtime session
  -> fixed-step clock
  -> route and input admission
  -> public capability gateway
  -> composite command transaction
  -> frame fault containment
  -> canvas and HTML projection
  -> replay authority
  -> persistence authority
  -> deployment proof
```

## Do not claim

Do not claim compatible kit composition, stable tick order, duplicate-owner protection, atomic installation, safe replacement or graph-to-frame parity until the relevant fixtures pass on `main`.