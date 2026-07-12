# Next steps — ZombieOrchard

**Timestamp:** `2026-07-12T07-51-04-04-00`

## Summary

Preserve the existing runtime, clock, route, capability, transaction, frame and canvas boundaries, then replace the string-only HTML renderer with an immutable view-model and revisioned projection transaction. Unchanged frames should perform no DOM mutation, route transitions should move focus intentionally, and all text/attribute content should be encoded before commit.

## Plan ledger

**Goal:** implement a focus-safe, minimally mutating HTML projection without coupling UI correctness to animation-frame cadence.

- [ ] Add stable DOM surface identity and interface projection revision.
- [ ] Derive an immutable `InterfaceViewModel` from a committed state snapshot.
- [ ] Separate text-node encoding from attribute encoding.
- [ ] Fingerprint semantic and structural UI state.
- [ ] Return a typed no-op result when the fingerprint is unchanged.
- [ ] Preserve keyed action/card nodes when their identity is unchanged.
- [ ] Capture focused action and selection before mutation.
- [ ] Define route-specific initial and restoration focus policies.
- [ ] Bound DOM mutation counts and reject stale projection plans.
- [ ] Deduplicate accessibility announcements.
- [ ] Publish projection, focus and visible-interface frame results.
- [ ] Add source, browser, built-artifact and Pages fixtures.

## Immediate safe ledge

1. Extract `buildInterfaceViewModel(snapshot)` as a pure function.
2. Add `escapeHtmlText()` and `escapeHtmlAttribute()` fixtures before using string templates.
3. Compute a stable fingerprint from route, action IDs, cards, HUD statistics and message.
4. Skip `root.innerHTML` when the fingerprint is unchanged.
5. Capture `document.activeElement?.dataset.action` before accepted mutations.
6. Restore the same action when it remains valid.
7. Define a named route-transition focus target when it does not.
8. Add mutation counters and a typed render result.
9. Prove 600 unchanged frames cause zero subtree replacements.
10. Only then consider keyed DOM reconciliation instead of whole-subtree replacement.

## Required runtime flow

```txt
state/frame commit
  -> InterfaceViewModel
  -> safe text and attribute encoding
  -> semantic/structural fingerprint
  -> unchanged no-op OR prepared DOM projection
  -> focus and selection lease capture
  -> stale-plan check
  -> bounded DOM commit
  -> focus restoration/transition result
  -> accessibility announcement result
  -> visible interface-frame acknowledgement
```

## Target files

```txt
src/renderer/html-interface-renderer.js
src/start.js
src/interface/interface-view-model.js
src/interface/html-encoding.js
src/interface/interface-projection-state.js
src/interface/interface-focus-policy.js
tests/interface-view-model.fixture.mjs
tests/html-encoding.fixture.mjs
tests/interface-noop.fixture.mjs
scripts/smoke-interface-focus.mjs
package.json
```

## Required fixtures

```txt
same view model -> zero DOM mutations
changed HUD statistic -> one accepted projection revision
same focused action survives an unrelated HUD update
removed action moves focus to the declared route target
route transition receives deterministic initial focus
malformed text is rendered as text, not markup
malformed action ID cannot break the data-action attribute
stale projection cannot replace a newer route
repeated identical message creates no repeated announcement
canvas and HTML receipts cite the same state/frame revision
source, dist and Pages behavior remain equivalent
```

## Dependency order

```txt
runtime session
  -> fixed-step and route admission
  -> public capability and transactions
  -> frame fault containment
  -> canvas surface authority
  -> HTML interface projection authority
  -> replay and persistence
```

## Do not claim

Do not claim keyboard accessibility, safe content encoding, reduced DOM work, route-focus correctness or canvas/HTML frame parity until the fixtures pass on `main`.
