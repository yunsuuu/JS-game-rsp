const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $score = document.querySelector("#score");
const IMG_URL = "./rsp.png";
$computer.style.background = `url(${IMG_URL}) 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
  scissors: "0",
  rock: "-220px",
  paper:"-425px",
};

const scoreTable = {
  scissors: 0,
  rock: 1,
  paper: 2,
};

let computerChoice =  "scissors";
const changeComputerHand = () => {
if(computerChoice === "scissors"){ 
  computerChoice = "rock";
} else if(computerChoice === "rock"){
  computerChoice = "paper";
} else if(computerChoice === "paper"){
  computerChoice = "scissors";
}
$computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
$computer.style.backgroundSize = "auto 200px";
};

let intervalId = setInterval(changeComputerHand, 1000);

let me = 0;
let computer = 0;
let clickalbe = true;
const clickBtn = (e) => {
  if(clickalbe){
    clearInterval(intervalId);
    clickalbe = false;
    const myChoice = e.target.innerText === "바위"
      ? "rock"
      : e.target.innerText === "가위"
      ? "scissors"
      : "paper";
      // 보 = 2, 바위 = 1, 가위 = 0
      // 숫자가 크면 승리
      // 단, 가위와 보만 예외 - 가위는 보를 이기지만 가위(0) < 보(2)
      const myScore = scoreTable[myChoice];
      const computerScore = scoreTable[computerChoice];
      if(myScore > computerScore){ // 보2 바위1 가위0
        if(myScore === 2 && computerScore === 0){
          console.log("패배!");
          computer += 1;
        } else {
          console.log("승리!");
          me += 1;
        }
        $score.innerText = `My Score : ${me} / Computer Score : ${computer}`;
      } else if(myScore < computerScore){
        if(myScore === 0 && computerScore === 2){
          console.log("승리!");
          me += 1;
        } else {
          console.log("패배!");
          computer += 1;
        }
        $score.innerText = `My Score : ${me} / Computer Score : ${computer}`;
      } else if(myScore === computerScore){
        console.log("무승부!");
        $score.innerText = `My Score : ${me} / Computer Score : ${computer}`;
      }

    setTimeout(() => {
      clearInterval(intervalId); // 버그 방지
      clickalbe = true;
      intervalId = setInterval(changeComputerHand, 1000);
    }, 1000);
  };

  if(me === 3) {
    alert("우승을 축하합니다!");
    clearInterval(intervalId);
    clickalbe = false;
  } else if(computer === 3){
    alert("최종 탈락! 재도전을 하시겠습니까?");
  }
};

$scissors.addEventListener("click", clickBtn);
$rock.addEventListener("click", clickBtn);
$paper.addEventListener("click", clickBtn);