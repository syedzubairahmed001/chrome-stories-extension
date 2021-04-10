import React from "react";

import styles from "./Backdrop.module.css";

const Backdrop = (props) => {
  return <div className={`${styles.backdrop} animate--fade-in`} {...props}></div>;
};

export default Backdrop;
