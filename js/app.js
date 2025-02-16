/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr'); 
const messageEl = document.querySelector('#message'); 
const resetBtnEl = document.querySelector('#reset'); 

const winningCombos = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

/*---------------------------- Variables (state) ----------------------------*/
let board; 
let turn; 
let winner; 

/*------------------------ Cached Element References ------------------------*/

function init() {
    console.log("Game initializing...");
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winner = null;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((value, index) => {
      squareEls[index].textContent = value;
    });
}

function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations! ${winner} wins!`;
    } else if (board.every(square => square !== "")) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn!`;
    }
}

function handleClick(event) {
    const square = event.target;

    if (!square.classList.contains("sqr")) 
        return;

    const squareIndex = parseInt(square.id); 

    if (board[squareIndex] !== "" || winner)
        return;

    placePiece(squareIndex);
    checkForWinner();

    if (!winner) {
        switchPlayerTurn(); 
    }
    render(); 
}


function placePiece(index) {
    board[index] = turn;
    console.log("Board after move:", board);
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a]; 
      }
    });
    console.log("Winner:", winner);
}

function switchPlayerTurn() {
    turn = turn === "X" ? "O" : "X"; 
    console.log("Turn:", turn);
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
    square.addEventListener("click", handleClick);
});
resetBtnEl.addEventListener("click", init);

init();