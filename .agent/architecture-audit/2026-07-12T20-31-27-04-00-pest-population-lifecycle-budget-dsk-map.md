# Architecture audit: pest population lifecycle and budget DSK map

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Summary

Pest creation, simulation, damage, retirement and rendering currently live inside one mutable `active-session` array. No domain owns population identity, capacity, generation, budget, retirement, or visible-frame provenance.

## Existing ownership

| Concern | Current owner | Gap |
|---|---|---|
| spawn attempt | `active-session.tick()` | no spawn admission or capacity |
| pest identity | `addPest()` random string | no uniqueness or generation |
| movement | `active-session.tick()` | no simulation budget |
| contact damage | loop over all pests | damage scales with population |
| removal | `clear` command | no age, TTL or offscreen retirement |
| snapshot | `active-session.snapshot()` | no population revision/fingerprint |
| rendering | world canvas loop | no render budget or frame receipt |

## Required composed domain

`zombie-orchard-pest-population-lifecycle-budget-authority-domain`

## Candidate kits

```txt
pest-population-id-kit
pest-id-kit
pest-generation-kit
pest-spawn-policy-kit
pest-spawn-budget-kit
pest-capacity-kit
pest-spawn-admission-kit
pest-spawn-result-kit
pest-lifecycle-state-kit
pest-age-kit
pest-despawn-policy-kit
pest-retirement-kit
pest-contact-set-kit
pest-damage-budget-kit
pest-simulation-budget-kit
pest-render-budget-kit
pest-population-snapshot-kit
pest-population-fingerprint-kit
pest-population-observation-kit
pest-population-journal-kit
first-pest-population-frame-ack-kit
pest-capacity-fixture-kit
pest-retirement-fixture-kit
pest-damage-budget-fixture-kit
pest-source-dist-pages-parity-fixture-kit
```

## Required transaction

```txt
night spawn request
  -> bind runtime session, run generation and population revision
  -> evaluate phase, capacity and spawn budget
  -> allocate deterministic pest identity
  -> commit Accepted, CapacityReached, BudgetExhausted or Rejected
  -> advance only admitted pests under simulation budget
  -> derive one contact set and bounded damage result
  -> retire cleared, expired or invalid pests exactly once
  -> publish population revision and fingerprint
  -> render within declared visual budget
  -> acknowledge first matching visible frame
```
