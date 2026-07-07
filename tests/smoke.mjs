import { createOrchardGame } from "../src/game.js";

const engine = createOrchardGame();
let state = engine.snapshot();
if (state["interface-composition"].active !== "entry") throw new Error("entry screen missing");
engine.command("interface-composition", "activate", { actionId: "play" });
state = engine.tick(1 / 60);
if (state["interface-composition"].active !== "active-session") throw new Error("play transition missing");
if (!state["orchard-world"].apples.length) throw new Error("orchard apples missing");
console.log("Smoke passed");
