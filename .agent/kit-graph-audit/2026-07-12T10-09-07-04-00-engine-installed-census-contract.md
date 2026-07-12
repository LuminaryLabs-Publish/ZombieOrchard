# Kit graph audit: engine-installed census contract

**Timestamp:** `2026-07-12T10-09-07-04-00`

## Summary

The prior machine registry listed 21 engine-installed kits. Direct source composition proves the runtime installs 19. The repository still contains 27 implemented kit surfaces when host, factory, rendering, proof and deployment surfaces are included.

## Plan ledger

**Goal:** make the kit census reproducible from source and prevent machine registries from conflating installed domains with host/tooling surfaces.

- [x] Count gameplay descriptors in `createOrchardGame()`.
- [x] Count generic interface descriptors after filtering active-session.
- [x] Count the gameplay active-session and composition kits.
- [x] Separate engine-installed from host/tooling surfaces.
- [x] Correct the machine registry.
- [ ] Add an executable census fixture.

## Source calculation

```txt
gameplay kits before interfaces: 6
INTERFACE_DOMAIN_IDS: 12
filtered generic interface kits: 11
replacement active-session kit: 1
interface-composition kit: 1

engine-installed total = 6 + 11 + 1 + 1 = 19
```

## Full implemented census

```txt
engine-installed: 19
kit runtime owner: 1
scoped-interface kit factory: 1
render surfaces: 2
public diagnostics host: 1
smoke fixture: 1
static build: 1
Pages deploy: 1

total implemented kit surfaces: 27
```

## Contract

Machine-readable audit state must publish these fields independently:

```txt
implementedKitSurfaceCount
engineInstalledKitCount
hostSupportKitCount
engineInstalledKitIds
hostSupportKitIds
sourceCompositionFingerprint
```

## Required fixture

```txt
import createOrchardGame composition inputs
  -> enumerate normalized kit IDs before runtime construction
  -> assert 19 unique engine-installed kit IDs
  -> assert expected domain IDs after construction
  -> assert no duplicate domain ownership
  -> assert registry counts and IDs match source
```

A kit count is not authoritative unless the source composition and machine registry produce the same fingerprint.