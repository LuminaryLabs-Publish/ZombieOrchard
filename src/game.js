import { createKitRuntime } from "./kits/runtime.js";
import { createInterfaceDomainKits } from "./kits/scoped-interface-domains.js";
import { createInterfaceCompositionKit } from "./kits/composition.js";
import { orchardPreset } from "./presets/orchard-preset.js";
import { createActiveSessionDomainKit, createConstructionRuntimeKit, createInventoryRuntimeKit, createOrchardWorldKit, createPressureFieldKit, createResourceLedgerKit, createRosterRuntimeKit } from "./kits/game-domains.js";

export function createOrchardGame(preset = orchardPreset) {
  const interfaceKits = createInterfaceDomainKits(preset.interface).filter((kit) => kit.id !== "active-session-domain-kit");
  const engine = createKitRuntime({
    kits: [
      createResourceLedgerKit(preset.resources),
      createPressureFieldKit(preset.pressures),
      createOrchardWorldKit(preset.world),
      createConstructionRuntimeKit(preset.construction),
      createRosterRuntimeKit(preset.roster),
      createInventoryRuntimeKit(preset.inventory),
      ...interfaceKits,
      createActiveSessionDomainKit(preset.interface["active-session"]),
      createInterfaceCompositionKit({ initial: "entry" })
    ]
  });
  return engine;
}
