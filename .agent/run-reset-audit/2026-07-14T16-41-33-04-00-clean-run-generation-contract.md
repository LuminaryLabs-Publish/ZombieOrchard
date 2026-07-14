# Run reset audit: clean run generation contract

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

A clean run must be a complete immutable generation boundary, not a series of in-place reset calls. Every mandatory domain must prepare initial state from the same preset and seed before any successor state becomes public.

## Plan ledger

**Goal:** define the minimum run identity, candidate preparation, adoption, rollback, and retirement contract needed by existing kits.

- [x] Identify every mutable participant.
- [x] Identify all route-only start and exit actions.
- [x] Define candidate and accepted generation boundaries.
- [x] Define rollback and stale-work requirements.
- [ ] Implement the contract.

## Identity

```txt
StartCommandId
HostGeneration
RunId
RunGeneration
PresetFingerprint
SeedPolicyRevision
Seed
InitialStateFingerprint
StartMode: new | retry | resume
PredecessorRunId
```

## Mandatory candidates

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
interface-composition
runtime events/publication
HTML projection
Canvas2D projection
```

## Invariants

1. Candidate preparation cannot mutate accepted predecessor state.
2. Every candidate cites the same run identity, preset fingerprint, and seed.
3. Adoption is all-or-nothing across mandatory participants.
4. A failed candidate is fully retired and returns one terminal result.
5. A successor cannot accept predecessor commands, ticks, events, or frame publication.
6. The predecessor outcome remains queryable after retry or New Game.
7. `active-session` becomes the visible route only after successful adoption.
8. Readiness requires a matching HTML and Canvas2D frame acknowledgement.

## Reset baseline

The accepted initial snapshot must restore preset resources and inventory; empty construction, roster, pests, and score; day one/day phase; full player condition and stamina at the authored spawn; unended state; zero or authored pressure; and a deterministic orchard derived from the accepted seed.