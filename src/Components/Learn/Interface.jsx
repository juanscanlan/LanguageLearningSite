import React from "react";
import styles from "./interface.module.scss";

import dutchWords from "../../dev-data/top100dutch.json";
import initProgress from "../../dev-data/progress.json";

import { useState } from "react";

let storedSessionName = "progressString";

const getCurrentProgress = (sessionName) => {
  return localStorage?.getItem(sessionName) ?? initProgress[0];
};

let getCurrentWords = (progressString, number, jsonData, level) => {
  let _nextWordsArr = [];
  let _currentCount = 0;

  if (progressString != null) {
    [...progressString].forEach((digit, index) => {
      if (_currentCount === number) {
        return _nextWordsArr;
      } else if (parseInt(digit) === level) {
        _nextWordsArr.push(jsonData[index]);
        _currentCount = _currentCount + 1;
      }
    });
  }
  return _nextWordsArr;
};

const Interface = () => {
  let numberOfWords = 10;
  let level = 0;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(
    getCurrentProgress(storedSessionName)
  );
  const [currentWords, setCurrentWords] = useState(
    getCurrentWords(getCurrentProgress(), numberOfWords, dutchWords, level)
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const ShowCurrentWord = (index, wordsObject) => {
    return <div>{wordsObject[index].word}</div>;
  };

  const handleShowAnswer = () => {
    setShowAnswer((currState) => !currState);
    setShowAnswer(true);
  };

  const handleAnswer = (
    result,
    wordsObject,
    currentIndex,
    progressStringValue
  ) => {
    setShowAnswer(false);
    saveSessionProgress(result, currentIndex, progressStringValue);

    if (currentIndex !== wordsObject.length - 1) {
      setCurrentWordIndex((currState) => currState + 1);
    } else {
      completeLearningSession();
    }
  };

  const completeLearningSession = () => {
    console.log(currentProgress, initProgress[0]);
    localStorage.setItem(storedSessionName, currentProgress);
  };

  const saveSessionProgress = (result, currentIndex, progressStringValue) => {
    let _nextValue = result ? 1 : 0;

    let _newProgress = setCharAt(progressStringValue, currentIndex, _nextValue);
    setCharAt(progressStringValue, currentIndex, _nextValue);

    console.log(currentIndex, _newProgress);
    setCurrentProgress(_newProgress);
  };

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  const showAnswerJSX = (
    <button onClick={() => handleShowAnswer()}>Show answer</button>
  );

  const answerButtonsJSX = (
    <div>
      <button
        onClick={() =>
          handleAnswer(false, currentWords, currentWordIndex, currentProgress)
        }
      >
        Incorrect
      </button>
      <button
        onClick={() =>
          handleAnswer(true, currentWords, currentWordIndex, currentProgress)
        }
      >
        Correct
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <span>Translate this word</span>
      <span>{ShowCurrentWord(currentWordIndex, currentWords)}</span>
      {showAnswer ? answerButtonsJSX : showAnswerJSX}
    </div>
  );
};

export default Interface;
