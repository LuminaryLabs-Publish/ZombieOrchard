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
