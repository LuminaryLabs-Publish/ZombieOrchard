# Interaction audit — Capability, route, binding, and result map

Timestamp: `2026-07-10T20-30-23-04-00`

## Interaction graph

```txt
preset action descriptor
  -> rendered data-action button
  -> interface-composition.activate
  -> active screen activate
  -> optional nested child command
  -> optional route transition

hard-coded gameplay button
  -> rendered data-command button
  -> active-session command
```

## Current direct bindings

| Rendered control | Command target | Result handling |
| --- | --- | --- |
| preset action button | `interface-composition.activate` | parent result ignored by renderer |
| Collect | `active-session.collect` | result ignored; message read next frame |
| Clear | `active-session.clear` | result ignored; message read next frame |
| Next Phase | `active-session.next-phase` | result ignored; state read next frame |

## Missing bindings

```txt
movement input          -> active-session.move
roster hire control     -> roster-runtime.hire
inventory equip control -> inventory-runtime.equip
selection control       -> scoped-interface.select
field input             -> scoped-interface.set-field
direct back control     -> interface-composition.back
```

## Route gaps

```txt
session-select
  instantiated
  renderer supports slot cards
  no Entry action routes to it
  no slot commands exist

exchange
  Active Session routes to it
  only Back is declared
  no market runtime owner exists

preferences
  Entry routes to it
  only Back is declared
  generic field service is unused
```

## Result gaps

- Browser handlers discard every returned command result.
- Nested child results are discarded inside `interface-composition`.
- The renderer infers success from future snapshots and messages.
- No capability or command correlation ID joins input, result, state change, and rendered effect.
- No rejected/no-op result is projected to diagnostics.

## Required interaction record

```json
{
  "interactionId": "...",
  "capabilityId": "active-session.move",
  "route": "active-session",
  "affordanceId": "keyboard-w",
  "bindingId": "browser-input-adapter",
  "commandId": "...",
  "resultId": "...",
  "accepted": true,
  "reason": "moved",
  "effect": "player-position",
  "renderedFrameId": "..."
}
```

## Required policy

1. A public-direct capability must have a reachable route.
2. The route must render an affordance or install a declared input binding.
3. The binding must dispatch one stable command envelope.
4. The command must return a typed result.
5. The result must identify accepted, rejected, or no-op status.
6. An accepted result must identify the state effect it committed.
7. Diagnostics must expose bounded detached rows.
8. Fixtures must prove the full edge chain.

## Implementation order

```txt
lifecycle guard
  -> capability catalog
  -> browser movement adapter
  -> typed movement result
  -> result projection
  -> roster/inventory binding decisions
  -> route/shell classification
  -> reachability fixture
```