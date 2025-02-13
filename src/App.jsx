import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combiniations"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivedAxtivePlayer(gameTurns){

  let currentPlayer='X';
  if (gameTurns.length > 0 && gameTurns[0].player ==='X') {
    currentPlayer='O'
  }
  return currentPlayer
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer= derivedAxtivePlayer(gameTurns)

  let gameBoard = initialGameBoard

  for (const turn of gameTurns) {
      const { square, player }= turn;
      const { row, col } = square;

      gameBoard[row][col]=player;
  }

  let winner;

  for (const combiniations of WINNING_COMBINATIONS) {
    const firstSquareSymbol=gameBoard[combiniations[0].row[combiniations[0].column]]
    const secondSquareSymbol=gameBoard[combiniations[1].row[combiniations[1].column]]
    const thirdSquareSymbol=gameBoard[combiniations[2].row[combiniations[2].column]]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner=firstSquareSymbol
    }

  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer=derivedAxtivePlayer(prevTurns)
      const updatedTurns = [{square:{row:rowIndex, col:colIndex}, player:currentPlayer},...prevTurns]

      return updatedTurns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">

        <Player initialName="Player1" symbol="X" isActive={activePlayer==='X'} />
        <Player initialName="Player2" symbol="O" isActive={activePlayer==='O'} />

      </ol>

      {winner && <p> You won, {winner}</p>}

      <GameBoard onSelectSquare={handleSelectSquare}
        board={gameBoard}
       />
    </div>

    <Log turns={gameTurns} />

  </main>

}

export default App
