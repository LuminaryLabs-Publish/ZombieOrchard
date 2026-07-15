# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

The current priority gap is Canvas2D render-surface ownership. The renderer rewrites its backing-store dimensions every frame, uses CSS dimensions as physical dimensions, and has no explicit resize transaction, DPR policy, context generation, or matching visible-frame proof.

## Plan ledger

**Goal:** keep presentation-resource risks dependency ordered and tied to executable source, build, and deployed proof.

- [ ] Render-surface identity and revision.
- [ ] CSS viewport revision and validation.
- [ ] Device-pixel-ratio policy.
- [ ] Logical/physical size descriptor.
- [ ] Equality-based resize admission.
- [ ] Resize and DPR observers.
- [ ] Context-generation ownership.
- [ ] Logical-coordinate transform restoration.
- [ ] Atomic resize result.
- [ ] Stale-work rejection.
- [ ] Predecessor preservation on failure.
- [ ] Context and observer retirement receipts.
- [ ] State/surface-bound Canvas frame result.
- [ ] First resize-frame acknowledgement.
- [ ] Source, `dist`, and Pages fixture matrix.

## Canvas gaps

```txt
conditional width assignment: absent
conditional height assignment: absent
devicePixelRatio policy: absent
logical/physical size descriptor: absent
ResizeObserver: absent
DPR-change observation: absent
RenderSurfaceId: absent
RenderSurfaceRevision: absent
ContextGeneration: absent
CanvasRenderSurfaceResult: absent
stale resize rejection: absent
retirement receipt: absent
CanvasFrameResult: absent
FirstCanvasResizeFrameAck: absent
browser DPR fixtures: absent
```

## Source consequences

- Every accepted host frame permits two backing-store dimension assignments.
- The context is reinitialized before each world draw.
- High-DPR output is not explicitly provisioned with a high-density backing store.
- Viewport and DPR changes are ambient rather than command/result transactions.
- No evidence binds a visible frame to one accepted state and render-surface revision.
- The Node smoke test cannot detect browser canvas sizing behavior.

## Retained unresolved gaps

### Timing and lifecycle

- RAF callback count still controls simulation rate.
- New Game and retry still lack clean deterministic run generations.
- Gameplay and pressure are not route-suspended.
- Public `GameHost` still exposes mutable runtime access and manual tick.
- Runtime observers and events lack immutable generation-bound publication.

### Gameplay transactions

- Roster, inventory, and construction transaction boundaries remain incomplete.
- Pest capacity and terminal settlement remain unresolved.

### Presentation and persistence

- Canvas2D and HTML still lack one atomic frame result.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML content is not safely constructed.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim stable backing-store reuse, DPR correctness, resize safety, visual improvement, performance improvement, frame convergence, artifact parity, deployed parity, or production readiness until required fixtures pass on `main`.
