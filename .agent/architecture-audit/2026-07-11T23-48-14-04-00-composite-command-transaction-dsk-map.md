# Architecture audit: composite command transaction DSK map

## Current ownership split

```txt
html-interface-render-kit
  -> browser intent

interface-composition-kit
  -> action resolution
  -> nested child dispatch
  -> route mutation

kit-runtime
  -> immediate domain call
  -> immediate notification

resource/pressure/orchard/construction/roster/inventory/active-session
  -> direct mutable participant effects
```

No owner composes these into one command result.

## Required parent domain

```txt
zombie-orchard-composite-command-transaction-authority-domain
```

## Required kits

| Kit | Responsibility |
|---|---|
| `command-envelope-kit` | canonical command request |
| `command-id-kit` | exactly-once command identity |
| `transaction-id-kit` | aggregate operation identity |
| `expected-revision-admission-kit` | reject stale requests before mutation |
| `action-resolution-kit` | expand interface action into child and route plans |
| `command-participant-registry-kit` | resolve every affected owner |
| `participant-prepare-kit` | validate and stage without mutation |
| `participant-commit-kit` | apply one prepared change |
| `participant-rollback-kit` | restore or discard failed candidate work |
| `transaction-idempotency-kit` | return prior receipt for duplicates |
| `transaction-event-buffer-kit` | retain events until commit |
| `single-publication-barrier-kit` | publish only aggregate committed state |
| `aggregate-command-result-kit` | typed result across all participants |
| `command-result-journal-kit` | bounded ordered command history |
| `command-frame-receipt-kit` | tie result to canvas and HTML frames |
| `command-transaction-fixture-kit` | failure, duplicate and parity proof |

## Transaction boundary

```txt
admit envelope
  -> resolve full action graph
  -> resolve participant set
  -> prepare all participants
  -> reject all if one rejects
  -> commit prepared participants
  -> publish buffered events once
  -> advance state revision once
  -> produce aggregate result
  -> acknowledge first visible frame
```

## Existing DSKs to update first

```txt
kit-runtime
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
active-session-domain-kit
html-interface-render-kit
world-canvas-render-kit
```

The parent domain coordinates these owners. It does not absorb their local state or business rules.

## Invariants

1. No participant mutates during prepare.
2. Parent success cannot conceal child rejection.
3. One command ID produces at most one committed effect.
4. One intent publishes at most one committed observation.
5. Every accepted result identifies before/after revisions.
6. Every accepted result identifies the first presenting canvas and HTML frame.
7. Rejection leaves all participant fingerprints unchanged.
8. Rollback and duplicate outcomes are explicit results, not exceptions or silent returns.