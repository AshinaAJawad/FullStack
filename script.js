const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const undoButton = document.getElementById('undo');
const singlePlayerButton = document.getElementById('singlePlayer');
const twoPlayerButton = document.getElementById('twoPlayer');

let currentPlayer = 'X';
let gameStatus = ['','','','','','','','',''];
let isSinglePlayer = false;
let isGameOver = false;
let movesHistory = [];

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

// Event Listeners
board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
undoButton.addEventListener('click', undoMove);
singlePlayerButton.addEventListener('click', () => {
    isSinglePlayer = true;
    twoPlayerButton.disabled = true;
});
twoPlayerButton.addEventListener('click', () => {
    isSinglePlayer = false;
    singlePlayerButton.disabled = true;
});

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = [...cell.parentNode.children].indexOf(cell);

    if (gameStatus[cellIndex] !== '' || isGameOver) return;

    cell.textContent = currentPlayer;
    gameStatus[cellIndex] = currentPlayer;

    movesHistory.push(cellIndex);

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
        endGame('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
        if (isSinglePlayer && currentPlayer === 'O') {
            makeAIMove();
        }
    }
}

// Undo last move
function undoMove() {
    if (movesHistory.length === 0 || isGameOver) return;

    const lastMoveIndex = movesHistory.pop();
    gameStatus[lastMoveIndex] = '';
    board.children[lastMoveIndex].textContent = '';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    gameStatus = ['','','','','','','','',''];
    currentPlayer = 'X';
    isGameOver = false;
    movesHistory = [];
    status.textContent = `Player ${currentPlayer}'s turn`;
    board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

// Check if a player has won
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameStatus[index] === player;
        });
    });
}

// Check if the game ended in a draw
function checkDraw() {
    return gameStatus.every(cell => cell !== '');
}

// End the game
function endGame(result) {
    isGameOver = true;
    status.textContent = result;
}

// AI Logic for Single Player mode
function makeAIMove() {
    const availableCells = gameStatus.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiMoveIndex = availableCells[randomIndex];

    setTimeout(() => {
        board.children[aiMoveIndex].click();
    }, 1000);
}
