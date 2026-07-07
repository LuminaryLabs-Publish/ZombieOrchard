export function createInterfaceCompositionKit(config = {}) {
  const start = config.initial || "entry";
  const table = config.transitions || {};
  return {
    id: "interface-composition-kit",
    create(ctx) {
      const state = { active: start, previous: null };
      function move(to) {
        if (!ctx.domains[to]) return { accepted: false, reason: "missing" };
        state.previous = state.active;
        state.active = to;
        return { accepted: true, active: to };
      }
      return {
        id: "interface-composition",
        domain: "interface-composition",
        command(type, payload = {}) {
          if (type === "transition") return move(payload.to);
          if (type === "back") return move(payload.to || state.previous || start);
          if (type === "activate") {
            const result = ctx.domains[state.active]?.command?.("activate", payload);
            const action = result?.action;
            if (!result?.accepted || !action) return result || { accepted: false };
            if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {});
            const next = action.to || table[state.active]?.[action.id];
            return next ? move(next) : { accepted: true };
          }
          return { accepted: false };
        },
        tick() {
          const session = ctx.domains["active-session"]?.snapshot?.();
          if (session?.ended && state.active !== "outcome") move("outcome");
        },
        snapshot() {
          return { active: state.active, previous: state.previous, activeSnapshot: ctx.domains[state.active]?.snapshot?.() || {} };
        }
      };
    }
  };
}
