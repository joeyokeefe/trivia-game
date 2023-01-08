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
    const categoryArr = [];
    for (let i = 0; i < 6; i++) {
      fetch(
        `https://jservice.io/api/category?id=${Math.floor(
          Math.random() * 3000
        )}`
      )
        .then((res) => res.json())
        .then((data) => categoryArr.push(data));
    }
    setData(categoryArr);
  }, []);

  function handleGameStart() {
    setIsGameStarted(true);
  }

  return (
    <div className="gameBoard">
      <button onClick={handleGameStart}>Start</button>
      {isGameStarted && <CategoryColumn data={data} key={nanoid()} />}
    </div>
  );
}

export default App;
