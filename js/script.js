const button = document.querySelector(".button");
const displayOFF = document.querySelectorAll(".OFF");
const timerElementNum = document.querySelector("#timer-num");
const startTimerElementNum = document.getElementById("start-timer");
const scoreElementNum = document.querySelector("#score-num");

let startTimerCount = 4;
let startTimer;
let gameTimer;
let gameDuration = 10;

button.addEventListener("mousedown", startGame);

// Game container and target initialization
const container = document.querySelector(".container");
const target = document.createElement("img");
target.setAttribute("class", "target");
target.setAttribute("src", "./img/new-moon.png");
const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;

let gameStarted = false;
const cursor = document.querySelector(".cursor");

// Move the target every second
setInterval(() => {
  if (gameStarted) {
    
    const randY = Math.random() * (contHeight - 100);
    const randX = Math.random() * (contWidth - 100);
    target.style.position = "absolute";
    target.style.top = randY + "px";
    target.style.left = randX + "px";
  }
}, 1000);

// Initialize the game
function initializeGame() {
  gameStarted = true;
  document.body.style.cursor = "none";
  cursor.style.display = "block";
  container.appendChild(target);
  
  let timeLeft = gameDuration;
  timerElementNum.innerHTML = `Time: ${timeLeft}`;

  gameTimer = setInterval(() => {
    timeLeft--;
    timerElementNum.innerHTML = `Time: ${timeLeft}`;
    if (timeLeft == 0) {
      timerElementNum.innerHTML=""
      scoreElementNum.innerHTML=""
      clearInterval(gameTimer)
      endGame();
    }
  }, 1000);
}

// Shooting logic
const bulletSpot = document.querySelector(".bullet-hole");
let score = 0;
let acc = 0;
let bullet = 0;

function shoot(e) {
  e.preventDefault();
  bullet++;
  
  bulletSpot.style.top = `${e.pageY}px`;
  bulletSpot.style.left = `${e.pageX}px`;
  bulletSpot.style.display = "block";

  if (e.target === target) {
    score++;
  }

  acc = score / bullet;
  scoreElementNum.innerHTML = `Score: ${score} || Accuracy: ${(acc * 100).toFixed(2)}%`;
}

// End game logic
function endGame() {
  bulletSpot.style.display='none'
  container.innerHTML = ""; // Clear the container content
  gameStarted = false;
  document.body.style.cursor = "default";
  cursor.style.display = "none";

  const msg = `
    <div class="end-game-screen text-center mt-5">
      <h1 class="text-warning display-4 fw-bold">Game Over</h1>
      <p class="lead text-light mt-3">Thank you for playing the game!</p>
      <div class="mt-4">
        <p class="text-info fs-5">Your Final Score:</p>
        <h2 class="text-light display-6">${score}</h2>
      </div>
      <div class="mt-4">
        <p class="text-info fs-5">Your Accuracy:</p>
        <h2 class="text-light display-6">${(acc * 100).toFixed(2)}%</h2>
      </div>
      <button class="btn btn-primary btn-lg mt-4 restart-button">Play Again</button>
    </div>
  `;

  container.innerHTML = msg;

  // Add a click event to the restart button
  document.querySelector(".restart-button").addEventListener("click", () => {
    window.location.reload(); // Reload the page to restart the game
  });
}


// Start game logic with countdown
async function startGame() {
  displayOFF.forEach((element) => {
    element.style.display = "none";
  });

  startTimer = setInterval(() => {
    startTimerCount--;
    startTimerElementNum.innerHTML = startTimerCount > 0 ? startTimerCount : "GO!";
    startTimerElementNum.style.color = startTimerCount <= 0 ? "goldenrod" : "";

    if (startTimerCount <= 0) {
      clearInterval(startTimer);
      setTimeout(() => {
        startTimerElementNum.style.display = "none";
        initializeGame();
      }, 1000);
    }
  }, 1000);
}

// Cursor movement
window.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.pageY}px`;
  cursor.style.left = `${e.pageX}px`;
});

// Mouse click shooting event
window.addEventListener("mousedown", (e) => {
  if (gameStarted) {
    shoot(e);
  }
});
