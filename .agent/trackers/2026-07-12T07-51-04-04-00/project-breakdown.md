# ZombieOrchard project breakdown

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Mode:** documentation-only

## Summary

This run selected ZombieOrchard as the oldest eligible repository and audited its HTML interface projection path. The entire route/HUD subtree is rebuilt with `innerHTML` on every animation frame, including unchanged frames, with no focus preservation, encoding contract, projection revision or visible-interface acknowledgement.

## Plan ledger

**Goal:** document one authoritative route from committed state to a safe, minimal, focus-preserving DOM commit.

- [x] Compare the full Publish inventory against central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard.
- [x] Identify interaction loops, domains, kits and services.
- [x] Trace state into HTML text and attributes.
- [x] Define the DSK/domain boundary and candidate kits.
- [x] Add render, gameplay, interaction, HTML-interface and deployment audits.
- [x] Refresh required root `.agent` files.
- [ ] Implement or execute runtime fixtures.

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

## Interaction loop

```txt
module boot
  -> create engine, canvas renderer and HTML renderer
  -> install delegated click listener
  -> expose GameHost
  -> start RAF

frame
  -> tick fixed 1/60
  -> build snapshot
  -> render canvas
  -> construct complete HUD/route HTML
  -> replace #ui-root descendants
  -> schedule next frame

focus
  -> user focuses descendant control
  -> next frame removes that node
  -> no restoration or transition result exists
```

## Domains

```txt
browser/DOM host
runtime and publication
12 interface domains and composition
resources, pressure, orchard, construction, roster, inventory and active session
canvas rendering
HTML view-model and DOM projection
text/attribute encoding
focus, selection and accessibility continuity
projection revision and frame correlation
proof, build and Pages deployment
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

## Services

| Kit group | Services |
|---|---|
| runtime | registration, domains, commands, ticks, events, snapshots, subscriptions, publication |
| interface | route state, actions, activation, transitions, nested dispatch, Outcome routing |
| game | resources, pressure, orchard, refill, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render | canvas world, HUD/route HTML, cards, delegated clicks, full-subtree replacement |
| proof/deploy | GameHost readback, manual tick, Node smoke, static copy, Pages deployment |

## Findings

```txt
full #ui-root replacement on every RAF callback
no unchanged-state no-op
no keyed node continuity
no focus or selection lease
no route focus policy
no text or attribute escaping
no projection ID/revision/result
no mutation budget
no accessibility announcement policy
no canvas/HTML frame parity proof
```

## Required parent domain

```txt
zombie-orchard-html-interface-projection-authority-domain
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-12T07-51-04-04-00.md
.agent/architecture-audit/2026-07-12T07-51-04-04-00-html-interface-projection-authority-dsk-map.md
.agent/render-audit/2026-07-12T07-51-04-04-00-per-frame-dom-replacement-visible-interface-gap.md
.agent/gameplay-audit/2026-07-12T07-51-04-04-00-hud-route-projection-loop.md
.agent/interaction-audit/2026-07-12T07-51-04-04-00-focus-preserving-interface-commit-map.md
.agent/html-interface-audit/2026-07-12T07-51-04-04-00-escaping-diff-focus-contract.md
.agent/deploy-audit/2026-07-12T07-51-04-04-00-dom-focus-accessibility-fixture-gate.md
```
