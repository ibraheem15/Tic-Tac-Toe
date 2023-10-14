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

let piecesPlacedX = 0;
let piecesPlacedO = 0;

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
  if (piecesPlacedO === 0 && piecesPlacedX === 0) {
    selectionX.disabled = false;
    selectionX.draggable = true;
    selectionX.classList.remove("disabled");
    selectionO.disabled = false;
    selectionO.draggable = true;
    selectionO.classList.remove("disabled");
  }
  const random = Math.floor(Math.random() * 2);
  player = random === 0 ? "X" : "O";
  const selection = player === "X" ? selectionO : selectionX;
  selection.disabled = true;
  selection.draggable = false;
  selection.classList.add("disabled");
};

// get next player
const getNextPlayer = () => {
  if (player === "X" && piecesPlacedX >= 3) {
    selectionX.disabled = true;
    return player;
  } else if (player === "O" && piecesPlacedO >= 3) {
    selectionO.disabled = true;
    return player;
  }
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

      alert(`${winner} wins!`);
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
// cells.forEach((cell) => {
//   cell.addEventListener("click", (e) => {
//     console.log(player);
//     if (isGameOver) {
//       return;
//     }

//     if (
//       ((player === "X" && piecesPlacedX <= 3) ||
//         (player === "O" && piecesPlacedO <= 3)) &&
//       cell.innerHTML === ""
//     ) {
//       cell.innerHTML = player;
//       switchPlayer();
//       checkForWinner();
//       isDraw = checkForDraw();

//       if (isDraw) {
//         alert("It's a draw!");
//       }

//       if (player === "X") {
//         if (piecesPlacedX === 3) {
//           selectionX.disabled = true;
//           selectionX.draggable = false;
//           selectionX.classList.add("disabled");
//         }
//         piecesPlacedO++;
//         console.log(piecesPlacedO);
//         console.log(piecesPlacedX);
//         console.log(player);
//         if (piecesPlacedX === 3 && piecesPlacedO === 3) {
//           allowDraggable(e);
//         }
//       } else {
//         if (piecesPlacedO === 3) {
//           selectionO.disabled = true;
//           selectionO.draggable = false;
//           selectionO.classList.add("disabled");
//         }
//         piecesPlacedX++;
//         console.log(piecesPlacedO);
//         console.log(piecesPlacedX);
//         console.log(player);
//         if (piecesPlacedX === 3 && piecesPlacedO === 3) {
//           allowDraggable(e);
//         }
//       }
//     }
//   });
// });

// add event listener to new round button
newRoundButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });

  isGameOver = false;
  isDraw = false;
  winner = "";

  piecesPlacedX = 0;
  piecesPlacedO = 0;

  draggableOff();

  randomizePlayer();
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

  if (
    ((player === "X" && piecesPlacedX <= 3) ||
      (player === "O" && piecesPlacedO <= 3)) &&
    e.target.innerHTML === ""
  ) {
    e.target.innerHTML = player;
    switchPlayer();
    checkForWinner();
    isDraw = checkForDraw();

    if (isDraw) {
      alert("It's a draw!");
    }

    if (player === "X") {
      if (piecesPlacedX === 3) {
        selectionX.disabled = true;
        selectionX.draggable = false;
        selectionX.classList.add("disabled");
      }
      piecesPlacedO++;
      if (piecesPlacedX === 3 && piecesPlacedO === 3) {
        allowDraggable(e);
      }
    } else {
      if (piecesPlacedO === 3) {
        selectionO.disabled = true;
        selectionO.draggable = false;
        selectionO.classList.add("disabled");
      }
      piecesPlacedX++;
      if (piecesPlacedX === 3 && piecesPlacedO === 3) {
        allowDraggable(e);
      }
    }
  }
});

function allowDraggable(ev) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedCellId = e.dataTransfer.getData("text/plain");
    const draggedCellElement = document.getElementById(draggedCellId);
    const dropTarget = e.target;

    if (dropTarget.classList.contains("cell") && dropTarget.innerHTML === "") {
      dropTarget.innerHTML = draggedCellElement.innerHTML;
      draggedCellElement.innerHTML = "";
      switchPlayer();
      checkForWinner();
    }
  };

  // Make each cell draggable
  cells.forEach((cell) => {
    cell.setAttribute("draggable", "true");
    cell.addEventListener("dragstart", handleDragStart);
    cell.addEventListener("dragover", handleDragOver);
    cell.addEventListener("drop", handleDrop);
    cell.addEventListener("dragend", () => {});
  });
}

function draggableOff() {
  cells.forEach((cell) => {
    cell.setAttribute("draggable", "false");
  });
}

randomizePlayer();
