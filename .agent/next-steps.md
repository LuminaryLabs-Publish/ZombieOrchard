# Next steps - ZombieOrchard

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

Turn inventory equipment into a real gameplay capability. The next implementation should validate exact owned items, resolve authored effects, commit inventory and active-session consumers together, expose a browser Equip action, and prove matching HTML and Canvas2D state.

## Plan ledger

**Goal:** make equipment settle exactly once and affect gameplay and presentation or leave the predecessor untouched.

- [ ] Define `EquipmentCommandId`, `RunGeneration`, `InventoryRevision`, `ItemCatalogRevision`, and `EquipmentRevision`.
- [ ] Replace arbitrary equipped-ID assignment with exact owned-item admission.
- [ ] Add an equippable-item policy and slot contract.
- [ ] Add authored range, power, stamina, cadence, durability, and presentation descriptors.
- [ ] Add an Equip action to the inventory route.
- [ ] Return typed equipment results through interface composition.
- [ ] Prepare inventory and gameplay-effect candidates before mutation.
- [ ] Atomically commit inventory, active-session, HTML, and Canvas2D consumers.
- [ ] Make clear actions cite the accepted equipment revision.
- [ ] Mark the equipped item in the inventory screen.
- [ ] Show equipment in the active-session HUD.
- [ ] Project the held item or effect in Canvas2D.
- [ ] Roll back all partial consumers after failure.
- [ ] Add duplicate, stale, wrong-route, retired-run, unknown-item, and unowned-item classification.
- [ ] Publish `FirstVisibleEquipmentFrameAck`.
- [ ] Add source, browser, dist, and Pages equipment fixtures.

## Immediate safe ledge

1. Add item lookup and ownership validation to `inventory-runtime-kit`.
2. Return `unknown-item` and `unowned-item` without mutation.
3. Add an authored Equip action for the branch.
4. Define a minimal branch effect descriptor.
5. Make `clear` resolve range and power from the accepted equipment revision.
6. Expose equipped state in the inventory screen and HUD.
7. Render a simple held-item marker in Canvas2D.
8. Add headless success, rejection, duplicate, stale, and rollback fixtures.
9. Add a browser fixture proving HTML, Canvas2D, and gameplay use the same revision.

## Target files

```txt
src/kits/game-domains.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/inventory/equipment-authority.js
src/inventory/item-policy.js
tests/inventory-equipment.fixture.mjs
scripts/smoke-inventory-equipment-browser.mjs
package.json
```

## Required fixtures

```txt
owned branch equips
unknown item performs zero mutation
unowned item performs zero mutation
invalid slot performs zero mutation
duplicate command settles once
stale command is rejected
wrong route is rejected when policy requires it
clear result cites matching EquipmentRevision
authored effect changes range or power exactly once
durability changes exactly once
failed gameplay or render participant rolls back
inventory, HUD, and Canvas2D show one revision
source, dist, and Pages results match
first visible equipment frame is acknowledged
```

## Do not claim

Do not claim valid equipment admission, equipment-aware gameplay, durability, visible equipment state, rollback, artifact parity, or production readiness until the fixture matrix passes on `main`.