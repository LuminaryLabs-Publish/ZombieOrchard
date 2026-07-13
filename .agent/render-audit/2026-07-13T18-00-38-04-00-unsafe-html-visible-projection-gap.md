# Render audit: unsafe HTML visible-projection gap

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

The visible HTML surface is rebuilt with `innerHTML`. Dynamic values are inserted as markup without field-specific encoding, detached validation, or content revision acknowledgement.

## Plan ledger

**Goal:** make one safe, revisioned HTML projection visible without allowing dynamic values to alter document structure.

- [x] Trace all dynamic template insertions.
- [x] Trace delegated command discovery inside the rendered subtree.
- [x] Identify missing projection results and visible acknowledgements.
- [ ] Replace string-built dynamic markup with safe DOM construction.

## Projection sinks

```txt
button()
  action.id -> HTML attribute
  action.label -> element content

cards()
  item.label/name/id -> element content
  item.summary/role/type -> element content

active HUD
  stats and session.message -> element content

screen
  current.title and current.description -> element content
  current actions -> nested button templates
```

## Missing evidence

```txt
content origin: absent
content revision: absent
field schema: absent
text encoder result: absent
attribute encoder result: absent
trusted-markup capability: absent
detached fragment validation: absent
delegated-control manifest: absent
projection terminal result: absent
first visible content-frame acknowledgement: absent
```

## Required visible-frame rule

A frame is content-safe only when the visible subtree and delegated-control manifest were produced from the same accepted content revision.
