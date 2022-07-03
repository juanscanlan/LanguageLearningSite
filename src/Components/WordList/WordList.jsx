import dutchVocab from "../../dev-data/top100dutch.json";
import initProgress from "../../dev-data/progress.json";

let currentProgress = localStorage.getItem("progressString") ?? initProgress[0];

const WordList = () => {
  const wordsListJSX = (
    <ul>
      {dutchVocab.map((el) => (
        <li key={el.id}>
          <span>{el.word}</span>
          <span> </span>
          <span>{currentProgress[el.id]}</span>
        </li>
      ))}
    </ul>
  );

  return <div>{wordsListJSX}</div>;
};

export default WordList;
