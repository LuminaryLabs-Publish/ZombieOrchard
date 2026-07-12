# Deployment audit: fixed-step clock fixture gate

## Gate objective

Do not treat the deployed orchard as timing-stable until source, DOM-free, built-artifact browser, and Pages checks prove that equal wall time produces equivalent committed simulation state across display cadences.

## Existing proof

Current `npm test` verifies only:

```txt
entry route exists
Play reaches active-session
orchard contains apples
```

It does not execute browser RAF timing, variable cadence, hidden-tab behavior, manual stepping, catch-up, writer exclusion, or render-frame correlation.

## Required DOM-free fixtures

```txt
fixed-step-policy-shape
monotonic-step-id
simulation-epoch-reset
30hz-60hz-120hz-equal-wall-time-parity
variable-cadence-parity
long-frame-catch-up-budget
lag-drop-classification
manual-step-equivalence
manual-auto-writer-exclusion
single-publication-per-batch
stale-epoch-rejection
```

## Required browser fixtures

```txt
RAF timestamps drive accumulator rather than callback count
30/60/120 emulation reaches equal step count for equal wall time
pressure and active-session state remain cadence-equivalent
hidden document does not accumulate unbounded catch-up debt
visible resume establishes a new timestamp baseline
manual tick is rejected or exclusively admitted by policy
one render receipt cites the committed step range
one runtime owns one RAF writer
```

## Required built and deployed checks

```txt
npm test
npm run build
serve dist artifact
run cadence fixture against built artifact
run hidden/resume fixture against built artifact
run manual/automatic exclusion fixture against built artifact
run the same smoke against GitHub Pages
record commit SHA, policy fingerprint, epoch, step range and frame receipt
```

## Failure policy

The gate fails on any of the following:

```txt
step count differs by display cadence
pressure, pest movement, damage or spawn trials differ for equal wall time
catch-up exceeds declared budget
hidden duration is replayed as an unbounded burst
manual and automatic writers overlap
accepted batch publishes more than once
visible frame lacks committed step provenance
```

## Current validation state

```txt
runtime implementation: absent
DOM-free clock fixtures: absent
browser cadence smoke: absent
built-artifact cadence smoke: absent
Pages cadence smoke: absent
```

No deployment timing-parity claim is made.