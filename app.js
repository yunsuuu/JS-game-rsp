// setInterval - 일정 시간 간격을 두고 함수 실행(함수 호출 간격을 보다 정확하게)
// setTimeout - 일정 시간이 지난 후에 함수를 실행(함수 호출 간격을 크게 신경쓰지 않을 때)

const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $score = document.querySelector("#score");
const IMG_URL = "./rsp.png";
$computer.style.background = `url(${IMG_URL}) 0`;
$computer.style.backgroundSize = 'auto 200px';

// 객체를 사용하는 이유 - 여러 개의 변수를 그룹화
// 객체 안의 값을 불러올 때 - rspX['scissors'] (대괄호)
const rspX = { // rsp의 x좌표들을 그룹화 해주는 변수
  scissors: "0",
  rock: "-220px",
  paper:"-425px",
};

// 가위, 바위, 보에 숫자를 매겨 공통된 규칙 찾기
// 컴퓨터가 선택한 값과 내가 선택한 값을 뺀 값으로 규칙을 찾아 코드 작성
// 나 바위0 컴퓨터 가위1 = -1 / 나 가위1 컴퓨터 보-1 = 2
// 내가 이긴 경우 - -1 또는 2
// 나 바위0 컴퓨터 보-1 = 1 / 나 보-1 컴퓨터 가위1 = -2
// 내가 진 경우 -2 또는 1
// 비긴 경우 = 0 
const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let computerChoice =  "scissors"; // 컴퓨터 선택 초기값 가위
const changeComputerHand = () => {
  if(computerChoice === "scissors"){  // 가위이면
    computerChoice = "rock";
  } else if(computerChoice === "rock"){ // 바위이면
    computerChoice = "paper";
  } else if(computerChoice === "paper"){ // 보이면
    computerChoice = "scissors";
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = "auto 200px";
};

// clearInterval로 타이머 정지시키기
// clearInterval은 아이디를 가짐 -> clearInterval(아이디)
// let 아이디 = setInterval(함수, 밀리초);
// setInterval은 clearInterval / setTimeout은 clearTimeout으로 타이머 일시정지
// 타이머마다 Id가 달라지기 때문에 달라지는 Id를 변수에 저장해야함
let intervalId = setInterval(changeComputerHand, 50); // 0.5초 간격으로 실행

// clickBtn 5번 클릭 -> setTimeout 5번 호출, setInterval 5번 호출
// setInterval을 호출 = 타이머를 호출하는 것과 같은 말
// 타이머가 호출될 때마다 아이디가 하나씩 생성
// 1번 인터벌, 2번, 3번, 4번, 5번 ...
// 변수로 만든 Id에 마지막 인터벌인 5번 인터벌만 저장(앞서 생성된 인터벌을 모두 덮어씀)
// clearInterval을 통해 5번 인터벌만 삭제됨
// 1-4번 인터벌은 clearInterval(intervalId)에 영향을 받지 않음(이미지가 멈추지 않음)
let clickalbe = true; // 버튼클릭유무를 변수로 저장
const clickBtn = (e) => {
  if(clickalbe){
    clearInterval(intervalId); // setInterval을 정지시킴
    clickalbe = false; // 정지상태 동안 클릭 안 되게
    const myChoice = e.target.innerText === "바위"
      ? "rock"
      : e.target.innerText === "가위"
      ? "scissors"
      : "paper";
      const myScore = scoreTable[myChoice];
      const computerScore = scoreTable[computerChoice];
      const diff = myScore - computerScore; // 값 차이를 통해 규칙 찾기
      // 내가 승리 = -1 또는 2
      // 내가 패배 = -2 또는 1
      // 비긴 경우 = 0
    setTimeout(() => {
      clearInterval(intervalId);
      clickalbe = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000); // setTimeout을 사용하여 1초 후에 실행
  };
};

$scissors.addEventListener("click", clickBtn);
$rock.addEventListener("click", clickBtn);
$paper.addEventListener("click", clickBtn);