# Architecture audit: capability reachability authority DSK map

## Summary

`ZombieOrchard` currently treats domain command methods, screen actions and DOM buttons as separate facts. No authority proves that one declared capability exists, is allowed for the current session and route, has a usable input binding, can reach a valid target, returns a typed result and is represented truthfully by the rendered interface.

## Current layers

```txt
kit runtime
  owns domain registration and unrestricted public command routing

scoped interface domains
  own static action descriptors and static disabled flags

interface composition
  owns routes and nested command descriptors

gameplay domains
  own movement, collection, clearing, construction, hiring and equipment mutation

HTML renderer
  owns hard-coded collect/clear/next-phase bindings and generic route buttons

GameHost
  exposes the raw engine and unrestricted manual tick
```

## Missing composed domain

```txt
zombie-orchard-capability-reachability-authority-domain
```

### Child kits

```txt
capability-descriptor-kit
  stable capability ID, owner domain, command type, effect class and support state

capability-registry-kit
  canonical registry and duplicate/owner validation

capability-owner-binding-kit
  proof that the declared owner actually implements the command

capability-lifecycle-admission-kit
  allowed lifecycle states and session/epoch requirements

capability-route-admission-kit
  allowed interface routes and route-transition policy

capability-input-binding-kit
  keyboard, pointer, accessible button or internal-only binding descriptor

movement-input-adapter-kit
  keyboard and accessible movement intent mapped to active-session.move

collectible-reachability-kit
  proof that the player can deliberately reach at least one collectible target

roster-hire-binding-kit
  typed candidate selection and hire command binding

inventory-equip-binding-kit
  item selection, target validation and equip result

target-admission-kit
  reject unknown or stale item, actor, construction and world target IDs

unsupported-capability-policy-kit
  explicit unsupported state for Market and other shells without services

disabled-affordance-projection-kit
  disabled state, reason and source revision derived from the registry

capability-command-result-kit
  accepted/rejected/unsupported result with capability and command correlation

capability-observation-kit
  detached JSON-safe registry, binding and current-admission readback

capability-render-ack-kit
  first rendered frame that consumed a capability projection revision

capability-reachability-fixture-kit
  DOM-free and browser proof matrix
```

## Required descriptor

```txt
capabilityId
ownerDomainId
commandType
supportState: supported | dormant | unsupported | internal
publicSurface: direct | indirect | none
allowedLifecycleStates[]
allowedRoutes[]
inputBindings[]
targetType or null
requires[]
provides[]
resultSchemaId
revision
```

## Current capability classification

| Capability | Implementation | Shipped binding | Current classification |
|---|---|---|---|
| route actions | scoped interface + composition | generic action buttons | public indirect |
| move | active-session | none | implemented unreachable |
| collect | active-session | quick button | public but target reachability unproven |
| clear | active-session | quick button | public |
| next-phase | active-session | quick button | public |
| build storage shed | construction runtime | Construction action | public indirect |
| hire | roster runtime | none | implemented unreachable |
| equip | inventory runtime | none | implemented unreachable and target-unvalidated |
| Market transaction | none | visible route | unsupported but presented as available |
| Session Select | interface only | no incoming route | dormant |
| select/set-field | scoped interface | none | internal/dormant |
| resource and pressure APIs | gameplay domains | raw GameHost only | internal but bypassable |

## Required admission chain

```txt
input intent
  -> resolve capability descriptor
  -> verify owner binding
  -> verify session/lifecycle/route admission
  -> validate target and prerequisites
  -> issue correlated command
  -> return typed capability result
  -> publish committed state
  -> project enabled/disabled/unsupported affordance
  -> acknowledge first rendered frame
```

## Dependency placement

This domain is Gate 3. It must consume session identity and committed-tick identity from Gates 1 and 2. Composite transactions in Gate 4 must consume the capability registry rather than rediscovering command support independently.