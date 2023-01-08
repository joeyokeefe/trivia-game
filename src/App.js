import "./App.css";
import { useState } from "react";
import CategoryColumn from "./components/CategoryColumn/CategoryColumn";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  function handleCall() {
    fetch(
      `https://jservice.io/api/categories?count=6&offset=${Math.floor(
        Math.random() * 3000
      )}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setTitle(data[0].title));
  }

  return (
    <div>
      <button onClick={handleCall}>Button</button>
      <CategoryColumn data={data} title={title} />
    </div>
  );
}

export default App;
