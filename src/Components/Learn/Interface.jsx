import React from "react";
import styles from "./interface.module.scss";

import dutchWords from "../../dev-data/top100dutch.json";
import initProgress from "../../dev-data/progress.json";

import { useState, useEffect } from "react";

let storedSessionName = "progressString";

const getCurrentProgress = (sessionName) => {
  return localStorage?.getItem(sessionName) ?? initProgress[0];
};

let getCurrentWords = (progressString, number, jsonData, level) => {
  let _nextWordsArr = [];
  let _currentCount = 0;

  // console.log(progressString, number, level);
  // console.log(jsonData);

  if (progressString != null) {
    [...progressString].forEach((digit, index) => {
      if (_currentCount === number) {
        return _nextWordsArr;
      } else if (parseInt(digit) === level) {
        //console.log(index, jsonData[index]);
        _nextWordsArr.push(jsonData[index]);
        _currentCount = _currentCount + 1;
      }
    });
  }

  return _nextWordsArr;
};

const completeLearningSession = (_currentProgress) => {
  localStorage.setItem(storedSessionName, _currentProgress);
};

const Interface = () => {
  let numberOfWords = 10;
  let level = 0;

  // const nextWords = loadNextWords();

  // const currentWord = getCurrentWord();

  const [currentProgress, setCurrentProgress] = useState(
    getCurrentProgress(storedSessionName)
  );
  const [currentWords, setCurrentWords] = useState(
    getCurrentWords(
      getCurrentProgress(storedSessionName),
      numberOfWords,
      dutchWords,
      level
    )
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedSession, setCompletedSession] = useState(false);

  const ShowCurrentWord = (index, wordsObject) => {
    //console.log("showCurrent:", index, wordsObject);
    let _currentWord = wordsObject[index];

    return <div>{_currentWord.word}</div>;
  };

  useEffect(() => {
    if (completedSession) {
      completeLearningSession(currentProgress);
    }
  }, [completedSession, currentProgress]);

  //console.log("currentWordIndex:", currentWordIndex);

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

    // let currentWordObj = wordsArray[currentIndex];
    let currentWordObj = wordsArray[currentIndex];

    //console.log("currentWordObj:", wordsArray, currentWordObj, currentIndex);

    // If wrong answer, move word to the back of the array
    if (!result) {
      setCurrentWords((currValue) => currValue.concat(currentWordObj));
    }

    // If it is a correct guess on the last word on the array, complete the session.
    if (currentIndex === currentWords.length - 1 && result) {
      saveSessionProgress(result, currentWordObj.id, progressStringValue, true);

      // Else, move index to the next word
    } else {
      saveSessionProgress(
        result,
        currentWordObj.id,
        progressStringValue,
        false
      );
      setCurrentWordIndex((currIndex) => currIndex + 1);
      // Indexing should not be set by id TODO
    }
  };

  const saveSessionProgress = (
    result,
    currentIndex,
    progressStringValue,
    isComplete
  ) => {
    let _nextValue = result ? 1 : 0;

    let _newProgress = setCharAt(progressStringValue, currentIndex, _nextValue);
    setCharAt(progressStringValue, currentIndex, _nextValue);

    setCurrentProgress(_newProgress);
    setCompletedSession(isComplete);
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

  //console.log("currentWords:", currentWords);

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
