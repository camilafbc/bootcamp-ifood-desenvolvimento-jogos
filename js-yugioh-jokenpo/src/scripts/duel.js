import { cardData } from "./cards.js";
import { playAudio } from "./interface.js";
import { state } from "./state.js";

function checkDuelResults(playerCardId, computerCardId){
  let duelResults = "Empate"
  let playerCard = cardData[playerCardId];

  if(playerCard.WinOf.includes(computerCardId)){
    duelResults = "Ganhou";
    playAudio("win");
    state.score.playerScore++;
  } else if (playerCard.LoseOf.includes(computerCardId)){
    duelResults = "Perdeu";
    playAudio("lose");
    state.score.computerScore++;
  }

  return duelResults;
}

export { checkDuelResults }