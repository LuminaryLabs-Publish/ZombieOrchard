# Interaction audit: capability binding and result map

## Current browser paths

```txt
screen action button
  -> data-action
  -> interface-composition.activate
  -> active screen activate
  -> optional nested child command or route

quick gameplay button
  -> data-command
  -> active-session command
```

## Current binding matrix

| User intent | Domain command | Browser binding | Result handling |
|---|---|---|---|
| Play/New/Start/Pause/Resume/Title | interface composition | action button | discarded by DOM caller |
| Move | active-session.move | none | unreachable |
| Collect | active-session.collect | quick button | discarded |
| Clear | active-session.clear | quick button | discarded |
| Next Phase | active-session.next-phase | quick button | discarded |
| Build Storage Shed | construction-runtime.build | nested action descriptor | child result discarded |
| Open Market | route to exchange | action button | route accepted despite missing service |
| Hire | roster-runtime.hire | none | unreachable |
| Equip | inventory-runtime.equip | none | unreachable |
| Select/set field | scoped screen commands | none | unreachable/internal |
| Save Select | route absent | none | dormant |

## Missing interaction contracts

```txt
stable capability ID
binding ID and binding type
source device and accessibility alternative
session/lifecycle/route admission
current enabled state
unsupported/dormant reason
target identity and validation
command envelope
result envelope
user-visible feedback
render acknowledgement
```

## Required command result

```txt
capabilityId
bindingId
commandId
sessionId
sessionEpoch
expectedCommittedTickId
accepted
reason
targetId
effects[]
committedTickId
stateFingerprint
firstRenderedFrameId
```

## Required policies

1. A capability cannot be rendered enabled unless its owner, route, lifecycle and input binding are valid.
2. An implemented command without a shipped binding is classified as unreachable, not available.
3. A visible route without a backing service is classified as unsupported and disabled.
4. Unknown targets reject before mutation.
5. DOM callers retain and project typed results.
6. Raw engine access is internal diagnostics only and cannot count as public reachability.
7. Every public capability has an accessible non-pointer-only path where practical.

## Fixture cases

```txt
move via keyboard and accessible buttons
collect after deliberate movement to a known apple
collect while out of range returns visible typed rejection
hire with valid and insufficient funds cases
equip known item and reject unknown item
Market appears disabled with unsupported reason
Session Select is not presented as operational
capability disabled state matches registry state
DOM result and first rendered frame share capability/command identity
```