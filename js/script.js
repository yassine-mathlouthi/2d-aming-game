const button = document.querySelector(".button")
const timerElementNum = document.querySelector("#timer-Num")
const startTimerElementNum = document.getElementById("start-timer");
let startTimerCount = 4 ; 
let startTimer ; 
button.addEventListener("mousedown",startGame)
// 2
const container = document.querySelector(".container");
var target = document.createElement("img")
target.setAttribute("class","target") ; 
target.setAttribute("src","./img/new-moon.png")
const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;
setInterval(() => {
  const randY = Math.random() * (contHeight - 100);
  const randX = Math.random() * (contWidth - 100);
  target.style.position = "absolute";
  target.style.top = randY + "px";
  target.style.left = randX + "px";
}, 1000);

var gameStarted = false ; 
const cursor = document.querySelector(".cursor"); 

function initializeGame(){
  gameStarted = true
  document.body.style.cursor="none" ; 
  cursor.style.display = "block" ; 
  container.appendChild(target) ; 


}

// 2

async function startGame(){
  startTimer=setInterval(()=>{
    button.style.display = "none" ; 
  startTimerCount-- ; 
  startTimerElementNum.innerHTML=startTimerCount ; 
  if(startTimerCount<=0){
    clearInterval(startTimer)
    startTimerElementNum.innerText="GO ! "
    startTimerElementNum.style.color="goldenrod" ; 
    setTimeout(()=>
    {
      startTimerElementNum.style.display = "none";
      initializeGame()
    },1000) // target appearance  ; 
  }
  },1000) // 3 2 1
  
}

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});