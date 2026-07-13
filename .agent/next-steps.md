# Next steps - ZombieOrchard

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

Replace dynamic `innerHTML` interpolation with safe DOM construction and bind delegated controls to an authored, route-specific manifest. Keep startup, frame-coherence, event, and observer work as retained dependencies.

## Plan ledger

**Goal:** make projected content inert and executable controls explicit.

- [ ] Define `ContentOriginId`, `ContentRevision`, and `HtmlProjectionCommandId`.
- [ ] Define a projection field schema for text, attribute tokens, and trusted markup.
- [ ] Default every gameplay and interface value to inert text.
- [ ] Build buttons and cards with DOM APIs and `textContent`.
- [ ] Validate action IDs before setting `data-action`.
- [ ] Build a route-specific delegated-control manifest.
- [ ] Reject controls not present in the active manifest.
- [ ] Reject stale controls from predecessor content revisions.
- [ ] Gate raw engine command access through a capability.
- [ ] Prepare HTML in a detached fragment before live adoption.
- [ ] Publish `HtmlContentSafetyResult` and `FirstVisibleHtmlContentFrameAck`.
- [ ] Add malicious roster-name, action-label, action-ID, message, title, and description fixtures.
- [ ] Run source, dist, and Pages parity fixtures.

## Immediate safe ledge

1. Replace `text()` with DOM text-node construction rather than an escape helper.
2. Replace `button()` and `cards()` string templates with element builders.
3. Set attributes through DOM APIs after token validation.
4. Store an authored control manifest per active route and content revision.
5. Reject delegated clicks that do not map to the manifest.
6. Add a browser fixture proving markup remains literal and cannot dispatch commands.
7. Preserve the prior visible subtree when candidate construction fails.

## Target files

```txt
src/renderer/html-interface-renderer.js
src/start.js
src/kits/runtime.js
src/kits/composition.js
src/kits/game-domains.js
src/security/html-content-authority.js
src/security/delegated-control-manifest.js
tests/html-content-safety.fixture.mjs
scripts/smoke-html-content-browser.mjs
package.json
```

## Required fixtures

```txt
script markup remains literal text
event-handler attributes remain literal text
closing tags cannot alter structure
data-command text cannot create a control
data-action text cannot create a control
quoted action IDs cannot alter attributes
inactive-route controls are rejected
stale control generations are rejected
failed candidate preserves predecessor DOM
source/dist/Pages results match
first visible content revision is acknowledged
```

## Do not claim

Do not claim content safety, command-surface isolation, injection resistance, or production readiness until the fixture matrix passes on `main`.
