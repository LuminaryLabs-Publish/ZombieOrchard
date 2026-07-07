# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` — current and target kit inventory for the orchard survival/economy shell, including runtime, scoped interface, composition, game-domain, renderer, diagnostics, Market command envelopes, Market source snapshots, preflight/result contracts, deterministic price/capacity snapshots, transaction envelopes, purchase intake, exchange renderer authority, GameHost diagnostics, fixture replay, and smoke contract kits.

## Current recommended slice

```txt
Zombie Orchard Market Smoke Authority + Purchase Intake Contract Lock
```

Build order:

```txt
preserve current static host, active-session HUD, world canvas, and existing snapshot shape
-> keep snapshot["resource-ledger"].values backward compatible
-> add MarketCommandEnvelope with id, type, source, itemId, quantity, frame, elapsed, rawActionId
-> add SELL_APPLES, BUY_BASIC_TOOL, BUY_ROW_SUPPLY, GET_PRICE_SNAPSHOT, and GET_CAPACITY_SNAPSHOT contracts
-> add deterministic price rows for apple sell, basic tool buy, and row supply buy
-> add deterministic capacity rows for apples, tools, supplies, money, wood, and scrap
-> add MarketSourceSnapshot from ledger and inventory snapshots
-> add stable rejection reasons: insufficient_inventory, insufficient_funds, capacity_full, unknown_market_command
-> add MarketCommandResult records for accepted and rejected commands
-> append command results into a command result journal
-> extend resource-ledger with appendTransaction, transactions, and lastTransaction while preserving values/canPay/pay/add
-> extend inventory-runtime with purchase intake for basic tool and row-supply records
-> auto-equip first purchased basic tool only when equipped is branch
-> update exchange preset with sell-apples, buy-basic-tool, buy-row-supply, and back actions
-> update interface-composition-kit to return nested command result and store lastResult
-> add MarketResultProjection for latest result, latest transaction, price rows, capacity rows, command journal, and disabled reasons
-> add html-interface-renderer exchange branch with Market cards and recent transaction cards
-> extend window.GameHost with dispatch, getDiagnostics, getPriceSnapshot, getCapacitySnapshot, getTransactionHistory, getCommandJournal, and runSmoke
-> extend tests/smoke.mjs with DOM-free Market replay coverage
-> defer worker assignment, save runtime, codex progression, seeded pest spawning, render-plan extraction, and settlement parity
```

Acceptance target:

```txt
npm test passes
entry -> play smoke still passes
active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds tool to inventory
First purchased basic tool auto-equips only if current equipped item is branch
Buy Row Supply appends accepted market_buy transaction and adds supply record
Insufficient money returns accepted=false reason=insufficient_funds
Capacity overflow returns accepted=false reason=capacity_full
Unknown Market command returns accepted=false reason=unknown_market_command
GET_PRICE_SNAPSHOT is deterministic across fresh games
GET_CAPACITY_SNAPSHOT is deterministic across fresh games
interface-composition snapshot exposes lastResult for accepted and rejected Market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
exchange renderer can render latest result and recent transactions from snapshot only
GameHost exposes Market history, command journal, price snapshot, capacity snapshot, diagnostics, and runSmoke
Market smoke fixtures run without DOM timing assumptions
worker assignment remains out of scope
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
- `trackers/2026-07-07T14-40-17-04-00/project-breakdown.md` — market-price/inventory action fixture follow-up that confirms the Market placeholder state and narrows the next cut to deterministic price/capacity snapshots, inventory purchase intake, nested result projection, GameHost diagnostics, and DOM-free Market smoke.
- `trackers/2026-07-07T15-59-24-04-00/project-breakdown.md` — market-command-envelope/exchange-projection follow-up that tightens the immediate seam to canonical Market command envelopes, nested command result return, deterministic price/capacity sources, accepted/rejected transaction records, exchange projection, GameHost diagnostics, and DOM-free replay fixtures.
- `trackers/2026-07-07T17-10-21-04-00/project-breakdown.md` — exchange-renderer/host-smoke follow-up that narrows the cut to Market source snapshots, stable preflight reasons, nested result persistence, exchange renderer authority, GameHost Market diagnostics, and DOM-free Market replay smoke.
- `trackers/2026-07-07T18-28-54-04-00/project-breakdown.md` — market-smoke/purchase-intake follow-up that locks the next implementation seam to source-owned Market command contracts, deterministic price/capacity snapshots, accepted/rejected result journals, resource-ledger transaction history, inventory purchase intake, exchange projection, GameHost diagnostics, and DOM-free Market replay acceptance.
