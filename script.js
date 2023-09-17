const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(cell, cellIndex) {
  if (gameState[cellIndex] === '' && gameActive) {
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      gameActive = false;
      status.textContent = `Player ${currentPlayer} wins!`;
      status.style.color = currentPlayer === 'X' ? 'green' : 'blue';
      return;
    }

    if (!gameState.includes('')) {
      gameActive = false;
      status.textContent = "It's a draw!";
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function makeMove(cellIndex) {
  const cell = cells[cellIndex];
  handleCellClick(cell, cellIndex);
}

function checkWin(player) {
  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winCombination.some(combination => {
    return combination.every(index => gameState[index] === player);
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

board.addEventListener('click', event => {
  if (event.target.classList.contains('cell')) {
    const cellIndex = Array.from(cells).indexOf(event.target);
    makeMove(cellIndex);
  }
});

restartButton.addEventListener('click', () => {
  restartGame();
});
