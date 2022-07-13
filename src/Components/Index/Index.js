import React from "react";
import styles from "./index.module.scss";

import Upload from "../Upload/Upload";
import Interface from "../Learn/Interface";
import ResetProgress from "../ResetProgress/ResetProgress";

const Index = () => {
  let hasSavedProgress = localStorage.getItem("languageTingData")
    ? true
    : false;

  let hasSavedProgressEl = <span>Saved progress found</span>;

  return (
    <div className={styles.container}>
      {/* {hasSavedProgress ? hasSavedProgressEl : null} */}
      {/* <Upload /> */}
      <div className={styles.navContainer}>
        <Upload />
        <ResetProgress />
      </div>
      {/* <Learn /> */}
      <Interface />
    </div>
  );
};

export default Index;
