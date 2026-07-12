# Interaction audit: terminal command admission map

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

Visible Outcome controls are narrow, but the underlying command surface is not. Direct engine access can continue invoking active-session commands after terminal failure.

## Plan ledger

**Goal:** require every command to prove an active run capability before it reaches mutable gameplay state.

- [x] Map visible and public command ingress.
- [x] Map current route and ended checks.
- [x] Identify missing capability revocation.
- [x] Define terminal-aware admission results.
- [ ] Implement the gateway.

## Command ingress

```txt
HTML quick controls
  -> engine.command(active-session, collect|clear|next-phase)

HTML route actions
  -> engine.command(interface-composition, activate)

public diagnostics
  -> window.GameHost.engine.command(any domain, any command)
  -> window.GameHost.tick(dt)

internal composition
  -> nested engine.command(...)
```

## Current admission

```txt
domain exists?
  -> command handler recognizes type?
  -> mutate

terminal phase, route, session and capability are not checked
```

## Required admission

```txt
GameplayCommand
  -> validate runtime session
  -> validate run generation
  -> validate command capability lease
  -> validate phase == ACTIVE
  -> validate expected gameplay revision
  -> validate command identity/idempotency
  -> execute or return typed rejection
```

## Required rejection reasons

```txt
run-terminal
run-retired
stale-session
stale-run-generation
capability-revoked
stale-gameplay-revision
duplicate-command
unsupported-command
```

## Public host requirement

`window.GameHost` must publish bounded diagnostic/readback capabilities. It must not expose an unrestricted mutable engine owner after terminal commit.

## Proof

```txt
visible post-terminal quick control absent
direct public move rejected
direct public collect rejected
direct public clear rejected
direct public phase change rejected
nested economy command rejected
all rejections leave snapshots unchanged
```
