import "./App.css";
import { useEffect, useState } from "react";
import CategoryColumn from "./components/CategoryColumn/CategoryColumn";
import Scoreboard from "./components/Scoreboard/Scoreboard";

function App() {
  //Setting state for variables
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);

  //Retrieving random category and clues from jService
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      fetch(
        `https://jservice.io/api/category?id=${Math.floor(
          Math.random() * 1500
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
        isAnswerRevealed: false,
      })),
    }));
    const arr = newArr.filter((result) => result.clues.length >= 5);
    arr.length = 6;
    arr.forEach((obj) => (obj.clues.length = 5));
    setResults(arr);
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
              isAnswerRevealed: false,
            };
          } else {
            return clue;
          }
        }),
      }));
      return newArr;
    });
  }

  function handleIsAnswerRevealed(input) {
    setResults((prevResults) => {
      const newArr = prevResults.map((datum) => ({
        ...datum,
        clues: datum.clues.map((clue) => {
          if (input === clue.question) {
            return {
              ...clue,
              isAnswerRevealed: !clue.isAnswerRevealed,
            };
          } else {
            return clue;
          }
        }),
      }));
      return newArr;
    });
  }

  const columnsArr = results.map((result) => {
    return (
      <CategoryColumn
        key={result.title}
        data={result}
        handleIsClicked={handleIsClicked}
        handleIsAnswerRevealed={handleIsAnswerRevealed}
      />
    );
  });

  function updatePlayerCount(input) {
    setPlayerCount(Number(input));
  }

  return (
    <div>
      <div className="gameBoard">
        {!isGameStarted && (
          <div>
            <h1 id="mainTitle">Endangerment!</h1>
            <div id="teamSelectContainer">
              <h2 id="teamSelectHeader">Teams:</h2>
              <select
                id="teamSelectDropdown"
                value={playerCount}
                onChange={(e) => updatePlayerCount(e.target.value)}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>
            <button onClick={handleGameStart} className="startButton">
              Start
            </button>
            <h3 id="authorCredit">Created by Mike Proscia and Joe O'Keefe</h3>
            <h4 id="dataCredit">Made with jService API</h4>
          </div>
        )}
        {isGameStarted && columnsArr}
      </div>
      {isGameStarted && (
        <div className="scoreBoardContainer">
          {[...Array(playerCount)].map((player, i) => (
            <Scoreboard i={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
