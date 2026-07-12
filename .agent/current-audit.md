# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T16-51-47-04-00`  
**Status:** `interface-action-admission-authority-audited`  
**Branch:** `main`

## Summary

ZombieOrchard does not have one authoritative interface-action transaction. Generic scoped interface domains resolve `activate` with `actions.find(actionId) || actions[selectedIndex]`, so an unknown or missing explicit action ID can execute the currently selected action. The active-session domain uses exact matching instead, creating inconsistent admission semantics.

The composition layer invokes an optional nested gameplay command but discards its result. When the construction action requests a storage shed and the build rejects for insufficient resources, composition still returns `{ accepted: true }`. The HTML renderer also ignores `action.disabled`, so an unavailable action is projected as an enabled button.

## Plan ledger

**Goal:** define exact action identity, availability, nested-result propagation and visible-result proof across every route and caller.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Verify eligible central-ledger and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest eligible fallback rule.
- [x] Read boot, runtime, scoped interface domains, composition, gameplay domains, preset, HTML renderer and smoke proof.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kit surfaces and their services.
- [x] Confirm explicit action lookup fails open to selection in generic interface domains.
- [x] Confirm active-session activation uses different exact-match semantics.
- [x] Confirm nested command results are ignored by interface composition.
- [x] Confirm disabled actions are not projected as disabled controls.
- [x] Define action identity, route/action-set revisions, availability, result propagation, idempotency and first-frame contracts.
- [ ] Implement and execute action-admission fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T14-38-35-04-00 selected
MyCozyIsland       2026-07-12T14-59-01-04-00
TheUnmappedHouse   2026-07-12T15-08-07-04-00
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-40-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
TheCavalryOfRome   excluded
```

No new, ledger-missing or root-`.agent`-missing eligible repository was found.

## Complete interaction loop

```txt
browser module boot
  -> createOrchardGame()
  -> install 19 engine kits once
  -> create world and HTML renderers
  -> expose raw engine through window.GameHost
  -> start recursive RAF

interface input
  -> delegated HTML click extracts data-action
  -> public callers may invoke the same raw engine command
  -> interface-composition.activate(actionId)
  -> current domain resolves activate

scoped-domain admission
  -> exact action lookup is attempted
  -> unknown or missing id falls back to selectedIndex
  -> disabled is checked only after resolution
  -> actionRequested event is emitted

composition
  -> optional nested gameplay command executes synchronously
  -> nested result is discarded
  -> optional route move executes
  -> otherwise accepted=true is returned
  -> listeners receive a successor snapshot

presentation
  -> RAF ticks all domains
  -> canvas renders world state
  -> HTML rebuilds route or HUD
  -> no action command/result revision is projected
```

## Source-backed findings

### Generic explicit activation fails open

`src/kits/scoped-interface-domains.js` resolves activation with:

```js
const action = actions.find((item) => item.id === payload.actionId) || actions[state.selectedIndex];
```

An explicit invalid ID is therefore not rejected. On Entry, the default selected index is zero, so an invalid ID can execute Play. The same behavior applies to run setup, pause, construction, exchange, roster, inventory, knowledge, preferences and outcome domains.

### Admission semantics differ by domain

`active-session` resolves `activate` only with an exact ID and rejects when no action matches. A caller cannot reason about one consistent action contract across the 12 interface definitions.

### Nested command result is discarded

`src/kits/composition.js` calls `ctx.engine.command(...)` for `action.command` but stores no result. It then returns a route result or unconditional `{ accepted: true }`.

Current source-backed example:

```txt
construction action shed
  -> construction-runtime.build(storage-shed)
  -> resource-ledger.pay can reject
  -> construction-runtime returns accepted=false
  -> interface-composition returns accepted=true
```

### Visible availability is untruthful

Action descriptors carry `disabled`, and domains reject disabled actions. `html-interface-renderer.js` renders every descriptor as a normal button and does not emit `disabled`, `aria-disabled` or an availability reason.

### Stale and public callers are not fenced

`window.GameHost.engine` exposes raw command dispatch. There is no runtime session, run generation, route revision, action-set revision, action fingerprint or expected predecessor bound to an action command. Because invalid IDs fall back, a stale action from another route can be reinterpreted as the current selected action instead of rejected.

### Proof is absent

`tests/smoke.mjs` validates Entry, one Play transition and apple presence. It does not test invalid IDs, missing IDs, stale route actions, disabled projection, nested rejection propagation or source/dist/Pages parity.

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
11 generic scoped interface domains plus custom active-session
interface action identity, availability, selection and activation
interface composition, nested command dispatch, routing and automatic Outcome routing
runtime session, run generation, route and action-set revision admission
resource ledger and pressure field
orchard world, collection and refill
construction, roster and inventory
movement, phase, pests, damage, score and failure
canvas world and HTML interface projection
Node smoke, static build, Pages deployment and central tracking
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
| runtime | Registration, live domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, action descriptors, activation, routing, back navigation, nested dispatch and Outcome routing |
| gameplay | Resources, pressure, orchard collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas world drawing, HTML route/HUD projection and delegated actions |
| diagnostics/proof/deploy | Raw engine publication, state readback, manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-interface-action-admission-authority-domain
```

## Required transaction

```txt
InterfaceActionCommand
  -> bind command ID, runtime session, run generation, route revision and action-set revision
  -> require exact action ID and descriptor fingerprint
  -> evaluate availability and disabled reason
  -> reject missing, unknown, stale, duplicate or unavailable action
  -> execute the nested command exactly once
  -> capture the typed nested command result
  -> apply route transition policy only when permitted by that result
  -> publish one InterfaceActionResult and journal row
  -> project availability, success or rejection feedback
  -> acknowledge first canvas/HTML frame citing the action result revision
```

## Candidate kits

```txt
interface-action-id-kit
interface-action-set-revision-kit
interface-route-revision-kit
interface-action-manifest-kit
interface-action-availability-kit
interface-action-command-kit
interface-action-command-id-kit
interface-action-admission-kit
exact-action-lookup-kit
stale-action-rejection-kit
nested-command-result-propagation-kit
action-route-commit-policy-kit
interface-action-result-kit
interface-action-idempotency-kit
interface-action-observation-kit
interface-action-journal-kit
action-affordance-projection-kit
action-result-projection-kit
first-action-result-frame-ack-kit
invalid-action-id-fixture-kit
stale-route-action-fixture-kit
disabled-action-projection-fixture-kit
nested-command-rejection-fixture-kit
action-source-dist-pages-parity-fixture-kit
```

## Runtime non-claims

No runtime source, action behavior, gameplay, rendering, package scripts or deployment configuration changed. No exact-ID admission, disabled affordance, nested-result propagation, stale-action fencing, idempotency or visible action-result claim is made.