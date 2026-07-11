# Command transaction fixture gate

## Audit timestamp

```txt
2026-07-11T07-51-07-04-00
```

## Goal

Define the executable proof required before composite command authority can be treated as deployable.

## Current deployment chain

```txt
npm test
  -> tests/smoke.mjs
  -> Entry -> Play
  -> apple presence

npm run build
  -> copy index.html and src into dist

Pages workflow
  -> test
  -> build
  -> upload/deploy static artifact
```

The current smoke cannot detect nested publication, child-result loss, invalid target fallback, repeated side effects or rollback failure.

## Required Node fixture file

```txt
tests/command-transaction.mjs
```

## Required fixture cases

### Accepted build

```txt
initial resources: money 40, wood 12
command: build storage-shed
expected:
  parent accepted
  one accepted child result
  money 32, wood 8
  exactly one built object
  exactly one publication
  after fingerprint differs from before
```

### Insufficient resources

```txt
initial resources below cost
expected:
  child rejected insufficient_resources
  parent rejected
  resources unchanged
  built list unchanged
  route unchanged
  exactly one publication
```

### Unknown target

```txt
command target: missing-id
expected:
  unknown_target
  no first-catalog fallback
  no mutation
```

### Missing child domain

```txt
remove/replace child capability in fixture runtime
expected:
  parent rejected
  route unchanged
  before/after fingerprints equal
```

### Commit failure and rollback

```txt
inject failure after staged debit
expected:
  transaction rolled_back
  resources restored
  construction restored
  route restored
  publication count one
```

### Command plus route

```txt
accepted child -> route commits
rejected child -> route does not commit
```

### Exactly once

```txt
same commandId repeated
expected:
  one built object
  one debit
  prior result returned
```

### Publication barrier

Capture subscriber callbacks and assert:

```txt
accepted: 1
rejected: 1
rolled_back: 1
no callback contains staged partial state
```

## Required browser fixture

Use a browser harness against the built artifact:

```txt
open Construction
click Storage Shed once
read detached command result
read resource/build state
wait for first frame acknowledgement
assert matching transactionId and fingerprint
```

Repeat with insufficient resources and rapid double click.

## Package gate

Recommended scripts:

```json
{
  "test:smoke": "node tests/smoke.mjs",
  "test:transactions": "node tests/command-transaction.mjs",
  "test": "npm run test:smoke && npm run test:transactions"
}
```

Later add browser transaction proof after the runtime host and detached GameHost observation surface exist.

## Deployment rule

Do not claim the transaction gate complete until:

```txt
parent/child result fidelity passes
invalid target rejection passes
rollback fidelity passes
single-publication count passes
exactly-once command ID passes
browser first-frame correlation passes
```
