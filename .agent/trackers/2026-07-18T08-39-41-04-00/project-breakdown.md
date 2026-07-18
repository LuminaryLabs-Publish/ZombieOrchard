# Project breakdown: ZombieOrchard world viewport and camera coverage

**Timestamp:** `2026-07-18T08-39-41-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `world-viewport-camera-coverage-authority-audited`

## Summary

The full `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. Every eligible repository has a central ledger, a root `.agent` folder, and a `main` head matching its documented head. ZombieOrchard had the oldest eligible documented timestamp and was the only project selected.

The focused finding is that `world-canvas-render-kit` projects world coordinates with a fixed origin and unit scale:

```txt
screenX = viewportWidth / 2 + worldX
screenY = viewportHeight / 2 + worldY
```

The playable player bounds are `[-360, 360] x [-280, 280]`, but there is no camera, fit scale, viewport policy, safe-area policy, entity-visibility classification, or matching-frame acknowledgement. On narrow viewports, valid player and interaction positions can be outside the visible canvas.

## Selection comparison

```txt
Publish repositories:                         11
eligible after Cavalry exclusion:             10
central ledger missing:                        0
root .agent missing:                           0
new or otherwise undocumented:                 0
runtime-ahead:                                  0
all eligible heads matched documented heads:  yes
selected: LuminaryLabs-Publish/ZombieOrchard
selection class: oldest synchronized documented timestamp
selected prior timestamp: 2026-07-17T21-40-33-04-00
```

Oldest-to-newest eligible central timestamps before this run:

```txt
ZombieOrchard       2026-07-17T21-40-33-04-00
TheUnmappedHouse    2026-07-17T22-39-01-04-00
PhantomCommand      2026-07-17T23-41-44-04-00
AetherVale          2026-07-18T00-41-30-04-00
TheOpenAbove        2026-07-18T01-41-38-04-00
TheLongHaul         2026-07-18T03-43-36-04-00
HorrorCorridor      2026-07-18T04-41-15-04-00
PrehistoricRush     2026-07-18T05-40-17-04-00
MyCozyIsland        2026-07-18T06-40-59-04-00
IntoTheMeadow       2026-07-18T07-40-23-04-00
TheCavalryOfRome    excluded
```

## Interaction loop

```txt
page load
  -> boot imports start
  -> create runtime and 19 engine-installed kits
  -> create Canvas2D world host and HTML interface host

entry
  -> Play or New Game
  -> active-session route

browser frame
  -> engine.tick(1 / 60)
  -> pressure and active-session simulation
  -> complete domain snapshot
  -> world-canvas render
  -> HTML HUD or route render
  -> request next animation frame

active play
  -> collect nearby apple
  -> clear nearby pest
  -> change day/night phase
  -> enter construction, market, roster, inventory, codex or pause route
  -> return to active session
  -> fail when player condition reaches zero

world projection
  -> read viewport client width and height
  -> center world origin in the viewport
  -> add raw world coordinates at scale 1
  -> draw every tree, apple, pest and the player
```

## Domains in use

```txt
browser startup and RAF host
kit runtime and command dispatch
scoped interface state
entry
session selection
run setup
active session
interrupt/pause
construction interface
exchange interface
roster interface
inventory interface
knowledge interface
preferences interface
outcome interface
interface composition and routing
resource ledger
pressure field
orchard world generation and collection
construction runtime
roster runtime
inventory runtime
player movement, phase, pest, damage, score and failure
Canvas2D world presentation
HTML HUD and route presentation
public GameHost diagnostics
smoke proof
static build
GitHub Pages deployment
central documentation governance
```

## Implemented kits and offered services

1. `kit-runtime` — registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots, subscriptions.
2. `scoped-interface-domain-kit` — screen state, field mutation, selection, action activation, events, snapshots.
3. `entry-domain-kit` — Play, New Game, Settings.
4. `session-select-domain-kit` — Save Select projection, Back.
5. `run-setup-domain-kit` — run setup projection, Start, Back.
6. `active-session-domain-kit` — movement, collection, phase changes, pest simulation, contact damage, clearing, score, failure, stamina field.
7. `interrupt-domain-kit` — Pause, Resume, Title.
8. `construction-domain-kit` — construction projection, Storage Shed action, Back.
9. `exchange-domain-kit` — Market projection, Back.
10. `roster-domain-kit` — Roster projection, Back.
11. `inventory-domain-kit` — Inventory projection, Back.
12. `knowledge-domain-kit` — Codex projection, Back.
13. `preferences-domain-kit` — Settings projection, Back.
14. `outcome-domain-kit` — outcome projection, Title.
15. `interface-composition-kit` — route transitions, nested commands, Back, outcome routing.
16. `resource-ledger-kit` — balance checks, payments, grants, snapshots.
17. `pressure-field-kit` — pressure channels, clamped adjustment, time growth, commands, snapshots.
18. `orchard-world-kit` — tree generation, apple generation/refill, collection, bounds, snapshots.
19. `construction-runtime-kit` — catalog lookup, payment, built records, messages, snapshots.
20. `roster-runtime-kit` — hiring payment, actor records, messages, snapshots.
21. `inventory-runtime-kit` — item snapshots, equipment mutation.
22. `world-canvas-render-kit` — canvas sizing and player/tree/apple/pest projection.
23. `html-interface-render-kit` — delegated route/gameplay commands, HUD and card projection.
24. `game-host-diagnostics-kit` — raw engine exposure, state readback, manual ticking.
25. `smoke-fixture-kit` — entry, Play and orchard-apple assertions.
26. `static-build-copy-kit` — static dist assembly.
27. `pages-deploy-kit` — GitHub Pages publication.

## Source-backed viewport finding

```txt
playable player X: -360..360
playable player Y: -280..280
world span: 720 x 560
camera state: absent
projection scale: fixed at 1
camera follow: absent
camera clamp: absent
world-fit policy: absent
safe-area policy: absent
world bounds consumed by renderer: no
entity visibility result: absent
first camera-bound frame acknowledgement: absent
```

Viewport examples:

```txt
320 x 568 portrait
  visible horizontal world span: 320 / 720 = 44.4%
  player at x=360: 200 px beyond the right edge

375 x 667 portrait
  visible horizontal world span: 375 / 720 = 52.1%
  player at x=360: 172.5 px beyond the right edge

640 x 480 landscape
  visible vertical world span: 480 / 560 = 85.7%
  player at y=280: 40 px beyond the bottom edge
```

Trees extend to `x = +/-320`; apple jitter can extend approximately 17 units farther. The renderer does not distinguish intentionally offscreen entities from entities hidden because the viewport cannot cover the playable area.

## Proposed authority

**Proposed only; no runtime implementation was added:**

`zombie-orchard-world-viewport-camera-coverage-authority-domain`

```txt
ViewportAdmissionCommand
  -> ViewportAdmissionResult

CameraSettlementCommand
  -> CameraSettlementResult

WorldProjectionCommand
  -> WorldProjectionResult

EntityVisibilityClassificationCommand
  -> EntityVisibilityResult

WorldFrameCommitCommand
  -> WorldViewportFrameDigest
  -> FirstCameraBoundFrameAck
```

Planned surfaces:

```txt
zombie-orchard-world-viewport-camera-coverage-authority-domain
world-extent-policy-kit
viewport-metrics-kit
camera-state-kit
camera-follow-policy-kit
camera-clamp-policy-kit
world-to-screen-transform-kit
screen-to-world-transform-kit
projection-scale-policy-kit
safe-area-inset-kit
hud-occlusion-policy-kit
entity-visibility-classification-kit
interaction-range-projection-kit
world-viewport-result-kit
camera-projection-result-kit
first-camera-bound-frame-ack-kit
portrait-viewport-fixture-kit
small-landscape-viewport-fixture-kit
edge-traversal-fixture-kit
source-dist-pages-camera-parity-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, simulation, rendering, tests, package scripts, workflows and deployment were not changed. The source files were inspected through the GitHub connector. A direct checkout was attempted but the execution environment could not resolve `github.com`, so `npm test`, `npm run build`, browser viewport fixtures, artifact smoke and Pages smoke were not run.
