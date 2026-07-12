# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

Introduce a graph manifest and candidate-installation transaction before changing gameplay or renderer behavior. The runtime should reject duplicate ownership, missing services, incompatible versions and cyclic dependencies before any live domain is replaced.

## Plan ledger

**Goal:** replace imperative live-map mutation with a deterministic, validated and reversible kit-graph commit.

- [ ] Define immutable kit manifests with kit ID, domain ID, version, lifecycle phase, provided services and required services.
- [ ] Give every service a stable ID and compatibility version.
- [ ] Build a dependency graph and reject cycles.
- [ ] Resolve one deterministic creation and tick order from named phases and dependencies.
- [ ] Reject duplicate kit IDs and domain IDs by default.
- [ ] Require an explicit replacement policy for intentional owner changes.
- [ ] Build all candidate domains in an isolated context.
- [ ] Record every acquired listener, timer, transport and renderer lease.
- [ ] Validate candidate APIs and initial snapshots before commit.
- [ ] Commit the complete graph atomically under one revision.
- [ ] Roll back and dispose the candidate graph on failure.
- [ ] Retire or migrate replaced predecessors explicitly.
- [ ] Remove unrestricted `GameHost.engine.addKit()` access from public capabilities.
- [ ] Publish graph fingerprints and per-kit installation receipts.
- [ ] Correlate the first canvas and HTML frame with the committed graph revision.
- [ ] Add source, browser, built-artifact and Pages fixtures.

## Immediate safe ledge

1. Add a pure `normalizeKitManifest(kit)` helper.
2. Require each shipped kit to declare `kitId`, `domainId`, `version`, `provides`, `requires` and `phase`.
3. Add `validateKitGraph(manifests)` with duplicate, missing-provider, version and cycle diagnostics.
4. Calculate a stable graph fingerprint from normalized manifests and resolved order.
5. Construct a candidate `domains` map without exposing it through the live context.
6. Collect candidate creation results and cleanup leases.
7. Commit the candidate map only after all kits validate.
8. Return a typed `KitGraphInstallResult`.
9. Gate runtime replacement behind an explicit command and expected predecessor revision.
10. Add first-frame graph acknowledgement after both renderers complete.

## Required runtime flow

```txt
kit descriptors
  -> normalized manifests
  -> unique ownership validation
  -> service compatibility resolution
  -> dependency and cycle validation
  -> deterministic phase order
  -> isolated candidate context
  -> candidate domain creation
  -> API and snapshot validation
  -> atomic KitGraphRevision commit
  -> predecessor retirement or candidate rollback
  -> installation receipts and graph fingerprint
  -> first visible graph-frame acknowledgement
```

## Target files

```txt
src/kits/runtime.js
src/game.js
src/start.js
src/kits/kit-manifest.js
src/kits/service-contracts.js
src/kits/kit-graph-validator.js
src/kits/kit-graph-installer.js
src/kits/kit-lifecycle.js
tests/kit-manifest.fixture.mjs
tests/kit-graph-order.fixture.mjs
tests/kit-graph-duplicate.fixture.mjs
tests/kit-graph-missing-service.fixture.mjs
tests/kit-graph-rollback.fixture.mjs
scripts/smoke-kit-graph.mjs
package.json
```

## Required fixtures

```txt
same manifests in different input order -> same resolved order and graph fingerprint
duplicate kit ID -> typed rejection and zero live mutation
duplicate domain ID -> typed rejection and predecessor retained
missing provider -> exact required-service diagnostic
incompatible provider version -> exact compatibility diagnostic
cyclic dependency -> cycle path returned
candidate create failure -> reverse cleanup and unchanged live graph
intentional replacement -> explicit migration or predecessor disposal receipt
late stale replacement -> rejected by expected graph revision
first canvas and HTML frame -> matching graph revision and fingerprint
source, dist and Pages -> equivalent graph inventory
```

## Dependency order

```txt
kit graph installation
  -> runtime session
  -> clock and route admission
  -> public capability gateway
  -> command transactions
  -> frame and render authorities
  -> replay and persistence
```

## Do not claim

Do not claim deterministic installation, dependency safety, service compatibility, atomic graph replacement or graph-to-frame provenance until the fixtures pass on `main`.