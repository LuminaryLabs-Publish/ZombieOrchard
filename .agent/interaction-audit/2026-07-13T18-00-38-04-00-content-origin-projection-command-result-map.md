# Interaction audit: content origin, projection, command, and result map

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

The current interaction path has no typed handoff between semantic content and executable controls.

## Plan ledger

**Goal:** bind every visible control to an authored origin and every projected value to an inert-content result.

- [x] Map browser, public-host, runtime, renderer, DOM, and delegated-listener participants.
- [x] Identify implicit trust transitions.
- [ ] Implement typed admission and results.

## Current map

```txt
input or GameHost
  -> engine.command(domain, type, payload)
  -> mutable domain state
  -> unversioned snapshot
  -> template string
  -> innerHTML
  -> DOM descendants
  -> closest("[data-action]") / closest("[data-command]")
  -> engine.command(...)
```

## Required map

```txt
DomainContentDescriptor
  -> ContentOriginId
  -> ProjectionFieldSchema
  -> ContentTrustClassification
  -> EncodedTextResult / EncodedAttributeResult
  -> DelegatedControlManifest
  -> DetachedHtmlCandidate
  -> HtmlContentSafetyResult
  -> adopted DOM revision
  -> DelegatedControlAdmissionResult
  -> gameplay command result
  -> FirstVisibleHtmlContentFrameAck
```

## Rejection classes

```txt
unknown field context
untrusted raw markup
invalid attribute token
control absent from authored manifest
control for inactive route
stale content revision
duplicate projection command
detached-fragment validation failure
```
