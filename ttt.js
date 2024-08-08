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

const marking = function(event) {
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

    let threeTd = false;

    // 가로줄 검사
    if (
        tds[trNumber][0].textContent === selectedSymbol &&
        tds[trNumber][1].textContent === selectedSymbol &&
        tds[trNumber][2].textContent === selectedSymbol 
    ) {
        threeTd = true;
    }
    
    // 세로줄 검사
    if (
        tds[0][tdNumber].textContent === selectedSymbol &&
        tds[1][tdNumber].textContent === selectedSymbol &&
        tds[2][tdNumber].textContent === selectedSymbol
    ) {
        threeTd = true;
    }

    // 대각선 검사 필요한 경우 1
    if (trNumber - tdNumber === 0) { 
        if ( 
            tds[0][0].textContent === selectedSymbol &&
            tds[1][1].textContent === selectedSymbol &&
            tds[2][2].textContent === selectedSymbol
        ) {
            threeTd = true;
        }
    }

    // 대각선 검사 필요한 경우 2
    if (Math.abs(trNumber - tdNumber) === 2) {
        if ( 
            tds[0][2].textContent === selectedSymbol &&
            tds[1][1].textContent === selectedSymbol &&
            tds[2][0].textContent === selectedSymbol
        ) {
            threeTd = true;
        }
    }

    if (threeTd) {
        alert(turn + ' wins with ' + selectedSymbol + '!');
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        updateSymbols();
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
