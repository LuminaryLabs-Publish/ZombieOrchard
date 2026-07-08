# Architecture Audit — Market Source Splice DSK Boundary

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` remains the correct follow-up target because the publish repo has fresher root `.agent` state than the central ledger, and the Market transaction-ledger / nested-result source splice is still the sharpest unresolved architecture seam.

## Current architecture shape

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> engine.tick(1 / 60)
  -> engine.snapshot()
  -> world-canvas.render(snapshot)
  -> html-interface-renderer.render(snapshot)
  -> window.GameHost.engine/getState/tick
```

## Current DSK/domain map

```txt
runtime shell:
  static-browser-host
  boot-module
  runtime-entrypoint
  game-factory
  kit-runtime
  engine-context
  domain-registry
  command-router
  tick-dispatcher
  snapshot-aggregator
  subscription-bus
  browser-animation-loop
  GameHost

interface domains:
  entry-domain-kit
  session-select-domain-kit
  run-setup-domain-kit
  active-session-domain-kit
  interrupt-domain-kit
  construction-domain-kit
  exchange-domain-kit
  roster-domain-kit
  inventory-domain-kit
  knowledge-domain-kit
  preferences-domain-kit
  outcome-domain-kit
  interface-composition-kit
  html-interface-render-kit

game domains:
  resource-ledger-kit
  pressure-field-kit
  orchard-world-kit
  construction-runtime-kit
  roster-runtime-kit
  inventory-runtime-kit
  active-session-domain-kit
  world-canvas-render-kit

next Market authority domains:
  market-action-id-catalog-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-command-journal-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  nested-command-result-propagation-kit
  market-result-projection-kit
  market-render-readback-kit
  market-fixture-replay-kit
```

## Source-backed architecture facts

`src/kits/runtime.js` already provides the correct central seam: `engine.command(domainId, type, payload)` returns a command result, `engine.tick(delta)` dispatches ticks, and `engine.snapshot()` aggregates domain snapshots.

`src/kits/composition.js` is the blocking splice: it invokes nested `action.command` through `ctx.engine.command(...)` but does not preserve, return, snapshot, or journal that nested result.

`src/presets/orchard-preset.js` still defines the `exchange` screen as a Market shell with only `Back`, so there are no source-owned Market rows to normalize into command envelopes.

`src/kits/game-domains.js` has value mutation helpers in `resource-ledger` and item/equipped state in `inventory-runtime`, but does not expose transaction history or purchase-intake APIs yet.

`src/renderer/html-interface-renderer.js` renders generic screen actions and active-session HUD state, but the exchange branch has no Market projection/readback contract.

## Required source splice

```txt
exchange action row
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation through resource-ledger / inventory-runtime only
  -> rejected no-mutation before/after proof
  -> TransactionRecord for accepted commands
  -> MarketCommandJournalEntry
  -> MarketResultJournalEntry
  -> nested result returned through interface-composition
  -> interface-composition snapshot.lastResult
  -> MarketResultProjection
  -> exchange renderer readback
  -> GameHost.marketDiagnostics optional projection
  -> DOM-free fixture replay
```

## Architecture rule

Do not rewrite `createKitRuntime()`.

Do not move the orchard renderer into a reusable render-plan kit yet.

The next implementation should remain additive and should land source-owned Market helpers adjacent to the existing kits, then splice the resulting command/result records through `interface-composition` and renderer projection readback.
