# Architecture audit: roster hiring gameplay adoption DSK map

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

Roster hiring currently spans the raw runtime, resource ledger, roster service, interface composition and HTML renderer without one coordinating owner. The missing boundary is a parent authority that validates an authored offer, reserves a positive cost, creates one actor identity, adopts worker effects and projects the same revision.

## Plan ledger

**Goal:** map existing ownership and the minimum semantic authority needed for safe hiring.

- [x] Map all current participants.
- [x] Preserve 27 implemented kit surfaces.
- [x] Identify unsafe cross-domain mutation.
- [x] Define one parent authority and 23 coordinating surfaces.
- [ ] Implement executable providers and dependency declarations.

## Current DSK map

```txt
interface-composition-kit
  -> roster-domain-kit
     -> roster route exposes Back only

raw GameHost
  -> kit-runtime.command
     -> roster-runtime-kit
        -> resource-ledger-kit.pay
        -> append actor

html-interface-render-kit
  -> reads roster-runtime snapshot
  -> renders actor name and role through innerHTML

active-session-domain-kit
  -> does not read roster-runtime

world-canvas-render-kit
  -> does not read roster-runtime
```

## Ownership failures

```txt
hire command identity: unowned
hire offer catalog: unowned
cost validation: split and unsafe
resource reservation: absent
actor identity normalization: absent
safe name projection: absent
role catalog and capability: absent
roster capacity: absent
worker gameplay effect: absent
atomic adoption: absent
rollback: absent
visible revision proof: absent
```

## Required parent domain

```txt
zombie-orchard-roster-hiring-gameplay-adoption-authority-domain
```

## Required service graph

```txt
HireWorkerCommand
  requires:
    run-generation
    roster-revision
    worker-catalog-revision
    resource-revision
    route-revision

  prepares:
    admitted-hire-offer
    normalized-worker-identity
    positive-cost-reservation
    actor-candidate
    worker-effect-candidate
    roster-ui-candidate
    roster-canvas-candidate

  publishes:
    HireWorkerResult
    ResourceSettlementReceipt
    RosterAdoptionReceipt
    WorkerEffectAdoptionReceipt
    FirstVisibleRosterFrameAck
```

## Planned surfaces

```txt
hire-command-id-kit
run-generation-binding-kit
roster-revision-kit
worker-catalog-revision-kit
hire-offer-admission-kit
hire-cost-policy-kit
worker-name-normalization-kit
worker-name-safe-projection-kit
role-catalog-kit
roster-capacity-kit
hire-candidate-kit
resource-reservation-kit
worker-effect-descriptor-kit
active-session-worker-adoption-kit
orchard-labor-resolution-kit
roster-ui-command-kit
roster-hud-projection-kit
roster-canvas-projection-kit
hire-settlement-result-kit
hire-rollback-kit
first-visible-roster-frame-ack-kit
roster-hiring-fixture-matrix-kit
source-dist-pages-roster-parity-kit
```

## Adoption rule

No participant may publish the successor until every mandatory participant has prepared successfully. A failed cost, actor, gameplay or render participant must release the reservation and preserve the complete predecessor revision.