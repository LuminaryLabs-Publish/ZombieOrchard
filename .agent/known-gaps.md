# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

The current documented boundary is HTML content safety and delegated-command admission. Dynamic values are interpolated into `innerHTML`, while the same subtree is searched for executable `data-action` and `data-command` controls.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Content origin, revision, field schema, and trust classification.
- [ ] Safe text and attribute construction.
- [ ] Trusted-markup capability separated from gameplay data.
- [ ] Detached fragment preparation and atomic adoption.
- [ ] Authored delegated-control manifest and route admission.
- [ ] Unsafe-content and unauthorized-control rejection results.
- [ ] First visible HTML content-frame acknowledgement.
- [ ] Browser, dist, and Pages content-injection fixtures.
- [ ] Browser startup identity, preparation, probe, adoption, fallback, and retry.
- [ ] Runtime event provenance and observer publication fault isolation.
- [ ] Canvas/HTML shared frame envelope and partial-frame recovery.
- [ ] Kit graph, session, reset, clock, route, capability, action, economy, transaction, outcome, pest, random, and persistence authorities.

## Content-safety gaps

```txt
content origin identity: absent
content revision: absent
field-context schema: absent
text encoding or direct-node result: absent
attribute-token validation: absent
trusted raw-markup capability: absent
detached-fragment validation: absent
delegated-control manifest: absent
route-valid control admission: absent
unsafe-content rejection result: absent
unauthorized-control rejection result: absent
first visible content-frame acknowledgement: absent
content-injection fixtures: absent
```

## Source consequences

- `String()` preserves HTML metacharacters.
- Card, message, title, description, action-label, and action-ID values can affect markup.
- Roster names are caller provided.
- `GameHost` exposes arbitrary runtime command dispatch.
- Injected descendants can match delegated selectors.
- `data-command` dispatch is not checked against the active route.
- Existing smoke proof never constructs the HTML renderer.

## Retained unresolved gaps

### Lifecycle and publication

- Ambient browser startup has no accepted generation, fallback, or retry.
- Display cadence controls simulation.
- Runtime publication lacks immutable observer isolation.
- Canvas and HTML lack one atomic frame result.

### Gameplay and transactions

- New Game and Start do not build a clean run.
- Raw GameHost access bypasses intended boundaries.
- Negative payments and unknown references remain unsafe.
- Multi-domain operations lack prepare, commit, rollback, and idempotency.
- Terminal mutation and pest capacity remain unresolved.

### Rendering and persistence

- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- `Math.random()` prevents replay continuation.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim safe HTML projection, delegated-command isolation, startup reliability, atomic presentation, or production readiness until required fixtures pass on `main`.
