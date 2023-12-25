import { drawCards } from "./interface.js";
import { state } from "./state.js";

function init() {
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  drawCards(5, state.playerSides.computer);
  drawCards(5, state.playerSides.player1);

  const bgm = document.getElementById("bgm");
  bgm.play();
  bgm.volume = 0.5;
}

async function resetDuel() {
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";

  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  init();
}

document.getElementById("next-duel").addEventListener("click", () => resetDuel());

init();
