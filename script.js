const cells = document.querySelectorAll(".cell");
const selectionX = document.getElementById("selection-x");
const selectionO = document.getElementById("selection-o");
const ticTacGrid = document.getElementById("tic-tac-grid");
const newRoundButton = document.getElementById("new-round");

selectionX.draggable = true;
selectionO.draggable = true;

let player = "X";
let isGameOver = false;
let isDraw = false;
let winner = "";

const winningCombinations = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

// randomize who goes first (X or O) and set the player variable to that value and disable the other selection
const randomizePlayer = () => {
  const random = Math.floor(Math.random() * 2);
  player = random === 0 ? "X" : "O";
  const selection = player === "X" ? selectionO : selectionX;
  selection.disabled = true;
  selection.draggable = false;
  selection.classList.add("disabled");
};

// get next player
const getNextPlayer = () => {
  const selection = player === "X" ? selectionO : selectionX;
  const otherSelection = player === "X" ? selectionX : selectionO;
  selection.disabled = false;
  selection.draggable = true;
  selection.classList.remove("disabled");
  otherSelection.disabled = true;
  otherSelection.draggable = false;
  otherSelection.classList.add("disabled");
  return player === "X" ? "O" : "X";
};

// switch player after each turn
const switchPlayer = () => {
  player = getNextPlayer();
};

// check for winner
const checkForWinner = () => {
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;

    if (
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[b].innerHTML === cells[c].innerHTML &&
      cells[a].innerHTML !== ""
    ) {
      isGameOver = true;
      winner = cells[a].innerHTML;
    }
  });
};

// check for draw
const checkForDraw = () => {
  let isDraw = true;

  cells.forEach((cell) => {
    if (cell.innerHTML === "") {
      isDraw = false;
    }
  });

  return isDraw;
};

// add event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isGameOver) {
      return;
    }

    if (cell.innerHTML === "") {
      cell.innerHTML = player;
      switchPlayer();
      checkForWinner();
      isDraw = checkForDraw();

      if (isGameOver) {
        alert(`${winner} wins!`);
      } else if (isDraw) {
        alert("It's a draw!");
      }
    }
  });
});

// add event listener to new round button
newRoundButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });

  isGameOver = false;
  isDraw = false;
  winner = "";
});

// add event listener to selection X
selectionX.addEventListener("dragstart", () => {
  selectionX.classList.add("dragging");
});

selectionX.addEventListener("dragend", () => {
  selectionX.classList.remove("dragging");
});

// add event listener to selection O
selectionO.addEventListener("dragstart", () => {
  selectionO.classList.add("dragging");
});

selectionO.addEventListener("dragend", () => {
  selectionO.classList.remove("dragging");
});

// add event listener to tic tac grid
ticTacGrid.addEventListener("dragover", (e) => {
  e.preventDefault();
});

ticTacGrid.addEventListener("dragenter", (e) => {
  e.preventDefault();
});

ticTacGrid.addEventListener("drop", (e) => {
  if (isGameOver) {
    return;
  }

  if (e.target.innerHTML === "") {
    e.target.innerHTML = player;
    switchPlayer();
    checkForWinner();
    isDraw = checkForDraw();

    if (isGameOver) {
      alert(`${winner} wins!`);
    } else if (isDraw) {
      alert("It's a draw!");
    }
  }
});

randomizePlayer();