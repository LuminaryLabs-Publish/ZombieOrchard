# Project breakdown: ZombieOrchard HTML content and command-surface authority

**Timestamp:** `2026-07-13T18-00-38-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `html-content-command-surface-authority-central-reconciled`

## Summary

ZombieOrchard has 27 implemented kit surfaces and a dependency-free browser host. The current audit isolates the HTML projection boundary: dynamic state is coerced with `String()` and interpolated into `innerHTML`, while the same root owns delegated `data-action` and `data-command` handling. Caller-provided state can therefore become markup and then become a live command control without content-origin, trust, encoding, route-admission, rejection, or visible-result proof.

## Plan ledger

**Goal:** make every dynamic value enter the DOM through a context-aware, provenance-bearing projection path that cannot create executable markup or unauthorized delegated controls.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with the central ledger and root `.agent` state.
- [x] Confirm no new, ledger-missing, root-agent-missing, or locally-ahead repository outranks the fallback rule.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible central entry.
- [x] Read the runtime, interface composition, scoped interface, roster, preset, browser host, HTML renderer, test, and package surfaces.
- [x] Identify the complete interaction loop, domains, all 27 implemented kits, and offered services.
- [x] Define the missing HTML content and delegated-command-surface authority.
- [x] Add a timestamped tracker and audit family under root `.agent`.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement safe DOM construction and executable content-safety fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
repo-local-newer-than-central repositories: 0

ZombieOrchard      2026-07-13T13-01-03-04-00 selected
TheOpenAbove       2026-07-13T13-39-10-04-00
MyCozyIsland       2026-07-13T14-39-40-04-00
TheUnmappedHouse   2026-07-13T14-58-07-04-00
AetherVale         2026-07-13T15-41-24-04-00
IntoTheMeadow      2026-07-13T16-01-05-04-00
PrehistoricRush    2026-07-13T16-41-10-04-00
PhantomCommand     2026-07-13T17-00-59-04-00
HorrorCorridor     2026-07-13T17-40-04-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is modified in the Publish organization.

## Complete interaction loop

```txt
browser or public-host input
  -> runtime command(domain, type, payload)
  -> domain mutates state
  -> snapshot reaches HTML renderer
  -> renderer converts values with String()
  -> renderer interpolates values into HTML strings
  -> root.innerHTML replaces the live subtree

reachable dynamic-content path
  -> GameHost.engine.command("roster-runtime", "hire", { name, cost })
  -> roster stores caller-provided name
  -> interface transition to roster
  -> cards() inserts name through innerHTML

delegated command path
  -> injected markup creates a descendant with data-action or data-command
  -> root click listener accepts the descendant
  -> engine.command() dispatches the injected control
```

## Domains in use

```txt
browser document, DOM subtree replacement, delegated click handling, Canvas2D, RAF, and public GameHost
runtime registration, arbitrary command dispatch, ticks, snapshots, events, subscribers, and publication
11 generic scoped interface domains plus custom active-session
interface composition, routing, nested commands, Back, and automatic Outcome routing
resource ledger, pressure field, orchard world, construction, roster, and inventory
movement, collection, phase changes, pests, score, damage, failure, and outcome
dynamic text, attribute, card, action, message, and title projection
content origin, trust classification, safe DOM construction, command-surface admission, and visible proof
Node smoke, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

```txt
kit-runtime: kit registration, domain creation, arbitrary commands, ticks, events, snapshots, subscriptions
scoped-interface-domain-kit: interface state, selection, fields, actions, events, snapshots
entry/session-select/run-setup/interrupt/construction/exchange/roster/inventory/knowledge/preferences/outcome domain kits: route-specific actions and state
active-session-domain-kit: movement, collection, phases, pests, score, damage, failure
interface-composition-kit: transitions, nested commands, Back, Outcome routing
resource-ledger-kit: balance checks, payments, grants, snapshots
pressure-field-kit: pressure adjustment and ticking
orchard-world-kit: tree/apple generation, collection, refill
construction-runtime-kit: catalog, payment, placement
roster-runtime-kit: payment, hiring, caller-provided display name
inventory-runtime-kit: equipment mutation
world-canvas-render-kit: canvas world projection
html-interface-render-kit: delegated actions/commands, HUD, cards, messages, titles, innerHTML projection
game-host-diagnostics-kit: raw engine exposure, state readback, manual tick
smoke-fixture-kit: Entry, Play, apple assertions
static-build-copy-kit: dist assembly
pages-deploy-kit: GitHub Pages publication

engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
planned content-safety coordinating kits: 21
```

## Source-backed findings

- `text()` is a string coercion helper, not an HTML or attribute encoder.
- `button()` inserts action IDs into an HTML attribute and labels into element content without context-aware encoding.
- `cards()` inserts labels, names, IDs, summaries, roles, and types into HTML content without encoding.
- The active-session message, screen title, and description are inserted through `innerHTML`.
- The roster runtime stores caller-provided `payload.name`.
- `window.GameHost` exposes the raw engine, and the runtime accepts arbitrary domain, type, and payload values.
- The delegated listener accepts any matching descendant created inside the replaced subtree.
- An injected descendant can therefore become a live `data-action` or `data-command` control.
- No content-origin identity, trust classification, safe builder, control manifest, rejection result, or security fixture exists.

## Required parent domain

```txt
zombie-orchard-html-content-command-surface-authority-domain
```

## Required transaction

```txt
HtmlProjectionCommand
  -> bind snapshot revision, route, content origin, and projection command ID
  -> classify every field as text, attribute token, or explicitly trusted markup
  -> validate action and command tokens against the active route
  -> encode values or construct DOM nodes directly
  -> reject untrusted raw markup with zero live DOM mutation
  -> prepare a detached fragment and delegated-control manifest
  -> atomically replace the accepted subtree
  -> publish HtmlContentSafetyResult
  -> acknowledge the first visible frame for the accepted content revision
```

## Planned coordinating kits

```txt
content-origin-id-kit
content-revision-kit
html-projection-command-id-kit
projection-field-schema-kit
content-trust-classification-kit
text-content-encoder-kit
html-attribute-encoder-kit
action-token-policy-kit
trusted-markup-capability-kit
safe-dom-fragment-builder-kit
safe-action-control-builder-kit
safe-card-projection-kit
safe-message-projection-kit
delegated-control-origin-kit
route-command-surface-admission-kit
unsafe-content-rejection-kit
html-content-safety-result-kit
visible-html-content-frame-ack-kit
content-injection-fixture-kit
source-dist-pages-content-safety-parity-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, dependencies, package scripts, tests, workflows, and deployment configuration are unchanged. No safe-encoding, command-surface isolation, injection resistance, visible-content acknowledgement, or production-readiness claim is made.
