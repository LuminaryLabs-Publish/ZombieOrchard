# Next steps: ZombieOrchard save-slot session selection

**Timestamp:** `2026-07-15T12-39-01-04-00`  
**Status:** `save-slot-session-selection-admission-authority-audited`

## Summary

Implement one save/session authority before adding individual storage calls. Discovery, load, new-session creation, whole-runtime adoption, route transition and visible-frame acknowledgement must settle as one coordinated contract.

## Plan ledger

**Goal:** make Save Select truthful and ensure every active run has a stable, durable session identity.

### Gate 1: identity and schema

- [ ] Add `SaveSchemaVersion`, `SaveSlotId`, `SaveRevision`, `RunGeneration` and `StorageGeneration`.
- [ ] Define the complete durable save envelope.
- [ ] Classify valid, empty, migratable, corrupt and incompatible records.
- [ ] Define checksum and migration provenance.

### Gate 2: catalog and route

- [ ] Route Play to an admitted save-catalog result.
- [ ] Populate immutable slot summaries.
- [ ] Add explicit Select, New and Delete actions.
- [ ] Distinguish empty storage from discovery failure.
- [ ] Bind the selected slot to the route revision.

### Gate 3: serialization and durable commit

- [ ] Serialize all state-bearing domains through one authority.
- [ ] Use atomic write or predecessor-preserving replacement.
- [ ] Reject stale revisions and duplicate commands.
- [ ] Publish typed commit, delete and storage-failure results.

### Gate 4: load and runtime adoption

- [ ] Validate or migrate before changing runtime state.
- [ ] Prepare every domain without publishing partial state.
- [ ] Verify cross-domain invariants.
- [ ] Atomically adopt all prepared state or preserve the predecessor.
- [ ] Retire the prior session generation.

### Gate 5: new session

- [ ] Coordinate with clean-run reset authority.
- [ ] Allocate a fresh slot and run generation.
- [ ] Reset all participating domains.
- [ ] Commit the initial document before entering active-session.

### Gate 6: presentation and proof

- [ ] Add save-catalog and session revisions to snapshots.
- [ ] Publish slot-card and active-session projection receipts.
- [ ] Publish `FirstSaveCatalogFrameAck` and `FirstLoadedSessionFrameAck`.
- [ ] Run source, browser, reload, dist and Pages fixtures.

## Recommended file cut

```txt
src/persistence/
  save-schema.js
  save-catalog.js
  storage-adapter.js
  save-migration.js
  save-session-authority.js

src/kits/
  runtime.js
  composition.js
  scoped-interface-domains.js
  game-domains.js

src/renderer/
  html-interface-renderer.js
  world-canvas.js

tests/
  save-session.fixture.mjs
  save-reload.browser.fixture.mjs
```

## Required fixtures

```txt
empty storage and discovery failure are distinct
valid slots render with stable IDs and ordering
new session creates one durable initial document
save commit increments revision exactly once
reload restores every participating domain
stale writes are rejected
corrupt and incompatible saves never adopt
supported old schema migrates with provenance
storage failure preserves predecessor
load adopts all domains or none
Canvas2D and HTML share loaded SessionRevision
source/dist/Pages results match
```

## Retained next steps

Host-clock, route-suspension, clean-run reset, public capability, terminal settlement, Canvas/HTML coherence and focus-safe HTML projection remain open dependencies.

## Do not claim

Do not claim persistence safety, save compatibility, atomic restore, reload recovery, frame convergence, artifact parity or production readiness until the complete matrix passes.
