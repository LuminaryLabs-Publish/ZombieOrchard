# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-12T06-11-18-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Scope:** documentation-only canvas render-surface audit

## Summary

`ZombieOrchard` uses a full-window HTML canvas, but the drawing buffer is reset to CSS dimensions during every rendered frame. The runtime does not observe device pixel ratio, cap a physical-pixel budget, preserve a render-surface revision, or adapt the fixed `720 x 560` orchard coordinate space to small viewports.

## Plan ledger

**Goal:** define one bounded and revisioned canvas-surface authority from viewport observation through drawing-buffer allocation, world projection, visible-frame acknowledgement, and browser proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible synchronized repository.
- [x] Read the page shell, CSS, browser boot, world renderer, HTML renderer, game composition, runtime and smoke test.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Preserve all 27 implemented kits and their offered services.
- [x] Trace CSS sizing, drawing-buffer writes, DPR handling, world-coordinate projection and render observation.
- [x] Define a DSK/domain breakdown for canvas render-surface authority.
- [x] Add render, gameplay, interaction, render-surface and deploy audits.
- [x] Refresh the required root `.agent` files and kit registry.
- [ ] Implement and execute render-surface fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-12T04-38-12-04-00 selected oldest
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheOpenAbove       2026-07-12T05-11-46-04-00
PrehistoricRush    2026-07-12T05-21-52-04-00
IntoTheMeadow      2026-07-12T05-39-42-04-00
PhantomCommand     2026-07-12T05-49-04-04-00
HorrorCorridor     2026-07-12T05-59-28-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is in scope for Publish changes.

## Product interaction loop

```txt
module boot
  -> create one mutable game engine
  -> obtain #world canvas and 2D context
  -> create the HTML renderer
  -> expose window.GameHost
  -> enter recursive draw()

browser frame
  -> engine.tick(1 / 60)
  -> read canvas.clientWidth/clientHeight
  -> fall back to window.innerWidth/innerHeight when either is zero
  -> assign canvas.width and canvas.height
  -> clear and paint the orchard in raw world coordinates around canvas center
  -> replace the HTML UI
  -> schedule the next RAF

viewport or zoom change
  -> no explicit resize command or generation
  -> next frame samples the new CSS dimensions
  -> drawing buffer is reset again
  -> world projection changes without a surface revision or result
```

## Source-backed findings

### Per-frame drawing-buffer reset

`src/renderer/world-canvas.js` executes these assignments on every `render(snapshot)` call:

```js
canvas.width = w;
canvas.height = h;
```

Assigning either canvas dimension resets the drawing buffer and 2D context state. At 60 display callbacks per second, the current host can request 216,000 drawing-buffer resets per hour even when the viewport never changes.

### Device-pixel ratio is ignored

The renderer uses CSS pixel dimensions directly. On a `1920 x 1080` CSS viewport at DPR `2`, the buffer remains `1920 x 1080` instead of `3840 x 2160`, so one canvas pixel covers four physical display pixels.

A correct fix must not simply multiply without policy. A `3840 x 2160` CSS viewport at DPR `2` would request `7680 x 4320`, or 33,177,600 pixels, before browser and backing-store overhead. A bounded pixel budget is required.

### World coordinates are not fitted to the viewport

The world model uses approximately:

```txt
horizontal range: -360 to 360
vertical range:   -280 to 280
nominal surface:   720 x 560
```

The renderer places those coordinates directly around the canvas center. A 320-pixel-wide viewport exposes only roughly `-160..160`, while gameplay can move the player to `-360..360`. The player, pests, apples or orchard edges can therefore remain valid simulation entities while being outside the visible canvas.

### CSS and drawing-buffer state have no authority record

The runtime has no:

```txt
renderSurfaceId
renderSurfaceRevision
resizeGeneration
cssWidth/cssHeight
devicePixelRatio
requestedBufferWidth/requestedBufferHeight
appliedBufferWidth/appliedBufferHeight
pixelBudget
worldScale
worldOffset
surfaceCommitResult
visibleSurfaceFrameReceipt
```

`window.GameHost.getState()` exposes gameplay snapshots only. It cannot prove which canvas dimensions or projection displayed a given snapshot.

### Existing test does not exercise the browser surface

`tests/smoke.mjs` creates the engine in Node and verifies Entry, Play and apple presence. It does not instantiate a canvas, test DPR, resize, orientation, small viewports, repeated unchanged frames or visible-frame correlation.

## Domains in use

```txt
browser page shell and full-window CSS layout
module boot and recursive RAF ownership
mutable runtime registration, commands, ticks, snapshots and subscriptions
12 interface-screen domains and interface composition
resource, pressure, orchard, construction, roster and inventory gameplay
active-session movement, collection, phases, pests, damage and outcome
CSS viewport and canvas-rectangle observation
2D drawing-buffer allocation and context-state lifecycle
device-pixel-ratio and physical-pixel policy
world-coordinate projection, fit and viewport membership
resize generation, coalescing, commit and stale-result rejection
canvas world rendering and HTML UI projection
surface/frame observation and diagnostics
Node smoke, static build, Pages deployment and central tracking
```

## Implemented kit inventory

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
| runtime | registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | screen state, actions, activation, routing, nested dispatch and Outcome routing |
| gameplay | resources, pressure, trees, apples, collection refill, construction, roster, equipment, movement, phases, pests, damage, score and failure |
| render | full-window canvas ownership, centered world drawing, HUD, route screens, cards, delegated click bindings and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static build copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-canvas-render-surface-authority-domain
```

Candidate kits:

```txt
canvas-surface-id-kit
canvas-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
canvas-capability-kit
resize-command-kit
resize-generation-kit
resize-coalescing-kit
render-surface-plan-kit
drawing-buffer-allocation-kit
drawing-buffer-readback-kit
world-projection-policy-kit
world-scale-policy-kit
world-viewport-membership-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-resize-rejection-kit
render-surface-observation-kit
render-surface-journal-kit
visible-surface-frame-receipt-kit
viewport-size-matrix-fixture-kit
dpr-resolution-fixture-kit
unchanged-frame-no-resize-fixture-kit
browser-resize-orientation-smoke-kit
```

## Required transaction

```txt
observe canvas CSS rect, viewport and DPR
  -> assign resizeGeneration
  -> validate finite positive dimensions
  -> query product pixel budget and canvas capabilities
  -> derive bounded physical drawing-buffer dimensions
  -> derive world scale and offset from the committed surface
  -> coalesce superseded resize observations
  -> mutate canvas dimensions only when the candidate changes
  -> read back actual canvas.width and canvas.height
  -> atomically commit surface revision or preserve predecessor
  -> render one world frame against the committed projection
  -> publish a visible-surface frame receipt
```

## Proof boundary

Do not claim high-DPI clarity, bounded memory use, stable resize behavior, world visibility, canvas/HTML parity or surface-to-frame correlation until source, built-artifact, browser and Pages fixtures pass on `main`.
