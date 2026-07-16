# Architecture audit: pressure threshold gameplay adoption DSK map

**Timestamp:** `2026-07-16T03-41-28-04-00`  
**Status:** `pressure-threshold-gameplay-adoption-authority-audited`

## Summary

Pressure state is already isolated in `pressure-field-kit`; the missing architecture is a policy-and-adoption domain between accepted pressure revisions and owning gameplay domains.

## Plan ledger

**Goal:** preserve existing ownership while adding one deterministic pressure evaluation and effect-adoption boundary.

- [x] Map current pressure producer and writers.
- [x] Map candidate consumers.
- [x] Separate policy evaluation from state mutation.
- [x] Define typed results and visible-frame acknowledgement.
- [ ] Implement the domain.

## Current map

```txt
pressure-field-kit
  owns rowPressure and curse
  accepts adjust commands
  grows channels on tick
  publishes snapshot

active-session-domain-kit
  writes rowPressure after collect
  does not read pressure snapshot
  owns pests, damage, phase, score and failure

html-interface-render-kit
  reads rowPressure
  omits curse and active effects

interface-composition-kit
  routes outcome only from session.ended
```

## Required DSK map

```txt
zombie-orchard-pressure-threshold-gameplay-adoption-authority-domain
  pressure-channel-schema-kit
  pressure-snapshot-revision-kit
  pressure-threshold-policy-kit
  pressure-effect-evaluation-kit
  pressure-threshold-crossing-kit
  phase-pressure-modifier-kit
  collection-pressure-consequence-kit
  pest-spawn-pressure-consumer-kit
  pest-motion-pressure-consumer-kit
  pest-damage-pressure-consumer-kit
  curse-effect-consumer-kit
  pressure-outcome-gate-kit
  pressure-effect-result-kit
  pressure-feedback-projection-kit
  pressure-effect-frame-ack-kit
  pressure-gameplay-fixture-kit
  pressure-pages-parity-fixture-kit
```

## Ownership rules

```txt
pressure-field-kit remains channel truth
preset/policy owns authored curves and thresholds
evaluation domain owns derived immutable effect proposals
active-session owns accepted pest/damage/phase mutations
interface renderer owns no gameplay decisions
outcome composition consumes accepted terminal results only
fixtures own no runtime fallback behavior
```

## Admission boundary

Every evaluation must cite expected pressure, session, phase and policy revisions. Every adoption must settle once as applied, unchanged, stale, rejected or incompatible. Renderers may only project accepted results.
