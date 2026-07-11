# Architecture audit: Composite command transaction authority

## Summary

The current runtime treats a UI action and its required child command as separate public commands. The architecture needs one transaction owner that preflights the complete action, executes child work internally, commits or rolls back atomically, publishes once, and returns a result containing every required child outcome.

## Plan ledger

**Goal:** map current domain ownership to the minimum DSK boundary required for truthful parent and child command results.

- [x] Map the public command path.
- [x] Map parent action resolution.
- [x] Map nested child dispatch.
- [x] Map resource and gameplay mutation.
- [x] Map publication and rendering.
- [x] Identify missing identities, receipts, rollback, and proof.
- [x] Define a staged DSK cut.
- [ ] Implement the DSKs.
- [ ] Add executable fixtures.

## Current architecture

```txt
html-interface-render-kit
  -> kit-runtime.command(interface-composition, activate)

interface-composition-kit
  -> scoped-interface-domain-kit.command(activate)
  -> action descriptor
  -> kit-runtime.command(child domain, child type)
  -> optional route mutation
  -> parent result

kit-runtime
  -> child domain command
  -> subscriber publication
  -> return child result to composition
  -> composition discards child result
  -> outer subscriber publication

construction-runtime-kit
  -> target lookup with first-item fallback
  -> resource-ledger-kit.api.pay()
  -> built-object mutation
```

## Active domains

```txt
browser boot and runtime hosting
kit and domain graph construction
command, tick, event, snapshot, subscription, and publication routing
12 interface-screen domains
route composition and automatic Outcome routing
resources
pressure
orchard world and apples
construction
roster
inventory
active-session gameplay
canvas rendering
HTML rendering and delegated input
GameHost diagnostics
smoke, build, and deployment proof
```

## Implemented kit inventory

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

## Required DSK map

```txt
composite-command-transaction-domain
  owns:
    one public command lifecycle
    transaction identity
    parent and child result integrity
    preflight
    mutation staging
    route staging
    commit or rollback
    single publication
    journal row
    render acknowledgement correlation

  composes:
    command-envelope-kit
    transaction-id-kit
    command-sequence-kit
    command-preflight-kit
    child-command-plan-kit
    internal-dispatch-kit
    child-command-result-kit
    required-child-policy-kit
    target-admission-kit
    resource-debit-receipt-kit
    mutation-stage-kit
    command-rollback-kit
    route-commit-kit
    command-result-envelope-kit
    command-publication-barrier-kit
    command-journal-kit
    render-command-correlation-kit
    command-transaction-fixture-kit
```

## Service contracts

### `command-envelope-kit`

```txt
commandId
transactionId
parentCommandId
runtimeId
sessionId
sessionEpoch
source
expectedCommittedTickId
issuedAt
```

### `command-preflight-kit`

Validates the active screen, parent capability, child capability, target identity, affordability, route target, session and phase admission, and rollback support without mutating live state.

### `internal-dispatch-kit`

Executes child work inside the current transaction and never publishes independently.

### `resource-debit-receipt-kit`

Returns a typed receipt with debit identity, requested amounts, before values, after values, shortfall, acceptance, and reason.

### `mutation-stage-kit`

Builds resource, construction, route, and message candidates off the live graph.

### `command-rollback-kit`

Restores all before states when any required child or commit step fails.

### `command-result-envelope-kit`

```txt
commandId
transactionId
accepted
reason
parentResult
childResults[]
routeResult
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
firstRenderedFrameId
```

### `command-publication-barrier-kit`

Publishes one final accepted, rejected, or rolled-back result after all required work has completed.

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> capability registry and reachability
  -> composite command transaction authority
  -> seeded randomness and replay
  -> versioned save and load
```

The transaction layer must consume session, epoch, committed tick, and capability identity rather than inventing parallel ownership.