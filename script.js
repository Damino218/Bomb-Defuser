const center = document.querySelector(".center");
let random = 0

function startGame(){
    const startSound = new Audio("bombPlanted.wav");
    startSound.play()
    center.innerHTML = ""
    let random = Math.floor(Math.random() * 10) + 1;
    console.log(random)
};

function credits(){
    center.innerHTML = "Game created by: Damian Kurowski 3G";
    const button = document.createElement('button');
    button.className = "buttons";
    button.innerText = "Back to main menu";
    button.onclick = () => {
        setTimeout(() => {
          window.location.reload();
        }, 5);
      };    
    center.appendChild(button);
};