# Next steps — ZombieOrchard

## Ordered implementation queue

```txt
1. ZombieOrchard Runtime Session Clock and Lifecycle Authority
   + Pause/Reset/Refresh-Rate Fixture Gate

2. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

## Goal

Create one explicit runtime session and clock owner first. Then make the intended browser interaction surface match the services actually implemented by the kits. Every public capability must have a declared owner, route, affordance, command binding, typed result, observable state effect, and fixture row.

## Gate 1 — lifecycle and clock authority

1. Add JSON-safe runtime-session states: `idle`, `starting`, `running`, `paused`, `ended`, `stopping`, `stopped`, `disposed`, and `failed`.
2. Replace one-fixed-step-per-RAF behavior with a host-owned fixed-step accumulator driven by elapsed wall time.
3. Gate pressure and active-session ticking on authoritative session state.
4. Define Play, New Game, Pause, Resume, Title, Outcome, Stop, Reset, and Dispose as lifecycle transactions rather than screen-only transitions.
5. Retain and cancel the RAF request ID.
6. Return renderer disposers and remove the delegated click listener.
7. Prevent unrestricted `GameHost.tick()` from racing with automatic clock ownership.
8. Add DOM-free 30/60/120 Hz, pause, reset, re-entry, start/stop, and disposal fixtures.

## Gate 2 — capability reachability

1. Add a canonical capability registry row for every domain command and service.
2. Classify each capability as `public-direct`, `public-indirect`, `internal`, `dormant`, or `unsupported`.
3. Update the existing active-session interaction owner with a browser input adapter for movement.
4. Support keyboard movement at minimum and expose an accessible on-screen fallback.
5. Gate movement by authoritative session state so Pause and non-gameplay screens reject it.
6. Add movement results with accepted/rejected/no-op reasons and resulting player coordinates.
7. Prove the starting scenario always has a recoverable path to successful collection, independent of random initial proximity.
8. Decide whether `session-select` is a public route. Link it from Entry or classify it as intentionally dormant.
9. Render and bind Run Setup and Preferences fields only when they have actual source descriptors.
10. Wire roster hiring through preset action descriptors and typed results, or classify the service as internal.
11. Wire inventory equipment through item affordances and typed results, or classify it as internal.
12. Preserve construction build access but retain and project the nested command result.
13. Mark Market as unsupported until a real market source/transaction service exists; do not imply operational trading through a Back-only shell.
14. Propagate action `disabled` metadata to actual disabled controls.
15. Add a bounded capability/result journal to `GameHost` readback.
16. Add a DOM-free reachability fixture that fails when a declared public capability lacks a route, affordance, binding, result, or observable effect.
17. Add browser smoke coverage for movement, successful collection, build, pause rejection, and at least one secondary service.
18. Gate `npm test` on lifecycle and capability-reachability fixtures before Pages deployment.

## Domain-update-first map

```txt
src/start.js host
  -> lifecycle/clock ownership and browser input adapter lifetime

kit-runtime
  -> lifecycle state, command metadata, capability registry access, result journal

active-session-domain-kit
  -> movement admission, typed movement result, session-state guard

scoped-interface-domain-kit
  -> capability descriptors for select/set-field/activate

interface-composition-kit
  -> route capability descriptors and nested-result retention

orchard-preset
  -> explicit public route and affordance declarations

html-interface-render-kit
  -> keyboard/on-screen movement, disabled controls, field controls,
     interactive roster/inventory affordances, result projection

world-canvas-render-kit
  -> consumed player-position and committed-state observation

game-host-diagnostics-kit
  -> capability catalog, binding status, bounded result rows

smoke-fixture-kit
  -> lifecycle parity plus public capability reachability gate
```

Only add new kits where existing owners cannot hold the capability cleanly:

```txt
runtime-session-authority-kit
fixed-step-clock-kit
browser-input-adapter-kit
capability-registry-kit
capability-reachability-fixture-kit
```

## Acceptance checklist

```txt
[ ] Gameplay does not tick before a session starts.
[ ] Pause freezes all gameplay-owned state.
[ ] Equal wall time at 30/60/120 Hz yields equivalent gameplay fingerprints.
[ ] New Game atomically resets session-owned domains.
[ ] Stop and Dispose release RAF and listener ownership.
[ ] Every public capability has one owner and stable capability ID.
[ ] Every public capability has a reachable route and rendered affordance.
[ ] Every rendered affordance has a command binding and typed result.
[ ] Movement is reachable through keyboard and accessible fallback controls.
[ ] Movement rejects outside running gameplay state.
[ ] A deterministic fixture can move to and collect an apple.
[ ] Roster hire and inventory equip are either reachable or explicitly non-public.
[ ] Session Select is either linked or explicitly dormant.
[ ] Market is not presented as operational before a market service exists.
[ ] Disabled action metadata produces disabled controls.
[ ] GameHost capability and result readback is bounded and JSON-safe.
[ ] npm test gates deployment on lifecycle and reachability proof.
```

## Avoid until proof exists

- Market catalog expansion
- economy balancing
- new orchard content
- new pest types
- renderer replacement
- visual polish
- save/resume claims
- broad runtime refactors without lifecycle and reachability fixtures