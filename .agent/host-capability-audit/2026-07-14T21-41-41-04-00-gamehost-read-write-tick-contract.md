# Host capability audit: GameHost read, write and tick contract

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

`window.GameHost` currently collapses diagnostics, mutation, plugin installation, domain access, observation and scheduling into one permanent raw engine reference. The future surface should publish only immutable readback plus allowlisted product commands.

## Plan ledger

**Goal:** retain useful browser diagnostics without giving ambient callers unrestricted runtime ownership.

- [x] Inventory the current global surface.
- [x] Classify read, command, tick, observer and provider capabilities.
- [x] Identify direct mutable references.
- [ ] Introduce a versioned capability descriptor.
- [ ] Separate production, diagnostic and fixture policies.
- [ ] Revoke capabilities during retirement.

## Current surface

```txt
window.GameHost.engine
  -> ctx
  -> domains
  -> addKit
  -> command
  -> tick
  -> snapshot
  -> subscribe

window.GameHost.getState
window.GameHost.tick
```

## Target production surface

```txt
window.GameHost
  -> capabilitySetId
  -> hostGeneration
  -> runGeneration
  -> getState(expectedRevision?)
  -> submit(command)
  -> getLastResult()
```

Production must not expose raw engine, domain references, direct APIs, `addKit`, arbitrary `tick` or unbounded subscriptions.

## Target diagnostic extension

A diagnostic build may request a scoped capability lease. The lease must identify the caller, allowed operations, expiry, route/pause policy and whether steps are headless or visible.

## Retirement

```txt
page lifecycle or host replacement
  -> revoke capability set
  -> revoke diagnostic leases
  -> reject late commands and ticks
  -> remove or replace window.GameHost
  -> publish retirement result
```

## Validation boundary

No public API changed. This is a documentation contract.