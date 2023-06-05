const center = document.querySelector(".center");
const bottom = document.querySelector(".bottom");
const gameScore = document.querySelector(".score");
const attempts = document.querySelector(".mainAttempts");
let random = 0;
let score = 0;
let mainAttempts = 5;

function startGame() {
  const startSound = new Audio("bombPlanted.wav");
  startSound.play();
  randomizer();
  updateScore();
  updateMainAttempts();
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

function updateScore() {
  gameScore.innerText = `Score: ${score}`;
}

function updateMainAttempts() {
  attempts.innerText = `Main Attempts: ${mainAttempts}`;
}

function randomizer() {
  let random = Math.floor(Math.random() * 1) + 2;
  console.log("Game selected: " + random);
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

function gameWin() {
  const winSound = new Audio("bombDefused.wav");
  winSound.play();
  score = score + 500;
  updateScore();
  setTimeout(() => {
    center.innerHTML = "";
    randomizer();
  }, 6000)
}

function gameLost() {
  mainAttempts --;
  updateMainAttempts()
  if (mainAttempts <= 0) {
    center.innerHTML = `Game Over! Your's Score: ${score}`;
    const button = document.createElement("button");
    button.className = "buttons";
    center.appendChild(button);
    button.innerText = "Reset"
    button.onclick = () => {
      setTimeout(() => {
        window.location.reload();
      }, 5);
    };
  }
  else{
    const lostSound = new Audio("bombExplode.wav");
    lostSound.play();
    setTimeout(() => {
      center.innerHTML = "";
      randomizer();
    }, 6000)
  }
}

function game1() {
  let bombCode = generateBombCode();
  console.log("Bomb Code: " + bombCode);
  let attempts = 0;

  const text = document.createElement("div")
  text.innerHTML = "Enter deactivation code:"
  text.className = "text"
  const codeInput = document.createElement("input");
  codeInput.type = "number";
  codeInput.className = "codeInput";
  const submitButton = document.createElement("button");
  submitButton.innerText = "Defuse";
  submitButton.className = "buttons";
  const hint = document.createElement("p");

  submitButton.addEventListener("click", function () {
    const enteredCode = codeInput.value;
    attempts++;

    if (enteredCode === bombCode) {
      showResultMessage("Bomb has been defused! Good Job. :)", true);
      gameWin();
    } else {
      if (attempts >= 3) {
        showResultMessage("Bomb exploded! :(", false);
        gameLost()
      } else {
        const enteredCodeArray = enteredCode.split('');
        const bombCodeArray = bombCode.split('');

        let hintMessage = "Incorrect code! Try again. Remaining attempts: " + (3 - attempts) + " prób.";

        for (let i = 0; i < enteredCodeArray.length; i++) {
          if (enteredCodeArray[i] === bombCodeArray[i]) {
            hintMessage += "Number on position: " + (i + 1) + " is correct.";
          }
        }

        showResultMessage(hintMessage, false);
      }
    }
  });

  center.innerHTML = "";
  center.appendChild(text);
  center.appendChild(codeInput);
  center.appendChild(submitButton);
  center.appendChild(hint);

  function generateBombCode() {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let code = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      code += digits[randomIndex];
    }
    return code;
  }

  function showResultMessage(message, isSuccess) {
    const resultMessage = document.createElement("p");
    resultMessage.innerText = message;
    if (isSuccess) {
      resultMessage.classList.add("success");
    } else {
      resultMessage.classList.add("failure");
    }
    center.appendChild(resultMessage);
  }
}

function game2() {
  const colors = ['red', 'green', 'blue', 'yellow'];
  const bombColor = generateBombColor();
  console.log("Cable color: " + bombColor);
  let attempts = 0;

  const text = document.createElement("div");
  text.innerHTML = "Cut the correct wire:";
  text.className = "text";

  const wiresContainer = document.createElement("div");
  wiresContainer.className = "wiresContainer";

  for (let i = 0; i < colors.length; i++) {
    const wire = document.createElement("div");
    wire.className = "wire";
    wire.style.backgroundColor = colors[i];
    wire.addEventListener("click", function () {
      attempts++;
      const selectedColor = colors[i];
      if (selectedColor === bombColor) {
        showResultMessage("Bomb has been defused! Good Job. :)", true);
        gameWin();
      } else {
        if (attempts >= 2) {
          showResultMessage("Bomb exploded! :(", false);
          gameLost();
        } else {
          showResultMessage("Incorrect cable! Try again. Remaining attempts: " + (2 - attempts) + ".", false);
        }
      }
    });

    wiresContainer.appendChild(wire);
  }

  const hint = document.createElement("p");
  
  center.innerHTML = "";
  center.appendChild(text);
  center.appendChild(wiresContainer);
  center.appendChild(hint);

  function generateBombColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function showResultMessage(message, isSuccess) {
    const resultMessage = document.createElement("p");
    resultMessage.innerText = message;
    if (isSuccess) {
      resultMessage.classList.add("success");
    } else {
      resultMessage.classList.add("failure");
    }
    center.appendChild(resultMessage);
  }
}