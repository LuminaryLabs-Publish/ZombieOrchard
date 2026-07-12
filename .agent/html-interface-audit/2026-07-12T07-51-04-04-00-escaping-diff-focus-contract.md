# HTML interface audit: encoding, diff and focus contract

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The current `text()` helper only coerces values to strings. It does not encode HTML text or attribute values. The renderer also lacks change detection and focus continuity. These concerns should be composed under one interface projection authority but retained as separate atomic kits.

## Plan ledger

**Goal:** guarantee that every projected value is encoded for its context and that accepted UI changes are minimal and interaction-safe.

- [x] Identify text and attribute interpolation sites.
- [x] Identify mutable/runtime values that can reach cards.
- [x] Distinguish trusted authored presets from future persisted or networked content.
- [x] Define encoding and projection invariants.
- [ ] Implement encoding and DOM fixtures.

## Encoding contexts

```txt
HTML text nodes:
  stat values and labels
  card labels, names and IDs
  card summaries, roles and types
  route titles and descriptions
  action labels
  gameplay message

HTML attributes:
  data-action
```

## Required invariants

```txt
String conversion is never treated as encoding.
Text and attribute contexts use separate encoders.
Encoded values cannot create markup or additional attributes.
Action IDs are validated against a restricted schema before projection.
Projection fingerprints use canonical values, not encoded HTML.
Focus keys use canonical action IDs, not DOM positions.
No-op detection occurs before DOM mutation.
```

## Fixture corpus

```txt
< > & " '
closing tags
attribute-breaking quotes
Unicode and combining characters
empty and null values
very long labels
duplicate action IDs
removed focused action
route change during prepared projection
```
