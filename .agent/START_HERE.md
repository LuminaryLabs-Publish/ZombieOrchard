# START HERE: ZombieOrchard player stamina adoption

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-17T09-43-24-04-00`  
**Status:** `player-stamina-effort-recovery-projection-authority-audited`

## Summary

`active-session.player.stamina` is initialized to 100 and exposed in snapshots, but no action, tick, phase transition, pressure policy or renderer uses it. Movement, collection and clearing remain available at full effectiveness, while the HUD and outcome summary omit stamina entirely.

The focused decision is to either make stamina a real admitted gameplay capability with deterministic costs, exhaustion, recovery and visible proof, or remove the dead public field until that capability exists.

## Checklist

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 27 implemented kits and their services.
- [x] Document the 19-surface stamina authority and deployment fixture gate.
- [x] Retain the browser-host lifecycle audit and all earlier findings.
- [ ] Implement stamina policy and execute depletion, recovery, projection and origin-parity fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-17T09-43-24-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-17T09-43-24-04-00-player-stamina-adoption-dsk-map.md`
4. `.agent/stamina-system-audit/2026-07-17T09-43-24-04-00-effort-recovery-projection-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-player-stamina-effort-recovery-projection-authority-domain`

## Retained audits

The `2026-07-17T04-41-15-04-00` browser-host lifecycle audit and all earlier phase, control, transaction, audio, pressure, determinism, persistence, rendering, command, accessibility, kit-graph and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, rendering, input, tests, build and deployment remain unchanged.