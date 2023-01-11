import "./App.css";
import { useEffect, useState } from "react";
import CategoryColumn from "./components/CategoryColumn/CategoryColumn";
import { nanoid } from "nanoid";

function App() {
  //Setting state for variables
  const [data, setData] = useState([]);
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

  function handleGameStart() {
    setIsGameStarted(true);
  }

  const columnsArr = data.map((col, i) => {
    if (i < 6) {
      return <CategoryColumn key={nanoid()} data={col} />;
    }
  });

  return (
    <div className="gameBoard">
      {!isGameStarted && (
      <button onClick={handleGameStart} className="startButton">Start</button>
      )}
      {isGameStarted && columnsArr}
    </div>
  );
}

export default App;
