import React from "react";

import styles from "./Arrow.module.css";

const Arrow = (props) => {
  return (
    <div className={`${styles.arrow} `}>
      <span></span>
      <span></span>
    </div>
  );
};

export default Arrow;
