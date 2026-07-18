# START HERE: ZombieOrchard world viewport and camera coverage

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-18T08-39-41-04-00`  
**Status:** `world-viewport-camera-coverage-authority-audited`

## Summary

The playable orchard spans 720 by 560 world units, while `world-canvas-render-kit` always centers the world origin in the viewport and draws at scale `1`. There is no camera, world-fit policy, follow policy, safe-area policy or entity-visibility result. Valid player and interaction positions can therefore be outside the visible canvas on narrow or short viewports.

The focused next authority should admit viewport evidence, settle a camera and projection policy, classify tracked entity visibility, and bind the accepted camera generation to the matching Canvas2D frame.

## Checklist

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 27 implemented kits and their services.
- [x] Document the 20-surface world viewport and camera authority.
- [x] Retain the pest population audit and all earlier findings.
- [ ] Implement viewport admission, camera settlement and browser viewport fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-18T08-39-41-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-18T08-39-41-04-00-world-viewport-camera-dsk-map.md`
4. `.agent/world-projection-audit/2026-07-18T08-39-41-04-00-camera-coverage-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-world-viewport-camera-coverage-authority-domain`

## Retained audits

The `2026-07-17T21-40-33-04-00` pest-population audit and all earlier stamina, host lifecycle, phase, control, transaction, audio, pressure, determinism, persistence, rendering, command, accessibility, kit-graph and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, rendering, input, tests, build and deployment remain unchanged.
