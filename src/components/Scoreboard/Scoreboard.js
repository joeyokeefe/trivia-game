import { useState } from "react";
import "./Scoreboard.css";

export default function Scoreboard(props) {
  const [playerName, setPlayerName] = useState(`Player ${props.i + 1}`);
  const [playerScore, setPlayerScore] = useState(0);

  function handleNameChange(input) {
    setPlayerName(input);
  }

  function handleIncreasePlayerScore() {
    setPlayerScore((prevPlayerScore) => prevPlayerScore + 100);
  }

  function handleDecreasePlayerScore() {
    setPlayerScore((prevPlayerScore) => prevPlayerScore - 100);
  }

  return (
    <div>
      <div className="playerCard">
        <input
          type="text"
          value={playerName}
          className="nameDisplay"
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          type="number"
          readOnly
          value={playerScore}
          className="scoreDisplay"
        />
        <div className="scoreControls">
          <div className="minus" onClick={handleDecreasePlayerScore}>
            -
          </div>
          <div className="plus" onClick={handleIncreasePlayerScore}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}
