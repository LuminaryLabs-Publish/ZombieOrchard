# Interaction audit — Save Select and load command map

## Current route map

```txt
Entry
  -> Play -> Active Session
  -> New Game -> Run Setup
  -> Settings -> Preferences

Run Setup
  -> Start -> Active Session
  -> Back -> Entry

Session Select
  -> Back -> Entry
```

No action routes into Session Select.

## Current command surface

```txt
no save command
no load command
no slot select command
no overwrite command
no delete command
no rename command
no import/export command
```

## Required capability map

```txt
save-current
  owner: persistence authority
  admission: running or paused committed session
  result: saved | rejected | storage-failed

list-slots
  owner: slot index
  admission: boot/entry
  result: detached compatible/corrupt/incompatible slot rows

load-slot
  owner: atomic load transaction
  admission: compatible slot and no competing transaction
  result: loaded | rejected | migrated | rollback

delete-slot
  owner: slot index transaction
  admission: existing slot
  result: deleted | rejected

overwrite-slot
  owner: save transaction
  admission: explicit confirmation
  result: saved | rejected
```

## Route policy

Session Select should remain unreachable or visibly unsupported until `list-slots` and `load-slot` are real. Once operational, route into it from Entry or Run Setup and return typed results to the same composite command transaction system used by gameplay actions.

## Accessibility requirement

Slot controls need keyboard focus, explicit labels, disabled reasons, status text, and confirmation for destructive actions. The current generic button renderer is insufficient for a persistence surface.
