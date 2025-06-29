import "./App.css"
import Die from "./components/Die/Die"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(() => generateAllNewDice()) //for call function for one time

  const buttonRef = useRef(null)
  
  let gameWon = dice.every(die => die.isHeld) &&                //array eke thiyena hama value ektm adalawa adala condition eken true return kaloth mulu condition ekama true wenawa.                                   
  dice.every(die => die.value === dice[0].value)              //ekak hari false nm false wenawa
  
  useEffect(() => {
    if(gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  const diceElements = dice.map(dieObj => <Die
    key={dieObj.id}
    value={dieObj.value}
    isHeld={dieObj.isHeld}
    hold={hold}
    id={dieObj.id}
  />)

  function rollDice() {
    setDice(prevDice => (
      prevDice.map(die => !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die)
    ))
  }

  function hold(id) {
    setDice(prevDice =>
      prevDice.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die)
    )
  }

  return (
    <main className="container">
      {gameWon && <Confetti />}
      {gameWon && <div aria-live="polite" className="sr-only">
        🌟Congratulations! You Won the game. Click 'New Game' to start again.
      </div>}
      <div className="card">
        <div className="description">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die <br /> to freeze it at its current value <br /> between rolls.</p>
        </div>
        <div className="die-container">
          {diceElements}
        </div>
        <button ref={buttonRef} onClick={gameWon ? () => setDice(generateAllNewDice()) : () => rollDice()} className="roll-btn">{gameWon ? "New Game" : "Roll"}</button>
      </div>
    </main>
  )
}