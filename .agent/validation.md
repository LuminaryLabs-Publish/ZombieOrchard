# Validation — ZombieOrchard

## Scope

Documentation-only route-scoped simulation admission audit. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the exact hidden-mutation gap and the proof required before Pause, menu idleness, management-screen safety or terminal freeze claims are made.

- [x] Read module boot and RAF scheduling.
- [x] Read runtime all-domain tick behavior.
- [x] Read interface routing and composition.
- [x] Read pressure and active-session tick behavior.
- [x] Read preset routes and visible actions.
- [x] Read canvas and HTML projection.
- [x] Confirm no route-scoped simulation admission policy exists.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run route suspension fixtures.

## Source-backed findings

```txt
src/start.js
  -> starts RAF immediately
  -> submits engine.tick(1 / 60) every callback
  -> exposes raw manual tick

src/kits/runtime.js
  -> clamps delta
  -> increments elapsed/frame
  -> ticks every registered domain
  -> does not consult lifecycle, route or pause state

src/kits/composition.js
  -> tracks active and previous route
  -> moves routes
  -> does not own simulation phase or tick policy

src/kits/game-domains.js
  -> pressure-field always grows
  -> active-session stops only when ended
  -> pests, pursuit and damage do not inspect route

src/presets/orchard-preset.js
  -> Pause routes to interrupt
  -> management screens are routes only
  -> no policy distinguishes real-time from suspended screens

src/renderer/world-canvas.js
  -> renders orchard/session state on every route
  -> no route/phase/tick/frame provenance
```

## Required DOM-free fixtures

```txt
entry-idle
  -> many admitted presentation frames
  -> pressure, pests, score and player unchanged

run-setup-idle
  -> no hidden run mutation before Start

active-session-advance
  -> exact admitted fixed steps mutate expected domains

pause-suspension
  -> many presentation frames
  -> simulation fingerprint unchanged

resume-baseline
  -> no catch-up burst from paused wall time

management-policy
  -> each route follows declared real-time or suspended policy

terminal-freeze
  -> Outcome preserves terminal simulation and pressure state

manual-step-admission
  -> raw or stale manual step rejected
  -> fixture-only override is explicit and journaled
```

## Required browser fixtures

```txt
Entry remains visually responsive while simulation is idle
Pause overlay stays visible and gameplay state remains frozen
Resume continues from the same committed tick
Build/Market/Roster/Inventory/Codex follow declared policy
Title and Settings do not mutate the retained run
Outcome frame remains terminal
canvas, HTML and GameHost agree on route, phase, tick and frame
one RAF chain and one delegated listener remain after transitions
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
menu-idle fixture: unavailable / not run
pause fixture: unavailable / not run
management-route fixture: unavailable / not run
terminal-freeze fixture: unavailable / not run
manual-step admission fixture: unavailable / not run
route/tick/frame parity fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No authoritative pause, menu idleness, management-route safety, terminal freeze or route/frame coherence claim is made.
