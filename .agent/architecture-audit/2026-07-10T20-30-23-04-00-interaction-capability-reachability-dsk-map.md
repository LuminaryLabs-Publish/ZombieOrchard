# Architecture audit — Interaction capability reachability DSK map

Timestamp: `2026-07-10T20-30-23-04-00`

## Finding

The architecture has service ownership but no service-exposure authority. Domain commands, preset actions, interface routes, renderer controls, command results, and fixture assertions are authored independently.

```txt
implemented domain command
  -/-> canonical capability descriptor
  -/-> route guarantee
  -/-> rendered affordance guarantee
  -/-> command-binding guarantee
  -/-> typed-result guarantee
  -/-> fixture guarantee
```

This causes services to exist without being usable and screens to exist without operational services.

## Current ownership map

```txt
kit-runtime
  owns command dispatch and aggregate snapshots

scoped-interface-domain-kit
  owns screen action, selection, and field commands

interface-composition-kit
  owns active route and nested dispatch

orchard-preset
  owns declared screen actions

html-interface-render-kit
  owns the only human command bindings

active-session-domain-kit
  owns movement, collect, clear, phase, pests, score, failure

roster-runtime-kit
  owns hire

inventory-runtime-kit
  owns equip

smoke-fixture-kit
  proves only Entry -> Play and apple-array presence
```

No owner answers: "Which capabilities are intended to be public, and are they actually reachable?"

## Reachability breaks

```txt
active-session.move
  domain command exists
  no preset action
  no keyboard binding
  no pointer binding
  no on-screen binding
  no smoke assertion

roster-runtime.hire
  domain command exists
  Roster route exists
  renderer shows actor cards only
  no hire affordance
  no fixture

inventory-runtime.equip
  domain command exists
  Inventory route exists
  renderer shows item cards only
  no equip affordance
  no fixture

session-select
  domain exists
  no incoming route
  no slot source
  no slot command
  no fixture

exchange
  route exists
  no market runtime domain
  no transaction command
  no result projection
  no fixture
```

## DSK update-first plan

### Update `kit-runtime`

Add read-only access to a canonical capability catalog and bounded result journal. Do not make the runtime invent product capabilities; it should aggregate descriptors from installed domains.

### Update scoped interface domain kits

Each command should expose a stable capability descriptor:

```txt
capabilityId
domainId
commandType
visibility
routeRequirement
payloadSchema
resultSchema
```

### Update `interface-composition-kit`

Expose route and activation capabilities, retain nested child results, and commit one parent result after nested work completes.

### Update `active-session-domain-kit`

Declare movement as a public capability, gate it by session state, and return a typed result containing prior and resulting coordinates.

### Update `orchard-preset`

Make public route and affordance intent explicit. A screen without an operational service should be declared `dormant` or `unsupported` rather than implied to be complete.

### Update `html-interface-render-kit`

Consume capability/action descriptors instead of relying only on hard-coded quick buttons. Bind movement, disabled state, field controls, roster actions, and inventory actions according to declared public capabilities.

### Update diagnostics and proof

Export catalog and reachability rows through `GameHost`; fail the fixture if a public-direct capability lacks any required edge.

## New kits justified

```txt
browser-input-adapter-kit
  translates keyboard/pointer/gamepad/on-screen input into stable capability commands

capability-registry-kit
  aggregates and classifies capability descriptors across domains

capability-reachability-fixture-kit
  proves route -> affordance -> binding -> result -> effect edges
```

These are cross-cutting boundaries not cleanly owned by one existing gameplay or screen kit.

## Required capability row

```json
{
  "capabilityId": "active-session.move",
  "owner": "active-session",
  "classification": "public-direct",
  "route": "active-session",
  "affordance": "movement-input",
  "binding": "browser-input-adapter",
  "command": "move",
  "result": "movement-result-v1",
  "effect": "player-position",
  "fixture": "move-and-collect"
}
```

## Dependency order

```txt
runtime session and clock authority
  -> capability descriptors
  -> browser input adapter
  -> movement admission
  -> service affordance bindings
  -> typed result projection
  -> reachability fixture
  -> deterministic scenario fixture
  -> Market transaction implementation
```

## Non-goals

- no renderer replacement
- no new Market catalog
- no economy rebalance
- no new orchard content
- no broad hierarchy rewrite
- no claim that dormant services are complete