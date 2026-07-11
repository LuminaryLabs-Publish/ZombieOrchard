# Validation — ZombieOrchard

## Latest pass

`2026-07-10T20-30-23-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Confirmed all nine eligible non-Cavalry repositories have central ledger and root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Read package.json, README.md, and index.html.
- Read src/boot.js, src/start.js, and src/game.js.
- Read src/kits/runtime.js, composition.js, scoped-interface-domains.js, and game-domains.js.
- Read src/presets/orchard-preset.js.
- Read both renderer modules and tests/smoke.mjs.
- Read .github/workflows/deploy-pages.yml.
- Reconfirmed the interaction loop, domains, kits, and offered services.
- Traced every implemented command from domain owner through preset route and renderer binding.
- Classified direct, indirect, unreachable, dormant, and unsupported capabilities.
- Confirmed that active-session movement has no browser input path.
- Confirmed that roster hiring and inventory equipment have no rendered affordances.
- Confirmed that session-select has no incoming route and Market has no operational service.
- Added timestamped tracker, turn ledger, architecture, render, gameplay, interaction, capability-reachability, and deploy audits.
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
pause/reset/dispose fixture: not run because it does not exist yet
movement reachability fixture: not run because it does not exist yet
service-binding fixture: not run because it does not exist yet
capability catalog fixture: not run because it does not exist yet
```

## Why runtime validation was not run

This pass changed internal documentation only. No runtime, package, renderer, fixture, or deployment implementation changed. The available GitHub connector supported source inspection and direct documentation updates but did not execute repository-local Node or browser commands.

## Validation required for Gate 1 — lifecycle and clock

```txt
DOM-free lifecycle fixture
manual-clock fixture
30 Hz render schedule over fixed wall time
60 Hz render schedule over fixed wall time
120 Hz render schedule over fixed wall time
same committed simulation tick count across schedules
same gameplay fingerprint across schedules
pause freezes every gameplay-owned domain
New Game full reset from preset
Outcome -> Title persistence
single RAF after repeated restart
single click listener after repeated renderer recreation
stop cancels future automatic ticks
dispose rejects future mutation
manual GameHost tick rejected during automatic mode
bounded lifecycle and clock journal checks
```

## Validation required for Gate 2 — capability reachability

```txt
canonical capability catalog export
stable capability IDs and ownership
public/direct/indirect/internal/dormant/unsupported classification
route existence for every public screen capability
rendered affordance for every public direct capability
binding existence for every rendered affordance
typed result for every public command
keyboard movement fixture
accessible on-screen movement fallback fixture
movement rejection while paused or outside active gameplay
move-to-apple and successful-collect deterministic scenario
roster hire binding or explicit non-public classification
inventory equip binding or explicit non-public classification
session-select route or explicit dormant classification
Market explicit unsupported state until service exists
disabled action metadata reflected by disabled controls
bounded GameHost capability/result readback
browser smoke for movement, collection, build, and pause rejection
npm test
npm run build
```

## Required capability fixture assertions

- The exported capability catalog is JSON-safe, versioned, and stable across equivalent boots.
- No capability marked `public-direct` lacks a route, affordance, command binding, result schema, or observable effect.
- `active-session.move` is reachable through browser input and changes player coordinates only while the session is running.
- Pause rejects movement and preserves player coordinates.
- A seeded scenario can move from the starting position to an apple and collect it successfully.
- Roster hiring and inventory equipment are either operationally reachable or explicitly classified as non-public.
- Session Select is either linked from Entry or explicitly dormant.
- Market does not claim operational trading before a market command and transaction service exist.
- Disabled actions are not invokable through the rendered control.
- GameHost capability and result journals are bounded, detached from live mutable state, and JSON-safe.
- Existing lifecycle parity remains green before capability fixtures are considered authoritative.

## Deployment statement

The current Pages workflow already runs `npm test` before `npm run build`. The workflow structure is adequate. The missing work is lifecycle, clock, capability reachability, deterministic scenario, and transaction fixture coverage inside the test command.