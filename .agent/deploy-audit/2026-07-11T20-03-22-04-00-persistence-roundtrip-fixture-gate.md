# Deploy audit — Persistence Roundtrip Fixture Gate

## Plan ledger

**Goal:** prevent Pages deployment from claiming resumable play until save/load roundtrip, migration, corruption recovery, deterministic continuation and restored-frame proofs pass.

- [x] Review current package scripts.
- [x] Review the current smoke test.
- [x] Identify missing persistence proof.
- [x] Define DOM-free and browser fixture gates.
- [x] Define deployment admission criteria.
- [ ] Implement fixtures and wire them into CI.

## Current proof surface

```txt
npm test
  -> tests/smoke.mjs
  -> Entry exists
  -> Play reaches active-session
  -> apples exist

npm run build
  -> static copy into dist
```

No current test reads or writes a slot, restores a graph, migrates a schema, handles corruption, proves random continuation or acknowledges a restored browser frame.

## Required DOM-free gate

```txt
persistence-envelope-schema.test.mjs
persistence-roundtrip.test.mjs
persistence-random-continuation.test.mjs
persistence-slot-conflict.test.mjs
persistence-atomic-write-failure.test.mjs
persistence-migration.test.mjs
persistence-future-schema-rejection.test.mjs
persistence-corruption-quarantine.test.mjs
persistence-load-rollback.test.mjs
persistence-idempotency.test.mjs
```

## Required browser gate

```txt
Save Select reachable from Entry
slot index renders authoritative data
manual save result renders
stale slot conflict renders without overwrite
load result renders
first restored canvas, HTML and GameHost frame match
failed load preserves prior visible run
no predecessor frame after load epoch
repeated loads retain one RAF chain
repeated loads retain one delegated listener
storage failure remains recoverable
```

## Deterministic continuation proof

```txt
run A reaches committed tick T
  -> save slot S
  -> continue N ticks -> fingerprint F1

fresh runtime
  -> load slot S
  -> continue same N admitted ticks and commands -> fingerprint F2

assert F1 == F2
assert random receipt ranges match
assert apple and pest identities match
```

## Migration proof

For every supported schema version:

```txt
fixture envelope
  -> ordered migration path
  -> current schema
  -> expected migration fingerprint
  -> successful candidate hydration
  -> expected restored durable fingerprint
```

Unknown future versions must return a typed incompatibility result without mutating storage or runtime state.

## Corruption proof

```txt
modify envelope bytes or checksum
  -> load rejected
  -> quarantine record created
  -> original bytes retained
  -> current run unchanged
  -> Save Select marks slot corrupt
```

## Deployment admission

Pages deployment may claim save/resume support only when all of the following are green on `main`:

```txt
runtime-session lifecycle fixtures
fixed-step clock fixtures
capability and command transaction fixtures
seeded random and replay fixtures
persistence roundtrip fixtures
migration and corruption fixtures
browser first-restored-frame fixtures
build artifact verification
Pages route smoke
```

## Current result

```txt
runtime source changed: no
package scripts changed: no
deployment workflow changed: no
npm test: not run
npm run build: not run
persistence fixtures: unavailable
browser persistence smoke: unavailable
Pages persistence claim: not permitted
```
