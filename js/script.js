const button = document.querySelector(".button")
const timerElementNum = document.querySelector("#timer-Num")
const startTimerElementNum = document.getElementById("start-timer");
let startTimerCount = 4 ; 
let startTimer ; 

button.addEventListener("mousedown",startGame)


async function startGame(){
  startTimer=setInterval(()=>{
    button.style.display = "none" ; 
  startTimerCount-- ; 
  startTimerElementNum.innerHTML=startTimerCount ; 
  if(startTimerCount<=0){
    clearInterval(startTimer)
    startTimerElementNum.innerText="GO ! "
    startTimerElementNum.style.color="goldenrod" ; 
  }
  },1000)
  
}