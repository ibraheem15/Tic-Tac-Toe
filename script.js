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
      console.log(cells[a]);
      console.log(cells[b]);
      console.log(cells[c]);
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
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isGameOver) {
      return;
    }

    if (
      (player === "X" && piecesPlacedX <= 3) ||
      (player === "O" && piecesPlacedO <= 3)
    ) {
      cell.innerHTML = player;
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
        piecesPlacedX++;
      } else {
        if (piecesPlacedO === 3) {
          selectionO.disabled = true;
          selectionO.draggable = false;
          selectionO.classList.add("disabled");
        }
        piecesPlacedO++;
      }
    } else {
      allowDraggable(e);
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

  piecesPlacedX = 0;
  piecesPlacedO = 0;

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
    (player === "X" && piecesPlacedX <= 3) ||
    (player === "O" && piecesPlacedO <= 3)
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
      piecesPlacedX++;
    } else {
      if (piecesPlacedO === 3) {
        selectionO.disabled = true;
        selectionO.draggable = false;
        selectionO.classList.add("disabled");
      }
      piecesPlacedO++;
    }
  } else {
    allowDraggable(e);
  }
});

function allowDraggable(ev) {
  ev.preventDefault();

  let cell0 = document.getElementById("0");
  let cell1 = document.getElementById("1");
  let cell2 = document.getElementById("2");
  let cell3 = document.getElementById("3");
  let cell4 = document.getElementById("4");
  let cell5 = document.getElementById("5");
  let cell6 = document.getElementById("6");
  let cell7 = document.getElementById("7");
  let cell8 = document.getElementById("8");

  // make each cell draggable byt loop
  for (let i = 0; i < cells.length; i++) {
    cells[i].setAttribute("draggable", "true");
  }

  function handleDragStart(e) {
    // Set the data to be transferred during the drag
    e.dataTransfer.setData("text/plain", e.target.innerHTML);
  }

  function handleDragOver(e) {
    // Prevent default to enable dropping
    e.preventDefault();
  }

  function handleDrop(e) {
    // Prevent default to enable dropping
    e.preventDefault();

    // Get the dragged cell and the drop target cell
    const draggedCell = e.dataTransfer.getData("text/plain");
    const dropTarget = e.target;

    // Check if the drop target is a valid cell and is empty
    if (dropTarget.classList.contains("cell") && dropTarget.innerHTML === "") {
      // Swap the content (innerHTML) of the dragged cell and the drop target cell
      dropTarget.innerHTML = draggedCell;
      // If needed, you can add logic here to check for a winner or a draw

      // Switch player and update counters if necessary
      switchPlayer();
      // updateCounters();
    }
  }

  handleDrop(ev);

  cells.forEach((cell) => {
    cell.addEventListener("dragstart", handleDragStart);
    cell.addEventListener("dragover", handleDragOver);
    cell.addEventListener("drop", handleDrop);
    cell.addEventListener("dragend", (e) => {
      //remove the innerHTML of the cell that was dragged with validation (if the cell is not empty)
      // cell.innerHTML = "";
      if (e.target.innerHTML !== "") {
        e.target.innerHTML = "";
        checkForWinner();
      }
    });
  });

  // swap cells content when dragged and dropped to another cell (swap innerHTML) but not the empty cell
}

randomizePlayer();
