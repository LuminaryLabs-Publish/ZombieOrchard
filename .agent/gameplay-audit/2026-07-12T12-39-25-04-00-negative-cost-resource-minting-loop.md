# Gameplay audit: negative-cost resource minting loop

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

The economy accepts signed caller costs. Because payment checks only whether the current balance is greater than or equal to the supplied value, a negative cost is always payable and subtracting it increases the balance. Roster hiring exposes the same defect through caller-controlled `payload.cost`.

## Plan ledger

**Goal:** document the exact gameplay exploit and the invariants required to eliminate it without hiding rejection reasons.

- [x] Read resource-ledger `canPay`, `pay` and `add`.
- [x] Read roster hire and construction build paths.
- [x] Confirm arbitrary negative-key payment can create a new balance.
- [x] Confirm negative hire cost can add both money and an actor.
- [x] Define typed rejection and zero-mutation proof.
- [ ] Implement fixes and fixtures.

## Exact failure loop

```txt
GameHost.engine.command("roster-runtime", "hire", { cost: -10 })
  -> payload.cost || 25 resolves to -10
  -> ledger.pay({ money: -10 })
  -> canPay compares currentMoney >= -10 and succeeds
  -> pay writes currentMoney - (-10)
  -> money increases by 10
  -> roster adds a new actor
  -> command returns accepted: true
```

## Arbitrary namespace minting

```txt
GameHost.engine.command("resource-ledger", "pay", {
  cost: { premiumCurrency: -25 }
})
  -> missing key normalizes to zero
  -> zero >= -25
  -> premiumCurrency becomes 25
  -> accepted: true
```

## Related semantic defects

```txt
resource-ledger add accepts arbitrary keys and signed deltas
construction build falls back to catalog[0] for unknown IDs
inventory equip accepts an unknown item ID
command results have no stable reject codes or revision receipts
```

## Required invariants

```txt
cost amount >= 0
resource delta finite
resource key registered
unknown catalog reference rejected
unknown inventory reference rejected
failed command mutates nothing
one command ID commits at most once
before + delta = after for every balance receipt
```

## Required fixture assertions

```txt
negative direct payment -> rejected, balances unchanged
negative roster cost -> rejected, actor count unchanged
unknown negative resource key -> rejected, key absent
unknown build ID -> rejected, no fallback build
unknown equip ID -> rejected, equipped unchanged
```

No economic-conservation claim is made until these fixtures pass.