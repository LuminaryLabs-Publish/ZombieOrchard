# ZombieOrchard project breakdown

**Timestamp:** `2026-07-12T06-19-56-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`

## Summary

This run selected `ZombieOrchard` because its `2026-07-12T06-11-18-04-00` canvas render-surface audit was newer than the central ledger and therefore recently undocumented centrally. The audit is source-backed, the root audit state is now made internally consistent, and central synchronization is required after the repo-local commit.

## Plan ledger

**Goal:** close the repo-local and central documentation gap while preserving one complete canvas render-surface breakdown and executable proof boundary.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state and central ledger entries.
- [x] Detect the newer repo-local ZombieOrchard canvas audit.
- [x] Work on only `ZombieOrchard`.
- [x] Trace boot, RAF, canvas sizing, projection, HTML rendering and diagnostics.
- [x] Identify the interaction loop, domains, 27 implemented kits and offered services.
- [x] Confirm per-frame drawing-buffer writes, missing DPR/pixel budget and missing world-fit policy.
- [x] Add a new timestamped architecture and system audit set.
- [x] Refresh root audit documents and kit registry.
- [ ] Implement and execute browser render-surface fixtures.

## Interaction loop

```txt
module boot
  -> create engine and domains
  -> create world canvas and HTML renderers
  -> expose window.GameHost
  -> call draw()

frame
  -> engine.tick(1 / 60)
  -> read CSS canvas size
  -> assign canvas.width / canvas.height
  -> draw fixed world coordinates around canvas center
  -> replace HTML UI
  -> schedule successor RAF

viewport or DPR change
  -> no explicit command, generation or result
  -> next frame samples ambient CSS dimensions
  -> DPR remains unobserved
```

## Domains

```txt
browser shell and CSS viewport
runtime graph and synchronous publication
12 interface domains and composition
resource, pressure, orchard, construction, roster and inventory
active-session movement, collection, pests, damage, score and failure
canvas allocation and context lifecycle
DPR, capability and pixel-budget policy
world projection, fit and viewport membership
resize generation, commit, rollback and observation
canvas and HTML rendering
surface/state/frame diagnostics
smoke, build, Pages and central tracking
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

| Group | Services |
|---|---|
| runtime | registration, domains, commands, ticks, events, snapshots, subscriptions, synchronous publication |
| interface | screen state, actions, activation, routing, nested dispatch, Outcome routing |
| gameplay | resources, pressure, trees, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render | viewport canvas, centered world projection, HUD, route screens, cards, delegated clicks, DOM replacement |
| proof/deploy | raw host, snapshot readback, manual tick, Node smoke, static copy, Pages |

## Main finding

`src/renderer/world-canvas.js` assigns the drawing-buffer dimensions on every render, uses CSS pixels as physical pixels and projects raw world coordinates without a fit policy. No surface identity, revision, pixel budget, allocation receipt or visible-frame acknowledgement exists.

## Output

This run adds matching tracker, turn-ledger, architecture, render, gameplay, interaction, render-surface and deploy entries, then refreshes all required root `.agent` files.