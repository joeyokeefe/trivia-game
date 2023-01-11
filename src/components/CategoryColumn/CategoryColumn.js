import "./CategoryColumn.css";
import { useState } from "react";

export default function CategoryColumn(props) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(true)
  }

  props.data.clues.length = 5;
  const cluesArr = props.data.clues.map((clue, i) => {
    if (!isClicked) {
      return (
    <div key={clue.id} className="questionBox" onClick={handleClick}>
      {i === 0 ? 100 : i * 100 + 100} 
    </div>)
    } else {
      return (
        <div className="questionBox">
          {clue.question}
        </div>
        )
    }
});

  return (
    <div>
      <div className="categoryTitle">{props.data.title.toUpperCase()}</div>
      <div className="questionBox">{cluesArr}</div>
    </div>
  );
}
