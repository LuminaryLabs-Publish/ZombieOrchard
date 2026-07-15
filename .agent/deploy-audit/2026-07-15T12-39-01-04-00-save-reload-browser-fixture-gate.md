# Deploy audit: save/reload browser fixture gate

**Timestamp:** `2026-07-15T12-39-01-04-00`

## Summary

The current Node smoke proves only entry, direct Play and orchard generation. It cannot prove storage, reload, migration, slot rendering or production-artifact parity.

## Plan ledger

**Goal:** require executable proof before any save-system or deployment-readiness claim.

- [x] Inspect the current smoke and build script.
- [x] Identify missing browser and artifact fixtures.
- [ ] Add deterministic persistence fixtures.
- [ ] Run the same matrix against source, `dist` and Pages.

## Required fixture matrix

```txt
empty storage -> truthful empty Save Select
one valid slot -> visible card and selectable identity
multiple slots -> stable ordering and selected state
new session -> initial durable document
save mutation -> revision increases once
reload -> all participating domains match
stale write -> rejected without corruption
corrupt slot -> classified without runtime adoption
supported old schema -> migrated with provenance
unsupported schema -> rejected truthfully
quota/storage failure -> predecessor preserved
slot delete -> receipt and catalog refresh
source/dist/Pages -> matching catalog and load results
Canvas2D/HTML -> matching loaded SessionRevision
```

## Current proof boundary

```txt
npm test
  -> creates runtime
  -> asserts entry
  -> activates Play
  -> asserts active-session
  -> asserts orchard apples

browser storage fixture: absent
reload fixture: absent
migration fixture: absent
artifact fixture: absent
Pages persistence fixture: absent
```

## Validation boundary

No tests or workflows were changed or run in this documentation audit.
