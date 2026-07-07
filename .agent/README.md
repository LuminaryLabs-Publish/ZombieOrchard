# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, interface, game-domain, renderer, diagnostics, economy-command, replay, market, worker-assignment, save, codex, render-plan, and smoke-fixture kits.

## Current recommended slice

```txt
Zombie Orchard Market Transaction Authority + Worker Assignment Prep Cutover
```

Build order:

```txt
preserve static host and current playable loop
-> add seeded-random-kit with named streams
-> replace direct Math.random calls with seeded stream APIs while keeping fallbacks
-> add orchard-command-contract-kit
-> add economy-command-replay-kit
-> extend resource-ledger into economy ledger with transaction history and capacity
-> add orchard-market-exchange-kit for sell apples and buy tool/supply actions
-> add exchange screen actions that call market commands
-> split collect into harvest-interaction-kit
-> split phase into day-night-phase-kit
-> split pest behavior into pest-pressure-kit
-> add building-effects-kit for storage capacity
-> add worker-assignment-kit command schema
-> add tool-effects-kit for harvest radius and clear strength
-> add codex-progression-kit and outcome-summary-kit after economy events exist
-> add render-plan-kit after state contracts stabilize
-> expand smoke fixtures for deterministic economy/replay coverage
```

Acceptance target:

```txt
npm test passes
GameHost.getState() still returns all current domain snapshots
GameHost exposes restart({ seed }), dispatch(command), getDiagnostics(), and getCommandJournal()
The same seed plus same command journal replays to the same snapshot
Apple collection smoke is deterministic
Selling apples records a transaction and mutates money/apples
Buying the first tool records a transaction and changes inventory/equipped tool state
Storage shed changes apple capacity or capacity diagnostics
Hiring one worker and assigning one role changes roster assignment state
Night pest spawn is deterministic under seeded replay
Outcome summary includes days, score, money, apples harvested, apples sold, workers, buildings, tools, pests cleared, and codex unlocks
```

## Current tracker entries

- `trackers/2026-07-07T0054-0400/project-breakdown.md` — first full interaction loop, domain, service, kit, and next-step breakdown.
- `trackers/2026-07-07T03-49-46-04-00/project-breakdown.md` — canonical central-ledger follow-up covering the current kit-composed economy shell, interaction loop, domains, service surfaces, explicit kits, gaps, and next economy-loop cutover slice.
- `trackers/2026-07-07T05-01-25-04-00/project-breakdown.md` — service-cutover follow-up that adds the local kit registry, re-identifies the interaction loop, domains, kit services, target extraction kits, and the next Zombie Orchard Economy Service Cutover slice.
- `trackers/2026-07-07T06-10-13-04-00/project-breakdown.md` — economy-command-contract follow-up that re-identifies the loop/domains/services/kits and frames the next cutover around deterministic seeded runtime, a single gameplay command facade, service extraction, economy behavior, save/codex/outcome, render-plan, and deterministic smoke fixtures.
- `trackers/2026-07-07T07-21-19-04-00/project-breakdown.md` — economy-replay-market follow-up that tightens the next cutover around seeded replay, command journal parity, market service runtime, transaction history, worker/building/tool effects, render-plan projection, and deterministic economy smoke fixtures.
- `trackers/2026-07-07T08-29-39-04-00/project-breakdown.md` — market-transaction-authority follow-up that keeps market runtime as the next visible product cut, adds worker-assignment prep, refines transaction/capacity history, and maps deterministic economy smoke coverage.
