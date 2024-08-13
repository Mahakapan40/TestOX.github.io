const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let isXTurn = true;

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
        return combination.every(index => cells[index].classList.contains(player));
    });
};

const handleClick = (e) => {
    const cell = e.target;

    if (cell.classList.contains('x') || cell.classList.contains('o') || checkWinner('x') || checkWinner('o')) return;

    cell.classList.add(isXTurn ? 'x' : 'o');
    
    if (checkWinner('x')) {
        status.textContent = 'Player X wins!';
    } else if (checkWinner('o')) {
        status.textContent = 'Player O wins!';
    } else if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        status.textContent = 'It\'s a draw!';
    }

    isXTurn = !isXTurn;
};

const resetGame = () => {
    cells.forEach(cell => cell.classList.remove('x', 'o'));
    status.textContent = '';
    isXTurn = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
