// main.js

// 관리자용 암호와 사용자 정보를 저장합니다.
const adminPassword = "admin123"; // 관리자 암호
const users = {
    user1: { password: "pass1", manitto: "user2" },
    user2: { password: "pass2", manitto: "user3" },
    user3: { password: "pass3", manitto: "user1" }
};

// 공개 여부를 설정하는 변수
let revealManittosToUsers = false;

// 로그인 함수
function login() {
    const inputPassword = document.getElementById("password").value;

    // 관리자 로그인 처리
    if (inputPassword === adminPassword) {
        document.getElementById("admin-view").style.display = "block";
        showAllManittos();
        return;
    }

    // 사용자 로그인 처리
    for (const user in users) {
        if (users[user].password === inputPassword) {
            document.getElementById("user-view").style.display = "block";
            const manittoInfo = document.getElementById("manitto-info");
            manittoInfo.textContent = revealManittosToUsers 
                ? `당신의 마니또는 ${user}입니다.` 
                : `당신이 선물할 마니또는 ${users[user].manitto}입니다.`;
            return;
        }
    }

    alert("올바른 암호를 입력하세요.");
}

// 모든 마니또 정보를 관리자에게 표시
function showAllManittos() {
    const allManittosList = document.getElementById("all-manittos");
    allManittosList.innerHTML = "";

    for (const [user, info] of Object.entries(users)) {
        const li = document.createElement("li");
        li.textContent = `${user} -> ${info.manitto}`;
        allManittosList.appendChild(li);
    }
}

// 관리자가 공개 버튼을 클릭하면, 공개 상태를 변경
function revealManittos() {
    revealManittosToUsers = true;
    alert("이제 사용자들은 자신에게 선물을 준 마니또를 알 수 있습니다.");
}
