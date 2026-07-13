# Content-safety audit: innerHTML and delegated-control contract

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

`String(value)` does not make content safe for HTML. The renderer needs context-aware encoding or direct DOM construction, and delegated controls need an authored manifest.

## Plan ledger

**Goal:** prohibit untrusted markup and bind executable controls to explicit authored descriptors.

- [x] Classify text and attribute sinks.
- [x] Identify caller-controlled roster content.
- [x] Identify the raw public command source.
- [x] Identify delegated-control escalation.
- [ ] Implement the contract and fixtures.

## Contract

```txt
1. All ordinary content is text.
2. Text is assigned through textContent or equivalent node construction.
3. Attribute values are set through DOM APIs after token validation.
4. Raw HTML requires an explicit trusted-markup capability unavailable to gameplay data.
5. Authored actions produce a control manifest containing route, action ID, command type, and generation.
6. Delegated clicks are accepted only when the target maps to the active manifest.
7. Dynamic content cannot introduce data-action or data-command authority.
8. Projection occurs in a detached fragment.
9. The live subtree changes only after validation.
10. A terminal result and visible acknowledgement carry the content revision.
```

## Mandatory fixtures

```txt
roster name containing <script> remains literal text
roster name containing <img onerror> remains literal text
roster name containing closing tags cannot alter structure
roster name containing data-command cannot create a command
action label containing markup remains literal text
action ID containing quotes cannot alter attributes
message/title/description markup remains literal text
inactive-route command control is rejected
stale control generation is rejected
source/dist/Pages produce equivalent results
```
