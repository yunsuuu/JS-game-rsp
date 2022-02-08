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

let intervalId = setInterval(changeComputerHand, 80);

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
      // 승리(숫자가 크면) - -2 또는 1
      // 나 보2 컴퓨터 바위1 = 1
      // 나 가위0 컴퓨터 보2 = -2
 
      // 패배 = -1 또는 2
      // 나 보2 컴퓨터 가위0 = 2
      // 나 바위1 컴퓨터 보2 = -1
      const myScore = scoreTable[myChoice];
      const computerScore = scoreTable[computerChoice];
      const diff = myScore - computerScore;
        if([-2, 1].includes(diff)){ // 승리조건
          me += 1;
          $score.innerText = `승리! My Score : ${me} / Computer Score : ${computer}`;
      } else if([-1, 2].includes(diff)){ // 패배조건
        computer += 1;
        $score.innerText = `패배! My Score : ${me} / Computer Score : ${computer}`;
      } else if(diff === 0){
        $score.innerText = `무승부! My Score : ${me} / Computer Score : ${computer}`;
      }
    if(me === 3){
      alert("우승을 축하합니다!");
    } else if(computer === 3) {
      alert("탈락! 재도전하시겠습니까?");
    } else {
      setTimeout(() => {
        clearInterval(intervalId);
        clickalbe = true;
        intervalId = setInterval(changeComputerHand, 80);
      }, 1000);
    }
  };
};

$scissors.addEventListener("click", clickBtn);
$rock.addEventListener("click", clickBtn);
$paper.addEventListener("click", clickBtn);