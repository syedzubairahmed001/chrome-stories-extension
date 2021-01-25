import React from "react";

import axios from "../../services/axios";
import styles from "./CreateStory.module.css";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";

const CreateStory = (props) => {
  const textareaRef = React.useRef();
  React.useEffect(() => {
    textareaRef.current.focus();
  }, []);
  const [storyText, setStoryText] = React.useState("");
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length < 300) {
      setStoryText(text);
    }
  };
  const handlePostStory = (e) => {
    const text = storyText;
    setGlobalContext((prev) => ({ ...prev, loading: true }));
    axios
      .post("/createStory", { text: text })
      .then((res) => {
        setGlobalContext((prev) => ({ ...prev, loading: false }));
        console.log(res);
      })
      .catch((err) => {
        setGlobalContext((prev) => ({ ...prev, loading: false }));
        console.log(err);
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
          className={`btn-tertiary ${styles.closeBtn}`}
          onClick={handleloseBtnClick}
        >
          <div className={`btn-tertiary ${styles.close}`}></div>
        </button>
        <button className="btn-primary" onClick={handlePostStory}>
          Post
        </button>
      </div>
      <div>
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
