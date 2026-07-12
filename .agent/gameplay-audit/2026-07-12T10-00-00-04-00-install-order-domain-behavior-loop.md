# Gameplay audit: installation order and domain behavior

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

Gameplay behavior depends on the order in which domains were inserted into the runtime object. The current order lets active-session finish before interface composition checks for an Outcome transition, but that relationship is not declared or validated.

## Plan ledger

**Goal:** replace accidental installation-order semantics with explicit gameplay phases and compatible service bindings.

- [x] Trace all gameplay domains and cross-domain API calls.
- [x] Trace current tick order.
- [x] Identify missing-service behavior.
- [x] Identify order-sensitive Outcome routing.
- [x] Define phase and dependency requirements.
- [ ] Implement order-independent fixtures.

## Current loop

```txt
resource ledger
pressure field
orchard world
construction runtime
roster runtime
inventory runtime
interface route domains
active session
interface composition
```

Only domains with `tick()` participate, but their relative order comes from the installation history rather than a phase descriptor.

## Order-sensitive behavior

```txt
active-session tick
  -> may set ended = true

interface-composition tick later in the same frame
  -> reads active-session snapshot
  -> moves route to outcome
```

Installing composition earlier would delay Outcome routing by one tick. The runtime has no phase invariant describing the intended same-tick behavior.

## Implicit service dependencies

```txt
construction-runtime -> resource-ledger.api.pay
roster-runtime -> resource-ledger.api.pay
active-session collect -> orchard-world.api.collectNear
active-session collect -> resource-ledger.api.add
active-session collect -> pressure-field.api.adjust
active-session clear -> resource-ledger.api.add
interface-composition -> active route command and active-session snapshot
```

Optional lookup turns graph defects into gameplay results. A missing orchard reports no apple. A missing ledger can report insufficient resources. A missing pressure service silently omits pressure change.

## Required gameplay phases

```txt
command admission
resource and world mutation
active-session simulation
outcome derivation
interface routing
snapshot commit
render projection
```

## Required fixtures

```txt
shuffled manifest input -> identical gameplay phase order
active-session terminal tick -> same-tick Outcome transition
missing ledger -> graph rejection, not Missing resources
missing orchard -> graph rejection, not No apple close enough
compatible provider replacement -> preserved declared behavior
incompatible provider -> no live graph mutation
```

## Validation boundary

Gameplay source and behavior were not changed. No order or service fixture was run.