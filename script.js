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
  const lostSound = new Audio("bombDefused.wav");
  lostSound.play();
  mainAttempts--
  updateMainAttempts()
  setTimeout(() => {
    center.innerHTML = "";
    randomizer();
  }, 6000)
}

function game1() {
  let bombCode = generateBombCode();
  console.log("Kod bomby: " + bombCode);
  let attempts = 0;

  const codeInput = document.createElement("input");
  codeInput.type = "text";
  codeInput.placeholder = "Podaj kod dezaktywacyjny";
  const submitButton = document.createElement("button");
  submitButton.innerText = "Dezaktywuj";
  const hint = document.createElement("p");

  submitButton.addEventListener("click", function () {
    const enteredCode = codeInput.value;
    attempts++;

    if (enteredCode === bombCode) {
      showResultMessage("Bomba została dezaktywowana! Udane rozbrojenie!", true);
      gameWin();
    } else {
      if (attempts >= 3) {
        showResultMessage("Niepoprawny kod! Bomba eksploduje! Game over!", false);
        gameLost()
      } else {
        const enteredCodeArray = enteredCode.split('');
        const bombCodeArray = bombCode.split('');

        let hintMessage = "Niepoprawny kod! Spróbuj jeszcze raz. Pozostało ci " + (3 - attempts) + " prób.";

        for (let i = 0; i < enteredCodeArray.length; i++) {
          if (enteredCodeArray[i] === bombCodeArray[i]) {
            hintMessage += " Cyfra na pozycji " + (i + 1) + " jest poprawna.";
          }
        }

        showResultMessage(hintMessage, false);
      }
    }
  });

  center.innerHTML = "";
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