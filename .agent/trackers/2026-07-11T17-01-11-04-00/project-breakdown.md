# Project breakdown: ZombieOrchard seeded random and replay authority

## Plan ledger

**Goal:** document how global randomness currently controls apple placement, apple identity, apple rarity, pest admission, pest identity and pest placement, then define one session-owned deterministic random and replay boundary without changing runtime behavior.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible central entry.
- [x] Read the active runtime, graph composition, game domains and current audit chain.
- [x] Identify the interaction loop, domains, implemented kits and kit services.
- [x] Trace every source-backed `Math.random()` consumer.
- [x] Define run seed, isolated streams, cursor receipts, deterministic entity identity and replay verification.
- [x] Add architecture, render, gameplay, interaction, random/replay and deployment audits.
- [x] Change documentation only on `main`.
- [ ] Implement the prerequisite runtime-session and fixed-step-clock authorities.
- [ ] Implement seeded streams and executable replay fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected repository: LuminaryLabs-Publish/ZombieOrchard
selection reason: oldest eligible central ledger timestamp
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

```txt
createOrchardGame()
  -> create orchard-world
  -> seedApples until 26 exist
     -> random tree index
     -> random entity id
     -> random x offset
     -> random y offset
     -> random kind

Collect command
  -> locate nearest apple
  -> remove apple
  -> seedApples refill
  -> consume the same global random source

Night tick
  -> random pest-spawn trial once per admitted tick
  -> on success, random angle and random pest id
  -> mutate pests
  -> later snapshot and render
```

## Main finding

Apple generation and pest generation share process-global `Math.random()` with no seed, stream identity or cursor. Apple collections can change later pest outcomes, night tick cadence changes the number of random trials, and random string IDs are not reproducible. A snapshot records only resulting entities, not the decisions that produced them.

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

## Required authority

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

## Dependency order

```txt
runtime session identity
  -> fixed-step committed tick identity
  -> admitted command transaction identity
  -> seeded random stream authority
  -> replay journal and state fingerprint
  -> versioned save/load authority
```

No deterministic replay claim is made by this documentation pass.