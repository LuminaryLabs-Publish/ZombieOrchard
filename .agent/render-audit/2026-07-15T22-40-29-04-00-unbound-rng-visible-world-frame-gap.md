# Render audit: unbound RNG visible-world frame gap

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

Canvas2D correctly renders the current apple and pest snapshots, but the frame has no run seed, RNG revision or deterministic snapshot hash. A screenshot can show what appeared without proving which accepted random state produced it or whether the same run can reproduce it.

## Plan ledger

**Goal:** bind each generated world frame to an accepted RunGeneration and RNG state without making the renderer generate gameplay values.

- [x] Trace orchard and pest snapshots into Canvas2D.
- [x] Confirm no seed or RNG revision reaches the renderer.
- [x] Define a first seed-bound frame acknowledgement.
- [ ] Execute same-seed screenshot and frame-hash fixtures.

## Current frame path

```txt
ambient Math.random
  -> orchard apples and pests
  -> engine snapshot
  -> world.render(snapshot)
  -> Canvas2D frame
```

## Missing evidence

```txt
RunGeneration in frame plan: absent
RunSeedRevision in frame plan: absent
RngStateRevision in frame plan: absent
canonical snapshot hash: absent
FirstSeedBoundWorldFrameAck: absent
same-seed screenshot fixture: absent
different-seed divergence fixture: absent
```

## Required result

`FirstSeedBoundWorldFrameAck` must cite the accepted run generation, seed revision, RNG state revision, canonical snapshot hash and rendered frame identity. The renderer remains read-only.
