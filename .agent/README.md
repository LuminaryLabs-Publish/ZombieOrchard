# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, interface, game-domain, renderer, diagnostics, market action UI, command dispatch, ledger snapshot, transaction history, price snapshot, capacity policy, inventory unlock, replay, and smoke-fixture kits.

## Current recommended slice

```txt
Zombie Orchard Market Action Dispatch + Ledger Snapshot Fixture Cutover
```

Build order:

```txt
preserve static host and current playable loop
-> add price-snapshot-kit with fixed starter prices for apples, basic-tool, and row-supply
-> add capacity-policy-kit with starter capacities for apples, money, wood, scrap, tools, and supplies
-> upgrade resource-ledger-kit into orchard-economy-ledger-kit behavior without breaking snapshot.values reads
-> keep snapshot.values as the current HUD-compatible resource surface
-> add snapshot.transactions as durable records with id, type, time/frame, before, delta, after, itemId, quantity, price, accepted, and reason
-> add orchard-command-contract-kit for SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT
-> add market-command-dispatch-kit as the narrow action facade used by exchange actions
-> update orchard-preset exchange actions: sell-apples, buy-basic-tool, buy-row-supply, back
-> update interface-composition-kit so nested command results are returned and stored as lastResult
-> update html-interface-renderer exchange screen with prices, disabled reasons, and recent transaction cards
-> route bought basic tool and row supply into inventory-runtime-kit through inventory-market-unlock-kit
-> auto-equip the first bought tool only if the player still has the starter branch equipped
-> extend GameHost with dispatch, getDiagnostics, getCommandJournal, getPriceSnapshot, and runSmoke
-> extend tests/smoke.mjs with collect/sell/buy/insufficient-funds/transaction-history smoke
-> defer worker assignment until these market records are visible and deterministic
```

Acceptance target:

```txt
npm test passes
GameHost.getState() still returns resource-ledger.values for current HUD compatibility
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples rejects cleanly when apples are 0 and records or exposes a rejection reason
Collect then Sell Apples mutates apples and money through a market_sell transaction
Buy Basic Tool mutates money and inventory through a market_buy transaction
Buy Row Supply mutates money and inventory/supplies through a market_buy transaction
Resource snapshots expose transactions without breaking existing values reads
Composition stores and exposes the latest nested command result
Price snapshot is deterministic across equivalent fresh games
Market transaction smoke runs without DOM timing assumptions
Worker assignment remains out of this slice
```

## Current tracker entries

- `trackers/2026-07-07T0054-0400/project-breakdown.md` — first full interaction loop, domain, service, kit, and next-step breakdown.
- `trackers/2026-07-07T03-49-46-04-00/project-breakdown.md` — canonical central-ledger follow-up covering the current kit-composed economy shell, interaction loop, domains, service surfaces, explicit kits, gaps, and next economy-loop cutover slice.
- `trackers/2026-07-07T05-01-25-04-00/project-breakdown.md` — service-cutover follow-up that adds the local kit registry, re-identifies the interaction loop, domains, kit services, target extraction kits, and the next Zombie Orchard Economy Service Cutover slice.
- `trackers/2026-07-07T06-10-13-04-00/project-breakdown.md` — economy-command-contract follow-up that re-identifies the loop/domains/services/kits and frames the next cutover around deterministic seeded runtime, a single gameplay command facade, service extraction, economy behavior, save/codex/outcome, render-plan, and deterministic smoke fixtures.
- `trackers/2026-07-07T07-21-19-04-00/project-breakdown.md` — economy-replay-market follow-up that tightens the next cutover around seeded replay, command journal parity, market service runtime, transaction history, worker/building/tool effects, render-plan projection, and deterministic economy smoke fixtures.
- `trackers/2026-07-07T08-29-39-04-00/project-breakdown.md` — market-transaction-authority follow-up that keeps market runtime as the next visible product cut, adds worker-assignment prep, refines transaction/capacity history, and maps deterministic economy smoke coverage.
- `trackers/2026-07-07T09-41-43-04-00/project-breakdown.md` — exchange-command-ui follow-up that narrows the next cut to market sell/buy actions, transaction-ledger records, price snapshots, inventory unlock intake, exchange transaction cards, and market smoke before worker assignment.
- `trackers/2026-07-07T10-49-10-04-00/project-breakdown.md` — market-action-dispatch follow-up that narrows the first implementation seam to Market action dispatch, ledger snapshot compatibility, transaction fixture records, nested command result surfacing, exchange transaction cards, and DOM-free market smoke.
