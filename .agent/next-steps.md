# Next steps — ZombieOrchard

## Plan ledger

**Goal:** make orchard movement product-reachable through one lifecycle-safe control path before expanding gameplay or claiming an explorable run.

- [ ] Implement runtime-session instance authority first.
- [ ] Implement a monotonic fixed-step clock with one step-writer lease.
- [ ] Implement route-scoped simulation admission.
- [ ] Add a canonical control-binding manifest for WASD and arrow keys.
- [ ] Add browser keydown, keyup, blur and visibility adapters.
- [ ] Store held bindings behind a runtime/run/session control lease.
- [ ] Normalize opposed and diagonal direction vectors.
- [ ] Consume held movement only during admitted fixed simulation steps.
- [ ] Route movement through the canonical gameplay command path.
- [ ] Return typed movement results with state/tick/frame provenance.
- [ ] Retire held input on pause, route exit, outcome, reset and disposal.
- [ ] Add concise control instructions and unavailable-control reasons to the HUD.
- [ ] Add DOM-free, built-artifact browser and Pages fixtures.
- [ ] Preserve public host quarantine and composite transaction requirements.

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

## Control implementation

### 1. Binding manifest

```txt
move-up:    KeyW, ArrowUp
move-left:  KeyA, ArrowLeft
move-down:  KeyS, ArrowDown
move-right: KeyD, ArrowRight
```

### 2. Held-state rules

- Ignore repeated keydown events when the binding is already held.
- Opposed directions cancel.
- Normalize diagonal vectors.
- Do not use DOM repeat cadence as simulation cadence.
- Do not accept movement from editable controls.

### 3. Admission

```txt
runtime active
run/session current
route == active-session
window/document focused
run not ended
control lease current
input sequence fresh
vector finite and bounded
```

Rejected input must not mutate position.

### 4. Consumption

At each admitted fixed step:

```txt
read held-control snapshot
  -> normalize movement intent
  -> submit active-session movement command
  -> commit player position once
  -> publish MovementCommandResult
  -> acknowledge first canvas/HTML frame
```

### 5. Retirement

Clear all held state and pending intent on:

```txt
keyup
blur
visibility hidden
pause
route exit
outcome
new run/reset
runtime stop/dispose
```

### 6. Required fixtures

```txt
binding-manifest-parity
cardinal-movement
diagonal-normalization
opposed-direction-cancellation
boundary-clamp
route-rejection
ended-run-rejection
blur-retirement
pause-retirement
stale-sequence-rejection
movement-to-collectible-reachability
movement-result-frame-correlation
single-listener-and-single-control-owner
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission Authority
+ Player-Control Reachability Authority
+ Player-Control Browser/Pages Fixture Gate
```
