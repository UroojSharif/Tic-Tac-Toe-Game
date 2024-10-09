import React, { useState } from 'react';


function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));  // 9 squares initialized with null
  const [isX, setIsX] = useState(true);  // X goes first

  // Handle the click on a square
  const handleClick = (index) => {
    if (squares[index] || checkWinner(squares)) return;  // Prevent changing if square is filled or game over
    const newSquares = squares.slice();  // Create a copy of the squares array
    newSquares[index] = isX ? 'X' : 'O';  // Assign 'X' or 'O' based on the current turn
    setSquares(newSquares);  // Update the state with the new array
    setIsX(!isX);  // Toggle between X and O for the next turn
  };

  // Handle reset game
  const resetGame = () => {
    setSquares(Array(9).fill(null));  // Reset squares to initial state
    setIsX(true);  // Reset to X's turn
  };

  // Check for a winner
  const winner = checkWinner(squares);
  const isDraw = squares.every(square => square !== null); // Check if all squares are filled

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {squares.map((square, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : (isDraw ? "It's a draw!" : `Next player: ${isX ? 'X' : 'O'}`)}
      </div>
      <button className="reset-button" onClick={resetGame}>Reset Game</button> {/* Reset button */}
    </div>
  );
}

// Helper function to check for a winner
function checkWinner(squares) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
  ];
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];  // Return the winner (either 'X' or 'O')
    }
  }
  return null;  // No winner yet
}

export default Board;