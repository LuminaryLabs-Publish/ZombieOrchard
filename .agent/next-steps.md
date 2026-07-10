# Next steps — ZombieOrchard

## Next safe ledge

```txt
ZombieOrchard Market Result Projection Readback Refresh + GameHost Fixture Gate
```

## Implementation order

1. Add stable Market action/source rows.
2. Add command envelopes for Market actions.
3. Add price/capacity preflight rows.
4. Update `interface-composition.activate` so nested `action.command` results are retained in the action result.
5. Add Market command/result journal rows.
6. Tie accepted Market results to resource transaction and inventory intake rows.
7. Add Exchange Market projection rows.
8. Add HTML renderer readback for Market projection consumption.
9. Add JSON-safe `GameHost.market` diagnostics.
10. Add a DOM-free Market fixture proving accepted and rejected rows.
11. Run fixture, then available npm/build/browser checks.

## Acceptance checklist

```txt
[ ] Market action ids are stable.
[ ] Market source manifest exists.
[ ] Market command envelopes are serializable.
[ ] Accepted preflight rows are recorded.
[ ] Rejected preflight rows include stable reasons.
[ ] Nested command results survive interface-composition.
[ ] Resource deltas are tied to retained command results.
[ ] Inventory deltas are tied to retained command results.
[ ] Exchange projection reads retained Market results.
[ ] HTML renderer emits Market readback rows.
[ ] GameHost exposes JSON-safe Market diagnostics.
[ ] DOM-free fixture proves accepted and rejected paths.
```

## Avoid until proof exists

- economy tuning
- visual polish
- renderer replacement
- additional Market content
- unrelated runtime rewrites
