const center = document.querySelector(".center");
const bottom = document.querySelector(".bottom");
let wynik = 0;
let random = 0;

function startGame() {
  const startSound = new Audio("bombPlanted.wav");
  startSound.play();
  center.innerHTML = "";
  //randomizer();
  punkty();
}

function credits() {
  center.innerHTML = "Game created by: Damian Kurowski 3G";
  const button = document.createElement("button");
  button.className = "buttons";
  button.innerText = "Back to main menu";
  button.onclick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 5);
  };
  center.appendChild(button);
}

function punkty() {
  const div = document.createElement("div");
  bottom.appendChild(div);
  div.innerHTML = "Score: " + wynik;
}

function randomizer() {
  let random = Math.floor(Math.random() * 1) + 1;
  console.log(random);
  switch (random) {
    case 1:
      game1();
      break;
    case 2:
      game2();
      break;
    case 3:
      game3();
      break;
  }
}
