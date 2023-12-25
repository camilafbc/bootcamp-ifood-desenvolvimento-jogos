const state = {
  // variáveis que alteram elementos visuais
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.getElementById("time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  // variáveis que alteram valores
  value: {
    gameVelocity: 500,
    gameLives: 3,
    hitPosition: 0,
    result: 0,
    finalResult: [],
    currentTime: 30,
  },
  // chamadas e funções
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function handleLives() {
  state.value.gameLives--;

  if (state.value.currentTime <= 0) {
    state.value.finalResult.push(state.value.result);
    state.value.result = 0;
    state.value.currentTime = 30;
    
    if(state.value.gameLives > 0){
      initialize();
    } 
  } 
  
  if(state.value.gameLives === 0) {
    Swal.fire({
      title: "Fim de Jogo!",
      text: `Resultado: ${state.value.finalResult.reduce((acc, curr) => acc + curr)} pontos.`,
      icon: "info",
      confirmButtonText: "Jogar outra vez",
      allowOutsideClick: false,
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        state.value.currentTime = 30;
        state.value.gameLives = 3;
        state.value.result = 0;
        state.view.lives.textContent = "x" + state.value.gameLives;
        state.value.finalResult = [];
        initialize();
      }
    });
  }
 state.view.score.textContent = state.value.result;
 state.view.lives.textContent = "x" + state.value.gameLives;
}

function countDown() {
  state.value.currentTime--;
  state.view.timeLeft.textContent = state.value.currentTime;

  if (state.value.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

      Swal.fire({
      title: `Fim de vida...`,
      text: `Você somou: ${state.value.result} pontos`,
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
      allowOutsideClick: true,
    });

    handleLives();
  }
}

function playSound() {
  let audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.2;
  audio.play();
}

// função que sorteia um número aleatório para posicionar o inimigo
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.value.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.value.hitPosition) {
        state.value.result++;
        state.view.score.textContent = state.value.result;
        state.value.hitPosition = null;
        playSound();
      }
    });
  });
}

function initialize() {
  (state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity)),
    (state.actions.countDownTimerId = setInterval(countDown, 1000)),
    addListenerHitBox();
}

Swal.fire({
  title: "Let's go!",
  text: "Aperte o PLAY para jogar!",
  confirmButtonText: "PLAY",
  icon: "info",
  allowOutsideClick: false,
  backdrop: true,
}).then((result) => {
  if (result.isConfirmed) {
    initialize();
  }
});