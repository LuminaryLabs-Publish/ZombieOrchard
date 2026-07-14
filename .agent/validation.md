# Validation - ZombieOrchard

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Scope

Documentation-only audit of organization selection, browser boot, engine creation, route actions, unconditional ticking, mutable domain ownership, New Game and retry behavior, outcome return, Canvas2D/HTML projection, smoke proof, static build, Pages deployment, and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before clean-run claims are made.

- [x] Read the current Publish organization inventory.
- [x] Compare all ten eligible repositories with central tracking.
- [x] Confirm no new, ledger-missing, root-agent-missing, or runtime-ahead repository has priority.
- [x] Select ZombieOrchard as the oldest eligible central entry.
- [x] Read `index.html`, `src/boot.js`, `src/start.js`, and `src/game.js`.
- [x] Read `src/kits/runtime.js`.
- [x] Read `src/kits/scoped-interface-domains.js`.
- [x] Read `src/kits/composition.js`.
- [x] Read `src/kits/game-domains.js`.
- [x] Read `src/presets/orchard-preset.js`.
- [x] Read both renderers.
- [x] Read `tests/smoke.mjs` and `package.json`.
- [x] Confirm start, exit, reset, suspension, and presentation are not one transaction.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped audits and root routing.
- [x] Keep documentation writes on `main` with no branch or pull request.
- [ ] Implement and run clean-run fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates one engine at page load
  -> ticks it every RAF
  -> exposes the same engine through GameHost

src/presets/orchard-preset.js
  -> Play routes to active-session
  -> New Game routes to run-setup
  -> Start routes to active-session
  -> Pause, Resume, Title, and outcome actions are route descriptors only

src/kits/runtime.js
  -> every tick invokes every domain tick
  -> no route, run, pause, or generation gate
  -> no reset, replacement, or domain retirement API

src/kits/composition.js
  -> transition mutates active and previous only
  -> ended session routes to outcome

src/kits/game-domains.js
  -> each domain closes over private mutable state
  -> orchard generation uses Math.random()
  -> pressure ticks unconditionally
  -> active-session ticks whenever not ended
  -> no domain exposes reset or run identity

src/renderer/world-canvas.js
  -> always renders orchard-world and active-session
  -> ignores active interface route and run identity

src/renderer/html-interface-renderer.js
  -> routes and HUD expose no RunGeneration

tests/smoke.mjs
  -> verifies Entry, first Play, and apple presence only
```

## Deterministic observations

```txt
accessible Publish repositories: 11
eligible repositories: 10
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
engine instances created at browser boot: 1
run start commands: 0
run reset commands: 0
run IDs or generations: 0
deterministic seed inputs: 0
mutable gameplay domains with reset APIs: 0
route-gated tick checks: 0
predecessor outcome artifacts: 0
atomic candidate adoption paths: 0
HTML RunGeneration consumers: 0
Canvas2D RunGeneration consumers: 0
clean-run fixtures: 0
```

## Required fixture matrix

```txt
first Play creates one clean RunGeneration
New Game Start creates a distinct clean RunGeneration
retry cites and retains predecessor outcome
preset resources and inventory are restored
construction, roster, pests, score, damage, day, and ended state reset
same seed reproduces first world and state snapshot
new seed produces a distinct admitted world
entry, setup, pause, menus, settings, and outcome suspend gameplay and pressure
Title retires active gameplay admission
outcome -> title -> Play does not rebound to predecessor outcome
duplicate and stale commands settle at most once
candidate failure preserves predecessor state
late predecessor work is rejected
HTML and Canvas2D show one accepted generation
source, dist, and Pages behavior match
first visible successor frame is acknowledged
```

## Validation result

```txt
runtime source changed: no
HTML or CSS changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
run lifecycle behavior changed: no
random generation changed: no
canvas behavior changed: no
HTML behavior changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
headless clean-run fixtures: unavailable / not run
browser clean-run fixtures: unavailable / not run
dist clean-run smoke: unavailable / not run
Pages clean-run smoke: unavailable / not run
```

No clean run creation, deterministic replay, route suspension, atomic domain adoption, predecessor isolation, matching visible state, artifact parity, or production-readiness claim is made.