import React from "react";

import styles from "./StoryIcon.module.css";

const StoryIcon = (props) => {
  const { imageUrl, title } = props;
  return (
    <div className={`text-center inline-block ${styles.container}`}>
      <div className={`${styles.imageWrapper}`}>
        <img
          className={`${styles.image}`}
          src="https://lh3.googleusercontent.com/ogw/ADGmqu-DYIDevgbKgOwXpn79PvVwEyP6QiZket7HuWa_nw=s192-c-mo"
          alt="profile"
        />
      </div>
      <p className={`${styles.title}`}>zubair</p>
    </div>
  );
};

export default StoryIcon;
