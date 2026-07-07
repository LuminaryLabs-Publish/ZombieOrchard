export function createKitRuntime({ kits = [] } = {}) {
  const domains = {};
  const listeners = new Set();
  const ctx = {
    frame: 0,
    elapsed: 0,
    delta: 0,
    events: [],
    domains,
    emit(type, payload = {}) {
      const event = { type, payload, frame: ctx.frame, elapsed: ctx.elapsed };
      ctx.events.push(event);
      return event;
    }
  };

  const engine = {
    ctx,
    domains,
    addKit(kit) {
      const domain = kit.create(ctx);
      if (!domain?.id) throw new Error("Kit returned a domain without an id.");
      domains[domain.id] = domain;
      return domain;
    },
    command(domainId, type, payload = {}) {
      const domain = domains[domainId];
      if (!domain?.command) return { accepted: false, reason: `missing domain ${domainId}` };
      const result = domain.command(type, payload) ?? { accepted: true };
      notify();
      return result;
    },
    tick(delta = 1 / 60) {
      ctx.delta = Math.max(0, Math.min(0.1, Number(delta) || 0));
      ctx.elapsed += ctx.delta;
      ctx.frame += 1;
      ctx.events.length = 0;
      for (const domain of Object.values(domains)) domain.tick?.(ctx.delta);
      notify();
      return engine.snapshot();
    },
    snapshot() {
      return Object.fromEntries(Object.entries(domains).map(([id, domain]) => [id, domain.snapshot?.() ?? {}]));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };

  ctx.engine = engine;
  for (const kit of kits) engine.addKit(kit);
  function notify() {
    const snap = engine.snapshot();
    for (const listener of listeners) listener(snap);
  }
  return engine;
}
