export const orchardPreset = {
  interface: {
    entry: { title: "Orchard", actions: [{ id: "play", label: "Play", to: "active-session" }, { id: "new", label: "New Game", to: "run-setup" }, { id: "settings", label: "Settings", to: "preferences" }] },
    "run-setup": { title: "New Orchard", actions: [{ id: "start", label: "Start", to: "active-session" }, { id: "back", label: "Back", to: "entry" }] },
    "session-select": { title: "Save Select", actions: [{ id: "back", label: "Back", to: "entry" }] },
    "active-session": { actions: [{ id: "pause", label: "Pause", to: "interrupt" }, { id: "build", label: "Build", to: "construction" }, { id: "market", label: "Market", to: "exchange" }, { id: "roster", label: "Roster", to: "roster" }, { id: "inventory", label: "Inventory", to: "inventory" }, { id: "codex", label: "Codex", to: "knowledge" }] },
    interrupt: { title: "Paused", actions: [{ id: "resume", label: "Resume", to: "active-session" }, { id: "title", label: "Title", to: "entry" }] },
    construction: { title: "Build", actions: [{ id: "shed", label: "Storage Shed", command: { domain: "construction-runtime", type: "build", payload: { id: "storage-shed" } } }, { id: "back", label: "Back", to: "active-session" }] },
    exchange: { title: "Market", actions: [{ id: "back", label: "Back", to: "active-session" }] },
    roster: { title: "Roster", actions: [{ id: "back", label: "Back", to: "active-session" }] },
    inventory: { title: "Inventory", actions: [{ id: "back", label: "Back", to: "active-session" }] },
    knowledge: { title: "Codex", actions: [{ id: "back", label: "Back", to: "active-session" }] },
    preferences: { title: "Settings", actions: [{ id: "back", label: "Back", to: "entry" }] },
    outcome: { title: "Run Summary", actions: [{ id: "title", label: "Title", to: "entry" }] }
  },
  resources: { initial: { money: 40, apples: 0, wood: 12, scrap: 3 } },
  pressures: { initial: { rowPressure: 0, curse: 4 } },
  construction: { catalog: [{ id: "storage-shed", label: "Storage Shed", cost: { wood: 4, money: 8 } }] },
  roster: { actors: [] },
  inventory: { equipped: "branch", items: [{ id: "branch", label: "Old Branch" }] }
};
