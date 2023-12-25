const emojis = [
  "🐱",
  "🐱",
  "🐶",
  "🐶",
  "🐵",
  "🐵",
  "🐯",
  "🐯",
  "🐮",
  "🐮",
  "🐼",
  "🐼",
  "🐸",
  "🐸",
  "🐷",
  "🐷"
];
const timer_seconds = document.querySelector(".timer_seconds");
const timer_minutes = document.querySelector(".timer_minutes");
let seconds = 0;
let minutes = 0;
let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < emojis.length; i++){
  let box = document.createElement("div")
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if(openCards.length < 2){
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if(openCards.length == 2){
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if(openCards[0].innerHTML === openCards[1].innerHTML){
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if(document.querySelectorAll(".boxMatch").length === emojis.length){
    clearInterval(gameTimer)

    Swal.fire({
      title: `Você venceu!`,
      text: `Seu tempo foi de ${minutes <= 9 ?  "0" + minutes : minutes}:${seconds <= 9 ?  "0" + seconds : seconds}`,
      icon: "success",
      timer: 10000,
      showConfirmButton: false,
      allowOutsideClick: true,
    });
  }
}


function handleTimer(){
  if(seconds < 59){
    seconds++;
    
  } else {
    seconds = 0;
    minutes++;
    
  }
  seconds <= 9 ? timer_seconds.textContent = "0" + seconds : timer_seconds.textContent = seconds;
  minutes <= 9 ? timer_minutes.textContent = "0" + minutes : timer_minutes.textContent = minutes;
}

const gameTimer = setInterval(handleTimer, 1000);