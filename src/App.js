import "./App.css";
import { useEffect, useState } from "react";
import CategoryColumn from "./components/CategoryColumn/CategoryColumn";
import { nanoid } from "nanoid";

function App() {
  //Setting state for variables
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  //Retrieving random category and clues from jService
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      fetch(
        `https://jservice.io/api/category?id=${Math.floor(
          Math.random() * 3000
        )}`
      )
        .then((res) => res.json())
        .then((data) => setData((prevData) => [...prevData, data]));
    }
  }, []);

  useEffect(() => {
    const newArr = data.map((datum) => ({
      ...datum,
      clues: datum.clues.map((clue) => ({
        ...clue,
        isClicked: false,
        isAnswered: false,
      })),
    }));
    setResults(newArr);
  }, [data]);

  function handleGameStart() {
    setIsGameStarted(true);
  }

  function handleIsClicked(input) {
    setResults((prevResults) => {
      const newArr = prevResults.map((datum) => ({
        ...datum,
        clues: datum.clues.map((clue) => {
          if (input === clue.question) {
            return {
              ...clue,
              isClicked: !clue.isClicked,
              isAnswered: true,
            };
          } else {
            return clue;
          }
        }),
      }));
      return newArr;
    });
  }

  const columnsArr = results.map((col, i) => {
    if (i < 6) {
      return (
        <CategoryColumn
          key={nanoid()}
          data={col}
          handleIsClicked={handleIsClicked}
        />
      );
    }
  });

  return (
    <div className="gameBoard">
      {!isGameStarted && (
        <button onClick={handleGameStart} className="startButton">
          Start
        </button>
      )}
      {isGameStarted && columnsArr}
    </div>
  );
}

export default App;
