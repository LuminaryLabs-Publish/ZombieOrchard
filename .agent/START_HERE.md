# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Updated:** `2026-07-12T07-51-04-04-00`

## Summary

`ZombieOrchard` is a dependency-free orchard survival/economy shell built from a mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates HTML interface projection and focus authority. `src/start.js` invokes the HTML renderer every animation frame, and `src/renderer/html-interface-renderer.js` replaces the complete `#ui-root` subtree with `innerHTML` even when the route and values are unchanged. This can destroy keyboard focus every frame, cause continuous DOM and accessibility-tree churn, and provides no projection revision or visible-interface receipt.

## Plan ledger

**Goal:** make HTML projection a revisioned transaction that preserves focus and accessibility state, performs no mutation when the view is unchanged, encodes content safely and proves the first visible DOM revision.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible repository.
- [x] Trace browser boot, RAF ownership, snapshots, route state, HTML string construction, click delegation and DOM replacement.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits and offered services.
- [x] Confirm the entire UI subtree is replaced on every animation frame.
- [x] Confirm no projection fingerprint, no-op path, focus lease or accessibility continuity policy exists.
- [x] Confirm `text()` converts values to strings but does not escape HTML or attribute syntax.
- [x] Define view-model, escaping, diff, commit, focus-restoration and visible-interface contracts.
- [x] Add timestamped architecture, render, gameplay, interaction, HTML-interface and deployment audits.
- [x] Refresh required root `.agent` files and the machine registry.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Selection

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

Only `LuminaryLabs-Publish/ZombieOrchard` is in scope for Publish changes.

## Interaction loop

```txt
module boot
  -> create the mutable engine graph
  -> create the world canvas and HTML interface renderer
  -> install one delegated click listener on #ui-root
  -> expose window.GameHost
  -> call draw()

every RAF callback
  -> engine.tick(1 / 60)
  -> produce a fresh deep-cloned snapshot
  -> redraw the world canvas
  -> call ui.render(snapshot)
  -> build a complete HTML string for the active route
  -> assign root.innerHTML
  -> discard every predecessor DOM node
  -> schedule the next RAF

keyboard-focus path
  -> user focuses a button
  -> next RAF replaces the focused button node
  -> browser focus falls back or becomes unstable
  -> no focus token, keyed node, restoration result or typed failure exists

content path
  -> preset/runtime values are converted with String(...)
  -> values are interpolated into HTML and attributes
  -> no HTML or attribute escaping policy is applied
```

## Main findings

```txt
root.innerHTML is assigned on every UI render
ui.render executes on every RAF callback
unchanged menu/HUD state has no no-op projection path
all predecessor button/card nodes are discarded every frame
focused controls can be replaced before the next keyboard action
no stable action-node key or focus restoration result exists
no DOM surface ID, projection revision or mutation receipt exists
no accessibility-tree update policy exists
no HTML text escaping exists
no HTML attribute escaping exists
no projection result is correlated with the world frame
Node smoke does not instantiate a DOM or test focus/mutation behavior
```

## Current authority boundary

```txt
zombie-orchard-html-interface-projection-authority-domain
```

Required flow:

```txt
committed state snapshot
  -> derive immutable InterfaceViewModel
  -> encode all text and attribute values
  -> fingerprint route, actions, cards and HUD values
  -> return a typed no-op when the fingerprint is unchanged
  -> capture focus/selection lease
  -> prepare keyed DOM changes
  -> commit one interface projection revision
  -> restore or intentionally move focus under a named policy
  -> publish projection and accessibility results
  -> acknowledge the first visible frame using the new revision
```

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
| interface | screen state, action descriptors, activation, route movement, nested dispatch and automatic Outcome routing |
| game | resources, pressure, trees, apples, collection refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | canvas world drawing, HUD and route HTML, card projection, delegated click handling and full-subtree `innerHTML` replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static copy and Pages deployment |

## Read this run first

```txt
.agent/trackers/2026-07-12T07-51-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T07-51-04-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T07-51-04-04-00-html-interface-projection-authority-dsk-map.md
.agent/render-audit/2026-07-12T07-51-04-04-00-per-frame-dom-replacement-visible-interface-gap.md
.agent/gameplay-audit/2026-07-12T07-51-04-04-00-hud-route-projection-loop.md
.agent/interaction-audit/2026-07-12T07-51-04-04-00-focus-preserving-interface-commit-map.md
.agent/html-interface-audit/2026-07-12T07-51-04-04-00-escaping-diff-focus-contract.md
.agent/deploy-audit/2026-07-12T07-51-04-04-00-dom-focus-accessibility-fixture-gate.md
```

## Retained prerequisite audits

```txt
seeded random and replay:          2026-07-11T17-01-11-04-00
runtime session instance:          2026-07-11T18-28-40-04-00
versioned persistence:             2026-07-11T20-03-22-04-00
route-scoped simulation:           2026-07-11T21-40-49-04-00
public capability gateway:         2026-07-11T23-41-55-04-00
composite command transaction:     2026-07-11T23-48-14-04-00
player-control reachability:       2026-07-12T01-30-07-04-00
fixed-step clock authority:        2026-07-12T03-11-51-04-00
frame publication fault handling:  2026-07-12T04-38-12-04-00
canvas render surface:             2026-07-12T06-19-56-04-00
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not replace focused DOM nodes on an unchanged frame.
Do not interpolate unencoded values into HTML or attributes.
Do not treat a string build or innerHTML assignment as visible-frame proof.
Do not claim keyboard or screen-reader continuity until browser fixtures pass.
```
