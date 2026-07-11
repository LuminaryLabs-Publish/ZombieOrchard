# Architecture audit: Seeded Random and Replay Authority DSK Map

## Plan ledger

**Goal:** replace implicit process-global randomness with one composed authority that produces reproducible, stream-isolated and replay-verifiable decisions after the prerequisite session, clock and command authorities exist.

- [x] Locate random consumers.
- [x] Identify cross-domain random coupling.
- [x] Define parent-domain ownership.
- [x] Define atomic kit services.
- [x] Define dependency and commit order.
- [x] Define failure and stale-work behavior.
- [ ] Implement after prerequisite authorities.

## Current architecture

```txt
orchard-world-kit
  -> global Math.random
  -> startup apple population
  -> collection refill

active-session-domain-kit
  -> global Math.random
  -> night spawn trial
  -> pest angle and id

kit-runtime
  -> no session identity
  -> no committed tick identity
  -> no command journal
  -> no deterministic fingerprint
```

## Required composed parent domain

```txt
zombie-orchard-seeded-random-replay-authority-domain
```

It owns:

```txt
runSeed
randomPolicyVersion
stream registry
stream cursors
entity sequences
committed random receipts
bounded replay journal
replay fingerprint policy
```

## Required kit map

| Kit | Service |
|---|---|
| `run-seed-descriptor-kit` | validates and fingerprints seed plus policy version |
| `deterministic-prng-kit` | pure integer-state next-value service |
| `random-stream-registry-kit` | allocates named streams under one run authority |
| `random-stream-id-kit` | stable stream identity and purpose |
| `random-cursor-kit` | monotonic per-stream draw cursor |
| `random-draw-result-kit` | value, cursor-before/after, range and provenance |
| `apple-generation-policy-kit` | deterministic tree, offsets and rarity plan |
| `pest-spawn-policy-kit` | deterministic admission and spawn placement plan |
| `deterministic-entity-id-kit` | sequence-derived apple and pest identities |
| `committed-tick-random-receipt-kit` | binds draws to committed tick and transaction |
| `replay-command-envelope-kit` | ordered admitted player/system command record |
| `replay-journal-kit` | bounded append-only committed event stream |
| `replay-state-fingerprint-kit` | canonical durable-state digest hook |
| `replay-verifier-kit` | executes and compares expected receipts/fingerprints |
| `random-stream-snapshot-kit` | restorable seed, stream state and cursors |
| `stale-replay-rejection-kit` | rejects mismatched run/session/policy revisions |
| `apple-pest-determinism-fixture-kit` | source-level deterministic world proof |
| `replay-parity-fixture-kit` | full command/tick replay proof |

## Stream isolation

```txt
orchard.apple-tree
orchard.apple-offset-x
orchard.apple-offset-y
orchard.apple-kind
session.pest-admission
session.pest-angle
```

Entity IDs must use committed sequences, not random draws:

```txt
apple-{runId}-{appleSequence}
pest-{runId}-{pestSequence}
```

## Required commit flow

```txt
admitted command or committed fixed tick
  -> request typed random decisions
  -> stage draws against named streams
  -> stage gameplay mutation
  -> commit transaction
  -> advance stream cursors
  -> append random receipts and state fingerprint
  -> publish result and render acknowledgement
```

Rejected or rolled-back mutations must not consume authoritative stream cursors.

## Dependency order

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Public Capability Gateway
  -> Composite Command Transaction Authority
  -> Seeded Random and Replay Authority
  -> Versioned Save / Load Authority
```

## Prohibited shortcuts

- Do not wrap `Math.random()` and call it deterministic.
- Do not use one shared stream for apples and pests.
- Do not advance cursors for rejected or rolled-back commands.
- Do not use random values as durable entity identity.
- Do not treat a presentation snapshot as a replay journal.
