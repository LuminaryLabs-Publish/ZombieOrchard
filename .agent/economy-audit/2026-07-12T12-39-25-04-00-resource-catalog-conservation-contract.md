# Economy audit: resource, catalog and conservation contract

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

The current economy has no canonical resource schema, catalog revision, signed-delta policy, price authority or cross-participant conservation receipt. This contract defines the minimum authority required for resource, build, hire, collect and equip operations.

## Plan ledger

**Goal:** make every economic mutation finite, authorized, revisioned, idempotent and explainable.

- [x] Inventory resource and catalog mutation surfaces.
- [x] Separate prices from caller-supplied payloads.
- [x] Define resource and reference admission.
- [x] Define conservation and atomicity invariants.
- [x] Define observation and fixture requirements.
- [ ] Implement the contract.

## Resource contract

```txt
resource registry
  -> stable resource ID
  -> amount precision and allowed range
  -> whether signed administrative deltas are permitted
  -> minimum and maximum balance
  -> display metadata outside authoritative state

cost
  -> catalog-authored, not caller-authored
  -> finite
  -> nonnegative
  -> canonicalized before comparison
```

## Catalog contract

```txt
construction item
  -> exact item ID
  -> catalog revision
  -> canonical price
  -> output descriptor

roster offer
  -> exact offer ID
  -> offer revision
  -> canonical price
  -> actor template

inventory equip
  -> exact owned item ID
  -> inventory revision
  -> equip compatibility policy
```

## Atomic commit contract

```txt
predecessor snapshot
  -> participant proposals
  -> invariant validation
  -> one commit revision
  -> balance delta receipts
  -> participant receipts
  -> event bundle
  -> render projection
```

A failure in any participant must leave all resources, built items, actors, orchard items, pressure channels, score and inventory state unchanged.

## Conservation rules

```txt
before + delta = after
sum of debits and authorized credits matches operation policy
negative cost is never a debit
unknown resource keys never materialize implicitly
caller payload never sets a catalog price
unknown item or offer IDs reject instead of falling back
```

## Observation contract

```txt
economyRevision
commandId
commandType
status
reasonCode
resourceBefore
resourceDelta
resourceAfter
participantRevisions
catalogRevision
mutationPlanFingerprint
firstVisibleFrameId
```

## Fixture matrix

```txt
positive valid payment
insufficient balance
zero cost
negative cost
NaN and Infinity
numeric string input
unknown resource key
unknown build item
unknown roster offer
unknown inventory item
duplicate command ID
stale resource revision
participant failure after proposal
source/dist/Pages parity
```

No conservation or semantic-admission guarantee exists in the current runtime.