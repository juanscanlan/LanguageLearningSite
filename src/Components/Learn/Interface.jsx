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

  const [currentProgress, setCurrentProgress] = useState(
    getCurrentProgress(storedSessionName)
  );
  const [currentWords, setCurrentWords] = useState(
    getCurrentWords(getCurrentProgress(), numberOfWords, dutchWords, level)
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(
    getCurrentWords(getCurrentProgress(), numberOfWords, dutchWords, level)[0]
      .id
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedSession, setCompletedSession] = useState(false);

  const ShowCurrentWord = (index, wordsObject) => {
    console.log("555", currentWords, currentWordIndex, wordsObject, index);

    //console.log(wordsObject, index, wordsObject[index]);
    return <div>{wordsObject[index].word}</div>;
  };

  const handleShowAnswer = () => {
    setShowAnswer((currState) => !currState);
    setShowAnswer(true);
  };

  const handleAnswer = (
    result,
    wordsArray,
    currentIndex,
    progressStringValue
  ) => {
    setShowAnswer(false);
    saveSessionProgress(result, currentIndex, progressStringValue);

    let currentWordObj = wordsArray[currentIndex];

    // if (currentIndex !== wordsArray.length - 1) {
    //   if (!result) {
    //     setCurrentWords((currValue) => currValue.concat(currentWordObj));
    //   }
    //   console.log("ttrrr", currentIndex, currentWords, currentWordIndex);
    //   setCurrentWordIndex((currIndex) => currIndex + 1);
    //   // Indexing should not be set by id TODO
    // } else {
    //   completeLearningSession();
    // }

    if (!result) {
      setCurrentWords((currValue) => currValue.concat(currentWordObj));
    }

    if (currentIndex === currentWords.length - 1 && result) {
      completeLearningSession();
    } else {
      console.log("ttrrr", currentIndex, currentWords, currentWordIndex);
      setCurrentWordIndex((currIndex) => currIndex + 1);
      // Indexing should not be set by id TODO
    }
  };

  const completeLearningSession = () => {
    console.log(currentProgress, initProgress[0]);
    localStorage.setItem(storedSessionName, currentProgress);
    setCompletedSession(true);
  };

  const saveSessionProgress = (result, currentIndex, progressStringValue) => {
    let _nextValue = result ? 1 : 0;

    let _newProgress = setCharAt(progressStringValue, currentIndex, _nextValue);
    setCharAt(progressStringValue, currentIndex, _nextValue);

    //console.log(currentIndex, _newProgress);
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

  const completedSessionJSX = <div>Session Completed!</div>;

  return (
    <div className={styles.container}>
      {!completedSession ? (
        <>
          <span>Translate this word</span>
          <span>{ShowCurrentWord(currentWordIndex, currentWords)}</span>
          {showAnswer ? answerButtonsJSX : showAnswerJSX}
        </>
      ) : (
        completedSessionJSX
      )}
    </div>
  );
};

export default Interface;
