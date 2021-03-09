import React from "react";

import styles from "./ViewStory.module.css";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";

const ViewStory = (props) => {
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  const { stories, currentStoryIndex } = globalContext;
  const storyToView = stories[currentStoryIndex];
  const photoUrl = storyToView._fieldsProto.photoUrl.stringValue;
  const name = storyToView._fieldsProto.name.stringValue;
  const story = storyToView._fieldsProto.story.stringValue;

  const handleloseBtnClick = () => {
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }));
  };

  return (
    <div className={`${styles.container} animate--slide-up`}>
      <div className={`flex flex-center flex-space-between p-5 ${styles.header}`}>
        <div className={`flex flex-center`}>
          <img src={photoUrl} alt="profile" className={`round-small `} />
          <p className={`text-light ml-5 font-bold`}>{name}</p>
        </div>
        <button
          className={`btn-tertiary closeBtn`}
          onClick={handleloseBtnClick}
        >
          <div className={`btn-tertiary close`}></div>
        </button>
      </div>
      <div className={styles.storyText}>{story}</div>
    </div>
  );
};

export default ViewStory;
