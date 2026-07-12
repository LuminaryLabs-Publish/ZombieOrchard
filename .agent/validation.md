# Validation — ZombieOrchard

## Scope

Documentation-only versioned save/load authority audit. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the exact source-backed persistence gap and the proof required before save slots, resumable continuation, migration, corruption recovery or atomic load claims are made.

- [x] Read module boot and graph construction.
- [x] Read interface-domain creation, preset routing and Save Select projection.
- [x] Confirm Entry has no route to `session-select`.
- [x] Confirm Save Select has no slot data or load actions.
- [x] Confirm no storage, save, load, delete, migration or hydration service exists.
- [x] Confirm `engine.snapshot()` has no inverse restore path.
- [x] Confirm runtime clock and global random continuation are absent from snapshots.
- [x] Confirm no schema, checksum, candidate graph, load epoch, rollback or restored-frame contract exists.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement prerequisite authorities and persistence fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates one graph before player action
  -> recursively ticks it forever
  -> exposes raw snapshot and manual tick

src/game.js
  -> constructs every mutable domain once
  -> no persistence domain or hydration factory

src/kits/runtime.js
  -> snapshot gathers domain projections
  -> no restore/import operation
  -> ctx frame and elapsed are not included in snapshot

src/kits/scoped-interface-domains.js
  -> session-select is a generic interface domain
  -> meta comes only from preset configuration
  -> no slot-specific commands

src/presets/orchard-preset.js
  -> Entry exposes Play, New Game and Settings
  -> no route to session-select
  -> session-select exposes Back only
  -> no slot metadata

src/kits/game-domains.js
  -> mutable state remains in closures
  -> orchard and pest generation use Math.random()
  -> no hydrate/reset/import service

src/renderer/html-interface-renderer.js
  -> can render current.meta.slots
  -> does not own a slot index or command results

src/renderer/world-canvas.js
  -> renders current orchard/session projection
  -> no save/load/frame provenance
```

## Current proof surface

```txt
npm test
  -> tests/smoke.mjs
  -> verifies initial Entry to Play
  -> verifies apples exist

npm run build
  -> copies static application into dist
```

This does not prove Save Select reachability, slot indexing, save durability, schema migration, random continuation, atomic load, rollback, corruption recovery or first-restored-frame parity.

## Required DOM-free fixtures

```txt
slot save roundtrip
  -> saved durable fingerprint equals current committed fingerprint

slot load roundtrip
  -> restored durable fingerprint equals saved fingerprint

random continuation
  -> next apple and pest decisions match uninterrupted continuation

slot conflict
  -> stale expected revision receives typed conflict
  -> prior valid envelope remains unchanged

atomic write failure
  -> prior valid slot and slot index remain intact

schema migration
  -> each supported old version migrates deterministically to current

unknown future schema
  -> typed incompatibility rejection
  -> no live mutation

checksum corruption
  -> candidate quarantined
  -> original bytes retained
  -> current run unchanged

candidate hydration failure
  -> no partial authority transfer
  -> current graph remains committed

duplicate save/load command
  -> cached idempotent result
  -> no duplicate revision or graph swap
```

## Required browser fixtures

```txt
Entry exposes authoritative Continue or Save Select capability
Save Select projects current slot index
slot actions surface typed results
save acknowledgement cites committed tick and slot revision
load acknowledgement cites load epoch and restored fingerprint
first restored canvas, HTML and GameHost frame agree
no predecessor frame after load epoch commit
failed load leaves current visible run unchanged
repeated save/load retains one RAF chain and one delegated listener
storage/quota failure remains recoverable
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
save/load roundtrip fixture: unavailable / not run
random continuation fixture: unavailable / not run
slot conflict fixture: unavailable / not run
migration fixture: unavailable / not run
corruption quarantine fixture: unavailable / not run
load rollback fixture: unavailable / not run
first restored frame fixture: unavailable / not run
repeated load lifecycle fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No reachable Save Select, durable slot, schema compatibility, deterministic continuation, atomic load, corruption recovery or restored-frame coherence claim is made.