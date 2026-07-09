# Architecture Audit: Market Result Ledger Parity DSK Map

**Timestamp:** `2026-07-09T13-10-19-04-00`

## Current architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> createKitRuntime({ kits })
  -> game-domain kits
  -> scoped interface domain kits
  -> active-session override
  -> interface-composition kit
  -> renderer consumers
  -> GameHost raw snapshot
```

## DSK/domain breakdown

| Boundary | Current modules | Current role | Gap |
|---|---|---|---|
| Static host | `index.html`, `src/boot.js`, `src/start.js` | DOM, boot, frame loop, renderer creation, `GameHost` | No additive Market diagnostics host surface. |
| Kit runtime | `src/kits/runtime.js` | Registers domains, routes commands, ticks domains, returns command result, snapshots state | No command journal or source ledger; this is acceptable for now. |
| Interface domains | `src/kits/scoped-interface-domains.js` | Generated screen domains and action descriptors | Exchange action source is generic and only exposes Back. |
| Composition | `src/kits/composition.js` | Active screen routing, nested action command dispatch, outcome routing | Nested command result is discarded and not exposed in snapshot. |
| Game domains | `src/kits/game-domains.js` | Resource, pressure, orchard world, build, roster, inventory, active session | Market-specific transactions do not exist. |
| Preset source | `src/presets/orchard-preset.js` | Screen descriptors, resource starts, construction catalog | No Market source manifest, prices, capacity, or action IDs beyond Back. |
| Canvas renderer | `src/renderer/world-canvas.js` | Draws world from snapshot | Does not need changes for Market proof. |
| HTML renderer | `src/renderer/html-interface-renderer.js` | HUD/generic screen projection and click routing | No Exchange projection/readback branch. |
| Validation | `tests/smoke.mjs`, `package.json` | Entry/play smoke and static build | No Market fixture rows. |

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
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
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
```

## Next-cut kits

```txt
market-action-catalog-kit
market-action-id-catalog-kit
market-command-source-manifest-kit
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
interface-nested-result-adapter-kit
market-result-projection-kit
market-render-readback-kit
market-gamehost-diagnostics-kit
market-fixture-replay-kit
central-ledger-readback-kit
```

## Correct next architecture slice

Do not extract the runtime or renderer first.

Add pure Market source/result modules first, then wire them into existing composition and renderer consumers additively:

```txt
src/market/market-action-catalog.js
src/market/market-command-source-manifest.js
src/market/market-command-envelope.js
src/market/market-source-snapshot.js
src/market/market-preflight.js
src/market/market-command-result.js
src/market/market-journal.js
src/market/market-projection.js
src/market/market-readback.js
src/market/market-fixture-rows.js
```

Then wire:

```txt
src/kits/composition.js -> retain nested result as lastResult
src/presets/orchard-preset.js -> add Exchange market actions
src/renderer/html-interface-renderer.js -> add Exchange projection/readback branch
src/start.js -> expose additive GameHost market diagnostics
package.json/tests -> run DOM-free Market fixture
```
