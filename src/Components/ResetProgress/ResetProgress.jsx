import React from "react";

const ResetProgress = () => {
  const handleResetProgress = () => {
    localStorage.removeItem("progressString");
    window.location.reload();
  };

  return <button onClick={handleResetProgress}>ResetProgress</button>;
};

export default ResetProgress;
