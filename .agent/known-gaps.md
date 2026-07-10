# ZombieOrchard Known Gaps

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Critical gaps

```txt
- Exchange / Market still falls through to generic screen rendering.
- Exchange currently only exposes Back.
- Market actions do not have stable source-owned action IDs.
- There is no MarketActionCatalog.
- There is no MarketCommandSourceManifest.
- There is no MarketCommandEnvelope.
- There is no MarketSourceSnapshot before/after pair.
- There is no deterministic price source snapshot.
- There is no deterministic capacity source snapshot.
- There is no Market preflight result with stable rejection reasons.
- There is no accepted/rejected MarketCommandResult record.
- There is no rejected-command no-mutation proof row.
- There is no MarketCommandJournal.
- There is no MarketResultJournal.
- There is no resource transaction history.
- There is no inventory purchase intake path.
- interface-composition dispatches nested action.command but discards the nested result.
- interface-composition snapshot does not expose lastResult.
- html-interface-renderer has no Exchange-specific Market projection branch.
- html-interface-renderer has no Market render readback.
- window.GameHost has no Market diagnostics beyond raw engine snapshot.
- tests/smoke.mjs does not exercise Market accepted/rejected command rows.
- package.json has no dedicated Market fixture script yet.
```

## Non-blocking gaps

```txt
- Save/load persistence is not implemented.
- Session balancing is prototype-level.
- Codex/knowledge screen is descriptor-only.
- Roster/inventory effects are shallow.
- Rendering is serviceable canvas/HTML, not a high-fidelity visual target.
- Apple seeding uses Math.random and is not deterministic for deep replay yet.
```

## Work not recommended next

```txt
- Do not replace createKitRuntime.
- Do not rebuild the orchard renderer.
- Do not add more economy categories before Market command/result proof exists.
- Do not promote kits to shared repos before accepted/rejected fixture rows exist.
- Do not change Pages/static deploy before npm test and npm run build still pass.
- Do not expand save/load before command/result source rows are stable.
```
