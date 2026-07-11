# Composite command transaction DSK map

## Audit timestamp

```txt
2026-07-11T07-51-07-04-00
```

## Goal

Define the architecture that converts a screen action with child gameplay work into one admitted, atomic, observable and reversible transaction.

## Existing DSK/domain chain

```txt
html-interface-render-kit
  -> kit-runtime.command
  -> interface-composition-kit
  -> active scoped-interface-domain-kit
  -> optional child runtime domain
     -> resource-ledger-kit
     -> construction-runtime-kit / roster-runtime-kit / inventory-runtime-kit
  -> optional route transition
  -> runtime publication
  -> canvas and HTML render consumers
```

## Current authority break

`interface-composition-kit` invokes child work through the same public `engine.command()` path used by external callers. That path publishes immediately. The composition domain then discards the child result and completes the parent command, causing another publication.

```txt
no transaction owner
no command identity
no parent/child identity
no internal non-publishing dispatch
no full preflight
no staged mutation
no rollback
no required-child policy
no single-publication barrier
no committed command journal
no render acknowledgement
```

## Proposed parent domain

```txt
composite-command-transaction-domain
```

It owns command admission, transaction identity, plan construction, staged child execution, commit/rollback, result composition, journal publication and first-frame correlation.

## Proposed kits

### Identity and admission

- `command-envelope-kit`: normalizes command ID, source, session/epoch and expected tick.
- `command-sequence-kit`: provides monotonic sequencing and exactly-once lookup.
- `transaction-id-kit`: identifies one parent transaction and all child work.
- `command-preflight-kit`: validates lifecycle, capability, domain, command, target, resources and route.
- `target-admission-kit`: rejects missing or unknown targets without fallback.

### Planning and execution

- `child-command-plan-kit`: resolves required and optional child operations before mutation.
- `internal-dispatch-kit`: executes children inside the active transaction without public publication.
- `required-child-policy-kit`: decides whether child rejection rejects the parent.
- `mutation-stage-kit`: holds candidate domain changes before commit.
- `resource-debit-receipt-kit`: returns typed resource before/after/shortfall evidence.

### Commit and rollback

- `route-commit-kit`: stages route mutation and commits only with required child work.
- `command-rollback-kit`: restores all participating domains to before-state on failure.
- `command-publication-barrier-kit`: emits exactly one aggregate publication after final state.

### Results and proof

- `child-command-result-kit`: records each child acceptance, reason and effects.
- `command-result-envelope-kit`: returns parent, children, route, fingerprints and publication count.
- `command-journal-kit`: stores bounded detached transaction rows.
- `render-command-correlation-kit`: tags snapshots and first rendered frame with committed transaction identity.
- `command-transaction-fixture-kit`: proves accepted, rejected, rollback and exactly-once cases.

## Required transaction state machine

```txt
received
  -> rejected_admission
  -> admitted
  -> preflighting
  -> rejected_preflight
  -> staging
  -> executing_children
  -> rolling_back
  -> rolled_back
  -> committing
  -> committed
  -> publishing
  -> published
  -> frame_acknowledged
```

Only terminal rows are externally observable as command results. Intermediate stages remain internal.

## Required result envelope

```txt
commandId
transactionId
parentCommandId
runtimeId
sessionId
sessionEpoch
expectedCommittedTickId
source
state
accepted
reason
parentResult
childResults[]
routeResult
resourceReceipts[]
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
firstRenderedFrameId
```

## Dependency placement

```txt
runtime-session-authority-domain
  -> fixed-step-clock-domain
  -> capability-registry-domain
  -> composite-command-transaction-domain
```

The transaction domain must consume session and tick identity rather than inventing an independent lifetime model.
