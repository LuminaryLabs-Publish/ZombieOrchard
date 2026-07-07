# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, interface, game-domain, renderer, diagnostics, command, transaction-ledger, market-exchange, market UI, replay, worker-assignment, save, codex, render-plan, and smoke-fixture kits.

## Current recommended slice

```txt
Zombie Orchard Exchange Command UI + Transaction Ledger Contract Cutover
```

Build order:

```txt
preserve static host and current playable loop
-> add seeded-random-kit with named streams while keeping fallbacks
-> add orchard-command-contract-kit with command/result metadata
-> upgrade resource-ledger-kit toward orchard-economy-ledger-kit with transaction records
-> define transaction types: harvest_gain, market_sell, market_buy, build_spend, hire_spend, settlement_gain, capacity_reject
-> add capacity-policy-kit with permissive starter defaults
-> add price-snapshot-kit with fixed starter prices
-> add orchard-market-exchange-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT
-> add exchange screen actions for Sell Apples, Buy Basic Tool, and Buy Row Supply
-> render recent transaction cards on exchange screen
-> route purchased tools into inventory-runtime-kit and auto-equip first purchased tool
-> add market-transaction-smoke-kit for collect, sell, buy, insufficient funds, and transaction history
-> add GameHost diagnostics for journal length, last transaction, prices, capacities, and seed
-> defer worker assignment until transaction history and inventory purchase behavior are visible
```

Acceptance target:

```txt
npm test passes
GameHost.getState() still returns all current domain snapshots
GameHost exposes restart({ seed }), dispatch(command), getDiagnostics(), and getCommandJournal()
Resource snapshots include values plus transactions without breaking current HUD reads
Exchange screen has visible sell/buy actions
Selling apples mutates apples/money and records a market_sell transaction
Buying a basic tool mutates money/inventory and records a market_buy transaction
Insufficient money/apples returns accepted=false with a reason and no resource mutation
Price snapshot is deterministic for the same seed/config
Market transaction smoke runs without DOM timing assumptions
Worker assignment remains a follow-on slice, not part of the first market UI cut
```

## Current tracker entries

- `trackers/2026-07-07T0054-0400/project-breakdown.md` — first full interaction loop, domain, service, kit, and next-step breakdown.
- `trackers/2026-07-07T03-49-46-04-00/project-breakdown.md` — canonical central-ledger follow-up covering the current kit-composed economy shell, interaction loop, domains, service surfaces, explicit kits, gaps, and next economy-loop cutover slice.
- `trackers/2026-07-07T05-01-25-04-00/project-breakdown.md` — service-cutover follow-up that adds the local kit registry, re-identifies the interaction loop, domains, kit services, target extraction kits, and the next Zombie Orchard Economy Service Cutover slice.
- `trackers/2026-07-07T06-10-13-04-00/project-breakdown.md` — economy-command-contract follow-up that re-identifies the loop/domains/services/kits and frames the next cutover around deterministic seeded runtime, a single gameplay command facade, service extraction, economy behavior, save/codex/outcome, render-plan, and deterministic smoke fixtures.
- `trackers/2026-07-07T07-21-19-04-00/project-breakdown.md` — economy-replay-market follow-up that tightens the next cutover around seeded replay, command journal parity, market service runtime, transaction history, worker/building/tool effects, render-plan projection, and deterministic economy smoke fixtures.
- `trackers/2026-07-07T08-29-39-04-00/project-breakdown.md` — market-transaction-authority follow-up that keeps market runtime as the next visible product cut, adds worker-assignment prep, refines transaction/capacity history, and maps deterministic economy smoke coverage.
- `trackers/2026-07-07T09-41-43-04-00/project-breakdown.md` — exchange-command-ui follow-up that narrows the next cut to market sell/buy actions, transaction-ledger records, price snapshots, inventory unlock intake, exchange transaction cards, and market smoke before worker assignment.
