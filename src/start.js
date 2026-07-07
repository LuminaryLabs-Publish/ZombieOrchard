import { createOrchardGame } from "./game.js";
import { createHtmlInterfaceRenderer } from "./renderer/html-interface-renderer.js";
import { createWorldCanvas } from "./renderer/world-canvas.js";

const engine = createOrchardGame();
const world = createWorldCanvas(document.querySelector("#world"));
const ui = createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine });

function draw() {
  const snapshot = engine.tick(1 / 60);
  world.render(snapshot);
  ui.render(snapshot);
  requestAnimationFrame(draw);
}

window.GameHost = { engine, getState: () => engine.snapshot(), tick: (dt) => engine.tick(dt) };
draw();
