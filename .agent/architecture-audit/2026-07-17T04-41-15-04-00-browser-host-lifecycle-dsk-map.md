# Architecture audit: browser host lifecycle DSK map

**Timestamp:** `2026-07-17T04-41-15-04-00`  
**Status:** `browser-host-single-runtime-lifecycle-retirement-authority-audited`

## Current composition

```txt
index.html
└─ src/boot.js
   └─ side-effect import src/start.js
      ├─ createOrchardGame()
      │  └─ createKitRuntime(19 installed kits)
      ├─ createWorldCanvas(canvas)
      ├─ createHtmlInterfaceRenderer(root, engine)
      │  └─ root click listener
      ├─ window.GameHost = raw capabilities
      └─ draw()
         ├─ engine.tick(1/60)
         ├─ Canvas2D render
         ├─ HTML render
         └─ requestAnimationFrame(draw)
```

## Ownership gap

The host is assembled as module side effects. Resource creation succeeds incrementally and no accepted host generation owns the engine, DOM listener, renderers, RAF callback, or public capability as one lifecycle set. There is no candidate construction, terminal commit, rollback, replacement, or retirement result.

## Required authority

`zombie-orchard-browser-host-single-runtime-lifecycle-retirement-authority-domain`

```txt
HostBootAdmissionCommand
  -> HostSessionId
  -> DocumentRootGeneration
  -> SingletonRuntimeLease
  -> HostBootAdmissionResult

HostRuntimeCommitCommand
  -> EngineGeneration
  -> RendererGeneration
  -> ListenerLease
  -> RafLoopGeneration
  -> GameHostCapabilityGeneration
  -> HostLifecycleResult
  -> FirstHostBoundFrameAck

HostRuntimeRetirementCommand
  -> cancel RAF
  -> remove listeners
  -> dispose renderers
  -> dispose engine/domains
  -> retire GameHost generation
  -> HostLifecycleResult
```

## DSK/domain breakdown

| Surface | Ownership |
|---|---|
| host-session identity | one browser runtime generation |
| boot admission | duplicate/stale/replacement policy |
| singleton lease | one active host per document root |
| RAF generation | scheduling and cancellation |
| listener lease | install/remove delegated controls |
| renderer lifecycle | Canvas2D and HTML projection retirement |
| engine disposal adapter | domain teardown and subscription retirement |
| capability retirement | `window.GameHost` generation and stale-call rejection |
| page lifecycle policy | pagehide/pageshow, BFCache, hidden/restore |
| lifecycle result | committed/rejected/retired terminal evidence |
| frame acknowledgement | first frame from the accepted host generation |

## Constraint

Preserve the existing 19 installed kits and current product domain boundaries. The smallest implementation is a browser-host wrapper around `start.js`, not a game-domain rewrite.