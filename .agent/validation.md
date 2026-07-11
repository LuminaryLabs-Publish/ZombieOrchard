# Validation — ZombieOrchard

## Latest pass

`2026-07-11T01-31-15-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Confirmed all nine eligible non-Cavalry repositories have central ledger and root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Re-read package.json, src/boot.js, src/start.js, src/game.js and tests/smoke.mjs.
- Re-read runtime.js, game-domains.js, composition.js, scoped-interface-domains.js and orchard-preset.js.
- Re-read both renderer modules.
- Reconfirmed the interaction loop, domains, kits and offered services.
- Traced every reachable data-action and data-command path.
- Confirmed nested child dispatch uses public engine.command().
- Confirmed nested child dispatch can notify before parent completion.
- Confirmed interface composition discards child results.
- Confirmed a failed build can be hidden behind a parent accepted result.
- Confirmed resource payment is boolean-only.
- Confirmed unknown construction IDs fall back to the first catalog item.
- Confirmed inventory equip accepts arbitrary IDs.
- Confirmed no command sequence, transaction ID, commit barrier, rollback result, command journal or render correlation exists.
- Added timestamped tracker, turn ledger, architecture, render, gameplay, interaction, command-transaction and deploy audits.
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
session fixture: unavailable
clock parity fixture: unavailable
capability fixture: unavailable
command transaction fixture: unavailable
seed/replay fixture: unavailable
```

## Why runtime validation was not run

This pass changed internal documentation only. Repository source inspection and documentation writes were performed through the GitHub connector. No local Node or browser execution environment was used for the repository.

## Required Gate 1 fixtures — Session instance and reset fidelity

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

## Required Gate 2 fixtures — Fixed-step clock

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

## Required Gate 3 fixtures — Capability reachability

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

## Required Gate 4 fixtures — Composite command transaction authority

```txt
one parent action receives one commandId and transactionId
route-only action returns one terminal result
valid nested build returns parent, child and resource results
invalid build ID rejects without fallback mutation
insufficient resources rejects without resource or build mutation
missing child domain rejects before route mutation
required child rejection suppresses dependent route commit
successful child-plus-route action commits atomically
subscriber publication count is exactly one for a committed intent
rejected transaction preserves before fingerprint
resource results expose before, delta and after values
unknown equipment ID rejects without mutation
bounded command journal matches returned result
next render observation names committed commandId
```

## Required Gate 5 fixtures — Seeded random and replay authority

```txt
explicit seed accepted by session start
generated seed returned and retained when no seed is supplied
separate world and encounter stream cursors
same seed creates the same initial apple IDs, positions and kinds
same seed plus same collect sequence creates the same replenishment apples
same seed plus same committed night ticks creates the same spawn decisions
same seed creates the same pest IDs and spawn positions
same committed command/tick schedule creates the same score, damage and ended result
random decision rows carry epoch, tick, stream, draw index, purpose and outcome
state fingerprints carry commandId and consumed random decision range
pause does not advance any random stream
different seeds diverge while preserving invariants
replay receipt reproduces the final committed fingerprint
```

## Deployment statement

The Pages workflow already runs `npm test` before `npm run build`. The workflow shape is adequate. The missing protection is fixture coverage for session authority, clock parity, capability reachability, composite command transactions, seeded streams, deterministic replay, and render/state provenance.
