# Deploy audit — Interaction capability fixture gate

Timestamp: `2026-07-10T20-30-23-04-00`

## Current gate

```txt
push to main
  -> npm test
  -> tests/smoke.mjs
  -> assert Entry screen
  -> activate Play
  -> tick once
  -> assert Active Session
  -> assert apple array is non-empty
  -> npm run build
  -> upload dist
  -> deploy Pages
```

## Finding

The workflow structure is valid, but the test gate proves data presence rather than interaction reachability.

A non-empty apple array does not prove that the player can move to an apple or collect it. The current smoke passes even though movement has no browser binding, roster hiring and inventory equipping are unreachable, Session Select is unrouted, and Market has no service.

## Required fixture command

Add a DOM-free capability fixture beneath `npm test`:

```txt
npm run fixture:capability-reachability
```

The exact script name may differ, but the gate must cover the same contract.

## Required assertions

1. Export a versioned capability catalog.
2. Fail when a `public-direct` capability lacks a route.
3. Fail when a public route lacks an affordance or declared input binding.
4. Fail when a binding lacks a typed command result.
5. Fail when an accepted result lacks an observable state effect.
6. Prove `active-session.move` changes coordinates while running.
7. Prove movement is rejected while paused.
8. Prove a seeded move-to-apple scenario ends in successful collection.
9. Prove disabled actions cannot be invoked through rendered controls.
10. Prove roster hire and inventory equip are reachable or explicitly non-public.
11. Prove Session Select is linked or explicitly dormant.
12. Prove Market projects explicit unsupported state until its service exists.
13. Keep all readback JSON-safe and bounded.

## Gate ordering

```txt
npm test
  -> existing reachability smoke
  -> lifecycle and clock fixture
  -> capability catalog validation
  -> movement and collect scenario
  -> service binding classification
  -> build
  -> Pages deploy
```

Lifecycle proof must run before capability proof because interaction commands need an authoritative session-state guard.

## Deployment status

```txt
workflow changed: no
runtime changed: no
package scripts changed: no
fixture added: no
fixture run: no
Pages deployment behavior changed: no
```

This pass documents the missing gate only. It does not claim the capability fixture exists or passes.