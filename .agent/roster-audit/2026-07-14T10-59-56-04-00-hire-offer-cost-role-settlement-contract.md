# Roster audit: hire-offer, cost and role settlement contract

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

The current `hire` command trusts the caller for cost and display name, invents actor identity from array length, hardcodes the role and mutates payment before any gameplay or render participant is prepared. This document defines the required settlement boundary.

## Plan ledger

**Goal:** make one authored hire offer settle safely across resources, roster, gameplay and presentation.

- [x] Identify malformed and adversarial payload cases.
- [x] Define positive-cost and safe-identity policies.
- [x] Define prepare, commit and rollback order.
- [ ] Implement the contract and executable fixtures.

## Current unsafe cases

```txt
payload.cost = -100
  -> canPay succeeds
  -> pay subtracts -100
  -> money increases by 100
  -> actor is appended

payload.cost = "free"
  -> truthy value bypasses default
  -> numeric helper normalizes to 0
  -> actor is appended without charge

payload.name = HTML markup
  -> stored unchanged
  -> String() conversion only
  -> inserted into innerHTML roster card

payload.role
  -> ignored
  -> every actor receives hardcoded harvest role
```

## Required offer model

```txt
HireOffer {
  id,
  revision,
  roleId,
  positiveIntegerCost,
  currencyId,
  capacityUnits,
  workerTemplateId,
  displayNamePolicyId,
  workerEffectDescriptorId,
  presentationDescriptorId
}
```

## Required settlement

```txt
1. Admit command and expected revisions.
2. Resolve an exact authored offer.
3. Validate positive finite integer cost.
4. Normalize and safely encode display identity.
5. Validate role, roster capacity and duplicate policy.
6. Reserve resources without changing visible balances.
7. Prepare actor, gameplay, HTML and Canvas2D candidates.
8. Commit all participants under one RosterRevision.
9. Publish typed receipts and first visible-frame acknowledgement.
10. On any failure, release reservation and preserve every predecessor.
```

## Identity rules

- Actor IDs must be unique within a run generation and not derived only from current array length.
- Display names must be bounded, normalized and safely projected.
- Role IDs must resolve from an authored catalog.
- A worker record must cite offer, role, run and roster revisions.
- A retired or reset run must reject stale hire commands.

## Resource rules

- Cost must come from the admitted offer, never from caller payload.
- Negative, non-finite, string and fractional values must be rejected before reservation.
- Reservation and promotion must be atomic with roster and gameplay adoption.
- Duplicate commands must settle at most once.

## Proof requirement

The fixture matrix must cover negative and non-numeric costs, unsafe names, unknown roles, full rosters, duplicates, stale revisions, participant failures, rollback and matching source/dist/Pages visible results.