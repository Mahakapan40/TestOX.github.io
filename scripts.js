const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let isXTurn = true;
let boardState = Array(9).fill(null);

const checkWinner = (player) => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
    });
};

const handleClick = (e) => {
    const cell = e.target;

    if (cell.textContent || checkWinner('X') || checkWinner('O')) return;

    cell.textContent = isXTurn ? 'X' : 'O';
    boardState[Array.from(cells).indexOf(cell)] = isXTurn ? 'X' : 'O';
    
    if (checkWinner('X')) {
        status.textContent = 'Player X wins!';
    } else if (checkWinner('O')) {
        status.textContent = 'Player O wins!';
    } else if (!boardState.includes(null)) {
        status.textContent = 'It\'s a draw!';
    }

    isXTurn = !isXTurn;
};

const resetGame = () => {
    cells.forEach(cell => cell.textContent = '');
    boardState = Array(9).fill(null);
    status.textContent = '';
    isXTurn = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
