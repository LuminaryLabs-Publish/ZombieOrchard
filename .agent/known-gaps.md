# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

The current documented boundary is public runtime capability and frame admission. `window.GameHost` exposes the full mutable engine and a manual tick that advances every domain without rendering. There is no least-authority facade, capability revision, caller identity, command admission, external-tick lease, typed result, matching frame acknowledgement or retirement.

## Plan ledger

**Goal:** keep public-host risks dependency ordered and tied to executable proof.

- [ ] Host and run generation binding.
- [ ] Capability policy revision and capability-set identity.
- [ ] Immutable detached state readback.
- [ ] Product command allowlist.
- [ ] Caller and command identity.
- [ ] Expected state revision and idempotency.
- [ ] Route and pause admission.
- [ ] External-tick production disablement.
- [ ] Scoped diagnostic tick leases.
- [ ] Headless versus visible step classification.
- [ ] Runtime, HTML and Canvas frame revisions.
- [ ] First visible public-mutation acknowledgement.
- [ ] Capability and lease retirement.
- [ ] Source, browser, dist and Pages fixtures.
- [ ] Retained clean-run, transaction, observer, event and frame-coherence work.

## Public capability gaps

```txt
HostGeneration: absent
RunGeneration in public surface: absent
CapabilityPolicyRevision: absent
CapabilitySetId: absent
immutable readback: absent
public command allowlist: absent
CallerId: absent
PublicCommandId: absent
expected state revision: absent
command idempotency: absent
route admission: absent
pause admission: absent
external-tick lease: absent
production external-tick policy: absent
headless/visible classification: absent
runtime frame revision in snapshot: absent
HTML frame revision: absent
Canvas frame revision: absent
FirstVisiblePublicMutationFrameAck: absent
capability retirement: absent
public capability fixtures: absent
```

## Source consequences

- Any same-page script can retain the raw engine reference.
- Callers can invoke arbitrary engine commands.
- Callers can install or replace domains through `addKit()`.
- Callers can access mutable runtime context and domain objects.
- Direct domain APIs can mutate resources, pressure or orchard state without engine command publication.
- Manual ticks advance all domains outside the RAF scheduler.
- Manual ticks do not render.
- The next RAF advances again before presenting state.
- Public state readback omits runtime frame, elapsed time, host generation and run generation.
- Public capabilities are not revoked.
- Existing smoke proof can pass without exercising any of these paths.

## Retained unresolved gaps

### Run and gameplay lifecycle

- New Game and retry do not create a clean deterministic run generation.
- Gameplay and pressure are not route-suspended.
- Roster, inventory and construction transactions remain incomplete.
- Pest capacity and terminal settlement remain unresolved.

### Publication and rendering

- Runtime observers lack immutable generation isolation.
- Runtime events lack durable publication.
- Canvas and HTML lack one atomic frame result.
- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.

### Content and persistence

- Dynamic HTML content is not safely constructed.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim least-authority host publication, safe diagnostics, external-tick correctness, public-command admission, visible-frame convergence, capability retirement, artifact parity or production readiness until required fixtures pass on `main`.