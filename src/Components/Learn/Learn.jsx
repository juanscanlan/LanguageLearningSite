import React from "react";
import { useState, useEffect } from "react";
import Interface from "./Interface";

const Learn = () => {
  const [userData, setUserData] = useState("");

  const usernameString = JSON.stringify(userData[0]?.name) ?? "Nothing";
  const progressString = JSON.stringify(userData[0]?.progress) ?? "Nothing";

  const handleLearnClick = () => {
    const localDatabase =
      JSON.parse(localStorage.getItem("languageTingData")) ?? "Nothing";

    setUserData(localDatabase);
  };

  useEffect(() => {}, [userData]);

  return (
    <>
      <button onClick={handleLearnClick}>Start Learning:</button>
      <div>{usernameString}</div>
      <div>{progressString}</div>
      <Interface progress={progressString} />
    </>
  );
};

export default Learn;
