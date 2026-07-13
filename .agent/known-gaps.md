# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

The current documented boundary is browser startup readiness and failure containment. Module evaluation owns engine installation, DOM/context acquisition, listener installation, public-host exposure, first tick, rendering, and RAF start without one startup generation, aggregate result, cleanup, fallback, retry, or first-visible-frame proof.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Browser startup identity, phases, dependency admission, and participant receipts.
- [ ] Detached startup candidates, probe, atomic adoption, and complete disposal.
- [ ] DOM-only failure projection and bounded retry.
- [ ] Public-host readiness gating and first startup-frame acknowledgement.
- [ ] Runtime event identity, provenance, retention, and consumer acknowledgement.
- [ ] Observer publication order, immutability, and fault isolation.
- [ ] Canvas/HTML shared frame envelope, surface results, recovery, and visible acknowledgement.
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

## Startup gaps

```txt
StartupAttemptId: absent
StartupGeneration: absent
startup phase/state machine: absent
required DOM manifest: absent
Canvas2D capability result: absent
kit-graph preparation receipt: absent
engine candidate: absent
canvas/HTML candidate receipts: absent
startup probe: absent
atomic participant adoption: absent
candidate disposal result: absent
GameHost readiness gate: absent
DOM-only failure projector: unused error panel
retry policy and stale-generation rejection: absent
first startup-frame acknowledgement: absent
browser startup fixture matrix: absent
```

## Source consequences

- `boot.js` cannot classify or recover from module/start failures.
- Missing DOM nodes fail through incidental property access rather than typed admission.
- A null Canvas2D context survives construction and fails during first render.
- Kit installation can fail after earlier domains were created, with no aggregate rollback receipt.
- `GameHost` becomes public before a successful visible frame.
- The first tick mutates gameplay before presentation readiness.
- Canvas failure prevents HTML projection and successor RAF scheduling.
- The hidden error panel remains unused.
- The Node smoke does not execute the browser startup path.

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

- Runtime subscribers and browser renderers can receive different snapshots.
- Canvas and HTML have no atomic frame result or partial-frame recovery.
- Canvas dimensions are rewritten every frame.
- HTML projection replaces the subtree every frame.
- Focus and selection continuity are not preserved.
- `Math.random()` prevents replay continuation.
- Save Select has no versioned storage or migration authority.

## Required proof order

```txt
startup generation and dependency admission
  -> detached participant preparation
  -> startup and projection probe
  -> atomic adoption or disposal
  -> public-host and scheduler readiness
  -> first startup-frame acknowledgement
  -> immutable runtime publication
  -> dual-surface frame coherence
  -> source/dist/Pages parity
```

## Do not claim

Do not claim reliable startup, cleanup, fallback, retry safety, presentation readiness, first-visible-frame proof, atomic presentation, or production readiness until required fixtures pass on `main`.