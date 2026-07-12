# Render audit: action availability and result-frame gap

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

The HTML renderer projects every action as a normal clickable button and carries no action result revision. Command availability and visible affordance can therefore disagree, while nested rejection has no committed visible feedback.

## Plan ledger

**Goal:** make the rendered action surface a truthful projection of the admitted action set and committed result.

- [x] Trace action descriptor to HTML button.
- [x] Confirm `disabled` is ignored by the renderer.
- [x] Confirm action results are not part of the read model.
- [x] Confirm canvas and HTML lack shared result provenance.
- [ ] Add affordance and first-frame result fixtures.

## Current projection

```txt
action descriptor
  -> button(action)
  -> data-action=id
  -> no disabled attribute
  -> no aria-disabled
  -> no reason text
  -> no route/action-set revision
```

The route/HUD is rebuilt from snapshots, but no `InterfaceActionResult`, command ID, route revision or action-set revision is rendered.

## Visible mismatch

```txt
descriptor disabled=true
  -> domain would reject
  -> HTML still shows clickable enabled control

construction build rejects
  -> composition reports accepted
  -> renderer receives no nested rejection result
  -> user receives no authoritative result projection
```

## Required frame plan

```txt
InterfaceViewModel
  -> route revision
  -> action-set revision
  -> action descriptor fingerprints
  -> enabled/disabled state and reason
  -> latest action result ID/revision
  -> nested result summary
  -> focus target
  -> accessibility announcement
```

## Required commit proof

```txt
committed InterfaceActionResult
  -> HTML action-result projection
  -> optional canvas feedback projection
  -> matching result revision on both consumers
  -> first visible frame acknowledgement
```

## Fixtures

```txt
disabled descriptor renders disabled
aria-disabled and reason are present
disabled click produces no command
nested rejection becomes visible feedback
success and rejection each cite result revision
canvas/HTML parity when both project feedback
source/dist/Pages markup and behavior match
```

## Non-claim

No renderer or UI behavior changed.