import React from "react";
import { useRef } from "react";
import styles from "./upload.module.scss";

const Upload = () => {
  let fileInput = useRef("");

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      let wholeJsonString = e.target.result;
      localStorage.setItem("progressString", wholeJsonString);
    };
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          id="fileUploader"
          ref={fileInput}
          type="file"
          accept=".json"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default Upload;
