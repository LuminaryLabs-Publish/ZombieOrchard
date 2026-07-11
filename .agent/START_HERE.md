# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T17-01-11-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, static build and Pages deployment.

The current audit establishes the missing seeded-random and replay authority. Apple startup/refill and night pest generation share process-global `Math.random()`. Player collection timing and browser tick cadence can therefore alter future random outcomes. No run seed, isolated stream, cursor, deterministic entity sequence, committed random receipt, replay journal or state fingerprint exists.

## Plan ledger

**Goal:** preserve the orchard's variability while making every committed apple and pest decision reproducible, stream-isolated, session-owned, replay-verifiable and continuable through future save/load authority.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Trace every source-backed global random draw.
- [x] Define seed, named streams, cursors, receipts, deterministic IDs, replay journal and verification.
- [x] Add timestamped architecture and system audits.
- [x] Change documentation only on `main` with no branch or pull request.
- [ ] Implement prerequisite session, fixed-step clock and transaction authorities.
- [ ] Implement seeded streams and replay fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T17-01-11-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T17-01-11-04-00-seeded-random-replay-authority-dsk-map.md
.agent/render-audit/2026-07-11T17-01-11-04-00-random-decision-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T17-01-11-04-00-apple-collection-pest-spawn-rng-coupling-loop.md
.agent/interaction-audit/2026-07-11T17-01-11-04-00-command-tick-random-receipt-map.md
.agent/random-replay-audit/2026-07-11T17-01-11-04-00-seed-stream-cursor-replay-contract.md
.agent/deploy-audit/2026-07-11T17-01-11-04-00-random-replay-determinism-fixture-gate.md
.agent/turn-ledger/2026-07-11T17-01-11-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
module boot
  -> create one engine graph
  -> orchard-world seeds 26 apples
     -> random tree, id, x, y and kind
  -> create renderers and start RAF

Collect
  -> remove nearest apple
  -> refill one apple through the same global random source
  -> add resources, pressure and score

Night RAF tick
  -> global random pest-spawn trial
  -> optional random pest angle and id
  -> pursue player and apply damage
  -> snapshot and render
```

## Main finding

```txt
successful apple collection
  -> consumes five global random draws
  -> shifts the next pest-admission value
  -> changes later pest population and placement

more browser callbacks
  -> more night spawn trials
  -> faster global random cursor advancement
```

Global `Math.random()` is not observable or restorable. Random string entity IDs make canonical replay comparison harder. Presentation snapshots show resulting entities but not the seed, stream, cursor, decision, tick or transaction that created them.

## Domains in use

```txt
static browser route and ESM boot
browser runtime/session host
kit registration and mutable graph construction
command, tick, event, snapshot, subscription and publication routing
runtime-session lifecycle authority: missing
fixed-step clock and committed tick identity: missing
public capability and command transaction authority: missing
seeded random stream and replay authority: missing
versioned persistence authority: missing
12 scoped interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world, trees, apples and collection refill
construction, roster and inventory runtimes
active-session movement, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, static build and Pages deployment
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Kit services

| Kit group | Services |
|---|---|
| runtime | registration, domain creation, commands, ticks, events, snapshots, subscriptions and publication |
| interface | screen state, actions, fields, activation, routing, nested dispatch and Outcome routing |
| game | resources, pressure, orchard/apples, collection/refill, construction, hiring, equipment, movement, phases, pest spawning, pursuit, damage, score and failure |
| render | orchard canvas, HUD, generic screens, delegated bindings and per-frame DOM projection |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Required random and replay domain

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

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Composite Command Transaction Authority
+ Seeded Random and Replay Authority
+ Apple/Pest Determinism and Replay Parity Fixture Gate
```

Seeded replay must consume earlier runtime/session, committed-tick and transaction identities. It must not introduce parallel ownership.