# Known gaps: ZombieOrchard pressure gameplay adoption

**Timestamp:** `2026-07-16T03-41-28-04-00`  
**Status:** `pressure-threshold-gameplay-adoption-authority-audited`

## Summary

The current priority gap is a continuously changing pressure model with no gameplay consumer contract. The values are real state and one is visible, but neither channel has an authored threshold, modifier, terminal rule or typed effect result.

## Plan ledger

**Goal:** close channel identity, policy, consumer, threshold, replay and visible-frame evidence gaps while preserving pressure ownership in `pressure-field-kit`.

- [ ] Pressure channel schema and units.
- [ ] Pressure snapshot revision.
- [ ] Versioned threshold/modifier policy.
- [ ] Explicit consumer registration.
- [ ] Threshold crossing identity and deduplication.
- [ ] Typed pressure-effect and no-effect results.
- [ ] `rowPressure` gameplay consumer.
- [ ] `curse` gameplay consumer or explicit non-gameplay classification.
- [ ] Save/restore and replay compatibility.
- [ ] HUD projection of active pressure effects.
- [ ] First pressure-effect frame acknowledgement.
- [ ] Source, dist and Pages pressure fixtures.

## Current evidence gaps

```txt
active-session pressure reads: 0
configured thresholds: 0
configured modifiers: 0
threshold events/results: 0
curse consumers: 0
pressure-linked outcome gates: 0
pressure-effect acknowledgements: 0
browser pressure traces: 0
artifact pressure traces: 0
deployed pressure traces: 0
```

## Retained gaps

Prior seeded-run, player-control, save, route-suspension, clock, canvas, diagnostic, reset, roster, inventory, construction, HTML, startup, frame-coherence, event, observer and economy findings remain retained in their timestamped audit families.
