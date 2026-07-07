# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, interface, game-domain, renderer, diagnostics, economy-command, save, codex, render-plan, and smoke-fixture kits.

## Current recommended slice

```txt
Zombie Orchard Economy Command Contract Cutover
```

Build order:

```txt
seeded-random-kit
-> orchard-command-contract-kit
-> active-session service split
-> orchard-harvest-interaction-kit
-> orchard-economy-ledger-kit
-> orchard-market-exchange-kit
-> orchard-building-effects-kit
-> orchard-worker-assignment-kit
-> orchard-tool-effects-kit
-> orchard-day-night-phase-kit
-> orchard-pest-pressure-kit
-> orchard-codex-progression-kit
-> orchard-save-runtime-kit
-> orchard-outcome-summary-kit
-> orchard-render-plan-kit
-> orchard-economy-smoke-fixture-kit
```

## Current tracker entries

- `trackers/2026-07-07T0054-0400/project-breakdown.md` — first full interaction loop, domain, service, kit, and next-step breakdown.
- `trackers/2026-07-07T03-49-46-04-00/project-breakdown.md` — canonical central-ledger follow-up covering the current kit-composed economy shell, interaction loop, domains, service surfaces, explicit kits, gaps, and next economy-loop cutover slice.
- `trackers/2026-07-07T05-01-25-04-00/project-breakdown.md` — service-cutover follow-up that adds the local kit registry, re-identifies the interaction loop, domains, kit services, target extraction kits, and the next Zombie Orchard Economy Service Cutover slice.
- `trackers/2026-07-07T06-10-13-04-00/project-breakdown.md` — economy-command-contract follow-up that re-identifies the loop/domains/services/kits and frames the next cutover around deterministic seeded runtime, a single gameplay command facade, service extraction, economy behavior, save/codex/outcome, render-plan, and deterministic smoke fixtures.
