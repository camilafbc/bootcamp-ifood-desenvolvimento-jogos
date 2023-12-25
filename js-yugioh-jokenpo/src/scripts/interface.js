import { state } from "./state.js";
import { cardData, getRandomCardId, setCardsField } from "./cards.js";

// cria as cartas do jogo, pra baixo, adicionando os listeners de click e mouseover
async function createCardImage(IdCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);
  cardImage.classList.add("card");

  if (fieldSide === state.playerSides.player1) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(IdCard);
    });
  }
  return cardImage;
}

// atribui aleatoriedade de valor nas cartas para mostrar na tela
async function drawCards(cardNumber, fieldSide) {
  for (let i = 0; i < cardNumber; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

// atualiza na tela a pontuação
async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

// exibe o botão com o resultado da partida
async function drawButton(text) {
  state.actions.button.innerText = text;
  state.actions.button.style.display = "block";
}

// remove as cartas quando uma é lançada ao jogo
async function removeAllCardsImage() {
  let { computerBOX, player1BOX } = state.playerSides;
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

// exibe os dados da carta selecionada no container_left
async function drawSelectedCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
}

// executa os áudios do jogo
async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  audio.play();
}

export { removeAllCardsImage, updateScore, drawButton, drawCards, playAudio };
