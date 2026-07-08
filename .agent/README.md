# Zombie Orchard Agent Ledger

This folder stores timestamped internal breakdowns, project trackers, kit registries, and agent-facing planning notes for `LuminaryLabs-Publish/ZombieOrchard`.

## Rules

- Work on this repo one project at a time.
- Keep project breakdowns in `.agent/trackers/<timestamp>/`.
- Push findings to `main` after each tracker update.
- Keep source-code changes separate from breakdown-only runs unless explicitly requested.
- Do not work on Cavalry of Rome from this repo rotation.

## Current registry

- `kit-registry.json` - current and target kit inventory for the orchard survival/economy shell, including runtime, scoped interface, composition, game-domain, renderer, diagnostics, Market action IDs, Market command envelopes, source snapshots, preflight/result contracts, deterministic price/capacity snapshots, transaction envelopes, purchase intake, nested-result surfacing, exchange renderer authority, GameHost diagnostics, fixture replay, and smoke contract kits.

## Current recommended slice

```txt
Zombie Orchard Market Transaction Fixture Matrix + Exchange Projection Acceptance Gate
```

Build order:

```txt
preserve current static route, active-session HUD, world-canvas rendering, and snapshot["resource-ledger"].values
-> add source-owned Market action ids and command constants
-> extend exchange preset with Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
-> add deterministic price rows and capacity rows
-> add MarketCommandEnvelope and MarketSourceSnapshot helpers
-> add market preflight with stable rejection reasons
-> add accepted/rejected MarketCommandResult records
-> add command result journal
-> extend resource-ledger with transactions and lastTransaction while preserving values/canPay/pay/add
-> extend inventory-runtime with purchase intake for basic tools and row supplies
-> return nested command result through interface-composition and expose lastResult
-> add renderer-ready MarketResultProjection
-> add exchange renderer branch from snapshot projection only
-> extend GameHost with dispatch, diagnostics, price/capacity snapshots, transaction history, command journal, and runSmoke
-> add DOM-free fixture matrix for rejected sell, accepted sell, accepted buy, insufficient funds, capacity full, price determinism, and capacity determinism
-> defer workers, saves, codex, seeded replay, render-plan extraction, and settlement parity
```

Acceptance target:

```txt
npm test passes
entry -> play smoke still passes
active-session HUD still reads snapshot["resource-ledger"].values
exchange screen shows Sell Apples, Buy Basic Tool, Buy Row Supply, and Back
Sell Apples with 0 apples returns accepted=false reason=insufficient_inventory
Collect then Sell Apples appends accepted market_sell transaction
Buy Basic Tool appends accepted market_buy transaction and adds/equips tool when equipped is branch
Buy Row Supply appends accepted market_buy transaction and adds supply record
Insufficient money returns accepted=false reason=insufficient_funds
Capacity overflow returns accepted=false reason=capacity_full
Unknown Market command returns accepted=false reason=unknown_market_command
Price snapshot is deterministic across fresh games
Capacity snapshot is deterministic across fresh games
interface-composition snapshot exposes lastResult for Market actions
resource-ledger snapshot exposes transactions and lastTransaction without breaking values
exchange renderer consumes Market projection from snapshot only
GameHost exposes Market history, command journal, price snapshot, capacity snapshot, diagnostics, and runSmoke
Market smoke fixtures run without DOM timing assumptions
worker assignment remains out of scope
```

## Current tracker entries

- `trackers/2026-07-07T0054-0400/project-breakdown.md` - first full interaction loop, domain, service, kit, and next-step breakdown.
- `trackers/2026-07-07T03-49-46-04-00/project-breakdown.md` - canonical central-ledger follow-up covering the current kit-composed economy shell, interaction loop, domains, service surfaces, explicit kits, gaps, and next economy-loop cutover slice.
- `trackers/2026-07-07T05-01-25-04-00/project-breakdown.md` - service-cutover follow-up that adds the local kit registry, re-identifies the interaction loop, domains, kit services, target extraction kits, and the next Zombie Orchard Economy Service Cutover slice.
- `trackers/2026-07-07T06-10-13-04-00/project-breakdown.md` - economy-command-contract follow-up that re-identifies the loop/domains/services/kits and frames the next cutover around deterministic seeded runtime, a single gameplay command facade, service extraction, economy behavior, save/codex/outcome, render-plan, and deterministic smoke fixtures.
- `trackers/2026-07-07T07-21-19-04-00/project-breakdown.md` - economy-replay-market follow-up that tightens the next cutover around seeded replay, command journal parity, market service runtime, transaction history, worker/building/tool effects, render-plan projection, and deterministic economy smoke fixtures.
- `trackers/2026-07-07T08-29-39-04-00/project-breakdown.md` - market-transaction-authority follow-up that keeps market runtime as the next visible product cut, adds worker-assignment prep, refines transaction/capacity history, and maps deterministic economy smoke coverage.
- `trackers/2026-07-07T09-41-43-04-00/project-breakdown.md` - exchange-command-ui follow-up that narrows the next cut to market sell/buy actions, transaction-ledger records, price snapshots, inventory unlock intake, exchange transaction cards, and market smoke before worker assignment.
- `trackers/2026-07-07T10-49-10-04-00/project-breakdown.md` - market-action-dispatch follow-up that narrows the first implementation seam to Market action dispatch, ledger snapshot compatibility, transaction fixture records, nested command result surfacing, exchange transaction cards, and DOM-free market smoke.
- `trackers/2026-07-07T12-01-44-04-00/project-breakdown.md` - transaction-envelope follow-up that tightens the next implementation seam to canonical accepted/rejected transaction records, exchange result projection, price/capacity policy, inventory purchase intake, and fixture-readable Market replay before worker assignment.
- `trackers/2026-07-07T13-30-34-04-00/project-breakdown.md` - market-command-result-journal follow-up that refines the next implementation seam around typed Market commands, command result records, price/capacity snapshots, nested result projection, transaction history, GameHost diagnostics, and DOM-free Market replay fixtures.
- `trackers/2026-07-07T14-40-17-04-00/project-breakdown.md` - market-price/inventory action fixture follow-up that confirms the Market placeholder state and narrows the next cut to deterministic price/capacity snapshots, inventory purchase intake, nested result projection, GameHost diagnostics, and DOM-free Market smoke.
- `trackers/2026-07-07T15-59-24-04-00/project-breakdown.md` - market-command-envelope/exchange-projection follow-up that tightens the immediate seam to canonical Market command envelopes, nested command result return, deterministic price/capacity sources, accepted/rejected transaction records, exchange projection, GameHost diagnostics, and DOM-free replay fixtures.
- `trackers/2026-07-07T17-10-21-04-00/project-breakdown.md` - exchange-renderer/host-smoke follow-up that narrows the cut to Market source snapshots, stable preflight reasons, nested result persistence, exchange renderer authority, GameHost Market diagnostics, and DOM-free Market replay smoke.
- `trackers/2026-07-07T18-28-54-04-00/project-breakdown.md` - market-smoke/purchase-intake follow-up that locks the next implementation seam to source-owned Market command contracts, deterministic price/capacity snapshots, accepted/rejected result journals, resource-ledger transaction history, inventory purchase intake, exchange projection, GameHost diagnostics, and DOM-free Market replay acceptance.
- `trackers/2026-07-07T19-51-43-04-00/project-breakdown.md` - market-runtime-command-gate follow-up that re-confirms the Market placeholder state and locks the next slice to stable action IDs, Market command envelopes, transaction projection, nested result surfacing, GameHost diagnostics, and DOM-free accepted/rejected replay parity.
- `trackers/2026-07-07T21-09-57-04-00/project-breakdown.md` - market-projection/host-smoke follow-up that keeps the next slice on stable Market action IDs, command envelopes, price/capacity sources, purchase intake, nested result return, exchange projection, GameHost diagnostics, and DOM-free accepted/rejected replay parity.
- `trackers/2026-07-07T22-31-24-04-00/project-breakdown.md` - market-command-replay/transaction-projection follow-up that re-confirms ZombieOrchard as the oldest eligible repo and locks the next slice to command replay harness, transaction projection, Market source snapshots, nested result persistence, exchange renderer authority, GameHost diagnostics, and DOM-free accepted/rejected replay parity.
- `trackers/2026-07-07T23-48-44-04-00/project-breakdown.md` - market-transaction fixture/exchange projection acceptance follow-up that re-confirms ZombieOrchard as the oldest eligible repo after IntoTheMeadow and locks the next slice to Market action ids, command envelopes, transaction fixtures, nested result surfacing, exchange projection, GameHost diagnostics, and DOM-free accepted/rejected fixture parity.
