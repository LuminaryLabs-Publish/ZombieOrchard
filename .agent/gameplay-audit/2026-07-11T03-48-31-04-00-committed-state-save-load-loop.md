# Gameplay audit — Committed-state save/load loop

## Durable gameplay owners

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
interface-composition route state
selected durable setup fields, if later introduced
```

## Transient or derived state

```txt
listeners
RAF handles
renderer resources
action catalogs
descriptions and labels from content
transient status messages
selected menu indexes unless intentionally persisted
GameHost live engine handle
```

## Current blocker

Every owner stores state in a closure and exposes only commands plus snapshots. None exposes restore semantics. A load implementation cannot safely replace one domain without risking a mixed old/new session.

## Correct save point

```txt
after a committed simulation tick or command transaction
after random decisions are finalized
before the next mutable intent is admitted
with one canonical durable-state fingerprint
```

## Correct load transaction

```txt
pause admission
  -> validate/migrate envelope
  -> create fresh or staged domain states
  -> validate cross-domain invariants
  -> commit all owners
  -> allocate loadEpoch
  -> reset transient messages and route policy
  -> resume eligible ticking
```

## Cross-domain invariants

- Resources cannot be negative unless explicitly permitted by schema.
- Equipped item must exist in inventory.
- Built objects and actors require valid content IDs.
- Player, pests, apples, and bounds must be finite and valid.
- Session ended/outcome route must agree.
- Seed and random cursors must match the serialized world/session state.
- Day, phase, pressure, score, and command/tick metadata must be coherent.

## Gameplay fixture

Save after collecting an apple, building a shed, changing phase, and spawning a pest. Mutate further, then load. Every durable owner must return to the saved fingerprint, while listeners, RAF ownership, and renderer resources remain current-session resources.
