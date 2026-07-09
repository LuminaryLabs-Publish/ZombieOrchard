# ZombieOrchard Data Action Nested Result Map

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Current click routing

```txt
click[data-action]
  -> engine.command("interface-composition", "activate", { actionId })

click[data-command]
  -> engine.command("active-session", command)
```

## Current composition routing

```txt
activate
  -> ctx.domains[state.active].command("activate", payload)
  -> result.action
  -> if action.command, call ctx.engine.command(...)
  -> discard nested command result
  -> move(action.to or transition table target)
```

## Problem

Nested command results are produced by the runtime, but they disappear before renderer, GameHost, fixture, or central-ledger proof can inspect them.

## Required adapter

```txt
InterfaceNestedResultAdapter:
  retains nested result
  keeps existing activate/back behavior
  exposes snapshot().lastResult
  tags source screen and action id
  preserves transition result compatibility
```

## Market proof rows needed

```txt
sell-apples accepted
buy-basic-tool accepted
buy-row-supply accepted or capacity-checked
insufficient-money rejected
insufficient-apples rejected
inventory-capacity rejected
back transition preserved
```
