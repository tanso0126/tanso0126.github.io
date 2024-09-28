// main.js

// 사용자 이름 배열과 암호 배열 (사용자가 직접 채워 넣음)
const usernames = ["Alice", "Bob", "Charlie", "Dave", "Eve"]; // 예시 이름들
const passwords = ["pass1", "pass2", "pass3", "pass4", "pass5"]; // 예시 암호들

// 관리자 암호
const adminPassword = "admin123";

// 마니또 공개 여부 상태 저장 (브라우저 Local Storage 사용)
let revealManittosToUsers = JSON.parse(localStorage.getItem("revealManittos")) || false;

function sf(array, seed) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    seed = seed || 1;
    let random = function() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

// 배열을 섞어서 마니또를 결정
sf(usernames, [!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]-[]);
sf(passwords, [!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]-[]);
// 로그인 버튼 클릭 시 호출되는 함수
function login() {
  const inputPassword = document.getElementById("password").value;

  // 관리자 로그인 처리
  if (inputPassword === adminPassword) {
    document.getElementById("admin-view").style.display = "block";
    showAllManittos();
    return;
  }

  // 사용자가 입력한 암호의 인덱스를 찾음
  const userIndex = passwords.indexOf(inputPassword);
  if (userIndex === -1) {
    alert("올바른 암호를 입력하세요.");
    return;
  }

  // 사용자 로그인 처리
  document.getElementById("user-view").style.display = "block";
  const manittoInfo = document.getElementById("manitto-info");

  // 사용자가 자신에게 선물을 줄 마니또 정보 표시
  const manittoName = usernames[userIndex];
  manittoInfo.textContent = revealManittosToUsers
    ? `당신의 마니또는 ${manittoName}입니다.\n당신이 선물할 마니또는 ${manittoName}입니다.` // 공개 상태일 때
    : `당신의 마니또는 ???입니다.\n당신이 선물할 마니또는 ${manittoName}입니다.`; // 비공개 상태일 때
}

// 모든 마니또 정보를 관리자에게 표시
function showAllManittos() {
  const allManittosList = document.getElementById("all-manittos");
  allManittosList.innerHTML = "";

  usernames.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = `${passwords[index]} -> ${name}`; // 암호 -> 마니또
    allManittosList.appendChild(li);
  });
}

// 공개 버튼 클릭 시 공개 상태 변경
function revealManittos() {
  revealManittosToUsers = true;
  localStorage.setItem("revealManittos", JSON.stringify(revealManittosToUsers)); // 공개 상태를 Local Storage에 저장
  alert("success");
}
