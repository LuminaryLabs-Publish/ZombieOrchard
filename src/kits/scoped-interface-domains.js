const clone = (value) => JSON.parse(JSON.stringify(value ?? null));
const list = (value) => Array.isArray(value) ? value : value == null ? [] : [value];

export const INTERFACE_DOMAIN_IDS = [
  "entry",
  "session-select",
  "run-setup",
  "active-session",
  "interrupt",
  "construction",
  "exchange",
  "roster",
  "inventory",
  "knowledge",
  "preferences",
  "outcome"
];

export function createScopedInterfaceDomainKit(domainId, config = {}) {
  return {
    id: domainId + "-domain-kit",
    create(ctx) {
      const state = {
        id: domainId,
        title: config.title || domainId,
        description: config.description || "",
        selectedIndex: 0,
        fields: clone(config.fields || {}),
        meta: clone(config.meta || {})
      };
      const actions = list(config.actions).map((action, index) => ({
        id: action.id || "action-" + (index + 1),
        label: action.label || action.id || "Action",
        to: action.to || null,
        command: action.command || null,
        disabled: Boolean(action.disabled),
        description: action.description || ""
      }));
      return {
        id: domainId,
        domain: "interface",
        command(type, payload = {}) {
          if (type === "select") {
            state.selectedIndex = Math.max(0, Math.min(actions.length - 1, Number(payload.index) || 0));
            ctx.emit(domainId + ".selected", { index: state.selectedIndex });
            return { accepted: true };
          }
          if (type === "set-field") {
            state.fields[payload.key] = payload.value;
            ctx.emit(domainId + ".fieldChanged", { key: payload.key, value: payload.value });
            return { accepted: true };
          }
          if (type === "activate") {
            const action = actions.find((item) => item.id === payload.actionId) || actions[state.selectedIndex];
            if (!action || action.disabled) return { accepted: false, reason: "action unavailable" };
            ctx.emit(domainId + ".actionRequested", { action });
            return { accepted: true, action };
          }
          return { accepted: false, reason: "unknown command " + type };
        },
        snapshot() {
          return { ...clone(state), actions: clone(actions) };
        }
      };
    }
  };
}

export function createInterfaceDomainKits(config = {}) {
  return INTERFACE_DOMAIN_IDS.map((id) => createScopedInterfaceDomainKit(id, config[id] || {}));
}
