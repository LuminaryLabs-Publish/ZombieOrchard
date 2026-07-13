# Deploy audit: browser startup fixture gate

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

The current proof path runs one Node engine smoke and a static-copy build. It does not execute the browser boot modules, DOM acquisition, Canvas2D capability checks, first projection, hidden error panel, scheduler adoption, failure cleanup, or deployed-origin behavior.

## Plan ledger

**Goal:** block startup-readiness claims until source, built, and Pages routes pass the same success and failure matrix.

- [x] Read `package.json` and `tests/smoke.mjs`.
- [x] Confirm the smoke imports `src/game.js`, not `src/boot.js` or `src/start.js`.
- [x] Confirm the build only copies `index.html` and `src`.
- [x] Define the missing fixture matrix.
- [ ] Add browser automation and deployed-origin proof.

## Current proof

```txt
npm test
  -> create engine
  -> assert entry route
  -> activate Play
  -> tick once
  -> assert active-session and apples

npm run build
  -> copy index.html
  -> copy src/
```

## Required fixture matrix

```txt
successful source startup
successful dist startup
successful Pages startup
missing #world
missing #ui-root
Canvas2D getContext returns null
kit create throws
canvas probe throws
HTML probe throws
error-panel fallback becomes visible
zero live ticks before Ready
candidate listeners are retired after failure
retry creates a new generation
stale generation cannot publish GameHost or RAF
first complete visible frame cites StartupGeneration
source/dist/Pages produce equivalent terminal results
```

## Required outputs

```txt
StartupAttemptId
StartupGeneration
participant preparation receipts
StartupProbeResult
StartupReadyResult | StartupFailureResult
candidate disposal receipts
FallbackProjectionResult
FirstStartupFrameAck
```

## Release gate

Do not mark browser startup ready, recoverable, or production-safe until the matrix passes against source, `dist`, and the deployed Pages origin on `main`.

## Validation boundary

No tests, scripts, workflows, build commands, or deployment configuration changed.