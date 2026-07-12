# Architecture audit: economy command admission DSK map

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

Resource, construction, roster and inventory domains accept caller payloads and mutate live state without one semantic schema, capability boundary, expected revision, catalog-reference proof or conservation result. The proposed parent domain turns those commands into validated, immutable and atomic economic transactions.

## Plan ledger

**Goal:** place economic semantics above participant domains so no command can mint, spend, build, hire or equip without explicit admission and proof.

- [x] Trace resource-ledger `add` and `pay`.
- [x] Trace construction build lookup and payment.
- [x] Trace roster hire cost and actor creation.
- [x] Trace inventory equip mutation.
- [x] Trace public and interface command entry.
- [x] Define parent authority and child kits.
- [ ] Implement and validate the authority.

## Existing domain map

```txt
kit-runtime
  -> resource-ledger
  -> pressure-field
  -> orchard-world
  -> construction-runtime
  -> roster-runtime
  -> inventory-runtime
  -> scoped interface domains
  -> active-session
  -> interface-composition

browser host
  -> engine.command(...)
  -> participant domain mutates immediately
  -> notify subscribers
  -> render canvas and HTML
```

## Required parent domain

```txt
zombie-orchard-economy-command-admission-authority-domain
```

## Candidate kit composition

```txt
economy-command-envelope-kit
economy-command-id-kit
economy-command-sequence-kit
economy-command-schema-kit
economy-command-capability-kit
economy-session-admission-kit
economy-route-admission-kit
resource-key-registry-kit
resource-amount-schema-kit
resource-delta-policy-kit
nonnegative-cost-admission-kit
balance-floor-policy-kit
resource-predecessor-revision-kit
catalog-id-registry-kit
catalog-reference-admission-kit
roster-offer-schema-kit
inventory-reference-admission-kit
economy-mutation-plan-kit
economy-conservation-check-kit
economy-commit-kit
economy-command-result-kit
economy-balance-delta-receipt-kit
economy-observation-kit
economy-journal-kit
economy-visible-frame-ack-kit
negative-cost-fixture-kit
unknown-resource-key-fixture-kit
unknown-catalog-reference-fixture-kit
unknown-inventory-reference-fixture-kit
duplicate-economy-command-fixture-kit
public-host-economy-smoke-kit
```

## Required invariants

```txt
all command amounts are finite
costs are nonnegative
signed administrative deltas require a separate capability
resource keys come from a versioned registry
catalog and inventory references must exist at the expected revision
no participant mutates before the complete plan validates
one command ID commits at most once
all balance changes have before, delta and after receipts
failed commands produce zero participant mutation
visible economic state cites the committed economy revision
```

## Required transaction

```txt
raw command
  -> normalize envelope
  -> authenticate capability and lifecycle context
  -> validate schema and finite numeric payloads
  -> resolve resource and catalog references
  -> validate expected revisions
  -> construct immutable participant mutation plan
  -> run conservation and balance-floor checks
  -> atomically commit ledger, roster, construction or inventory changes
  -> publish typed result and receipts
  -> render and acknowledge matching revision
```

## Boundary rule

Participant domains may calculate proposals, but only the parent authority may commit balance, built-item, actor or equipped-item state.