# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

The newest documented gap is canvas/HTML frame coherence. Runtime publication, canvas projection, HTML projection, diagnostics, and RAF scheduling have no shared immutable frame envelope or terminal visible-frame result.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime event identity, causal provenance, retention, and consumer acknowledgement.
- [ ] Runtime observer publication order, immutability, and fault isolation.
- [ ] Canvas/HTML shared frame envelope, surface results, and visible acknowledgement.
- [ ] Kit graph identity, manifests, compatibility, and atomic installation.
- [ ] Runtime session identity, lifecycle, and callback generation fencing.
- [ ] Run reset identity, participant reset, and atomic generation commit.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Public capability gateway and owner quarantine.
- [ ] Interface action identity, availability, and nested-result authority.
- [ ] Economy command semantic admission and conservation.
- [ ] Composite multi-domain transaction authority.
- [ ] Terminal outcome seal and immutable result authority.
- [ ] Pest population lifecycle, capacity, damage, and render budgets.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Frame-coherence gaps

```txt
state revision in snapshot: absent
publication ID in snapshot: absent
frame envelope ID and fingerprint: absent
single capture shared by subscribers and renderers: absent
canvas surface identity and revision: absent
HTML surface identity and revision: absent
canvas projection terminal result: absent
HTML projection terminal result: absent
dual-surface complete/partial/failure classification: absent
route-to-world-canvas visibility policy: implicit
recovery and last-complete-frame policy: absent
GameHost visible-frame readback: absent
first dual-surface frame acknowledgement: absent
```

## Source consequences

- `notify()` publishes one snapshot, while `tick()` returns another snapshot captured afterward.
- Reentrant subscriber mutation can make observers and browser rendering see different state in one logical tick.
- The canvas mutates before the HTML, so a later HTML failure can leave a partial visible frame.
- Neither renderer returns a typed result.
- Canvas dimensions are rewritten each frame and the HTML subtree is replaced each frame without a shared projection revision.
- The canvas always renders the orchard and active session even when the interface route is a menu or outcome screen.
- `GameHost.getState()` returns a fresh snapshot and cannot prove what the user actually saw.
- Existing smoke proof cannot detect canvas/HTML divergence or partial-frame failure.

## Retained unresolved gaps

### Lifecycle and command authority

- Boot creates one ambient RAF with no stop authority.
- Display cadence controls real-time simulation speed.
- Menus do not suspend all gameplay domains.
- New Game and Start do not build a clean run.
- Raw GameHost access bypasses intended route boundaries.
- Terminal state does not revoke all mutation.

### Economy and transactions

- Negative payment values can mint resources.
- Unknown catalog or inventory references are not consistently rejected.
- Multi-domain operations lack prepare, commit, rollback, and idempotency.

### Rendering and persistence

- Canvas dimensions are rewritten every frame.
- HTML projection replaces the subtree every frame.
- Focus and selection continuity are not preserved.
- `Math.random()` prevents replay continuation.
- Save Select has no versioned storage or migration authority.

## Required fixtures

```txt
publication snapshot and renderer envelope identity
reentrant subscriber isolation
canvas/HTML complete commit
canvas-only partial failure
HTML-only policy under canvas failure
route-specific world visibility
last-complete-frame recovery
visible diagnostics readback
first visible dual-surface frame acknowledgement
source/dist/Pages parity
```

## Dependency order

```txt
runtime session and command identity
  -> immutable publication
  -> frame envelope identity
  -> canvas and HTML projection receipts
  -> dual-surface commit and recovery
  -> visible diagnostics
  -> deployment proof
```

## Do not claim

Do not claim atomic presentation, surface parity, route/world coherence, last-complete-frame recovery, or visible-frame proof until the required fixtures pass on `main`.
