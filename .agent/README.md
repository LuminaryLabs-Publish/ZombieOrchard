# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, interface, game-domain, renderer, diagnostics, economy-command, replay, market, save, codex, render-plan, and smoke-fixture kits.

## Current recommended slice

```txt
Zombie Orchard Economy Replay + Market Service Cutover
```

Build order:

```txt
preserve static host and current playable loop
-> add seeded-random-kit
-> add orchard-command-contract-kit
-> add economy-command-replay-kit
-> make resource-ledger transaction history and capacity explicit
-> add market-exchange-kit with sell-apples, buy-tool, buy-supply, and price snapshot commands
-> split active-session collect into harvest-interaction-kit
-> split active-session next-phase into day-night-phase-kit
-> split active-session pest spawn/chase/damage/clear into pest-pressure-kit
-> add building-effects-kit
-> add worker-assignment-kit
-> add tool-effects-kit
-> add codex-progression-kit
-> add outcome-summary-kit
-> add render-plan-kit
-> expand tests/smoke.mjs into deterministic economy smoke fixtures
```

Acceptance target:

```txt
npm test passes
GameHost.getState() still returns all current domain snapshots
GameHost exposes getDiagnostics(), restart({ seed }), dispatch(command), and getCommandJournal()
The same seed and command journal replay to the same snapshot
Collecting an apple can be asserted deterministically in Node smoke
Selling apples at market mutates resources and transaction history
Buying a tool changes inventory and future harvest/clear behavior
Building storage changes apple capacity
Hiring and assigning one worker affects morning settlement or night defense
Night pest spawn is deterministic under seeded replay
Outcome summary includes days, score, money, apples, workers, buildings, tools, pests cleared, and codex unlocks
```

## Current tracker entries

- `trackers/2026-07-07T0054-0400/project-breakdown.md` — first full interaction loop, domain, service, kit, and next-step breakdown.
- `trackers/2026-07-07T03-49-46-04-00/project-breakdown.md` — canonical central-ledger follow-up covering the current kit-composed economy shell, interaction loop, domains, service surfaces, explicit kits, gaps, and next economy-loop cutover slice.
- `trackers/2026-07-07T05-01-25-04-00/project-breakdown.md` — service-cutover follow-up that adds the local kit registry, re-identifies the interaction loop, domains, kit services, target extraction kits, and the next Zombie Orchard Economy Service Cutover slice.
- `trackers/2026-07-07T06-10-13-04-00/project-breakdown.md` — economy-command-contract follow-up that re-identifies the loop/domains/services/kits and frames the next cutover around deterministic seeded runtime, a single gameplay command facade, service extraction, economy behavior, save/codex/outcome, render-plan, and deterministic smoke fixtures.
- `trackers/2026-07-07T07-21-19-04-00/project-breakdown.md` — economy-replay-market follow-up that tightens the next cutover around seeded replay, command journal parity, market service runtime, transaction history, worker/building/tool effects, render-plan projection, and deterministic economy smoke fixtures.
