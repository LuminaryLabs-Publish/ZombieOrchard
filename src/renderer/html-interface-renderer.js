const text = (value) => String(value ?? "");
const stat = (label, value) => `<div class="stat"><b>${text(value)}</b><span>${text(label)}</span></div>`;
const button = (action) => `<button class="action" data-action="${text(action.id)}">${text(action.label)}</button>`;

function cards(title, items = []) {
  if (!items.length) return "";
  return `<h2>${text(title)}</h2><div class="grid">${items.map((item) => `<div class="card"><strong>${text(item.label || item.name || item.id)}</strong><span>${text(item.summary || item.role || item.type || "")}</span></div>`).join("")}</div>`;
}

export function createHtmlInterfaceRenderer({ root, engine }) {
  root.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action) engine.command("interface-composition", "activate", { actionId: action.dataset.action });
    const command = event.target.closest("[data-command]");
    if (command) engine.command("active-session", command.dataset.command);
  });

  function render(snapshot) {
    const ui = snapshot["interface-composition"] || {};
    const active = ui.active;
    const current = ui.activeSnapshot || {};
    const session = snapshot["active-session"] || {};
    const resources = snapshot["resource-ledger"]?.values || {};
    const pressure = snapshot["pressure-field"]?.channels || {};
    const construction = snapshot["construction-runtime"] || {};
    const roster = snapshot["roster-runtime"] || {};
    const inventory = snapshot["inventory-runtime"] || {};

    if (active === "active-session") {
      root.innerHTML = `<div class="hud"><div class="stat-strip">${stat("day", session.day)}${stat("phase", session.phase)}${stat("money", resources.money)}${stat("apples", resources.apples)}${stat("wood", resources.wood)}${stat("pressure", Math.round(pressure.rowPressure || 0))}${stat("condition", Math.round(session.player?.condition || 0))}</div><div class="quick"><button data-command="collect">Collect</button><button data-command="clear">Clear</button><button data-command="next-phase">Next Phase</button>${(session.actions || []).map(button).join("")}</div><div class="message">${text(session.message)}</div></div>`;
      return;
    }

    let extra = "";
    if (active === "session-select") extra = cards("Slots", current.meta?.slots || []);
    if (active === "construction") extra = cards("Built", construction.built || []);
    if (active === "roster") extra = cards("Roster", roster.actors || []);
    if (active === "inventory") extra = cards("Items", inventory.items || []);
    if (active === "outcome") extra = cards("Summary", [{ label: "Score", summary: session.score }, { label: "Day", summary: session.day }]);

    root.innerHTML = `<section class="screen"><div class="panel"><h1>${text(current.title || active)}</h1><p>${text(current.description || "")}</p>${extra}<div class="actions">${(current.actions || []).map(button).join("")}</div></div></section>`;
  }

  return { render };
}
