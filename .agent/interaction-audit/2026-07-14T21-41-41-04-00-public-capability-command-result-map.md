# Interaction audit: public capability command and result map

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

The public global exposes raw mutation primitives rather than product commands. There is no stable command identity, caller identity, capability set, expected state revision or typed visible result.

## Plan ledger

**Goal:** map every public interaction to a least-authority command, explicit rejection reason and matching presentation receipt.

- [x] Inventory raw public methods and reachable engine methods.
- [x] Identify direct domain API bypasses.
- [x] Identify missing command and frame identities.
- [ ] Replace raw references with immutable descriptors and commands.
- [ ] Add rejection and visible-result fixtures.

## Current public map

| Public path | Current effect | Missing result |
|---|---|---|
| `GameHost.getState()` | returns unversioned domain snapshot | state revision and host/run identity |
| `GameHost.tick(dt)` | advances every ticking domain | lease, command ID, route/pause policy and frame ack |
| `GameHost.engine.command()` | dispatches any domain command | allowlist, caller identity and expected revision |
| `GameHost.engine.addKit()` | adds or replaces a domain | provider admission and graph revision |
| `GameHost.engine.domains[id].api.*` | mutates domain state directly | engine notification, transaction and receipt |
| `GameHost.engine.ctx` | exposes mutable runtime context | immutable readback boundary |
| `GameHost.engine.subscribe()` | adds unscoped observer | generation binding and retirement |

## Required result classes

```txt
PublicCapabilityPublicationResult
PublicReadbackResult
PublicMutationResult
PublicMutationRejectionResult
ExternalTickLeaseResult
ExternalTickResult
FirstVisiblePublicMutationFrameAck
PublicCapabilityRetirementResult
```

## Required rejection reasons

```txt
unknown capability set
retired capability set
caller not admitted
command not allowlisted
stale state revision
wrong host generation
wrong run generation
route ineligible
pause ineligible
external tick disabled
lease expired
duplicate command
visible-frame timeout
```

## Validation boundary

No interaction surface changed. This file records the future result contract only.