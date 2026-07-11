# Interaction audit: DOM, gateway and GameHost command map

## Current entry points

### Generic screen action

```txt
button[data-action]
  -> delegated click handler
  -> screen/composition activate command
  -> optional nested child dispatch
  -> result ignored by DOM adapter
```

### Active-session quick command

```txt
button[data-command]
  -> delegated click handler
  -> active-session command
  -> result ignored by DOM adapter
```

### Debug/internal command

```txt
globalThis.GameHost.engine.command(...)
  -> any registered domain command

globalThis.GameHost.tick(...)
  -> unrestricted all-domain advancement
```

## Missing interaction identity

```txt
bindingId
device/input source
capabilityId
sessionId
sessionEpoch
commandId
targetId
committedTickId
resultId
renderedFrameId
```

## Required map

```txt
DOM/keyboard/accessibility binding
  -> InputBindingDescriptor
  -> PublicCommandEnvelope
  -> CapabilityGateway.execute
  -> typed result
  -> retained result projection
  -> first-frame acknowledgement

explicit debug tool
  -> DebugLease
  -> InternalCommandEnvelope
  -> internal policy
  -> debug-provenance observation
```

## Rules

1. No product control calls `engine.command()` directly.
2. No normal product host exposes raw engine mutation.
3. Public, internal and debug-only commands use distinct descriptors.
4. Every enabled public affordance resolves to one valid binding and owner command.
5. Every rejected public action returns a stable visible reason.
6. A result remains observable until a frame acknowledges it.
7. Debug leases are tied to session epoch and invalidated by reset/disposal.
