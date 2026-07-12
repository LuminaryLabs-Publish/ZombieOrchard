# Known gaps — ZombieOrchard

**Timestamp:** `2026-07-12T07-51-04-04-00`

## Summary

The newest documented gap is HTML interface projection and focus authority. The renderer replaces `#ui-root` on every frame, including unchanged menus and HUDs. This creates continuous DOM churn, can replace the currently focused control, has no safe encoding contract and emits no typed projection or visible-interface result.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable fixtures.

- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Player-control reachability and input retirement.
- [ ] Public capability gateway and owner quarantine.
- [ ] Composite command transaction authority.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas render-surface and world-projection authority.
- [ ] HTML interface projection, focus and encoding authority.
- [ ] Seeded random/replay continuation.
- [ ] Versioned save/load authority.

## HTML interface projection gaps

```txt
ui.render runs every RAF callback
root.innerHTML is assigned in every route/HUD render
unchanged state has no no-op result
all descendant nodes are replaced
focused buttons have no stable node identity
no focusedActionId capture or restoration exists
no selection/caret continuity exists
no route-transition focus policy exists
no DOM mutation budget exists
no semantic-change fingerprint exists
no accessibility announcement deduplication exists
text conversion does not escape HTML
data-action interpolation has no attribute encoding
no projection ID or revision exists
no stale projection rejection exists
no projection/frame correlation exists
no DOM, focus, escaping or accessibility fixture exists
```

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

### Frame and canvas

- Subscriber or renderer exceptions can terminate the frame loop.
- Canvas dimensions are rewritten from CSS dimensions every frame.
- DPR, pixel budgets, world fit, surface revisions and canvas-frame proof are absent.
- Canvas and HTML consumers have no shared committed frame receipt.

### Replay and persistence

- Apples and pests use process-global `Math.random()`.
- No run seed, stream cursor, replay journal or deterministic IDs exist.
- Save Select has no storage, schema, migration, checksum or restore authority.

## Proof gaps

```txt
runtime-session fixture: absent
fixed-step cadence fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
command-transaction fixture: absent
subscriber/renderer fault fixture: absent
canvas viewport/DPR fixture: absent
unchanged-DOM no-mutation fixture: absent
keyboard-focus retention fixture: absent
HTML text/attribute escaping fixture: absent
route-transition focus fixture: absent
screen-reader announcement fixture: absent
canvas/HTML frame parity fixture: absent
replay fixture: absent
save/load fixture: absent
built-artifact and Pages interface smoke: absent
```

## Dependency order

```txt
runtime session
  -> fixed-step clock
  -> route and input admission
  -> public capability gateway
  -> composite command transaction
  -> frame fault containment
  -> canvas surface authority
  -> HTML interface projection authority
  -> replay authority
  -> persistence authority
  -> deployment proof
```

## Do not claim

Do not claim stable keyboard operation, assistive-technology continuity, minimal DOM mutation, safe external-content rendering or visible canvas/HTML parity until the relevant fixtures pass on `main`.
