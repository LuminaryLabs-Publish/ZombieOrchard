# Gameplay audit: movement, collect, hire and equip loop

## Intended loop

```txt
start run
  -> move through orchard
  -> approach apple
  -> collect apple
  -> gain apples and money
  -> build or hire
  -> equip useful item
  -> clear pests
  -> advance phase
  -> survive and improve orchard
```

## Shipped loop

```txt
start run
  -> player begins at fixed position
  -> no movement input is bound
  -> Collect can only succeed when random apple placement happens to be near the player
  -> Clear waits for a pest to approach
  -> Next Phase is always clickable
  -> Build Storage Shed is reachable
  -> Market opens an empty shell
  -> Roster and Inventory show read-only cards
```

## Domain implementation versus playability

### Movement

`active-session.move` changes player coordinates and clamps them to world bounds. No shipped browser input invokes it.

### Collection

`collect` queries for an apple within radius 42. Because movement is unreachable and apple placement is random, the core gather loop is not deliberately controllable.

### Pest clearing

`clear` targets the first pest within radius 58. It is reachable from the HUD, but target selection and result reason are not projected as a capability state.

### Phase change

`next-phase` directly toggles day/night. It has no lifecycle, cooldown, objective or capability admission.

### Construction

Storage Shed is reachable through a nested screen command, but depends on the separate composite transaction gate.

### Hiring

`roster-runtime.hire` can debit money and append an actor, but the Roster screen exposes only Back.

### Equipment

`inventory-runtime.equip` can mutate `equipped`, but the Inventory screen exposes only Back and the command accepts unknown IDs.

### Market

The Market route is reachable, but no exchange runtime command or offer domain exists.

## Required gameplay proof

```txt
movement intent changes player position under admitted session state
at least one apple can be deliberately reached and collected
collect result identifies target and resource effects
clear result identifies pest and applied effect
next-phase admission is explicit
hire candidate is selectable and produces a typed debit/actor result
equip rejects unknown item and commits known item
unsupported Market cannot masquerade as a working gameplay route
all results carry session, capability, command and committed-tick identity
```

## Gate placement

Capability reachability is Gate 3. Construction atomicity remains Gate 4. Deterministic apple and pest placement remains Gate 5.