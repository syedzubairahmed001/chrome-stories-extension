import React from "react";

import axios from "../../services/axios";
import styles from "./CreateStory.module.css";
import { GlobalContext } from "../../context/globalContext";
import { UserContext } from "../../context/userContext";
import pages from "../../constants/pages";
import { getAccessToken } from "../../helpers/auth";
import storyColors from '../../constants/storyColors';
import BgColorChanger from "./bgColorChanger/bgColorChanger.component";

const CreateStory = (props) => {
  const textareaRef = React.useRef();
  const { userContext, setUserContext } = React.useContext(UserContext);
  const [storyText, setStoryText] = React.useState("");
  const [colorClass, setColorClass] = React.useState(0);
  React.useEffect(() => {
    if (userContext.user.story) {
      setStoryText(userContext.user.story);
    }
    if (userContext.user.themeId) {
      setColorClass( Number(userContext.user.themeId));
    }
    textareaRef.current.focus();
  }, []);
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length < 300) {
      setStoryText(text);
    }
  };
  const handlePostStory = async (e) => {
    setGlobalContext((prev) => ({ ...prev, loading: true }));
    const accessToken = await getAccessToken();
    const text = storyText;
    axios
      .post(
        "/createStory",
        { text: text, themeId: colorClass.toString() },
        { headers: { Authorization: accessToken } }
      )
      .then((res) => {
        setGlobalContext((prev) => ({
          ...prev,
          loading: false,
          currentPage: pages.Home,
        }));
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...localUser, story: storyText, themeId: colorClass.toString() })
          );
        }
        setUserContext((prev) => ({
          ...prev,
          user: { ...prev.user, story: storyText, themeId: colorClass.toString() },
        }));
      })
      .catch((err) => {
        setGlobalContext((prev) => ({ ...prev, loading: false }));
      });
  };
  const handleloseBtnClick = () => {
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }));
  };
  const changeBackground = () => {
    if(colorClass < storyColors.length -1){

      setColorClass(prev => prev + 1)
    }else {
      setColorClass(0)
    }
  }
  return (
    <div className={`${styles.container} overflow-hidden ${"storyColor" + colorClass}`}>
      <div
        className={`${styles.header} flex flex-space-between pt-10 pl-10 pr-10 pb-10  animate--slide-up`}
      >
        <button
          className={`btn-tertiary closeBtn click-effect`}
          onClick={handleloseBtnClick}
        >
          <div className={`btn-tertiary close`}></div>
        </button>
        <div className="flex">
          <BgColorChanger onClick={changeBackground} currentColorId={colorClass} />
          <button className="btn-primary ml-10 click-effect" onClick={handlePostStory}>
            Post
          </button>
        </div>
      </div>
      <div className={`pl-10 pr-10 animate--slide-up a-delay-1`}>
        <textarea
          type="text"
          rows="14"
          ref={textareaRef}
          placeholder="Type something..."
          value={storyText}
          onChange={handleTextChange}
          className={`${styles.storyInput}`}
        />
      </div>
    </div>
  );
};

export default CreateStory;
