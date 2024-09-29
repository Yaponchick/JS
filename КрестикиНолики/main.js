let step = 'X'; 
let gameWho = document.getElementById('gameWho');
let winner = '';
let gameItem = document.querySelectorAll('.gameItem');
let counter = 0;
let gameArea = document.getElementById('gameArea');
let winnerDisplay = document.getElementById('Winner');
let spanWin = document.getElementById('spanWin');
let btnNewGame = document.getElementById('btnNewGame');

const who = () => {
    gameWho.textContent = `Игрок ${step}`;
};

gameItem.forEach((item) => {
    item.addEventListener('click', () => {
        if (item.textContent === '' && winner === '') { 
            item.textContent = step;
            item.classList.add(step === 'X' ? 'player1cross' : 'player2circle');
            counter++;

            if (crossWin() || circleWin()) {
                winner = step;
                endGame(step);
            } else if (noWin()) {
                endGame(null); 
            } else {
                step = step === 'X' ? 'O' : 'X';
                who();
            }
        }
    });
});

let win = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];

let crossWin = () => {
    return win.some(combination => {
        return combination.every(index => gameItem[index].textContent === 'X');
    });
};

let circleWin = () => {
    return win.some(combination => {
        return combination.every(index => gameItem[index].textContent === 'O');
    });
};

let noWin = () => {
    return counter === 9 && !crossWin() && !circleWin();
};

const endGame = (winner) => {
    winnerDisplay.style.display = 'flex';
    spanWin.textContent = winner ? `Игрок ${winner}`:'Дружба';
};

btnNewGame.addEventListener('click', () => {
    gameItem.forEach(item => {
        item.textContent = ''; 
        item.classList.remove('player1cross', 'player2circle');
    });
    winner = '';
    counter = 0;
    step = 'X';
    who();
    winnerDisplay.style.display = 'none';
});

who();
