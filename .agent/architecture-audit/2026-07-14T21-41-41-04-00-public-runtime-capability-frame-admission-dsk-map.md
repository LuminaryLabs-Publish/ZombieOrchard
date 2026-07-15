# Architecture audit: public runtime capability and frame admission

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

The host publishes the complete mutable runtime rather than a product-level capability surface. Runtime mutation, diagnostic readback, test stepping and visible-frame publication are not separated into distinct authorities.

## Plan ledger

**Goal:** define the smallest DSK family that preserves diagnostics while preventing raw runtime mutation and unacknowledged external steps.

- [x] Trace host publication to runtime internals.
- [x] Trace manual tick through domain updates and presentation.
- [x] Trace direct commands and domain APIs.
- [x] Preserve the 27 implemented surfaces.
- [x] Define parent authority, subkits, results and receipts.
- [ ] Implement without restructuring product gameplay domains.

## Current ownership

```txt
src/start.js
  -> owns engine construction
  -> owns RAF
  -> owns both renderer calls
  -> publishes raw GameHost

kit-runtime
  -> owns ctx, domains, commands, ticks, snapshots and listeners
  -> exposes mutable internals through GameHost.engine

product domains
  -> expose commands and some direct APIs
  -> have no public-caller or capability admission

renderers
  -> consume only RAF-returned snapshots
  -> do not consume GameHost.tick results directly
```

## Required parent domain

```txt
zombie-orchard-public-runtime-capability-frame-admission-authority-domain
```

## Required subkits

```txt
host-generation-kit
run-generation-binding-kit
capability-policy-revision-kit
capability-set-id-kit
public-readback-descriptor-kit
public-command-allowlist-kit
caller-identity-kit
public-command-id-kit
expected-state-revision-kit
public-command-admission-kit
external-tick-lease-kit
external-tick-delta-policy-kit
headless-versus-visible-step-classification-kit
public-mutation-result-kit
runtime-frame-revision-kit
presentation-frame-revision-kit
first-visible-public-mutation-frame-ack-kit
capability-retirement-kit
public-capability-fixture-matrix-kit
```

## Service contract

```txt
publishCapabilities(policy, hostGeneration, runGeneration)
  -> PublicCapabilityPublicationResult

submitPublicCommand(capabilitySetId, command)
  -> PublicMutationResult

grantExternalTickLease(policy, caller)
  -> ExternalTickLeaseResult

submitExternalTick(leaseId, expectedFrame, dt)
  -> ExternalTickResult

ackVisibleMutation(resultId, htmlFrame, canvasFrame)
  -> FirstVisiblePublicMutationFrameAck

retireCapabilities(capabilitySetId, reason)
  -> PublicCapabilityRetirementResult
```

## Admission rules

- Never publish `engine`, `ctx`, `domains`, `addKit` or direct domain APIs to the product global.
- Readback must be immutable, revisioned and detached from runtime references.
- Public commands must use a product allowlist and expected revision.
- External ticking must be test/debug-only unless a product policy explicitly admits it.
- A visible external tick must bind simulation and presentation to one result.
- Headless ticks must be explicitly classified and must not masquerade as visible state.
- Route, pause, run generation and host generation are mandatory admission inputs.
- Retired capability sets reject late commands and ticks.

## Dependency order

```txt
host/run identity
  -> capability policy
  -> least-authority publication
  -> command or tick admission
  -> runtime settlement
  -> typed result
  -> HTML and Canvas2D projection
  -> visible-frame acknowledgement
  -> retirement
```

## Validation boundary

No runtime architecture changed. This file defines a future authority contract only.