// Pseudo-code
// Initialize game state
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""]; // Empty board

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Select DOM elements
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

// Log the initial state for debugging
console.log("Game initialized:");
console.log("Board:", board);
console.log("Current Player:", currentPlayer);
console.log("Winning Combinations:", winningCombinations);

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // Check if the cell is already filled or if the game is over
  if (board[cellIndex] !== "" || message.innerText.includes("Winner")) {
    return; // Ignores clicks on filled cells or after game over
  }
  // Update the cell and the board
  board[cellIndex] = currentPlayer;
  cell.innerText = currentPlayer;

  //  Check for a winner or draw
  if (checkWinner()) {
    message.innerText = `Player ${currentPlayer} Wins!`;
  } else if (board.every((cell) => cell !== "")) {
    message.innerText = "It's a Draw!";
  } else {
    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

// Attach click event listeners to all cells
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Check for Winner
function checkWinner() {
  const winningCombination = winningCombinations.find((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });

  if (winningCombination) {
    highlightWinningCells(winningCombination);
    return true;
  }
  return false;
}

function highlightWinningCells(indices) {
  indices.forEach((index) => {
    cells[index].classList.add("highlight");
  });
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
  //  Reset the board array
  board.fill("");
  // Clear all cells fields
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("highlight");
  });
  // Reset the current player
  currentPlayer = "X";

  // Reset the game status message
  message.innerText = `Player ${currentPlayer}'s Turn`;
}
