# Architecture audit: Public Capability Gateway DSK map

## Goal

Define one composed domain that owns the boundary between player-facing capabilities, internal services, debug controls, typed results and rendered acknowledgement.

## Current authority map

```txt
HTML renderer
  -> direct engine.command
  -> runtime domain command
  -> publication
  -> result discarded

interface composition
  -> nested public engine.command
  -> child publication before parent completion

GameHost
  -> raw engine
  -> direct domain command
  -> unrestricted manual tick
```

## Current domains

```txt
kit runtime
scoped interface screens
route composition
resource ledger
pressure field
orchard world
construction
roster
inventory
active-session gameplay
canvas projection
HTML projection/input
GameHost diagnostics/debug
proof/build/deploy
```

## Missing composed domain

```txt
zombie-orchard-public-capability-gateway-domain
  -> capability-descriptor-kit
  -> capability-registry-kit
  -> public-command-envelope-kit
  -> capability-gateway-kit
  -> capability-lifecycle-admission-kit
  -> capability-route-admission-kit
  -> capability-target-admission-kit
  -> input-binding-registry-kit
  -> command-result-retention-kit
  -> disabled-affordance-projection-kit
  -> render-result-acknowledgement-kit
  -> internal-command-policy-kit
  -> debug-control-lease-kit
  -> diagnostics-observation-kit
  -> raw-engine-quarantine-kit
  -> capability-gateway-journal-kit
  -> capability-gateway-fixture-kit
```

## Service contracts

### `capability-gateway-kit`

```txt
execute(envelope) -> CapabilityCommandResult
observe() -> detached gateway state
```

Owns descriptor lookup, lifecycle/route/target admission, owner dispatch, result retention and publication policy.

### `public-command-envelope-kit`

```txt
capabilityId
bindingId
commandId
sessionId
sessionEpoch
committedTickId
targetId
payload
```

### `command-result-retention-kit`

Retains accepted/rejected results until exactly one rendered frame acknowledges the result ID and registry revision.

### `internal-command-policy-kit`

Classifies commands as public, internal or debug-only. Internal commands cannot be invoked through product input bindings.

### `debug-control-lease-kit`

Issues bounded debug authority tied to runtime/session epoch and rejects stale use after reset or disposal.

### `diagnostics-observation-kit`

Replaces raw engine exposure with immutable/detached snapshots, capability census, pending results and lifecycle observation.

## Dependency rule

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Public Capability Gateway
  -> Composite Command Transactions
```

The gateway must not invent session or tick identity. It consumes those identifiers from Gates 1 and 2 and becomes the sole public entry point for Gate 4 transactions.
