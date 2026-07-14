# Next steps - ZombieOrchard

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

Turn roster hiring into a real gameplay capability. The next implementation should derive cost and role from authored offers, reject malformed or stale requests, reserve resources atomically, create safe actor identities, adopt deterministic worker effects, expose a browser Hire action and prove matching HTML and Canvas2D state.

## Plan ledger

**Goal:** make one hire settle exactly once across resources, roster, gameplay and presentation or leave every predecessor untouched.

- [ ] Define `HireCommandId`, `RunGeneration`, `RosterRevision`, `WorkerCatalogRevision`, `ResourceRevision` and `WorkerEffectRevision`.
- [ ] Replace caller-controlled costs with exact authored `HireOffer` lookup.
- [ ] Reject negative, non-finite, string, fractional and unknown costs before reservation.
- [ ] Add resource reservation, promotion and release semantics.
- [ ] Add normalized, bounded and safely projected worker display names.
- [ ] Define unique actor identity independent from current array length.
- [ ] Add role catalog, capacity and duplicate policies.
- [ ] Add authored worker capability, cadence, upkeep and presentation descriptors.
- [ ] Add a Hire action to the roster route.
- [ ] Return typed hire results through interface composition.
- [ ] Prepare roster and worker-effect candidates before mutation.
- [ ] Atomically commit roster, resource, active-session, HTML and Canvas2D consumers.
- [ ] Make labor actions cite the accepted worker-effect revision.
- [ ] Show worker identity, role and status in the roster screen.
- [ ] Show worker count or active labor effect in the HUD.
- [ ] Project workers or labor indicators in Canvas2D.
- [ ] Roll back all partial consumers and release resource reservations after failure.
- [ ] Add duplicate, stale, wrong-route, retired-run, unknown-offer, unknown-role and roster-full classification.
- [ ] Publish `FirstVisibleRosterFrameAck`.
- [ ] Add source, browser, dist and Pages roster-hiring fixtures.

## Immediate safe ledge

1. Define one authored `harvest-hand` offer with a fixed positive money cost.
2. Remove `payload.cost` from the accepted command contract.
3. Validate finite positive integer offer cost before touching the ledger.
4. Normalize and HTML-escape the display name.
5. Add a roster capacity and unique actor ID generator bound to the run.
6. Add an authored Hire button to the roster route.
7. Define a minimal deterministic harvest effect descriptor.
8. Make active-session adopt the worker effect only after roster and resource preparation succeed.
9. Expose the accepted roster revision in roster cards, HUD and Canvas2D.
10. Add success, rejection, duplicate, stale, rollback and visible-frame fixtures.

## Target files

```txt
src/kits/game-domains.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/roster/hiring-authority.js
src/roster/hire-offer-policy.js
src/roster/worker-role-policy.js
tests/roster-hiring.fixture.mjs
scripts/smoke-roster-hiring-browser.mjs
package.json
```

## Required fixtures

```txt
authored offer charges exact positive cost
negative cost payload has no effect
non-numeric cost payload has no effect
unknown offer and role perform zero mutation
unsafe name cannot create markup
roster capacity is enforced
duplicate command settles once
stale command is rejected
retired run is rejected
worker effect is adopted exactly once
resource, roster and gameplay receipts share one revision
failed gameplay or render participant rolls back
roster, HUD and Canvas2D show one accepted revision
source, dist and Pages results match
first visible roster frame is acknowledged
```

## Do not claim

Do not claim safe hiring, positive-cost settlement, actor identity safety, worker gameplay adoption, matching visible state, rollback, artifact parity or production readiness until the fixture matrix passes on `main`.