# Gameplay audit: Player action and debug bypass loop

## Player loop

```txt
Play/Start
  -> active-session route
  -> Collect/Clear/Next Phase buttons
  -> direct engine.command
  -> gameplay mutation or rejection
  -> publication
  -> result discarded
  -> next frame projects aggregate state
```

## Debug/internal loop

```txt
GameHost.engine.command(domainId, command)
  -> direct runtime dispatch
  -> same live gameplay graph

GameHost.tick(delta)
  -> same all-domain tick path
  -> can race the recursive RAF
```

## Gameplay defects

1. `move` exists but has no shipped input binding.
2. Collect is visible but deliberate movement to a target is unavailable.
3. Hire and Equip exist without player-facing controls.
4. Market is visible without an exchange runtime owner.
5. Unknown equipment IDs are accepted.
6. Unknown construction IDs fall back to the first catalog item.
7. Public and debug mutations are indistinguishable in state snapshots.
8. Manual debug ticking can change pressure, apples, pests, damage and outcomes outside the normal frame cadence.

## Required gameplay policy

```txt
player intent
  -> capability gateway
  -> session/lifecycle/route/target admission
  -> typed result
  -> committed tick
  -> visible frame acknowledgement

debug intent
  -> explicit debug lease
  -> separate policy and provenance
  -> no production/public binding
```

## Proof cases

```txt
player movement reaches a known apple
collect succeeds only when admitted
out-of-range collect returns visible typed rejection
hire/equip controls match implemented services
unsupported Market is disabled
manual tick is unavailable without a valid debug lease
public and debug effects have distinct provenance
```
