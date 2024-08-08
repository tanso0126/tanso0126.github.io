const tr1 = document.getElementById('tr1');
const tr2 = document.getElementById('tr2');
const tr3 = document.getElementById('tr3');
const trs = [tr1, tr2, tr3];
const tds = [];
let turn = 'X';

const markSymbols = {
    'X': ['○', '△', '□'],
    'O': ['●', '▲', '■']
};

const transformRules = {
    '○': '▲',
    '△': '■',
    '□': '●',
    '●': '△',
    '▲': '□',
    '■': '○'
};

const symbolsContainer = document.getElementById('symbols');

const updateSymbols = () => {
    symbolsContainer.innerHTML = '';
    markSymbols[turn].forEach(symbol => {
        const label = document.createElement('label');
        label.className = 'symbol';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'symbol';
        input.value = symbol;
        label.appendChild(input);
        label.appendChild(document.createTextNode(symbol));
        symbolsContainer.appendChild(label);
    });
};

const getSelectedSymbol = () => {
    const selected = document.querySelector('input[name="symbol"]:checked');
    return selected ? selected.value : null;
};

const applyTransformations = (trNumber, tdNumber, symbol) => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],         [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
    ];

    directions.forEach(direction => {
        const [dx, dy] = direction;
        const x = trNumber + dx;
        const y = tdNumber + dy;
        if (x >= 0 && x < 3 && y >= 0 && y < 3) {
            const targetCell = tds[x][y];
            if (targetCell.textContent === transformRules[symbol]) {
                targetCell.textContent = symbol;
            }
        }
    });
};

const isBoardFull = () => {
    return tds.flat().every(td => td.textContent !== '');
};

const checkVictory = () => {
    // Check horizontal, vertical, and diagonal lines for a win
    for (let i = 0; i < 3; i++) {
        // Horizontal check
        if (tds[i][0].textContent === tds[i][1].textContent && 
            tds[i][1].textContent === tds[i][2].textContent &&
            tds[i][0].textContent !== '') {
            return true;
        }
        // Vertical check
        if (tds[0][i].textContent === tds[1][i].textContent &&
            tds[1][i].textContent === tds[2][i].textContent &&
            tds[0][i].textContent !== '') {
            return true;
        }
    }
    // Diagonal check
    if (tds[0][0].textContent === tds[1][1].textContent &&
        tds[1][1].textContent === tds[2][2].textContent &&
        tds[0][0].textContent !== '') {
        return true;
    }
    if (tds[0][2].textContent === tds[1][1].textContent &&
        tds[1][1].textContent === tds[2][0].textContent &&
        tds[0][2].textContent !== '') {
        return true;
    }
    return false;
};

const checkBoardCompletion = () => {
    // Check if the board is completely filled with the current player's symbols
    const playerSymbols = markSymbols[turn];
    const allSymbols = tds.flat().map(td => td.textContent);
    return allSymbols.every(symbol => playerSymbols.includes(symbol));
};

const marking = function(event) {
    if (isBoardFull()) {
        const selectedSymbol = getSelectedSymbol();
        if (!selectedSymbol) {
            alert('모양을 선택해주세요!');
            return;
        }

        if (event.target.textContent === '') {
            alert('이미 채워진 칸입니다.');
            return;
        }

        if (!markSymbols[turn].includes(event.target.textContent)) {
            alert('자신의 모양만 변경할 수 있습니다.');
            return;
        }

        const currentSymbol = event.target.textContent;
        if (currentSymbol === selectedSymbol) {
            alert('같은 모양으로는 변경할 수 없습니다.');
            return;
        }

        event.target.textContent = selectedSymbol;
        applyTransformations(
            trs.indexOf(event.target.parentNode),
            tds[trs.indexOf(event.target.parentNode)].indexOf(event.target),
            selectedSymbol
        );

        if (checkVictory()) {
            alert(((turn === "X") ? "선공" : "후공") + '이 ' + selectedSymbol + '으로 승리!');
            return;
        }

        if (checkBoardCompletion()) {
            alert(((turn === "X") ? "선공" : "후공") + '이 모든 칸을 자신의 모양으로 채워 승리!');
            return;
        }

        turn = turn === 'X' ? 'O' : 'X';
        updateSymbols();
    } else {
        if (event.target.textContent !== '') {
            console.log('Not empty');
            return;
        }

        const selectedSymbol = getSelectedSymbol();
        if (!selectedSymbol) {
            alert('모양을 선택해주세요!');
            return;
        }

        const trNumber = trs.indexOf(event.target.parentNode);
        const tdNumber = tds[trNumber].indexOf(event.target);

        tds[trNumber][tdNumber].textContent = selectedSymbol;
        applyTransformations(trNumber, tdNumber, selectedSymbol);

        if (checkVictory()) {
            alert(((turn === "X") ? "선공" : "후공") + '이 ' + selectedSymbol + '으로 승리!');
        } else {
            turn = turn === 'X' ? 'O' : 'X';
            updateSymbols();
        }
    }
};

for (let i = 0; i < 3; i++) {
    tds.push([]);
}

for (let j = 0; j < 3; j++) {
    tds[0].push(tr1.querySelectorAll('td').item(j));
    tds[1].push(tr2.querySelectorAll('td').item(j));
    tds[2].push(tr3.querySelectorAll('td').item(j));
}

for (let k = 0; k < 9; k++) {
    const td = document.getElementsByTagName('td').item(k);
    td.addEventListener('click', marking);
}

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function() {
    turn = 'X';
    tds.forEach(function (trs) {
        trs.forEach(function (td) {
            td.textContent = '';
        });
    });
    updateSymbols();
});

updateSymbols();
console.log(trs, tds);
