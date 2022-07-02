import React from "react";
import styles from "./index.module.scss";

import Upload from "../Upload/Upload";
import Learn from "../Learn/Learn";
import Interface from "../Learn/Interface";

const Index = () => {
  let hasSavedProgress = localStorage.getItem("languageTingData")
    ? true
    : false;

  let hasSavedProgressEl = <span>Saved progress found</span>;

  return (
    <div className={styles.container}>
      {hasSavedProgress ? hasSavedProgressEl : null}
      <Upload />
      {/* <Learn /> */}
      <Interface />
    </div>
  );
};

export default Index;
