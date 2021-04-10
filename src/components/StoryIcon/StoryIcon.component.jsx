import React from "react";

import styles from "./StoryIcon.module.css";
import pages from "../../constants/pages";
import { GlobalContext } from "../../context/globalContext";

const StoryIcon = (props) => {
  const [storyLoading, setStoryLoading] = React.useState(false);
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  let { photoUrl, title, index } = props;
  title = props.yourStory ? title : title.split(" ")[0];

  const handleStoryClick = () => {
    if (props.yourStory) {
      setGlobalContext((prev) => ({ ...prev, currentPage: pages.CreateStory }));
    } else {
      setStoryLoading(true);
      // setTimeout(() => {
        setGlobalContext((prev) => ({
          ...prev,
          currentStoryIndex: index,
          currentPage: pages.ViewStory,
        }));
      // }, 500);
    }
  };
  return (
    <>
      <div
        className={`text-center inline-block click-effect ${styles.container} ${props.className}`}
        onClick={handleStoryClick}
      >
        <div className="click-effect">
          <div
            className={`${styles.imageWrapper} ${
              storyLoading ? styles.loading : ""
            } ${props.yourStory ? styles.yourStoryWrapper : ""}`}
          >
            <img className={`${styles.image}`} src={photoUrl} alt="profile" />
          </div>
          <p className={`${styles.title}`}>{title}</p>
        </div>
      </div>
    </>
  );
};

export default StoryIcon;
