import React from "react";

import styles from "./ViewStory.module.css";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown.component";
import Backdrop from "../../components/Backdrop/Backdrop.component";

const ViewStory = (props) => {
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  const { stories, currentStoryIndex } = globalContext;

  const [isProfileView, setProfileView] = React.useState(false);

  const storyToView = stories[currentStoryIndex];
  const photoUrl = storyToView._fieldsProto.photoUrl.stringValue;
  const name = storyToView._fieldsProto.name.stringValue;
  const story = storyToView._fieldsProto.story.stringValue;
  const themeId =
    (storyToView._fieldsProto.themeId &&
      storyToView._fieldsProto.themeId.stringValue) ||
    0;
  const bio =
    (storyToView._fieldsProto.bio &&
      storyToView._fieldsProto.bio.stringValue) ||
    "";
  const twitterHandle =
    (storyToView._fieldsProto.twitterHandle &&
      storyToView._fieldsProto.twitterHandle.stringValue) ||
    null;
  const instagramHandle =
    (storyToView._fieldsProto.instagramHandle &&
      storyToView._fieldsProto.instagramHandle.stringValue) ||
    null;
  console.log(bio);

  const handleloseBtnClick = () => {
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }));
  };

  const handleProfilePicClick = () => {
    setProfileView(true);
  };
  const handleCloseClick = () => {
    setProfileView(false);
  };

  return (
    <div
      className={`${styles.container}  overflow-hidden ${
        "storyColor" + themeId
      }`}
    >
      <div
        className={`flex flex-center flex-space-between p-5 ${styles.header} `}
      >
        <div className={`flex flex-center animate--slide-up`}>
          <img
            src={photoUrl}
            alt="profile"
            className={`round-small click-effect`}
            onClick={handleProfilePicClick}
          />
          <p className={`text-light ml-5 font-bold`}>{name}</p>
        </div>
        <button
          className={`btn-tertiary closeBtn click-effect`}
          onClick={handleloseBtnClick}
        >
          <div className={`btn-tertiary close`}></div>
        </button>
      </div>
      <div className={`${styles.storyText} animate--slide-up a-delay-1`}>
        {story}
      </div>
      {isProfileView && (
        <>
          <ProfileDropDown
            data={{
              name: name,
              photoUrl,
              bio: bio,
              twitterHandle,
              instagramHandle,
            }}
            onCloseClick={handleCloseClick}
          />
          <Backdrop onClick={handleCloseClick} />
        </>
      )}
    </div>
  );
};

export default ViewStory;
