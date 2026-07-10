# Validation — ZombieOrchard

## Latest pass

`2026-07-10T18-49-54-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Confirmed all nine eligible non-Cavalry repositories have central ledger and root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Read package.json and README.md.
- Read src/boot.js, src/start.js, and src/game.js.
- Read src/kits/runtime.js, composition.js, scoped-interface-domains.js, and game-domains.js.
- Read src/presets/orchard-preset.js.
- Read both renderer modules and tests/smoke.mjs.
- Read .github/workflows/deploy-pages.yml.
- Reconfirmed the interaction loop, domains, services, and kits.
- Traced session creation, screen transitions, tick eligibility, RAF ownership, manual GameHost ticking, outcome routing, listener ownership, and disposal boundaries.
- Added a timestamped tracker, turn ledger, architecture audit, render audit, gameplay audit, interaction audit, lifecycle audit, time-authority audit, and deploy audit.
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
30/60/120 Hz parity fixture: not run because it does not exist yet
pause leakage fixture: not run because it does not exist yet
reset/re-entry fixture: not run because it does not exist yet
start/stop/dispose fixture: not run because it does not exist yet
```

## Why runtime validation was not run

This pass changed internal documentation only. No runtime, package, renderer, fixture, or deployment implementation changed. The connector supported source inspection and direct documentation updates but did not execute repository-local Node or browser commands.

## Validation required for the next implementation

```txt
DOM-free lifecycle fixture
manual-clock fixture
30 Hz render schedule over fixed wall time
60 Hz render schedule over fixed wall time
120 Hz render schedule over fixed wall time
same committed simulation tick count across schedules
same gameplay fingerprint across schedules
pause freezes every gameplay-owned domain
render may continue while simulation is paused
New Game full reset from preset
Play start/resume policy
Outcome -> Title persistence
single RAF after repeated restart
single click listener after repeated renderer recreation
stop cancels future automatic ticks
dispose rejects future mutation
manual GameHost tick rejected during automatic mode
bounded lifecycle and clock journal checks
catch-up cap and dropped-time reason checks
npm test
npm run build
browser smoke
```

## Required fixture assertions

- No gameplay tick occurs in `idle`, `starting`, `paused`, `stopped`, `disposed`, or `failed` states.
- Equal wall time under 30/60/120 Hz render schedules produces the same simulation tick count and gameplay fingerprint.
- Pause preserves pressure, pest, player-condition, score, resource, world, construction, roster, inventory, and phase fingerprints.
- New Game resets all declared session-owned domains to the preset policy.
- Outcome -> Title stays at Entry until an explicit start action.
- Repeated start/stop/restart cycles never create more than one automatic clock loop.
- Renderer disposal removes the delegated click listener exactly once.
- Manual and automatic clock modes cannot mutate the same session concurrently.
- Lifecycle results include stable transition IDs, prior/next states, accepted status, and reasons.
- Clock-step observations include wall delta, accumulated time, executed steps, committed tick range, catch-up cap, and dropped time.
- `GameHost` lifecycle/clock readback is bounded, immutable to consumers, and JSON-safe.
- Deterministic scenario IDs and command/frame rows are scoped beneath the authoritative session.

## Deployment statement

The current Pages workflow already runs `npm test` before `npm run build`. The workflow structure is adequate. The missing work is lifecycle, clock, deterministic scenario, and transaction fixture coverage inside the test command.