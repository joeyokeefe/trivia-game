import { useState } from "react";
import "./Scoreboard.css";

export default function Scoreboard(props) {
  const [playerName, setPlayerName] = useState(`Player ${props.i}`);

  return (
    <div>
      <div className="playerCard">
        <input type="text" value={playerName} className="nameDisplay" />
        <input type="number" value={0} className="scoreDisplay" readOnly />
        <div className="scoreControls">
          <div className="minus">-</div>
          <div className="plus">+</div>
        </div>
      </div>
    </div>
  );
}
