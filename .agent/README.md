# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, scoped interface, composition, game-domain, renderer, diagnostics, Market command contracts, command result journal, price snapshots, capacity policy, transaction envelopes, transaction history, inventory purchase intake, exchange UI, fixture replay, and smoke kits.

## Current recommended slice

```txt
Zombie Orchard Market Command Result Journal + Price / Capacity Snapshot Fixture Cutover
```

Build order:

```txt
preserve static host and current playable loop
-> keep resource-ledger.values intact for HUD compatibility
-> add market-command-contract-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, GET_PRICE_SNAPSHOT, and GET_CAPACITY_SNAPSHOT
-> add price-snapshot-kit with deterministic starter prices for apple-sell, basic-tool-buy, and row-supply-buy
-> add capacity-policy-kit with starter caps for apples, tools, supplies, money, wood, and scrap
-> add transaction-envelope-kit as the canonical accepted/rejected economy record
-> define TransactionEnvelope fields: id, type, command, itemId, quantity, unitPrice, delta, before, after, accepted, reason, frame, elapsed
-> add market-command-result-kit to wrap transaction, price, capacity, and inventory side effects
-> add market-command-result-journal-kit with accepted and rejected views
-> upgrade resource-ledger-kit or add orchard-economy-ledger-kit while preserving old canPay/pay/add services
-> expose resource-ledger.transactions and resource-ledger.lastTransaction
-> add market-command-dispatch-kit for exchange action commands
-> update orchard-preset exchange actions to sell-apples, buy-basic-tool, buy-row-supply, and back
-> update interface-composition-kit so nested action.command results are returned and projected as lastResult
-> add market-result-projection-kit on the interface-composition snapshot
-> add inventory-market-unlock-kit by extending inventory-runtime-kit with add-purchase or intake-market-purchase
-> auto-equip basic-tool only when current equipped item is still branch
-> update html-interface-renderer exchange branch with price snapshot, capacity snapshot, latest result, disabled reasons, and recent transaction cards
-> extend window.GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> extend tests/smoke.mjs with zero-apple rejection, collect/sell, buy-tool, buy-supply, insufficient-funds rejection, capacity-full rejection, price snapshot, capacity snapshot, transaction history, and replay parity
-> defer worker assignment, save runtime, codex progression, seeded pest spawning, and broad render-plan extraction
```

Acceptance target:

```txt
npm test passes
existing active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false and reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds/equips the tool when equipped item is branch
Buy Row Supply appends accepted market_buy transaction and adds a supply/inventory record
Insufficient money returns accepted=false and reason=insufficient_funds
Capacity overflow returns accepted=false and reason=capacity_full
GET_PRICE_SNAPSHOT returns deterministic starter prices across equivalent fresh games
GET_CAPACITY_SNAPSHOT returns deterministic starter caps across equivalent fresh games
interface-composition snapshot exposes lastResult for accepted and rejected market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
GameHost exposes transaction history and command journal helper methods
market smoke fixtures run without DOM timing assumptions
worker assignment remains explicitly out of scope
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
- `trackers/2026-07-07T12-01-44-04-00/project-breakdown.md` — transaction-envelope follow-up that tightens the next implementation seam to canonical accepted/rejected transaction records, exchange result projection, price/capacity policy, inventory purchase intake, and fixture-readable Market replay before worker assignment.
- `trackers/2026-07-07T13-30-34-04-00/project-breakdown.md` — market-command-result-journal follow-up that refines the next implementation seam around typed Market commands, command result records, price/capacity snapshots, nested result projection, transaction history, GameHost diagnostics, and DOM-free Market replay fixtures.
