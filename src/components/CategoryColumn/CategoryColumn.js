import "./CategoryColumn.css";

export default function CategoryColumn(props) {
  const cluesArr = props.data[0].clues.map((clue) => (
    <div key={clue.id} className="questionBox">
      {clue.value}: {clue.question}
    </div>
  ));
  cluesArr.length = 5;
  return <div>{cluesArr}</div>;
}
