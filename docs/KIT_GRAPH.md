# Kit Graph

Zombie Orchard is organized as scoped domains configured by a project preset.

## Interface domains

```txt
entry
session-select
run-setup
active-session
interrupt
construction
exchange
roster
inventory
knowledge
preferences
outcome
```

These are reusable interface and management domains. A project maps them to screens through preset data.

## Game domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
```

The browser host renders snapshots and sends commands. It does not own domain state.

## Composition

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> kit runtime
  -> scoped domain kits
```

## Promotion path

The local scoped interface kits are candidate kits. Once reused by another game, they should move into the shared ProtoKits repo with manifests and headless tests.
