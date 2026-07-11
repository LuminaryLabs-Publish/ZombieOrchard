# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, cadence-independent, capability-declared, atomic, reproducible, persistable and disposable session.

- [ ] Implement runtime-session instance authority first.
- [ ] Implement fixed-step clock authority using the session owner.
- [ ] Add a public capability gateway and quarantine raw diagnostics.
- [ ] Add composite command transaction authority.
- [ ] Inject isolated seeded random streams and replay receipts.
- [ ] Add versioned save/load authority that restores random authority state.
- [ ] Gate deployment on lifecycle, cadence, transaction, replay and persistence fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / New Run / Title / Outcome / Dispose Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz / Stall / Visibility / Manual-Step Fixture Gate

3. Public Capability Gateway and Reachability
   + Registry / Binding / Result / Diagnostics-Quarantine Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child / Resource / Rollback / Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest / Stream Isolation / Replay Parity Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip / Random Continuation / Atomic Load Fixture Gate
```

## Gates 1–4 prerequisites

Gate 5 must consume, not duplicate:

```txt
runtimeId
sessionId
runId
sessionEpoch
lifecycle state and revision
committed simulationTickId
commandId
transactionId
commit or rollback result
canonical durable-state fingerprint hook
```

Random draws cannot be authoritative until the command or tick that requested them has an authoritative commit boundary.

## Gate 5 — Seeded Random and Replay Authority

### 1. Add the parent owner

Create:

```txt
zombie-orchard-seeded-random-replay-authority-domain
```

It owns:

```txt
runSeed
randomPolicyId
randomPolicyVersion
seedFingerprint
named stream registry
per-stream PRNG state and cursor
committed entity sequences
committed random receipts
bounded replay journal
replay journal revision
```

### 2. Replace global randomness

Current random consumers:

```txt
orchard-world-kit
  -> apple tree choice
  -> apple id
  -> apple x/y offsets
  -> apple rarity

active-session-domain-kit
  -> pest admission
  -> pest angle
  -> pest id
```

Required named streams:

```txt
orchard.apple-tree
orchard.apple-offset-x
orchard.apple-offset-y
orchard.apple-kind
session.pest-admission
session.pest-angle
```

### 3. Use deterministic entity identity

Replace random strings with committed sequence-derived IDs:

```txt
apple-{runId}-{appleSequence}
pest-{runId}-{pestSequence}
```

Sequence increments occur only when entity creation commits.

### 4. Stage random draws inside transactions

```txt
admitted command or fixed tick
  -> stage named-stream draws
  -> stage gameplay mutation
  -> commit transaction
  -> advance stream cursor
  -> append random receipts
  -> fingerprint durable state
```

Rejected, duplicate, stale or rolled-back work must not advance authoritative cursors.

### 5. Isolate gameplay systems

Apple generation must not perturb pest outcomes. Pest admission must consume exactly one draw per committed eligible night tick. Pest placement draws occur only after an admitted spawn commits.

### 6. Add replay envelopes

Record:

```txt
replay event sequence
runtime/session/run/epoch
committed simulation tick
public or system command
transaction result
random receipt range
state fingerprint
terminal result when present
```

Do not record canvas pixels or HTML as replay inputs.

### 7. Add replay verification

```txt
load manifest, preset and random policy revisions
  -> restore initial authority state
  -> replay admitted commands at recorded committed ticks
  -> reproduce stream receipts and cursors
  -> compare durable-state fingerprints
  -> stop at first typed divergence
```

### 8. Add observability

Canvas, HTML and GameHost observations should cite:

```txt
seedFingerprint
randomPolicyVersion
latestRandomReceiptId
randomReceiptRange for acknowledged result/tick
stateFingerprint
simulationTickId
renderFrameId
```

### 9. Add DOM-free fixtures

```txt
same-seed startup parity
different-seed intentional divergence
apple stream determinism
pest stream determinism
apple/pest stream isolation
rejected command cursor freeze
duplicate command idempotency
rollback cursor restoration
fixed-tick replay parity
first-divergence localization
```

### 10. Add browser fixtures

```txt
explicit-seed run startup
visible seed/policy observation
collection and night random receipt acknowledgement
replay final-frame parity
stale policy/manifest rejection
```

## Gate 6 — Versioned Save / Load Authority

A durable save must include:

```txt
manifest and preset fingerprints
runtime/session/run identity policy
committed durable gameplay state
random policy and seed fingerprint
all stream algorithm states and cursors
entity sequences
latest committed tick
replay journal revision or continuation marker
```

Loading gameplay state without random stream state is not a valid continuation.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Composite Command Transaction Authority
+ Seeded Random and Replay Authority
+ Same-Seed / Stream-Isolation / Replay-Parity Fixture Gate
```
