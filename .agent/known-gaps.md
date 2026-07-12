# Known gaps — ZombieOrchard

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

The newest gap is canvas render-surface authority. The renderer resets the drawing buffer from CSS dimensions every frame, ignores DPR and pixel budgets, and applies no fit or camera policy to the fixed orchard world. Rendering can therefore be blurry, needlessly reset, or visually exclude valid gameplay positions without a typed mismatch result.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and fixture bounded.

- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Player-control reachability and input retirement.
- [ ] Public capability gateway and owner quarantine.
- [ ] Composite command transaction authority.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas render-surface and world-projection authority.
- [ ] Seeded random/replay continuation.
- [ ] Versioned save/load authority.

## Canvas render-surface gaps

```txt
canvas.width and canvas.height are assigned every rendered frame
unchanged dimensions do not short-circuit allocation/reset
CSS dimensions are treated as physical drawing-buffer dimensions
window.devicePixelRatio is ignored
no product maximum DPR exists
no physical-pixel budget exists
no canvas capability admission exists
no resize command, generation or coalescing exists
no actual drawing-buffer readback exists
no surface ID or revision exists
no fallback tier or rollback result exists
world coordinates are centered without fit or camera policy
small viewports can hide valid player, pest and collectable positions
zero-size canvas fallback can disagree with the CSS rectangle
GameHost exposes no surface state
no visible frame cites a surface revision
no canvas/DPR/resize/browser fixture exists
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
- Display cadence changes pressure, pest movement, damage and spawn-trial count.
- Automatic and manual writers have no exclusive lease.
- No accumulator, catch-up budget, visibility suspension, lag result, step range or frame receipt exists.

## Route-admission gaps

- The graph begins ticking before Play.
- Every domain ticks on every route.
- Pause and management screens are not simulation barriers.
- Pressure can grow outside active gameplay.
- No route policy revision or step-admission result exists.

## Player-control reachability gaps

- `active-session.command("move")` is implemented but not bound to the shipped browser UI.
- No keyboard, directional pointer or touch movement adapter exists.
- No held-key state, route/focus lease, input sequence or retirement path exists.
- Random apple placement does not guarantee a collectible within the initial radius.
- Even after input is bound, small viewports can hide valid controlled positions without projection authority.

## Composite command transaction gaps

- Browser actions discard returned results.
- Interface activation can invoke nested child commands and ignore its result.
- Child rejection can be concealed by parent success.
- Nested dispatch can publish intermediate state and publish again.
- No prepare/commit/rollback boundary, command ID, idempotency receipt or transaction/frame acknowledgement exists.

## Frame-publication fault gaps

- Commands and ticks mutate before synchronous subscriber publication.
- One subscriber exception can hide a committed result and skip later observers.
- World and HTML renderers return no typed stage results.
- Successor RAF scheduling occurs after tick and both renderers.
- Any subscriber or renderer exception can silently stop the loop.
- No observer leases, stage results, recovery generation or visible-frame receipt exists.

## Public capability gaps

- `window.GameHost` exposes the complete mutable engine.
- Public callers can reach context, domains, commands, ticks, subscriptions and kit registration.
- No capability manifest, lease, allowlist, schema or revocation state exists.
- Public snapshots omit runtime, route, tick, state, publication, surface and frame provenance.

## Randomness and replay gaps

- Apples and pests use process-global `Math.random()`.
- No run seed, named stream, cursor, draw receipt or checkpoint exists.
- Callback cadence changes pest trials and random advancement.
- Random string entity IDs prevent stable replay identity.

## Persistence gaps

- Save Select is unreachable and has no slot authority.
- No storage adapter, schema, migration, checksum or slot revision exists.
- Snapshot has no restore inverse and omits clock/random continuation.
- No load epoch, rollback or first-restored-frame acknowledgement exists.

## Render and observation gaps

- Canvas and HTML publish no typed render result.
- Public observation can advance ahead of visible pixels.
- Menus and Outcome can show predecessor-run pixels.
- Canvas pixels have no CSS/DPR/surface provenance.
- No runtime/session/route/step/state/transaction/publication/surface/frame correlation exists.

## Proof and deployment gaps

```txt
runtime-session fixture: absent
fixed-step cadence fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
command-transaction fixture: absent
subscriber/renderer fault fixtures: absent
canvas viewport/DPR fixture: absent
pixel-budget fallback fixture: absent
unchanged-frame no-resize fixture: absent
world-fit membership fixture: absent
browser/Pages resize matrix: absent
replay fixture: absent
save/load fixture: absent
built-artifact browser proof: absent
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
  -> canvas render-surface authority
  -> seeded replay authority
  -> versioned persistence authority
  -> deployment proof
```

## Do not claim

Do not claim timing parity, command atomicity, observer isolation, frame-loop liveness, high-DPI clarity, viewport-safe gameplay, render-surface correctness, replay fidelity, save continuity or visible-frame correlation until the corresponding fixtures pass on `main`.
