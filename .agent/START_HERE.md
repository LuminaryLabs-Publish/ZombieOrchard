# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-10T15-48-18-04-00
```

## Current best next cut

```txt
ZombieOrchard Market Command Causality Ledger
+ Resource/Inventory Transaction Fixture Gate
```

## Read this first

```txt
.agent/trackers/2026-07-10T15-48-18-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T15-48-18-04-00-market-command-causality-dsk-map.md
.agent/interaction-audit/2026-07-10T15-48-18-04-00-interface-parent-child-command-causality-map.md
.agent/market-authority-audit/2026-07-10T15-48-18-04-00-market-command-transaction-causality-contract.md
.agent/transaction-audit/2026-07-10T15-48-18-04-00-resource-inventory-atomicity-gap.md
.agent/render-audit/2026-07-10T15-48-18-04-00-exchange-transaction-consumption-readback-gap.md
.agent/gameplay-audit/2026-07-10T15-48-18-04-00-market-transaction-resource-inventory-loop.md
.agent/deploy-audit/2026-07-10T15-48-18-04-00-market-causality-fixture-build-gate.md
```

## Short version

`ZombieOrchard` does not need a runtime rewrite, renderer replacement, new Market art, economy expansion, or more orchard content next.

The next blocker is end-to-end command causality. A Market action must retain the parent activation, child command result, resource transaction, inventory intake, Exchange projection, renderer consumption, and bounded JSON-safe GameHost readback under stable correlation IDs.

## Current interaction loop

```txt
index.html
  -> boot.js
  -> start.js
  -> createOrchardGame()
  -> createKitRuntime(...kits)
  -> fixed requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> aggregate snapshot
  -> world canvas + HTML interface render

[data-action] click
  -> interface-composition.activate
  -> active domain returns action descriptor
  -> optional child command dispatch
  -> child result is discarded
  -> transition result or generic accepted result returned
```

## Main blocker

```txt
no command ids or durable request/result journal
child command result lost by interface-composition
resource payment is boolean-only
inventory has no purchase intake/capacity service
Exchange remains Back-only
runtime events are not durable snapshot readback
HTML renderer has no Market result consumption row
GameHost exposes raw mutable handles only
smoke test has no Market transaction coverage
```
