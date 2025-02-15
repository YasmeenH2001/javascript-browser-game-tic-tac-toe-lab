/*-------------------------------- Constants --------------------------------*/
const squareEl = document.querySelectorAll('.square'); 
const messageEl = document.querySelectorAll('.message'); 

console.log(squareEl, messageEl); 


/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/

let board = []; 
let turn = ''; 
let winner = false; 
let tie = false; 

/*-------------------------------- Functions --------------------------------*/
function init () {
    board = ['', '', '', '', '', '', '', '', '']; 
    turn = 'X'; 
    winner = false; 
    tie = false; 

    console.log('Game initialized', {board, turn, winner, tie}); 
    render(); 

}

window.onload = init; 


function render() {
    updateBoard();  
    updateMessage();  
  }

  function updateBoard() {
    board.forEach((cell, index) => {

        const square = squareEls[index];
      
      square.textContent = cell;  
      
      if (cell === 'X') {

        square.style.color = 'blue'; 

      } else if (cell === 'O') {
        square.style.color = 'red'; 

      }
    });
  }
  
  function updateMessage(){
    if (winner) {
        messageEl.textContent = `${turn} wins!`; 
    }else if(tie) {
        messageEl.textContent = 'Tie Game!'; 

    }else {
        messageEl.textContent = `${turn} it's your turn!`; 
    }
  }

  function render() {
    updateBoard(); 
    updateMessage(); 
  }


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
        

      function handleClick(event) {
        const squareIndex = event.target.id; 

        if (board[squareIndex] !== '' || winner ) {
            return; 
        }

        placePiece(squareIndex); 
        checkForWinner(); 
        checkForTie(); 
        switchPlayerTurn(); 
        render(); 
      }


/*----------------------------- Event Listeners -----------------------------*/

document.getElementById('gameBoard').addEventListener('click', function(event) {
    if (event.target.classList.contains('square')) {
      handleClick(event);
    }
  });
  

  if (board[squareIndex] !== '' || winner ){
    return; 
  }


  //  functions to switch player turns, place a piece, check for a winner, and check for a tie 

  function placePiece(index) {
    board[index] = turn; 
    console.log(board); 
  }

  function checkForWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
        console.log('Winner found!');  
        return;
      }
    }
  }
  

  function checkForTie() {
    if (winner) return;  
  
    if (!board.includes('')) { 
      tie = true;
      console.log('Tie game!');  
    }
  }
  

  function switchPlayerTurn() {
    if (winner) return;  
    
    turn = (turn === 'X') ? 'O' : 'X';
    console.log(turn);  
  }
  
  function render() {
    updateBoard(); 
    updateMessage(); 
  }


  // button to reset the game 

  const resetBtnEl = document.getElementById('reset');
  resetBtnEl.addEventListener('click', init);


























