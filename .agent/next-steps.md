# Next steps - ZombieOrchard

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

Turn Play, New Game, Start, Title, and retry into an explicit run lifecycle. The next implementation should allocate deterministic run identity, privately construct every mandatory domain candidate, atomically adopt the successor, suspend gameplay outside active play, reject predecessor work, and prove the first matching HTML/Canvas2D frame.

## Plan ledger

**Goal:** make one start settle exactly once across run identity, gameplay state, interface state, publication, and both render surfaces or leave the predecessor untouched.

- [ ] Define `StartCommandId`, `HostGeneration`, `RunId`, `RunGeneration`, `PresetFingerprint`, `SeedPolicyRevision`, and `Seed`.
- [ ] Define explicit start modes: `new`, `retry`, and `resume`.
- [ ] Make Play choose resume only when an accepted resumable run exists.
- [ ] Make New Game always allocate a distinct successor generation.
- [ ] Make Start issue `RunStartCommand` instead of only routing.
- [ ] Add deterministic orchard generation from the accepted seed.
- [ ] Add reset candidates for resources, pressure, world, construction, roster, inventory, active-session, interface, events, HTML, and Canvas2D.
- [ ] Keep accepted predecessor state immutable during candidate preparation.
- [ ] Atomically adopt all mandatory candidates or retire the complete candidate.
- [ ] Add predecessor outcome retention and retry lineage.
- [ ] Suspend pressure and active gameplay outside accepted active play.
- [ ] Make Title issue `RunExitCommand` before routing.
- [ ] Reject duplicate, stale, retired, and superseded start/exit commands.
- [ ] Reject predecessor ticks, events, commands, and frame publication after successor adoption.
- [ ] Publish typed `RunStartResult` and `RunExitResult` values.
- [ ] Expose `RunGeneration` in snapshots, HUD, GameHost, and Canvas2D evidence.
- [ ] Publish `FirstVisibleRunFrameAck`.
- [ ] Add source, browser, dist, and Pages clean-run fixtures.

## Immediate safe ledge

1. Add one run-lifecycle coordinator without restructuring existing gameplay kits.
2. Move all domain creation behind a function that accepts preset and deterministic seed.
3. Add a candidate engine/domain graph rather than mutating the accepted graph in place.
4. Route Play and Start only after candidate adoption succeeds.
5. Gate `active-session.tick()` and `pressure-field.tick()` by accepted run activity.
6. Preserve the prior engine graph until the successor's first frame is acknowledged.
7. Retire the predecessor graph after acknowledgement.
8. Add a failure-injection fixture for each mandatory participant.

## Target files

```txt
src/game.js
src/start.js
src/kits/runtime.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/run/run-start-authority.js
src/run/run-seed-policy.js
src/run/run-adoption.js
tests/clean-run-reset.fixture.mjs
scripts/smoke-clean-run-browser.mjs
package.json
```

## Required fixtures

```txt
first Play creates a clean generation
New Game Start creates a distinct clean generation
retry cites and preserves predecessor outcome
preset values and empty mutable collections are restored
same seed reproduces the first snapshot
new seed changes the admitted orchard
entry, setup, pause, menus, settings, and outcome suspend gameplay and pressure
Title stops active gameplay admission
duplicate and stale start commands do not mutate state
candidate failure preserves predecessor state
late predecessor work is rejected
HTML and Canvas2D share one successor generation
first visible successor frame is acknowledged
source, dist, and Pages results match
```

## Do not claim

Do not claim clean reset, deterministic replay, pause fidelity, atomic run adoption, predecessor isolation, matching visible state, artifact parity, or production readiness until the fixture matrix passes on `main`.