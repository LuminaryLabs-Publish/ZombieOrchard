# Deploy audit: DOM focus and accessibility fixture gate

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The current package proof is a Node engine smoke and a static copy build. Neither source nor built artifacts are exercised in a browser DOM, so per-frame mutation, focus loss, encoding and accessibility continuity are outside the deployment gate.

## Plan ledger

**Goal:** prevent Pages deployment from claiming interface correctness without source, built-artifact and deployed-browser proof.

- [x] Inspect package scripts and Node smoke.
- [x] Confirm no DOM/browser test exists.
- [x] Define source, dist and Pages gates.
- [ ] Implement and execute the gates.

## Existing proof

```txt
npm test
  -> creates engine
  -> checks Entry
  -> activates Play
  -> checks apples exist

npm run build
  -> copies index.html and src into dist
```

## Required gate

```txt
pure fixtures:
  view model
  text/attribute encoding
  projection fingerprint
  unchanged no-op
  stale rejection

browser source smoke:
  keyboard focus retention
  route focus policy
  mutation count
  accessibility announcement deduplication
  canvas/HTML frame parity

built artifact smoke:
  same assertions against dist

Pages smoke:
  same assertions against deployed site
```

## Release rule

Do not mark the HTML interface authority complete until all three surfaces produce equivalent projection and focus results.
