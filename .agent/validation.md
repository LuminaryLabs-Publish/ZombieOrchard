# Validation — ZombieOrchard

## Latest pass

`2026-07-10T22-11-24-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Confirmed all nine eligible non-Cavalry repositories have central ledger and root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Re-read package.json and the active source path.
- Re-read src/start.js and src/game.js.
- Re-read runtime.js, game-domains.js, composition.js, scoped-interface-domains.js, and orchard-preset.js.
- Re-read both renderer modules and tests/smoke.mjs.
- Reconfirmed the interaction loop, active domains, kits, and offered services.
- Traced Play, New Game, Pause, Resume, Title, Outcome, Stop, and Dispose behavior.
- Confirmed that Play and New Game are screen transitions only.
- Confirmed that Title does not retire or reset the current state graph.
- Confirmed that ended state survives Outcome -> Title and can force Outcome again.
- Confirmed that no session epoch, reset factory, stop, or disposal contract exists.
- Added timestamped tracker, turn ledger, architecture, render, gameplay, interaction, session-authority, and deploy audits.
- Refreshed the required root .agent files and kit registry.
```

## Runtime validation not performed

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy configuration changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
session start/reset fixture: not run because it does not exist yet
title/outcome fixture: not run because it does not exist yet
stop/dispose fixture: not run because it does not exist yet
30/60/120 Hz parity fixture: not run because it does not exist yet
movement reachability fixture: not run because it does not exist yet
```

## Why runtime validation was not run

This pass changed internal documentation only. The available GitHub connector supported source inspection and direct documentation updates but did not execute repository-local Node or browser commands.

## Required Gate 1 fixtures — session instance and reset fidelity

```txt
fresh boot reports idle with sessionEpoch 0
Play commits running with sessionEpoch 1
Play creates one preset-backed state fingerprint
New Game increments the epoch and restores every reset-owned domain
resources reset to preset values
pressure resets to preset values
orchard population resets according to the selected deterministic policy
construction built list resets
roster actors reset
inventory equipment resets
active-session day, phase, player, pests, score, message, and ended reset
Pause freezes gameplay-owned fingerprints
Resume preserves epoch and resumes from the same committed state
Title retires or stops the session according to explicit policy
Outcome records ended once
Outcome -> Title stays on Entry and does not bounce back
repeated New Game produces exactly one live session owner
Stop cancels future automatic ticks
Dispose removes click and RAF ownership
commands after dispose return a stable rejection result
GameHost readback is detached, bounded, and JSON-safe
```

## Required Gate 2 fixtures — fixed-step clock

```txt
manual wall clock
30 Hz render schedule over fixed wall time
60 Hz render schedule over fixed wall time
120 Hz render schedule over fixed wall time
same committed simulation tick count across schedules
same gameplay fingerprint across schedules
maximum catch-up policy enforced
bounded dropped-time result
render frame ID separated from simulation tick ID
manual GameHost tick rejected during automatic mode
```

## Required Gate 3 fixtures — capability reachability

```txt
canonical capability catalog
stable capability IDs and ownership
public/direct/indirect/internal/dormant/unsupported classification
route for every public screen capability
rendered affordance for every public direct capability
binding for every rendered affordance
typed result for every public command
keyboard and accessible on-screen movement
movement rejection outside running state
seeded move-to-apple and collect scenario
roster hire and inventory equip reachable or non-public
Session Select linked or dormant
Market explicitly unsupported until implemented
disabled actions rendered disabled
browser smoke for movement, collection, build, and pause rejection
```

## Deployment statement

The existing Pages workflow already runs `npm test` before `npm run build`. The workflow shape is adequate. The missing protection is fixture coverage for session-instance authority, reset fidelity, title/outcome behavior, clock parity, disposal, and capability reachability.