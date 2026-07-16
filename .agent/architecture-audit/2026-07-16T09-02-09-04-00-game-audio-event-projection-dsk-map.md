# Architecture audit: game audio event projection DSK map

**Timestamp:** `2026-07-16T09-02-09-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

Gameplay and interface domains already own accepted results. The missing architecture is a downstream audio authority that converts those results into bounded browser-audio work without becoming a simulation owner.

## Plan ledger

**Goal:** preserve existing domain ownership while adding one result-driven audio projection boundary.

- [x] Map command and state-result producers.
- [x] Map browser, lifecycle and presentation boundaries.
- [x] Separate semantic events from provider effects.
- [x] Define typed projection results and audible acknowledgements.
- [ ] Implement the domain.

## Current map

```txt
interface-composition / active-session / economy domains
  -> accepted or rejected command result
  -> state/message snapshot
  -> HTML and Canvas2D projection
  -> no audio adapter
```

## Required DSK map

```txt
zombie-orchard-game-audio-event-projection-authority-domain
  audio-capability-observer-kit
  audio-context-lifecycle-kit
  audio-user-gesture-unlock-kit
  audio-event-schema-kit
  audio-cue-registry-kit
  interface-audio-event-adapter-kit
  collection-audio-event-adapter-kit
  combat-audio-event-adapter-kit
  economy-audio-event-adapter-kit
  phase-audio-event-adapter-kit
  outcome-audio-event-adapter-kit
  orchard-ambience-audio-kit
  audio-listener-spatial-projection-kit
  audio-preference-bus-kit
  audio-cue-deduplication-kit
  audio-voice-pool-budget-kit
  audio-projection-result-kit
  audio-lifecycle-settlement-kit
  audio-browser-parity-fixture-kit
```

## Ownership rules

```txt
gameplay domains remain truth owners
audio event adapters consume accepted results only
audio registry owns descriptors, not gameplay meaning
provider owns Web Audio nodes and resource disposal
HTML and Canvas2D renderers do not trigger cues directly
lifecycle settlement retires provider work by generation
fixtures own no runtime fallback behavior
```

## Admission boundary

Every cue request must cite document, route, event, policy and provider generations. Every request settles once as played, suppressed, muted, stale, rejected or failed. Audible acknowledgement must bind to the same accepted semantic result as the visible frame.