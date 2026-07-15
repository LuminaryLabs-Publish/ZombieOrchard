# Known gaps: ZombieOrchard save-slot session selection

**Timestamp:** `2026-07-15T12-39-01-04-00`  
**Status:** `save-slot-session-selection-admission-authority-audited`

## Summary

The current priority gap is that Save Select is an unreachable interface stub rather than a durable session-selection system. Play and New Game reach active-session without save identity, validated restore or durable initial commit.

## Plan ledger

**Goal:** keep schema, storage, adoption, presentation and proof gaps dependency ordered.

- [ ] Save schema and stable slot identity.
- [ ] Catalog discovery and truthful record classification.
- [ ] Route Play through an accepted catalog.
- [ ] Add Select, New and Delete commands.
- [ ] Serialize every state-bearing domain.
- [ ] Validate and migrate before adoption.
- [ ] Atomically adopt all runtime state or preserve the predecessor.
- [ ] Use durable, conflict-aware commits.
- [ ] Bind route and presentation to accepted session revisions.
- [ ] Add reload, browser, dist and Pages fixtures.

## Save/session gaps

```txt
session-select inbound route: absent
slot actions: absent
slot metadata: absent
SaveSchemaVersion: absent
SaveSlotId: absent
SaveRevision: absent
RunGeneration bound to save: absent
storage owner: absent
catalog discovery: absent
record validation: absent
migration: absent
serialization: absent
atomic durable commit: absent
whole-runtime restore transaction: absent
stale write rejection: absent
storage failure rollback: absent
FirstSaveCatalogFrameAck: absent
FirstLoadedSessionFrameAck: absent
```

## Source consequences

- Save Select cannot be reached through product actions.
- The renderer's slot-card path has no catalog backing.
- Play adopts current in-memory state directly.
- New Game does not allocate or durably commit a session.
- The smoke test codifies the direct Play bypass.
- Future per-domain storage could create partial restores without a parent authority.

## Retained unresolved gaps

### Timing and lifecycle

- RAF callback count still controls simulation rate.
- Hidden-tab and resume clock policy remain undefined.
- Route changes do not yet suspend gameplay domains.
- New Game and retry still lack proven clean deterministic run generations.
- Public `GameHost` exposes raw runtime and manual tick.

### Transactions and terminal state

- Roster, inventory and construction transactions remain incomplete.
- Pest capacity and terminal settlement remain unresolved.

### Presentation

- Canvas2D and HTML lack one atomic frame result.
- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML construction remains unsafe.

## Do not claim

Do not claim durable saves, correct reload, atomic restore, migration safety, session identity, frame convergence, artifact parity or production readiness until fixtures pass.
