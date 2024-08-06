const tr1 = document.getElementById('tr1');
const tr2 = document.getElementById('tr2');
const tr3 = document.getElementById('tr3');
const trs = [tr1, tr2, tr3];
const tds = [];
let turn = 'X';

const marking = function(event) {
    // console.log(event.target);
    // console.log(event.target.parentNode);

    const trNumber = trs.indexOf(event.target.parentNode);
    console.log('trNumber', trNumber);
    const tdNumber = tds[trNumber].indexOf(event.target);
    console.log('tdNumber', tdNumber);

    if (tds[trNumber][tdNumber].textContent !== '') { // 칸이 이미 채워져 있는가?
        console.log('Not empty');
    } else {
        console.log('Empty');
        tds[trNumber][tdNumber].textContent = turn;

        // 세 칸 다 채워졌나?
        let threeTd = false;

        // 가로줄 검사
        if (
            tds[trNumber][0].textContent === turn &&
            tds[trNumber][1].textContent === turn &&
            tds[trNumber][2].textContent === turn 
        ) {
            threeTd = true;
        }
        
        // 세로줄 검사
        if (
            tds[0][tdNumber].textContent === turn &&
            tds[1][tdNumber].textContent === turn &&
            tds[2][tdNumber].textContent === turn
        ) {
            threeTd = true;
        }

        // 대각선 검사 필요한 경우 1
        if (trNumber - tdNumber === 0) { 
            if ( 
                tds[0][0].textContent === turn &&
                tds[1][1].textContent === turn &&
                tds[2][2].textContent === turn
            ) {
                threeTd = true;
            }
        }

        // 대각선 검사 필요한 경우 2
        if (Math.abs(trNumber - tdNumber) === 2) {
            if ( 
                tds[0][2].textContent === turn &&
                tds[1][1].textContent === turn &&
                tds[2][0].textContent === turn
            ) {
                threeTd = true;
            }
        }

        // 다 찼으면
        if (threeTd) {
            alert('Player ' + turn + ' win!');

            // 초기화
            turn = 'X';
            tds.forEach(function (trs) {
                trs.forEach(function (td) {
                    td.textContent = '';
                });
            });

        } else { // 다 안 찼으면
            if (turn === 'X') {
                turn = 'O';
            } else {
                turn = 'X';
            }
        }
    }
};

for (let i = 0; i < 3; i++) {
    tds.push([]);
};

for (let j = 0; j < 3; j++) {
    tds[0].push(tr1.querySelectorAll('td').item(j));
    tds[1].push(tr2.querySelectorAll('td').item(j));
    tds[2].push(tr3.querySelectorAll('td').item(j));
};

for (let k = 0; k < 9; k++) {
    const td = document.getElementsByTagName('td').item(k);
    td.addEventListener('click', marking);
};

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', function() {
    turn = 'X';
    tds.forEach(function (trs) {
        trs.forEach(function (td) {
            td.textContent = '';
        });
    });
});

console.log(trs, tds);