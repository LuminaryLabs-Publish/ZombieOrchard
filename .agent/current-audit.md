# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T06-11-18-04-00`  
**Status:** `canvas-render-surface-authority-audited`  
**Branch:** `main`

## Summary

The world canvas is styled to fill the browser viewport, but the renderer rewrites its drawing-buffer width and height from CSS dimensions during every frame. Device pixel ratio, physical-pixel budgets, resize generations, actual allocation readback, world-fit policy and surface/frame correlation are absent. This creates high-DPI softness, redundant context resets and a concrete small-viewport path where valid gameplay entities exist outside the visible canvas.

## Plan ledger

**Goal:** define one render-surface authority from viewport observation through bounded physical allocation, world projection, atomic commit, diagnostics and visible-frame proof.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible synchronized repository.
- [x] Inspect the page shell, CSS, browser boot, game constructor, runtime, gameplay domains, renderers and smoke test.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits and offered services.
- [x] Confirm canvas dimensions are assigned on every render call.
- [x] Confirm CSS dimensions are used directly as physical buffer dimensions.
- [x] Confirm no DPR, pixel-budget, resize-generation or surface-revision authority exists.
- [x] Confirm fixed world coordinates are not fitted to the viewport.
- [x] Define canvas-surface identities, commands, plans, results and fixtures.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and registry.
- [ ] Implement and execute render-surface fixtures.

## Selection audit

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

## Complete interaction loop

```txt
module evaluation
  -> create engine and all domains
  -> locate #world and #ui-root
  -> create 2D world renderer and HTML renderer
  -> expose window.GameHost.engine/getState/tick
  -> call draw()

frame path
  -> engine.tick(1 / 60)
  -> snapshot runtime state
  -> world.render(snapshot)
       -> read canvas.clientWidth/clientHeight
       -> fall back to window.innerWidth/innerHeight
       -> assign canvas.width and canvas.height
       -> clear the full buffer
       -> draw trees, apples, pests and player around canvas center
  -> ui.render(snapshot)
       -> replace root.innerHTML
  -> requestAnimationFrame(draw)

viewport path
  -> browser layout, resize, orientation or zoom changes ambient values
  -> no explicit event/result enters the runtime
  -> next world render samples current CSS dimensions
  -> DPR remains unobserved
  -> drawing-buffer mutation has no revision, readback or receipt
```

## Source-backed defects

### Drawing-buffer reset occurs every frame

`src/renderer/world-canvas.js` assigns:

```js
canvas.width = w;
canvas.height = h;
```

inside every `render(snapshot)` call. The assignments execute even when dimensions are unchanged. Canvas dimension writes reset the drawing buffer and 2D context state. The runtime has no equality guard, resize dirty flag or surface plan.

At 60 display callbacks per second, this path can request:

```txt
3,600 resets/minute
216,000 resets/hour
```

when the viewport remains unchanged.

### CSS and physical resolution are conflated

The renderer treats CSS pixels as drawing-buffer pixels. It does not read `window.devicePixelRatio`.

Example:

```txt
CSS viewport:         1920 x 1080
DPR:                  2
current buffer:       1920 x 1080
physical-resolution candidate: 3840 x 2160
current pixel count:  2,073,600
physical pixel count: 8,294,400
```

The current buffer contains one quarter of the physical pixels in this example.

A fix must be bounded. A `3840 x 2160` CSS viewport at DPR `2` would request `7680 x 4320`, or 33,177,600 pixels. No product pixel budget or fallback tier currently exists.

### World projection has no viewport policy

The active-session movement clamps the player to:

```txt
x: -360..360
y: -280..280
```

The orchard world also reports default bounds of `720 x 560`. The renderer projects each entity as:

```txt
screenX = canvasWidth / 2 + worldX
screenY = canvasHeight / 2 + worldY
```

There is no world scale, camera transform, contain policy or required-entity visibility check.

A 320-pixel-wide canvas exposes approximately `-160..160` around the center, while the player remains valid at `-360..360`. Valid simulation state can therefore be outside the visible surface.

### Zero-size fallback can break CSS/buffer parity

When either `canvas.clientWidth` or `canvas.clientHeight` is falsy, the renderer falls back to window dimensions. The selected dimensions can disagree with the actual canvas rectangle, but no fallback reason or mismatch result is published.

### Surface provenance is absent

There is no:

```txt
canvasSurfaceId
surfaceRevision
resizeGeneration
viewportObservationId
cssWidth/cssHeight
requestedDpr/appliedDpr
requestedBufferWidth/requestedBufferHeight
actualBufferWidth/actualBufferHeight
pixelBudget
fallbackTier
worldProjectionRevision
worldScale/worldOffset
surfaceCommitResult
visibleSurfaceFrameReceipt
```

`window.GameHost.getState()` returns gameplay snapshots only. It cannot identify which canvas surface displayed a state.

### Existing proof is engine-only

`tests/smoke.mjs` creates the engine in Node and verifies:

```txt
Entry route exists
Play reaches active-session
orchard contains apples
```

It does not instantiate a browser canvas or test DPR, resize, orientation, unchanged-frame behavior, world fit, allocation readback or surface/frame correlation.

## Domains in use

```txt
browser document, full-window CSS layout and DOM ownership
module boot, recursive RAF and public host
runtime registration, domain creation, commands, ticks, events, snapshots, subscriptions and publication
simulation clock and fixed-step gap
12 interface-screen domains and interface composition
resource ledger and pressure field
orchard trees, apples and collection refill
construction, roster and inventory
active-session movement, phases, pests, damage, score and failure
CSS viewport and canvas-rectangle observation
2D drawing-buffer allocation and context-state lifecycle
device-pixel-ratio normalization, capabilities and pixel budgets
world-coordinate projection, fit and viewport membership
resize command, generation, coalescing, commit, rollback and stale-result rejection
canvas world rendering and HTML interface rendering
surface, frame and public diagnostics
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
| render | full-window canvas ownership, centered orchard projection, 2D world drawing, HUD, route screens, cards, delegated click bindings and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static build copy and Pages chain |

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
world-fit-membership-fixture-kit
browser-resize-orientation-smoke-kit
pages-canvas-surface-smoke-kit
```

## Required transaction

```txt
viewport observation
  -> assign observation ID and resize generation
  -> validate runtime session, canvas identity and positive dimensions
  -> normalize requested DPR
  -> enforce canvas capabilities and product pixel budget
  -> derive bounded physical dimensions and fallback tier
  -> derive world scale, offset and membership policy
  -> coalesce superseded resize observations
  -> skip drawing-buffer writes when candidate is unchanged
  -> prepare candidate buffer
  -> read actual canvas dimensions
  -> atomically commit one surface revision or preserve predecessor
  -> render world using committed projection
  -> publish visible surface/frame receipt
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
2b. Player-Control Reachability Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
4a. Frame Publication Fault Containment Authority
4b. Canvas Render Surface Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Proof boundary

Do not claim high-DPI clarity, bounded canvas allocation, redundant-resize elimination, viewport-safe gameplay, surface revision correctness or visible-frame parity until the viewport, DPR, pixel-budget, projection, stale-generation and Pages fixtures pass on `main`.
