# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T17-01-11-04-00
status: seeded-random-replay-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

`ZombieOrchard` uses process-global `Math.random()` for apple population and pest generation. Startup apple seeding, collection-triggered refills and night tick spawning all advance the same invisible random sequence. Player command timing and browser callback cadence can therefore alter later random outcomes. No seed, named stream, cursor, random receipt, deterministic entity sequence, replay journal or state fingerprint exists.

## Plan ledger

**Goal:** define a session-owned seeded-random and replay boundary that isolates apple and pest decisions, advances cursors only for committed mutations and proves replay through deterministic state fingerprints.

- [x] Compare all ten accessible Publish repositories with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Read `src/start.js`, `src/game.js`, `src/kits/runtime.js` and `src/kits/game-domains.js`.
- [x] Trace all source-backed `Math.random()` calls.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define independent streams, cursors, deterministic entity identity and replay receipts.
- [x] Add architecture, render, gameplay, interaction, random/replay and deploy audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement prerequisite runtime-session, fixed-step clock and transaction authorities.
- [ ] Implement and run random/replay fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central timestamp
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
createOrchardGame()
  -> create orchard-world
  -> seedApples to 26
     -> Math.random tree index
     -> Math.random id
     -> Math.random x offset
     -> Math.random y offset
     -> Math.random rarity

Collect command
  -> remove nearest apple
  -> seedApples refill one
  -> consume five more global draws
  -> resource, pressure and score mutation

Night tick
  -> Math.random spawn admission
  -> on success: Math.random angle and id
  -> pest pursuit and damage
  -> snapshot
  -> canvas, HTML and GameHost observation
```

## Main findings

1. Startup apple population consumes at least 130 global random draws for 26 apples.
2. Every collected apple advances the same global source by five further draws during refill.
3. Every eligible night tick consumes a pest-admission draw.
4. Every successful pest admission consumes additional angle and random-id draws.
5. Apple activity can change future pest outcomes because the systems share one random source.
6. Current one-tick-per-RAF timing changes pest trial count and random cursor advancement by display cadence.
7. Random string entity IDs are non-canonical and order-dependent.
8. Rejected, rolled-back and duplicate command cursor behavior is undefined.
9. Snapshots contain outcomes but no seed, stream, cursor, decision, committed tick, transaction or fingerprint provenance.
10. `engine.snapshot()` is not a replay artifact or restorable random authority snapshot.

## Domains in use

```txt
browser boot and runtime host
kit/domain graph construction
direct commands, ticks, events, snapshots, subscriptions and publication
runtime-session lifecycle authority: missing
fixed-step committed tick authority: missing
public capability and composite transaction authority: missing
seeded random stream authority: missing
replay journal and verifier: missing
versioned persistence authority: missing
12 interface-screen domains and composition
resource, pressure, orchard, construction, roster and inventory
movement, collection, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, build and Pages deployment
```

## Implemented kits and services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta admission, elapsed/frame mutation, all-domain tick, events, snapshots, subscriptions, publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch, automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, gain and resource snapshot |
| `pressure-field-kit` | clamped pressure channels and per-tick growth |
| `orchard-world-kit` | tree grid, random apple population, nearest collection and random refill |
| `construction-runtime-kit` | catalog selection, resource debit and built-object mutation |
| `roster-runtime-kit` | resource debit and actor hiring |
| `inventory-runtime-kit` | item state and equipment selection |
| `active-session-domain-kit` | movement, collection, phases, random pest admission/placement, pursuit, damage, score and terminal failure |
| render kits | orchard canvas, HUD, generic screens, delegated actions and per-frame HTML replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke, static copy and Pages chain |

## Required composed domain

```txt
zombie-orchard-seeded-random-replay-authority-domain
  -> run-seed-descriptor-kit
  -> deterministic-prng-kit
  -> random-stream-registry-kit
  -> random-stream-id-kit
  -> random-cursor-kit
  -> random-draw-result-kit
  -> apple-generation-policy-kit
  -> pest-spawn-policy-kit
  -> deterministic-entity-id-kit
  -> committed-tick-random-receipt-kit
  -> replay-command-envelope-kit
  -> replay-journal-kit
  -> replay-state-fingerprint-kit
  -> replay-verifier-kit
  -> random-stream-snapshot-kit
  -> stale-replay-rejection-kit
  -> apple-pest-determinism-fixture-kit
  -> replay-parity-fixture-kit
```

## Required streams

```txt
orchard.apple-tree
orchard.apple-offset-x
orchard.apple-offset-y
orchard.apple-kind
session.pest-admission
session.pest-angle
```

Entity identity should use committed sequences rather than random values.

## Required proof

```txt
same seed + same admitted commands + same committed tick schedule
  -> identical random receipts
  -> identical apple and pest identities/positions/kinds
  -> identical durable-state fingerprints

stream isolation
  -> apple generation does not change pest stream results

rejected/duplicate/rolled-back command
  -> no extra authoritative cursor advancement

replay
  -> first divergence identifies event, stream, cursor and fingerprint

save/restore continuation
  -> seed, policy, stream states, cursors and entity sequences resume exactly
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

Gate 5 must consume Gate 1 session identity, Gate 2 committed tick identity and Gate 4 transaction commit/rollback semantics.