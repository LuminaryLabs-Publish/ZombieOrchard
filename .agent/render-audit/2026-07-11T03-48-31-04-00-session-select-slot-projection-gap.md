# Render audit — Session Select slot projection gap

## Current behavior

`html-interface-renderer.js` contains a Session Select branch:

```txt
active === session-select
  -> cards("Slots", current.meta?.slots || [])
```

The preset defines no `meta.slots`, and no runtime domain populates them. The branch therefore renders an empty slot area.

## Missing render contract

```txt
slotId
label
status
schemaVersion
updatedAt
day
phase
score
stateFingerprint
compatible
selected
disabledReason
lastSaveResult
lastLoadResult
```

## Current interaction gap

The button helper renders every action as an enabled button and carries only `data-action`. There is no selected slot command, load command, delete command, overwrite confirmation, corrupt-slot status, incompatible-version state, or progress summary.

## Required render rule

The renderer must consume detached slot observations from a persistence projection kit. It must not read browser storage directly or infer compatibility.

## Load correlation

The first frame after load should name:

```txt
loadResultId
loadEpoch
sessionEpoch
committedTick
stateFingerprint
slotId
schemaVersion
```

## Proof requirement

A browser fixture must prove that compatible, empty, corrupt, and incompatible slots produce distinct truthful UI states and that a successful load frame matches the loaded fingerprint.
