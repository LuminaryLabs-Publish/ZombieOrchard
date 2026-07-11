# Validation — ZombieOrchard

## Latest pass

`2026-07-10T23-50-53-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Confirmed all nine eligible non-Cavalry repositories have central ledger and root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Re-read package.json, src/start.js, src/game.js and tests/smoke.mjs.
- Re-read runtime.js, game-domains.js, composition.js, scoped-interface-domains.js and orchard-preset.js.
- Re-read both renderer modules.
- Reconfirmed the interaction loop, domains, kits and offered services.
- Traced every direct global Math.random() consumer.
- Confirmed orchard-world randomizes tree selection, apple ID, offsets and kind.
- Confirmed active-session randomizes night spawn admission, pest angle and pest ID.
- Confirmed no seed, random provider, stream state, draw index, decision row or replay receipt exists.
- Confirmed snapshots and GameHost omit random provenance.
- Confirmed the existing smoke test does not assert deterministic behavior.
- Added timestamped tracker, turn ledger, architecture, render, gameplay, interaction, randomness and deploy audits.
- Refreshed all required root .agent files and the kit registry.
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
session fixtures: not run because they do not exist yet
clock parity fixtures: not run because they do not exist yet
capability fixtures: not run because they do not exist yet
seed/replay fixtures: not run because they do not exist yet
```

## Why runtime validation was not run

This pass changed internal documentation only. Source inspection and documentation updates were performed through the GitHub connector; repository-local Node and browser execution were not available in this run.

## Required Gate 1 fixtures — session instance and reset fidelity

```txt
fresh boot reports idle with sessionEpoch 0
Play commits one running session
New Game increments epoch and restores every reset-owned domain
Pause freezes gameplay-owned fingerprints
Title retires or stops the current run
Outcome records ended once
Outcome -> Title stays on Entry
Stop cancels future automatic ticks
Dispose removes click and RAF ownership
commands after dispose return a stable rejection
GameHost lifecycle readback is detached, bounded and JSON-safe
```

## Required Gate 2 fixtures — fixed-step clock

```txt
manual wall clock
30/60/120 Hz render schedules over equal wall time
same committed simulation tick count
same gameplay fingerprint
maximum catch-up policy
bounded dropped-time result
render frame ID separated from simulation tick ID
manual tick rejected during automatic mode
```

## Required Gate 3 fixtures — capability reachability

```txt
canonical capability catalog
public/direct/indirect/internal/dormant/unsupported classification
route and affordance for every public direct capability
typed result for every public command
keyboard and accessible movement
movement rejected outside running state
seeded move-to-apple and collect scenario
roster hire and inventory equip reachable or non-public
Market explicitly unsupported until implemented
disabled actions rendered disabled
```

## Required Gate 4 fixtures — seeded random and replay authority

```txt
explicit seed accepted by session start
generated seed returned and retained when no seed is supplied
separate world and encounter stream cursors
same seed creates the same initial apple IDs, positions and kinds
same seed plus same collect sequence creates the same replenishment apples
same seed plus same committed night ticks creates the same spawn decisions
same seed creates the same pest IDs and spawn positions
same command/tick schedule creates the same score, damage and ended result
random decision rows carry epoch, tick, stream, draw index, purpose and outcome
state fingerprints carry the consumed random decision range
pause does not advance any random stream
New Game follows the declared seed reuse or replacement policy
different seeds diverge while preserving invariants
replay receipt reproduces the final committed fingerprint
```

## Deployment statement

The existing Pages workflow already runs `npm test` before `npm run build`. The workflow shape is adequate. The missing protection is fixture coverage for session authority, clock parity, capability reachability, seeded streams, deterministic replay, and render/state provenance.
