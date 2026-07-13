# Architecture audit: HTML content and command-surface DSK map

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

The renderer currently combines data projection, HTML serialization, DOM replacement, and delegated command admission. These responsibilities require a bounded content-safety authority rather than implicit string helpers.

## Plan ledger

**Goal:** separate state meaning, projection policy, DOM construction, and command admission while preserving the existing interface domains.

- [x] Map source and sink domains.
- [x] Map the delegated command feedback path.
- [x] Define the parent authority and coordinating kits.
- [ ] Implement the boundary.

## Existing composition

```txt
game/interface domains
  -> snapshots with titles, descriptions, actions, messages, actors, items, and summaries
  -> html-interface-render-kit
  -> String() coercion
  -> template-string HTML
  -> root.innerHTML
  -> delegated click listener
  -> arbitrary engine command dispatch
```

## Correct bounded composition

```txt
interface and gameplay domains
  -> renderer-neutral projection descriptors

HTML content authority
  -> content origin and revision
  -> field schema and trust classification
  -> text/attribute encoding or direct DOM construction
  -> route-valid delegated-control manifest
  -> detached fragment preparation
  -> terminal projection result

HTML host
  -> adopt accepted fragment
  -> dispatch only controls present in the accepted manifest
  -> publish visible content acknowledgement
```

## Parent domain

`zombie-orchard-html-content-command-surface-authority-domain`

## Ownership rule

Gameplay domains may own semantic strings. They must not own HTML syntax. The HTML renderer may own DOM construction, but it must not infer trust from `String()` or accept command controls merely because markup created matching attributes.
