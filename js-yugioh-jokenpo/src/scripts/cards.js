import { checkDuelResults } from "./duel.js";
import { drawButton, removeAllCardsImage, updateScore } from "./interface.js";
import { state } from "./state.js";


const pathImages = "./src/assets/icons/";

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    WinOf: [0],
    LoseOf: [1],
  },
];

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

// cuida das cartas que vão a jogo e da dinâmica do resultado
async function setCardsField(cardId) {
  await removeAllCardsImage();

  let computerCardId = await getRandomCardId();

  state.cardSprites.avatar.src = "";
  state.cardSprites.name.innerText = "";
  state.cardSprites.type.innerText = "";
  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.style.display = "block";

  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;

  let duelResults = checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

export { cardData, getRandomCardId, setCardsField };
