const clone = (value) => JSON.parse(JSON.stringify(value ?? null));
const num = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const dist = (a, b) => Math.hypot(num(a.x) - num(b.x), num(a.y) - num(b.y));

export function createResourceLedgerKit(config = {}) {
  return { id: "resource-ledger-kit", create() {
    const state = { values: { ...(config.initial || {}) }, last: "" };
    function canPay(cost = {}) { return Object.entries(cost).every(([key, value]) => num(state.values[key]) >= num(value)); }
    function pay(cost = {}) { if (!canPay(cost)) return false; for (const [key, value] of Object.entries(cost)) state.values[key] = num(state.values[key]) - num(value); state.last = "spent"; return true; }
    function add(values = {}) { for (const [key, value] of Object.entries(values)) state.values[key] = num(state.values[key]) + num(value); state.last = "gained"; }
    return { id: "resource-ledger", domain: "game", api: { canPay, pay, add }, command(type, payload = {}) { if (type === "add") { add(payload.values); return { accepted: true }; } if (type === "pay") return { accepted: pay(payload.cost) }; return { accepted: false }; }, snapshot: () => clone(state) };
  }};
}

export function createPressureFieldKit(config = {}) {
  return { id: "pressure-field-kit", create() {
    const state = { channels: { ...(config.initial || {}) } };
    function adjust(id, amount) { state.channels[id] = clamp(num(state.channels[id]) + num(amount), 0, 100); }
    return { id: "pressure-field", domain: "game", api: { adjust }, tick(dt) { adjust("rowPressure", dt * 0.8); adjust("curse", dt * 0.2); }, command(type, payload = {}) { if (type === "adjust") { adjust(payload.id, payload.amount); return { accepted: true }; } return { accepted: false }; }, snapshot: () => clone(state) };
  }};
}

export function createOrchardWorldKit(config = {}) {
  return { id: "orchard-world-kit", create() {
    const trees = [];
    const apples = [];
    for (let row = 0; row < 7; row++) for (let col = 0; col < 9; col++) trees.push({ id: "tree-" + row + "-" + col, x: -320 + col * 80, y: -210 + row * 70, condition: 100 });
    function seedApples() { while (apples.length < 26) { const tree = trees[Math.floor(Math.random() * trees.length)]; apples.push({ id: "apple-" + Math.random().toString(36).slice(2), x: tree.x + Math.random() * 34 - 17, y: tree.y + Math.random() * 34 - 17, kind: Math.random() > 0.82 ? "gold" : "red" }); } }
    seedApples();
    return { id: "orchard-world", domain: "game", api: { collectNear(point, radius = 32) { let best = null; for (const apple of apples) if (dist(point, apple) <= radius && (!best || dist(point, apple) < dist(point, best))) best = apple; if (!best) return null; apples.splice(apples.indexOf(best), 1); seedApples(); return best; } }, snapshot: () => ({ trees: clone(trees), apples: clone(apples), bounds: config.bounds || { x: 720, y: 560 } }) };
  }};
}

export function createConstructionRuntimeKit(config = {}) {
  return { id: "construction-runtime-kit", create(ctx) {
    const state = { catalog: clone(config.catalog || []), built: [], message: "" };
    return { id: "construction-runtime", domain: "game", command(type, payload = {}) {
      if (type !== "build") return { accepted: false };
      const item = state.catalog.find((entry) => entry.id === payload.id) || state.catalog[0];
      if (!item) return { accepted: false };
      const ledger = ctx.domains["resource-ledger"]?.api;
      if (!ledger?.pay(item.cost || {})) { state.message = "Missing resources"; return { accepted: false }; }
      state.built.push({ id: item.id + "-" + (state.built.length + 1), type: item.id, label: item.label, x: 100 - state.built.length * 52, y: 120, condition: 100 });
      state.message = "Built " + item.label;
      return { accepted: true };
    }, snapshot: () => clone(state) };
  }};
}

export function createRosterRuntimeKit(config = {}) {
  return { id: "roster-runtime-kit", create(ctx) {
    const state = { actors: clone(config.actors || []), roles: clone(config.roles || []), message: "" };
    return { id: "roster-runtime", domain: "game", command(type, payload = {}) {
      if (type !== "hire") return { accepted: false };
      const ledger = ctx.domains["resource-ledger"]?.api;
      if (!ledger?.pay({ money: payload.cost || 25 })) { state.message = "Not enough money"; return { accepted: false }; }
      state.actors.push({ id: "hand-" + (state.actors.length + 1), name: payload.name || "Field Hand", role: "harvest", morale: 72, condition: 100 });
      state.message = "Added field help";
      return { accepted: true };
    }, snapshot: () => clone(state) };
  }};
}

export function createInventoryRuntimeKit(config = {}) {
  return { id: "inventory-runtime-kit", create() {
    const state = { items: clone(config.items || []), equipped: config.equipped || "branch" };
    return { id: "inventory-runtime", domain: "game", command(type, payload = {}) { if (type === "equip") { state.equipped = payload.id; return { accepted: true }; } return { accepted: false }; }, snapshot: () => clone(state) };
  }};
}

export function createActiveSessionDomainKit(config = {}) {
  return { id: "active-session-domain-kit", create(ctx) {
    const state = { day: 1, phase: "day", player: { x: 0, y: 180, condition: 100, stamina: 100 }, pests: [], score: 0, message: "Collect apples, build, trade, and survive the rows.", ended: false };
    const actions = clone(config.actions || []);
    function addPest() { const a = Math.random() * Math.PI * 2; state.pests.push({ id: "pest-" + Math.random().toString(36).slice(2), x: Math.cos(a) * 360, y: Math.sin(a) * 280, condition: 2 }); }
    return { id: "active-session", domain: "interface", command(type, payload = {}) {
      if (type === "activate") { const action = actions.find((item) => item.id === payload.actionId); return action ? { accepted: true, action } : { accepted: false }; }
      if (type === "move") { state.player.x = clamp(state.player.x + num(payload.x) * 22, -360, 360); state.player.y = clamp(state.player.y + num(payload.y) * 22, -280, 280); return { accepted: true }; }
      if (type === "collect") { const apple = ctx.domains["orchard-world"]?.api?.collectNear(state.player, 42); if (!apple) { state.message = "No apple close enough."; return { accepted: false }; } ctx.domains["resource-ledger"]?.api?.add({ apples: 1, money: apple.kind === "gold" ? 8 : 3 }); ctx.domains["pressure-field"]?.api?.adjust("rowPressure", apple.kind === "gold" ? 2 : 0.5); state.score += apple.kind === "gold" ? 40 : 10; state.message = "Collected " + apple.kind + " apple."; return { accepted: true }; }
      if (type === "clear") { const target = state.pests.find((item) => dist(item, state.player) < 58); if (!target) { state.message = "Nothing in reach."; return { accepted: false }; } target.condition -= 1; if (target.condition <= 0) { state.pests.splice(state.pests.indexOf(target), 1); state.score += 25; ctx.domains["resource-ledger"]?.api?.add({ scrap: 1 }); } state.message = "Cleared a row pest."; return { accepted: true }; }
      if (type === "next-phase") { state.phase = state.phase === "day" ? "night" : "day"; if (state.phase === "day") state.day += 1; state.message = state.phase === "night" ? "Night pressure rises." : "Morning settlement complete."; return { accepted: true }; }
      return { accepted: false };
    }, tick(dt) { if (state.ended) return; if (state.phase === "night" && Math.random() < dt * 0.55) addPest(); for (const item of state.pests) { const d = dist(item, state.player); if (d > 8) { item.x += (state.player.x - item.x) / d * dt * 36; item.y += (state.player.y - item.y) / d * dt * 36; } else state.player.condition -= dt * 7; } if (state.player.condition <= 0) { state.player.condition = 0; state.ended = true; state.message = "The orchard has fallen."; } }, snapshot() { return { ...clone(state), actions: clone(actions) }; } };
  }};
}
