# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Status:** `html-interface-projection-focus-authority-audited`  
**Branch:** `main`

## Summary

The shipped HTML renderer rebuilds the complete interface subtree during every animation frame. `src/start.js` always calls `ui.render(snapshot)`, and both active-session and route-screen paths assign `root.innerHTML`. No state fingerprint, keyed reconciliation, mutation budget, focus preservation, safe encoding contract or interface-frame acknowledgement exists.

## Plan ledger

**Goal:** define a deterministic HTML projection boundary that emits safe, minimal DOM changes while preserving keyboard and assistive-technology continuity.

- [x] Compare the Publish inventory with the central repository ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard`.
- [x] Inspect `index.html`, browser boot, runtime snapshots, interface composition, presets, gameplay state and both renderers.
- [x] Identify the interaction loop, all domains, all 27 kits and their services.
- [x] Trace route/HUD values into HTML strings and attributes.
- [x] Confirm per-frame full-subtree replacement.
- [x] Confirm unchanged-frame no-op behavior is absent.
- [x] Confirm focus and selection are not captured or restored.
- [x] Confirm text and attribute encoding are absent.
- [x] Define a composed parent domain and fixture gate.
- [ ] Implement the authority and run browser/Pages fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T06-19-56-04-00 selected oldest
TheUnmappedHouse   2026-07-12T06-30-34-04-00
AetherVale         2026-07-12T06-41-32-04-00
MyCozyIsland       2026-07-12T06-51-27-04-00
TheOpenAbove       2026-07-12T07-00-48-04-00
PrehistoricRush    2026-07-12T07-09-49-04-00
IntoTheMeadow      2026-07-12T07-19-47-04-00
PhantomCommand     2026-07-12T07-29-32-04-00
HorrorCorridor     2026-07-12T07-41-06-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
module boot
  -> create mutable engine graph
  -> create world canvas and HTML renderer
  -> install delegated click listener on #ui-root
  -> expose window.GameHost
  -> call draw()

every RAF callback
  -> engine.tick(1 / 60)
  -> produce fresh snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> construct complete route/HUD HTML string
  -> assign root.innerHTML
  -> discard predecessor descendants
  -> schedule next RAF

keyboard focus
  -> user focuses a button
  -> next RAF removes that node
  -> no focus key, lease, restoration result or route focus policy exists

content
  -> values are coerced through String(...)
  -> values are interpolated into HTML text and data-action attributes
  -> no text or attribute encoding policy is applied
```

## Source-backed findings

### Full DOM replacement occurs every frame

`src/start.js` invokes both renderers on every callback:

```js
const snapshot = engine.tick(1 / 60);
world.render(snapshot);
ui.render(snapshot);
requestAnimationFrame(draw);
```

`src/renderer/html-interface-renderer.js` assigns `root.innerHTML` in the active-session branch and again for all other routes. No equality check or dirty flag precedes either assignment.

At 60 callbacks per second, an unchanged route can request:

```txt
3,600 complete subtree replacements per minute
216,000 complete subtree replacements per hour
```

Actual callback frequency can be reduced by browser throttling, but the application requests a mutation on every callback.

### Keyboard focus has no continuity contract

Every replacement creates new button elements. Delegated click handling survives because the listener is attached to the stable root, but focused descendants do not. Missing state includes:

```txt
domSurfaceId
interfaceProjectionRevision
focusedActionId
focusLease
focusCaptureResult
focusRestorationPolicy
focusRestorationResult
selectionLease
routeTransitionFocusTarget
```

### Accessibility-tree churn is unbounded

The HUD and route subtree are recreated even when semantic values are unchanged. There is no ARIA live-region policy, announcement deduplication, semantic-change fingerprint, screen-reader continuity result or DOM mutation budget.

### Content encoding is not defined

The helper is:

```js
const text = (value) => String(value ?? "");
```

It performs conversion, not HTML escaping. Values enter text positions and `data-action` attributes. Authored presets are currently trusted source code, but runtime roster names and future loaded or networked content have no safe projection boundary. This audit does not claim a remote exploit.

### Projection provenance is absent

The renderer returns only `{ render }`. It publishes no projection ID, revision, fingerprint, mutation count, no-op result, focus result, accessibility result or visible-interface receipt. Canvas and HTML cannot prove they displayed the same committed state/frame revision.

### Existing proof is engine-only

`tests/smoke.mjs` checks Entry, Play and apple presence. It creates no DOM and tests no mutation, focus, encoding, accessibility or interface-frame invariant.

## Domains in use

```txt
browser document, DOM surface and full-window CSS ownership
module boot, recursive RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
12 interface-screen domains and interface composition
resource ledger and pressure field
orchard trees, apples and refill
construction, roster and inventory
active-session movement, phases, pests, damage, score and failure
canvas world rendering and canvas-surface authority
HTML view-model construction and DOM projection
HTML text and attribute encoding
DOM mutation planning, no-op detection, commit and rollback
focus, selection and accessibility continuity
interface projection identity, revision, observation and frame correlation
Node smoke, static build, Pages deployment and central audit tracking
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Offered services

| Kit group | Services |
|---|---|
| runtime | registration, domain creation, command dispatch, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | screen state, actions, activation, routing, nested dispatch and automatic Outcome routing |
| game | resources, pressure, trees, apples, collection refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | canvas world drawing, HUD and route HTML, card projection, delegated click handling and full-subtree `innerHTML` replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-html-interface-projection-authority-domain
```

Candidate kits:

```txt
interface-projection-id-kit
interface-projection-revision-kit
interface-state-fingerprint-kit
interface-view-model-kit
html-content-escaping-kit
html-attribute-escaping-kit
interface-action-key-kit
dom-surface-lease-kit
dom-focus-lease-kit
dom-selection-lease-kit
interface-projection-plan-kit
interface-projection-diff-kit
interface-projection-commit-kit
interface-projection-noop-kit
interface-projection-result-kit
stale-interface-projection-rejection-kit
focus-restoration-policy-kit
screen-reader-announcement-policy-kit
dom-mutation-budget-kit
interface-projection-observation-kit
interface-projection-journal-kit
visible-interface-frame-receipt-kit
unchanged-ui-no-mutation-fixture-kit
keyboard-focus-retention-fixture-kit
html-escaping-fixture-kit
route-transition-focus-fixture-kit
browser-interface-accessibility-smoke-kit
pages-interface-projection-smoke-kit
```

## Required transaction

```txt
committed StateSnapshot
  -> validate runtime session, route and expected state revision
  -> build immutable InterfaceViewModel
  -> encode text and attribute values
  -> calculate semantic and structural fingerprints
  -> publish a typed no-op when unchanged
  -> otherwise capture focused action and selection leases
  -> prepare keyed DOM changes under a mutation budget
  -> reject stale preparation
  -> commit one InterfaceProjectionRevision
  -> restore or deliberately move focus using route policy
  -> publish projection, focus and accessibility results
  -> acknowledge the first visible interface frame
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
2b. Player-Control Reachability Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
4a. Frame Publication Fault Containment Authority
4b. Canvas Render Surface Authority
4c. HTML Interface Projection and Focus Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Proof boundary

Do not claim efficient DOM rendering, keyboard-focus continuity, screen-reader stability, safe external-content projection, canvas/HTML parity or visible interface-frame provenance until source, browser, built-artifact and Pages fixtures pass on `main`.
