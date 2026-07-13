# Deploy audit: frame-coherence central fixture gate

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Summary

The current package exposes only a Node smoke test and a static copy build. Neither surface executes a browser canvas/HTML frame, fault injection, visible readback, or Pages parity check.

## Plan ledger

**Goal:** define the executable evidence required before frame-coherence or deployment-readiness claims.

- [x] Read `package.json` scripts.
- [x] Confirm `npm test` runs only `tests/smoke.mjs`.
- [x] Confirm `npm run build` copies static source into `dist`.
- [x] Confirm no browser frame-coherence fixture is declared.
- [x] Define source, built-output, and Pages gates.
- [ ] Implement and execute the gates.

## Existing proof

```txt
npm test -> Node smoke only
npm run build -> static copy only
browser canvas/HTML fixture -> absent
renderer fault injection -> absent
visible-frame readback fixture -> absent
Pages frame parity fixture -> absent
```

## Required fixture matrix

```txt
runtime
  one transition produces one immutable envelope
  observer and presentation share envelope ID/fingerprint
  reentrant subscriber cannot split publication and rendering

canvas/HTML
  both succeed -> complete result
  canvas succeeds, HTML fails -> partial result
  canvas fails -> explicit HTML degradation policy
  stale surface/route/viewport -> zero-mutation rejection
  scheduler recovery continues after classified failure

visible diagnostics
  GameHost visible readback matches last complete frame
  first visible acknowledgement cites complete surface receipts

build/deploy
  source browser fixture passes
  dist browser fixture passes
  GitHub Pages fixture passes
  envelope and receipt semantics match across all three
```

## Validation commands required after implementation

```txt
npm test
npm run build
browser source smoke
browser dist smoke
GitHub Pages smoke
```

## Non-claims

No command was executed in this documentation pass. Existing proof does not establish browser frame coherence or deployed parity.