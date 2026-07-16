# START HERE: ZombieOrchard pressure gameplay adoption

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-16T03-41-28-04-00`  
**Status:** `pressure-threshold-gameplay-adoption-authority-audited`

## Summary

The current priority is pressure-system gameplay adoption. `pressure-field-kit` continuously grows `rowPressure` and `curse`, and collection can add more `rowPressure`, but active-session pest spawning, movement, damage, phase changes, failure and outcome routing do not read either channel. The HUD shows `rowPressure`; `curse` is neither projected nor consumed.

## Plan ledger

**Goal:** make every accepted pressure change produce an authored, versioned gameplay consequence or an explicit no-effect result, then bind that result to the matching visible frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the interaction loop, domains, 27 kits and services.
- [x] Document the pressure threshold, consumer and visible-frame authority.
- [ ] Implement and execute pressure-effect source, dist and Pages proofs.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-16T03-41-28-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-16T03-41-28-04-00-pressure-threshold-gameplay-adoption-dsk-map.md`
4. `.agent/pressure-system-audit/2026-07-16T03-41-28-04-00-channel-threshold-consumer-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-pressure-threshold-gameplay-adoption-authority-domain`

## Boundary

Documentation only. Runtime behavior, pressure values, gameplay, tests, build and deployment remain unchanged.
