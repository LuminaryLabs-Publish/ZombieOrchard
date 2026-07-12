# Architecture audit: HTML interface projection authority DSK map

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

HTML projection is currently a renderer side effect, not a domain. The browser loop gives the renderer an unversioned snapshot, and the renderer immediately replaces the complete DOM subtree. This audit defines a composed domain that separates view-model derivation, encoding, change detection, focus policy, commit and proof.

## Plan ledger

**Goal:** move HTML projection from an ambient string assignment into an explicit, deterministic and observable domain transaction.

- [x] Map existing owners and call direction.
- [x] Identify missing identities, revisions, commands and results.
- [x] Define DSK composition.
- [x] Define dependencies and invariants.
- [ ] Implement and fixture the domain.

## Existing ownership

```txt
kit-runtime
  -> state snapshots

interface composition and interface domains
  -> route and action descriptors

game domains
  -> HUD/card data

html-interface-render-kit
  -> view string construction
  -> delegated click adapter
  -> immediate root.innerHTML mutation

browser host
  -> frame cadence and renderer invocation
```

## Required parent domain

```txt
zombie-orchard-html-interface-projection-authority-domain
```

## DSK composition

```txt
interface-projection-id-kit
interface-projection-revision-kit
interface-state-fingerprint-kit
interface-view-model-kit
html-content-escaping-kit
html-attribute-escaping-kit
interface-action-key-kit
dom-surface-lease-kit
dom-focus-lease-kit
dom-selection-lease-kit
interface-projection-plan-kit
interface-projection-diff-kit
interface-projection-commit-kit
interface-projection-noop-kit
interface-projection-result-kit
stale-interface-projection-rejection-kit
focus-restoration-policy-kit
screen-reader-announcement-policy-kit
dom-mutation-budget-kit
interface-projection-observation-kit
interface-projection-journal-kit
visible-interface-frame-receipt-kit
unchanged-ui-no-mutation-fixture-kit
keyboard-focus-retention-fixture-kit
html-escaping-fixture-kit
route-transition-focus-fixture-kit
browser-interface-accessibility-smoke-kit
pages-interface-projection-smoke-kit
```

## Domain interfaces

### Input

```txt
InterfaceProjectionCommand
  runtimeSessionId
  runtimeGeneration
  stateRevision
  frameId
  routeId
  snapshot
  expectedProjectionRevision
```

### Prepared plan

```txt
InterfaceProjectionPlan
  projectionId
  predecessorRevision
  viewModelFingerprint
  structuralFingerprint
  semanticFingerprint
  encodedViewModel
  focusedActionLease
  selectionLease
  mutationBudget
  routeFocusPolicy
```

### Result

```txt
InterfaceProjectionResult
  accepted
  outcome: committed | unchanged | stale | invalid | failed
  projectionRevision
  mutationCount
  focusResult
  accessibilityResult
  stateRevision
  frameId
  visibleReceiptPending
```

## Invariants

```txt
unchanged semantic and structural fingerprints cause zero DOM mutation
all external, persisted and runtime text is encoded before projection
attribute values are encoded independently from text values
a stale plan cannot replace a newer route or projection
focus is preserved or moved by a named policy
mutation count cannot exceed the admitted budget
one projection revision maps to one state/frame revision
visible acknowledgement occurs after the DOM is paint-eligible
```

## Dependency map

```txt
runtime/session authority
  -> state/frame commit
  -> interface view-model derivation
  -> encoding
  -> fingerprint/no-op decision
  -> focus/selection capture
  -> DOM prepare and commit
  -> focus/accessibility result
  -> visible interface acknowledgement
  -> diagnostics and journal
```
