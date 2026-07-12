# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T12-39-25-04-00`  
**Status:** `economy-command-admission-authority-audited`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The newest audit isolates semantic economy command admission. Resource, construction, roster and inventory handlers accept raw caller payloads without one resource schema, catalog revision, price authority, expected state revision or conservation result. Negative payments mint resources, negative roster prices can mint money while adding an actor, unknown construction IDs fall back to the first catalog item and inventory equip accepts unknown IDs.

## Plan ledger

**Goal:** require every resource, build, hire, collect and equip operation to pass one versioned semantic admission and conservation transaction before participant state changes.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible synchronized entry.
- [x] Trace browser/public command entry and participant mutations.
- [x] Identify all domains, all 27 implemented kit surfaces and offered services.
- [x] Document negative-cost and arbitrary-resource minting.
- [x] Document invalid catalog and inventory reference behavior.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root documents and machine registry.
- [x] Synchronize central ledger and change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and run semantic economy fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T12-39-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T12-39-25-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T12-39-25-04-00-economy-command-admission-dsk-map.md
.agent/render-audit/2026-07-12T12-39-25-04-00-economy-result-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T12-39-25-04-00-negative-cost-resource-minting-loop.md
.agent/interaction-audit/2026-07-12T12-39-25-04-00-economy-command-admission-map.md
.agent/economy-audit/2026-07-12T12-39-25-04-00-resource-catalog-conservation-contract.md
.agent/deploy-audit/2026-07-12T12-39-25-04-00-economy-admission-fixture-gate.md
```

## Interaction loop

```txt
browser action or public GameHost caller
  -> engine.command(domainId, type, payload)
  -> participant domain interprets raw payload
  -> resource/catalog/roster/inventory state mutates immediately
  -> nested participant APIs may mutate more domains
  -> synchronous publication
  -> canvas and HTML render successor snapshots
```

## Main findings

```txt
resource-ledger pay accepts negative costs
negative payment subtracts a negative value and mints resources
unknown negative-cost keys can create arbitrary balances
roster hire trusts caller-supplied signed cost
unknown construction ID falls back to catalog[0]
inventory equip accepts unknown item ID
command schema and capability admission: absent
expected resource/catalog revision: absent
idempotency and duplicate-command rejection: absent
balance and participant commit receipts: absent
first visible economy-frame acknowledgement: absent
```

## Required parent domain

```txt
zombie-orchard-economy-command-admission-authority-domain
```

## Required flow

```txt
EconomyCommand
  -> session, route and capability admission
  -> schema and finite-number validation
  -> registered resource and catalog reference validation
  -> nonnegative cost and signed-delta policy
  -> predecessor revision checks
  -> immutable mutation plan
  -> conservation and balance-floor checks
  -> atomic participant commit
  -> typed result and delta receipts
  -> duplicate/stale rejection
  -> first visible matching frame acknowledgement
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not accept caller-authored prices.
Do not implicitly create resource keys.
Do not fall back from an unknown catalog ID.
Do not claim conservation or semantic command safety until fixtures pass.
```