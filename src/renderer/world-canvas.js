export function createWorldCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  function render(snapshot) {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = "#071007";
    ctx.fillRect(0, 0, w, h);
    const world = snapshot["orchard-world"] || {};
    const session = snapshot["active-session"] || {};
    for (const tree of world.trees || []) {
      ctx.fillStyle = "#1e4a18";
      ctx.fillRect(w / 2 + tree.x - 8, h / 2 + tree.y - 8, 16, 16);
    }
    for (const apple of world.apples || []) {
      ctx.fillStyle = apple.kind === "gold" ? "#ffd76b" : "#df4840";
      ctx.fillRect(w / 2 + apple.x - 3, h / 2 + apple.y - 3, 6, 6);
    }
    for (const item of session.pests || []) {
      ctx.fillStyle = "#8ab66a";
      ctx.fillRect(w / 2 + item.x - 8, h / 2 + item.y - 8, 16, 16);
    }
    const p = session.player || { x: 0, y: 0 };
    ctx.fillStyle = "#f7ead0";
    ctx.fillRect(w / 2 + p.x - 6, h / 2 + p.y - 6, 12, 12);
  }
  return { render };
}
