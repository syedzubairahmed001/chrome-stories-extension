import React from "react";

import axios from "../../services/axios";
import styles from "./CreateStory.module.css";
import { GlobalContext } from "../../context/globalContext";
import { UserContext } from "../../context/userContext";
import pages from "../../constants/pages";
import { getAccessToken } from "../../helpers/auth";

const CreateStory = (props) => {
  const textareaRef = React.useRef();
  const { userContext, setUserContext } = React.useContext(UserContext);
  const [storyText, setStoryText] = React.useState("");
  React.useEffect(() => {
    if (userContext.user.story) {
      setStoryText(userContext.user.story);
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
        { text: text },
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
            JSON.stringify({ ...localUser, story: storyText })
          );
        }
        setUserContext((prev) => ({
          ...prev,
          user: { ...prev.user, story: storyText },
        }));
      })
      .catch((err) => {
        setGlobalContext((prev) => ({ ...prev, loading: false }));
      });
  };
  const handleloseBtnClick = () => {
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }));
  };
  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.header} flex flex-space-between pt-10 pl-10 pr-10 pb-10`}
      >
        <button
          className={`btn-tertiary closeBtn`}
          onClick={handleloseBtnClick}
        >
          <div className={`btn-tertiary close`}></div>
        </button>
        <button className="btn-primary" onClick={handlePostStory}>
          Post
        </button>
      </div>
      <div className={`pl-10 pr-10`}>
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
