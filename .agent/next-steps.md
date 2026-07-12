# Next steps — ZombieOrchard

## Plan ledger

**Goal:** establish a cadence-independent simulation clock before routing movement, route admission, replay, persistence, or public diagnostics through time-sensitive gameplay.

- [ ] Implement runtime-session identity and generation fencing.
- [ ] Add an injectable monotonic clock source.
- [ ] Add a canonical fixed-step policy, initially `1 / 60` seconds.
- [ ] Add normalized RAF timestamp observations.
- [ ] Add a bounded wall-time accumulator.
- [ ] Add one exclusive automatic/manual step-writer lease.
- [ ] Add simulation epoch and monotonic step IDs.
- [ ] Add a declared catch-up-step budget.
- [ ] Add typed retained-lag and dropped-lag results.
- [ ] Suspend automatic accumulation while the document is hidden.
- [ ] Establish a new visibility generation and timestamp baseline on resume.
- [ ] Replace unrestricted `GameHost.tick(dt)` with an admitted fixed-step capability.
- [ ] Publish once after each admitted step batch.
- [ ] Correlate each visible canvas/HTML frame to the committed step range.
- [ ] Add 30/60/120 Hz, variable-cadence, long-frame, hidden-tab, and writer-exclusion fixtures.
- [ ] Run the same proof against source, built artifact, and GitHub Pages.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
2b. Player-Control Reachability Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Fixed-step implementation

### 1. Clock policy

```txt
fixedStepSeconds: 1 / 60
maxFrameDeltaSeconds: explicit
maxCatchUpStepsPerFrame: explicit
hiddenBehavior: suspend
resumeBehavior: new timestamp baseline
publication: once per committed batch
```

### 2. Automatic admission

```txt
RAF timestamp
  -> validate runtime session and visibility generation
  -> derive bounded wall delta
  -> update accumulator
  -> derive candidate step count
  -> acquire automatic writer lease
  -> execute exact fixed steps
  -> commit step range
  -> classify retained/dropped lag
  -> publish once
  -> render once
```

### 3. Manual admission

```txt
manual command
  -> require diagnostic capability
  -> validate manual mode policy
  -> acquire the same exclusive writer lease
  -> request a count of canonical fixed steps
  -> commit through the same result path
  -> reject overlap with automatic ownership
```

### 4. Visibility

On `document.hidden`:

```txt
retire automatic writer
advance visibility generation
clear or freeze accumulator per policy
reject predecessor RAF observations
```

On resume:

```txt
capture a new timestamp baseline
do not replay hidden duration as catch-up debt
```

### 5. Required fixtures

```txt
fixed-step-policy-shape
30hz-60hz-120hz-equal-wall-time-parity
variable-cadence-parity
pressure-cadence-parity
pest-movement-cadence-parity
contact-damage-cadence-parity
night-spawn-trial-count-parity
long-frame-catch-up-limit
lag-drop-result
hidden-tab-suspension
resume-new-baseline
manual-step-equivalence
manual-auto-writer-exclusion
stale-epoch-rejection
single-publication-per-batch
step-range-visible-frame-receipt
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ 30/60/120 Hz Cadence Parity
+ Automatic/Manual Writer Exclusion
+ Hidden-Tab Resume
+ Committed Step/Frame Fixture Gate
```