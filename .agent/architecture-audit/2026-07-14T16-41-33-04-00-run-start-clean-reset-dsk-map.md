# Architecture audit: run-start clean reset DSK map

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

The engine owns no run aggregate. Mutable state is distributed across independent domain closures created once at browser boot. Interface transitions do not coordinate those closures, and the runtime ticks every domain regardless of route.

## Plan ledger

**Goal:** define a minimal coordinating domain that can create one complete candidate run, atomically adopt it, and reject predecessor work without restructuring unrelated kits.

- [x] Map all 19 engine-installed kits.
- [x] Map the eight host, proof, build, and deploy surfaces.
- [x] Identify which domains must participate in clean start.
- [x] Separate existing source-backed kits from proposed coordination kits.
- [ ] Implement the authority and fixture matrix.

## Current ownership map

```txt
kit-runtime
  -> owns one domains object and unconditional tick fan-out

interface-composition
  -> owns active and previous route only

resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
  -> each owns private mutable state with no reset protocol

HTML renderer
Canvas2D renderer
GameHost
  -> consume the shared mutable graph with no RunGeneration
```

## Required parent domain

```txt
zombie-orchard-run-start-clean-reset-authority-domain
```

## Proposed subkits

```txt
run-start-command-id-kit
host-generation-binding-kit
run-id-generation-kit
run-generation-kit
preset-fingerprint-kit
deterministic-seed-kit
predecessor-outcome-retention-kit
candidate-domain-graph-kit
resource-reset-candidate-kit
pressure-reset-candidate-kit
orchard-world-reset-candidate-kit
construction-reset-candidate-kit
roster-reset-candidate-kit
inventory-reset-candidate-kit
active-session-reset-candidate-kit
interface-reset-candidate-kit
atomic-run-adoption-kit
stale-predecessor-work-rejection-kit
run-start-result-kit
first-visible-run-frame-ack-kit
clean-run-fixture-matrix-kit
source-dist-pages-run-parity-kit
```

## Adoption rule

No mandatory participant may mutate accepted state during preparation. A successor becomes active only after all required candidates validate against the same `RunId`, `RunGeneration`, preset fingerprint, and seed. Failed preparation preserves the predecessor graph and returns one typed terminal result.

## Non-goals

This audit does not require replacing the current kit runtime, moving gameplay into Nexus Engine Core, or implementing persistence. It adds one narrow orchestration boundary around existing domain state.